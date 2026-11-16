"""SQLite storage, HMAC hashing, and aggregate reporting for cash-timing v2 metrics."""

from __future__ import annotations

import contextlib
import datetime
import hashlib
import hmac
import sqlite3
from typing import Callable, Dict, List, Optional, Tuple

RETENTION_DAYS = 90

RETENTION_WINDOWS: List[Tuple[str, int, int]] = [
    ("repeat_days_1_7", 1, 7),
    ("repeat_days_8_14", 8, 14),
    ("repeat_days_15_30", 15, 30),
]


def utc_today_str(now_fn: Optional[Callable[[], datetime.date]] = None) -> str:
    """Return current UTC calendar date as YYYY-MM-DD."""
    if now_fn is not None:
        return now_fn().isoformat()
    return datetime.datetime.now(datetime.timezone.utc).date().isoformat()


def add_days_iso(day_iso: str, days: int) -> str:
    """Add integer days to a YYYY-MM-DD calendar date."""
    d = datetime.date.fromisoformat(day_iso)
    return (d + datetime.timedelta(days=days)).isoformat()


def days_between_iso(start_iso: str, end_iso: str) -> int:
    """Return integer day offset (end - start) for YYYY-MM-DD dates."""
    return (datetime.date.fromisoformat(end_iso) - datetime.date.fromisoformat(start_iso)).days


