"""Contract and retention tests for cash_timing_metrics."""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
import datetime
import os
import subprocess
import sys
import tempfile

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import EXAMPLE_FIXED_TOKEN, create_app
from store import MetricsStore, add_days_iso

ORIGIN = "https://kf-software.com"
TOKEN_A = "a" * 64
TOKEN_B = "b" * 64


class FakeClock:
    def __init__(self, start_iso: str = "2026-11-01") -> None:
        self.start = datetime.date.fromisoformat(start_iso)
        self.current = self.start

    def set_day_offset(self, offset: int) -> None:
        self.current = self.start + datetime.timedelta(days=offset)

    def __call__(self) -> datetime.date:
        return self.current


@pytest.fixture()
def tmp_db():
    fd, path = tempfile.mkstemp(suffix=".sqlite3")
    os.close(fd)
    yield path
    for suffix in ("", "-wal", "-shm"):
        p = path + suffix
        if os.path.exists(p):
            os.remove(p)


def make_client(db_path: str, clock: FakeClock):
    app = create_app(
        test_config={
            "TESTING": True,
            "METRICS_DB_PATH": db_path,
            "SERVER_HMAC_SECRET": "test-secret-key-do-not-use-in-prod",
            "ALLOWED_ORIGINS": ORIGIN,
        },
        now_fn=clock,
    )
    return app.test_client(), app.config["METRICS_STORE"]


def test_receiver_validation_and_origin_checks(tmp_db):
    clock = FakeClock()
    client, _ = make_client(tmp_db, clock)

    # Missing or unapproved origin -> 403
    r = client.post("/cash-timing/events", json={
        "schema_version": 2,
        "browser_token": TOKEN_A,
        "event": "calculator_visit",
        "source": "facebook",
        "campaign": "cash_timing_v1",
    })
    assert r.status_code == 403

    r = client.post(
        "/cash-timing/events",
        headers={"Origin": "https://evil.example"},
        json={
            "schema_version": 2,
            "browser_token": TOKEN_A,
            "event": "calculator_visit",
            "source": "facebook",
            "campaign": "cash_timing_v1",
        },
    )
    assert r.status_code == 403

    # Unknown keys rejected
    r = client.post(
        "/cash-timing/events",
        headers={"Origin": ORIGIN},
        json={
            "schema_version": 2,
            "browser_token": TOKEN_A,
            "event": "calculator_visit",
            "source": "facebook",
            "campaign": "cash_timing_v1",
            "balance": 1000,
        },
    )
    assert r.status_code == 400

    # Constant example token rejected
    r = client.post(
        "/cash-timing/events",
        headers={"Origin": ORIGIN},
        json={
            "schema_version": 2,
            "browser_token": EXAMPLE_FIXED_TOKEN,
            "event": "calculator_visit",
            "source": "facebook",
            "campaign": "cash_timing_v1",
        },
    )
    assert r.status_code == 400

    # Malformed token rejected
    r = client.post(
        "/cash-timing/events",
        headers={"Origin": ORIGIN},
        json={
            "schema_version": 2,
            "browser_token": "not-hex",
            "event": "calculator_visit",
            "source": "facebook",
            "campaign": "cash_timing_v1",
        },
    )
    assert r.status_code == 400

    # Oversized body (>512 bytes) rejected -> 413
    r = client.post(
        "/cash-timing/events",
        headers={"Origin": ORIGIN, "Content-Type": "application/json"},
        data='{"schema_version":2,"browser_token":"' + TOKEN_A + '","event":"calculator_visit","source":"facebook","campaign":"cash_timing_v1","pad":"' + ("x" * 500) + '"}',
    )
    assert r.status_code == 413

    # Valid event -> 204
    r = client.post(
        "/cash-timing/events",
        headers={"Origin": ORIGIN},
        json={
            "schema_version": 2,
            "browser_token": TOKEN_A,
            "event": "calculator_visit",
            "source": "facebook",
            "campaign": "cash_timing_v1",
        },
    )
    assert r.status_code == 204
    assert r.headers.get("Access-Control-Allow-Origin") == ORIGIN
    assert "Set-Cookie" not in r.headers


