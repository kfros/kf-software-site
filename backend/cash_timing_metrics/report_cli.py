"""Operator-only CLI for cleanup, smoke-test token deletion, and private aggregate reports."""

from __future__ import annotations

import argparse
import csv
import io
import json
import os
import sys

from store import MetricsStore


def _get_store() -> MetricsStore:
    db_path = os.environ.get(
        "METRICS_DB_PATH",
        os.path.join(os.path.dirname(__file__), "cash_timing_metrics.sqlite3"),
    )
    secret = os.environ.get("SERVER_HMAC_SECRET", "")
    if not secret:
        print("Error: SERVER_HMAC_SECRET environment variable is required.", file=sys.stderr)
        sys.exit(2)
    return MetricsStore(db_path=db_path, hmac_secret=secret)


def _format_csv_section(title: str, rows: list[dict]) -> str:
    buf = io.StringIO()
    buf.write(f"# {title}\n")
    if not rows:
        buf.write("# (no rows)\n")
        return buf.getvalue()
    writer = csv.DictWriter(buf, fieldnames=list(rows[0].keys()), lineterminator="\n")
    writer.writeheader()
    for row in rows:
        out_row = dict(row)
        if "return_percentage" in out_row and out_row["return_percentage"] is None:
            out_row["return_percentage"] = "Pending"
        writer.writerow(out_row)
    return buf.getvalue()


def main() -> int:
    parser = argparse.ArgumentParser(description="Cash-timing v2 metrics operator CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("cleanup", help="Purge expired browser summaries, daily events, and tombstones")

    rep = sub.add_parser("report", help="Export private aggregate acquisition, activity, and retention reports")
    rep.add_argument("--format", choices=["json", "csv"], default="csv")
    rep.add_argument("--cutoff", default=None, help="Override last complete UTC day (YYYY-MM-DD)")

    fgt = sub.add_parser("forget-token", help="Delete a known smoke-test browser token before campaign launch")
    fgt.add_argument("token", help="64-char hex browser_token")

    args = parser.parse_args()
    store = _get_store()

    if args.cmd == "cleanup":
        removed = store.cleanup_expired()
        print(f"Purged {removed} expired rows.")
        return 0

    if args.cmd == "forget-token":
        store.forget_browser(args.token)
        print("Token history deleted and tombstoned.")
        return 0

    if args.cmd == "report":
        data = store.generate_reports(last_complete_day_utc=args.cutoff)
        if args.format == "json":
            print(json.dumps(data, indent=2))
        else:
            print(f"# cutoff_day_utc: {data['cutoff_day_utc']}")
            print(f"# note: {data['coverage_note']}")
            print(_format_csv_section("acquisition", data["acquisition"]))
            print(_format_csv_section("activity", data["activity"]))
            print(_format_csv_section("retention", data["retention"]))
        return 0

    return 1


if __name__ == "__main__":
    sys.exit(main())