def hmac_browser_token(browser_token: str, secret: str) -> str:
    """Compute HMAC-SHA256(browser_token, server_secret) as 64-char hex."""
    return hmac.new(
        secret.encode("utf-8"),
        browser_token.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


class MetricsStore:
    """Thread-safe SQLite store for pseudonymous v2 calculator usage."""

    def __init__(
        self,
        db_path: str,
        hmac_secret: str,
        now_fn: Optional[Callable[[], datetime.date]] = None,
    ) -> None:
        if not hmac_secret:
            raise ValueError("SERVER_HMAC_SECRET must be non-empty")
        self.db_path = db_path
        self.hmac_secret = hmac_secret
        self.now_fn = now_fn
        self._init_schema()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, timeout=10.0, isolation_level=None)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA busy_timeout=5000")
        return conn

    def _init_schema(self) -> None:
        with contextlib.closing(self._connect()) as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS browser_summary (
                    browser_key_hmac TEXT PRIMARY KEY,
                    first_observed_day_utc TEXT NOT NULL,
                    first_source TEXT NOT NULL,
                    first_campaign TEXT NOT NULL,
                    activation_day_utc TEXT,
                    expires_day_utc TEXT NOT NULL
                )
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS daily_events (
                    browser_key_hmac TEXT NOT NULL,
                    day_utc TEXT NOT NULL,
                    event TEXT NOT NULL,
                    source TEXT NOT NULL,
                    campaign TEXT NOT NULL,
                    PRIMARY KEY (browser_key_hmac, day_utc, event)
                )
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS deletion_tombstone (
                    browser_key_hmac TEXT PRIMARY KEY,
                    expires_day_utc TEXT NOT NULL
                )
                """
            )
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_daily_events_day ON daily_events(day_utc)"
            )
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_browser_summary_expires ON browser_summary(expires_day_utc)"
            )

    def _today(self) -> str:
        return utc_today_str(self.now_fn)

    def _purge_expired_in_tx(self, conn: sqlite3.Connection, today_utc: str) -> int:
        cur1 = conn.execute(
            "DELETE FROM daily_events WHERE browser_key_hmac IN "
            "(SELECT browser_key_hmac FROM browser_summary WHERE expires_day_utc <= ?)",
            (today_utc,),
        )
        cur2 = conn.execute(
            "DELETE FROM browser_summary WHERE expires_day_utc <= ?",
            (today_utc,),
        )
        cur3 = conn.execute(
            "DELETE FROM deletion_tombstone WHERE expires_day_utc <= ?",
            (today_utc,),
        )
        return cur1.rowcount + cur2.rowcount + cur3.rowcount

    def cleanup_expired(self) -> int:
        """Delete expired browser summaries, daily events, and tombstones."""
        today_utc = self._today()
        with contextlib.closing(self._connect()) as conn:
            conn.execute("BEGIN IMMEDIATE")
            try:
                removed = self._purge_expired_in_tx(conn, today_utc)
                conn.execute("COMMIT")
                return removed
            except Exception:
                conn.execute("ROLLBACK")
                raise

    def record_event(
        self,
        browser_token: str,
        event: str,
        source: str,
        campaign: str,
    ) -> str:
        """Record one validated v2 event atomically.

        Returns outcome category: 'tombstoned', 'recorded', or 'duplicate'.
        """
        today_utc = self._today()
        expires_utc = add_days_iso(today_utc, RETENTION_DAYS)
        key_hmac = hmac_browser_token(browser_token, self.hmac_secret)
        is_own_calc = event == "own_calculation_completed"

        with contextlib.closing(self._connect()) as conn:
            conn.execute("BEGIN IMMEDIATE")
            try:
                self._purge_expired_in_tx(conn, today_utc)

                tomb = conn.execute(
                    "SELECT 1 FROM deletion_tombstone WHERE browser_key_hmac = ? AND expires_day_utc > ?",
                    (key_hmac, today_utc),
                ).fetchone()
                if tomb is not None:
                    conn.execute("COMMIT")
                    return "tombstoned"

                existing = conn.execute(
                    "SELECT activation_day_utc FROM browser_summary WHERE browser_key_hmac = ? AND expires_day_utc > ?",
                    (key_hmac, today_utc),
                ).fetchone()

                if existing is None:
                    conn.execute(
                        """
                        INSERT INTO browser_summary (
                            browser_key_hmac,
                            first_observed_day_utc,
                            first_source,
                            first_campaign,
                            activation_day_utc,
                            expires_day_utc
                        ) VALUES (?, ?, ?, ?, ?, ?)
                        """,
                        (
                            key_hmac,
                            today_utc,
                            source,
                            campaign,
                            today_utc if is_own_calc else None,
                            expires_utc,
                        ),
                    )
                elif is_own_calc and existing["activation_day_utc"] is None:
                    conn.execute(
                        """
                        UPDATE browser_summary
                        SET activation_day_utc = ?
                        WHERE browser_key_hmac = ? AND activation_day_utc IS NULL
                        """,
                        (today_utc, key_hmac),
                    )

                cur = conn.execute(
                    """
                    INSERT OR IGNORE INTO daily_events (
                        browser_key_hmac,
                        day_utc,
                        event,
                        source,
                        campaign
                    ) VALUES (?, ?, ?, ?, ?)
                    """,
                    (key_hmac, today_utc, event, source, campaign),
                )
                conn.execute("COMMIT")
                return "recorded" if cur.rowcount == 1 else "duplicate"
            except Exception:
                conn.execute("ROLLBACK")
                raise

    def forget_browser(self, browser_token: str) -> None:
        """Delete browser history and place a non-reportable tombstone until original expiry."""
        today_utc = self._today()
        default_expires = add_days_iso(today_utc, RETENTION_DAYS)
        key_hmac = hmac_browser_token(browser_token, self.hmac_secret)

        with contextlib.closing(self._connect()) as conn:
            conn.execute("BEGIN IMMEDIATE")
            try:
                self._purge_expired_in_tx(conn, today_utc)

                row = conn.execute(
                    "SELECT expires_day_utc FROM browser_summary WHERE browser_key_hmac = ?",
                    (key_hmac,),
                ).fetchone()
                tomb_row = conn.execute(
                    "SELECT expires_day_utc FROM deletion_tombstone WHERE browser_key_hmac = ?",
                    (key_hmac,),
                ).fetchone()

                expires_utc = default_expires
                if row is not None:
                    expires_utc = row["expires_day_utc"]
                elif tomb_row is not None:
                    expires_utc = tomb_row["expires_day_utc"]

                conn.execute(
                    "DELETE FROM daily_events WHERE browser_key_hmac = ?",
                    (key_hmac,),
                )
                conn.execute(
                    "DELETE FROM browser_summary WHERE browser_key_hmac = ?",
                    (key_hmac,),
                )
                conn.execute(
                    """
                    INSERT OR REPLACE INTO deletion_tombstone (
                        browser_key_hmac,
                        expires_day_utc
                    ) VALUES (?, ?)
                    """,
                    (key_hmac, expires_utc),
                )
                conn.execute("COMMIT")
            except Exception:
                conn.execute("ROLLBACK")
                raise

    def generate_reports(self, last_complete_day_utc: Optional[str] = None) -> Dict[str, object]:
        """Compute private aggregate acquisition, activity, and retention reports.

        Excludes the current incomplete UTC day by default (cutoff = today_utc - 1 day).
        """
        today_utc = self._today()
        cutoff = last_complete_day_utc or add_days_iso(today_utc, -1)

        with contextlib.closing(self._connect()) as conn:
            browsers = conn.execute(
                """
                SELECT browser_key_hmac, first_observed_day_utc, first_source, first_campaign, activation_day_utc
                FROM browser_summary
                WHERE expires_day_utc > ? AND first_observed_day_utc <= ?
                """,
                (today_utc, cutoff),
            ).fetchall()

            events = conn.execute(
                """
                SELECT de.browser_key_hmac, de.day_utc, de.event, de.source, de.campaign
                FROM daily_events de
                JOIN browser_summary bs ON bs.browser_key_hmac = de.browser_key_hmac
                WHERE bs.expires_day_utc > ? AND de.day_utc <= ?
                """,
                (today_utc, cutoff),
            ).fetchall()

        # 1. Acquisition table
        acq_map: Dict[Tuple[str, str, str], Dict[str, int]] = {}
        for b in browsers:
            key = (b["first_observed_day_utc"], b["first_source"], b["first_campaign"])
            if key not in acq_map:
                acq_map[key] = {"observed_browsers": 0, "activated_browsers": 0}
            acq_map[key]["observed_browsers"] += 1
            if b["activation_day_utc"] is not None and b["activation_day_utc"] <= cutoff:
                acq_map[key]["activated_browsers"] += 1

        acquisition = []
        for (cohort_day, src, camp), counts in sorted(acq_map.items()):
            obs = counts["observed_browsers"]
            act = counts["activated_browsers"]
            acquisition.append(
                {
                    "first_observed_cohort_day": cohort_day,
                    "first_source": src,
                    "first_campaign": camp,
                    "observed_browsers": obs,
                    "activated_browsers": act,
                }
            )

        # 2. Daily activity table (distinct browsers per date_utc, current_source, current_campaign)
        act_sets: Dict[Tuple[str, str, str], Dict[str, set]] = {}
        for ev in events:
            key = (ev["day_utc"], ev["source"], ev["campaign"])
            if key not in act_sets:
                act_sets[key] = {
                    "visit": set(),
                    "own": set(),
                    "example": set(),
                }
            if ev["event"] == "calculator_visit":
                act_sets[key]["visit"].add(ev["browser_key_hmac"])
            elif ev["event"] == "own_calculation_completed":
                act_sets[key]["own"].add(ev["browser_key_hmac"])
            elif ev["event"] == "example_calculation_completed":
                act_sets[key]["example"].add(ev["browser_key_hmac"])

        activity = []
        for (day_utc, src, camp), sets in sorted(act_sets.items()):
            activity.append(
                {
                    "date_utc": day_utc,
                    "current_source": src,
                    "current_campaign": camp,
                    "visiting_browsers": len(sets["visit"]),
                    "own_calculating_browsers": len(sets["own"]),
                    "example_calculating_browsers": len(sets["example"]),
                }
            )

        # 3. Retention windows (based on activation_day_utc, NOT first visit)
        own_days_by_browser: Dict[str, List[str]] = {}
        for ev in events:
            if ev["event"] == "own_calculation_completed":
                own_days_by_browser.setdefault(ev["browser_key_hmac"], []).append(ev["day_utc"])

        cohort_browsers: Dict[Tuple[str, str, str], List[sqlite3.Row]] = {}
        for b in browsers:
            act_day = b["activation_day_utc"]
            if act_day is not None and act_day <= cutoff:
                ckey = (act_day, b["first_source"], b["first_campaign"])
                cohort_browsers.setdefault(ckey, []).append(b)

        retention = []
        for (act_day, src, camp), members in sorted(cohort_browsers.items()):
            age_days = days_between_iso(act_day, cutoff)
            for win_id, start_day, end_day in RETENTION_WINDOWS:
                if age_days >= end_day:
                    eligible = len(members)
                    immature = 0
                    returned = 0
                    for m in members:
                        b_own_days = own_days_by_browser.get(m["browser_key_hmac"], [])
                        if any(start_day <= days_between_iso(act_day, d) <= end_day for d in b_own_days):
                            returned += 1
                else:
                    eligible = 0
                    immature = len(members)
                    returned = 0

                pct = round((returned / eligible) * 100, 2) if eligible > 0 else None
                retention.append(
                    {
                        "activation_cohort_day": act_day,
                        "first_source": src,
                        "first_campaign": camp,
                        "window": win_id,
                        "returned_browsers": returned,
                        "eligible_browsers": eligible,
                        "immature_browsers": immature,
                        "return_percentage": pct,
                    }
                )

        return {
            "cutoff_day_utc": cutoff,
            "coverage_note": "Consented, currently retained browsers only; incomplete coverage.",
            "acquisition": acquisition,
            "activity": activity,
            "retention": retention,
        }