def test_daily_dedup_and_facebook_then_direct_attribution(tmp_db):
    clock = FakeClock("2026-11-01")
    client, store = make_client(tmp_db, clock)

    # Day 0: visit from facebook, then duplicate visit from google (first wins)
    assert client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "calculator_visit", "source": "facebook", "campaign": "cash_timing_v1",
    }).status_code == 204
    assert client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "calculator_visit", "source": "google", "campaign": "none",
    }).status_code == 204
    assert client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "own_calculation_completed", "source": "facebook", "campaign": "cash_timing_v1",
    }).status_code == 204

    # Day 2: direct return with own calculation
    clock.set_day_offset(2)
    assert client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "calculator_visit", "source": "direct_or_unknown", "campaign": "none",
    }).status_code == 204
    assert client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "own_calculation_completed", "source": "direct_or_unknown", "campaign": "none",
    }).status_code == 204

    clock.set_day_offset(10)
    rep = store.generate_reports(last_complete_day_utc="2026-11-09")
    assert rep["acquisition"] == [{
        "first_observed_cohort_day": "2026-11-01",
        "first_source": "facebook",
        "first_campaign": "cash_timing_v1",
        "observed_browsers": 1,
        "activated_browsers": 1,
    }]
    # Activity keeps day 0 facebook and day 2 direct_or_unknown
    assert rep["activity"][0]["current_source"] == "facebook"
    assert rep["activity"][0]["visiting_browsers"] == 1
    assert rep["activity"][1]["current_source"] == "direct_or_unknown"
    assert rep["activity"][1]["own_calculating_browsers"] == 1
    # Retention cohort keeps original facebook acquisition
    r_1_7 = [x for x in rep["retention"] if x["window"] == "repeat_days_1_7"][0]
    assert r_1_7["first_source"] == "facebook"
    assert r_1_7["returned_browsers"] == 1
    assert r_1_7["eligible_browsers"] == 1


def test_forget_tombstone_and_90_day_expiry(tmp_db):
    clock = FakeClock("2026-11-01")
    client, store = make_client(tmp_db, clock)

    client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "own_calculation_completed", "source": "x", "campaign": "cash_timing_v1",
    })

    # Forget deletes history and blocks late events
    r = client.post("/cash-timing/forget", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
    })
    assert r.status_code == 204

    # Late event after deletion is ignored
    client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_A,
        "event": "own_calculation_completed", "source": "x", "campaign": "cash_timing_v1",
    })

    # Unknown token deletion returns 204 and tombstones it
    assert client.post("/cash-timing/forget", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_B,
    }).status_code == 204
    client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": TOKEN_B,
        "event": "calculator_visit", "source": "x", "campaign": "none",
    })

    clock.set_day_offset(5)
    rep = store.generate_reports()
    assert rep["acquisition"] == []
    assert rep["activity"] == []
    assert rep["retention"] == []

    # Test hard 90-day expiry (not extended by activity)
    token_c = "c" * 64
    clock.set_day_offset(0)
    client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": token_c,
        "event": "own_calculation_completed", "source": "threads", "campaign": "cash_timing_v1",
    })
    clock.set_day_offset(50)
    client.post("/cash-timing/events", headers={"Origin": ORIGIN}, json={
        "schema_version": 2, "browser_token": token_c,
        "event": "own_calculation_completed", "source": "threads", "campaign": "cash_timing_v1",
    })
    # On day 90, original 90-day expiry is reached
    clock.set_day_offset(90)
    removed = store.cleanup_expired()
    assert removed >= 1
    rep2 = store.generate_reports()
    assert rep2["acquisition"] == []


@pytest.mark.parametrize(
    "case_id,visit_days,example_days,own_days,last_complete_day,expected",
    [
        ("repeated_same_day_not_return", [0, 0, 0], [], [0, 0, 0], 7, {"repeat_days_1_7": (0, 1), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
        ("page_return_without_calculation", [0, 5], [], [0], 7, {"repeat_days_1_7": (0, 1), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
        ("inclusive_day_7", [0, 7], [], [0, 7], 7, {"repeat_days_1_7": (1, 1), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
        ("immature_even_with_early_return", [0, 5], [], [0, 5], 6, {"repeat_days_1_7": (0, 0), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
        ("disjoint_windows_and_distinct_browser", [0, 1, 7, 8, 14, 15, 30], [], [0, 1, 7, 8, 14, 15, 30], 30, {"repeat_days_1_7": (1, 1), "repeat_days_8_14": (1, 1), "repeat_days_15_30": (1, 1)}),
        ("example_only_not_activated", [0, 7], [0, 7], [], 30, {"repeat_days_1_7": (0, 0), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
        ("activation_after_initial_visit", [0, 5, 12], [], [5, 12], 12, {"repeat_days_1_7": (1, 1), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
        ("current_incomplete_day_excluded", [0, 8], [], [0, 8], 7, {"repeat_days_1_7": (0, 1), "repeat_days_8_14": (0, 0), "repeat_days_15_30": (0, 0)}),
    ],
)
def test_retention_acceptance_cases(
    tmp_db, case_id, visit_days, example_days, own_days, last_complete_day, expected
):
    clock = FakeClock("2026-11-01")
    store = MetricsStore(db_path=tmp_db, hmac_secret="test-secret", now_fn=clock)

    for d in visit_days:
        clock.set_day_offset(d)
        store.record_event(TOKEN_A, "calculator_visit", "facebook", "cash_timing_v1")
    for d in example_days:
        clock.set_day_offset(d)
        store.record_event(TOKEN_A, "example_calculation_completed", "facebook", "cash_timing_v1")
    for d in own_days:
        clock.set_day_offset(d)
        store.record_event(TOKEN_A, "own_calculation_completed", "facebook", "cash_timing_v1")

    # Set server clock to last_complete_day + 1 so cutoff == last_complete_day
    clock.set_day_offset(last_complete_day + 1)
    rep = store.generate_reports()
    actual = {}
    for row in rep["retention"]:
        actual[row["window"]] = (row["returned_browsers"], row["eligible_browsers"])

    if not actual:
        actual = {w: (0, 0) for w in expected}

    assert actual == expected, f"Failed retention case: {case_id}"


def test_concurrent_requests_and_year_boundary_and_tombstone_expiry(tmp_db):
    clock = FakeClock("2026-12-30")
    store = MetricsStore(db_path=tmp_db, hmac_secret="test-secret", now_fn=clock)

    def send_parallel(_i: int) -> str:
        return store.record_event(TOKEN_A, "own_calculation_completed", "facebook", "cash_timing_v1")

    with ThreadPoolExecutor(max_workers=6) as pool:
        outcomes = list(pool.map(send_parallel, range(12)))

    assert outcomes.count("recorded") == 1
    assert outcomes.count("duplicate") == 11

    # Cross year boundary to 2027-01-03 (offset +4 days)
    clock.set_day_offset(4)
    assert clock().isoformat() == "2027-01-03"
    store.record_event(TOKEN_A, "own_calculation_completed", "direct_or_unknown", "none")

    clock.set_day_offset(8)
    rep = store.generate_reports()
    r_1_7 = [x for x in rep["retention"] if x["window"] == "repeat_days_1_7"][0]
    assert r_1_7["activation_cohort_day"] == "2026-12-30"
    assert r_1_7["returned_browsers"] == 1
    assert r_1_7["eligible_browsers"] == 1

    # Tombstone expiry after 90 days
    store.forget_browser(TOKEN_A)
    clock.set_day_offset(91)
    purged = store.cleanup_expired()
    assert purged >= 1


def test_frontend_engine_storage_and_telemetry_contracts():
    script_path = os.path.join(os.path.dirname(__file__), "test_frontend_contract.js")
    res = subprocess.run(["node", script_path], capture_output=True, text=True, check=False)
    assert res.returncode == 0, f"Frontend contract test failed:\n{res.stdout}\n{res.stderr}"


