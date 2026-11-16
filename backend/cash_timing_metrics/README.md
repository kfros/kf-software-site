# Cash-Timing v2 Pseudonymous Usage Receiver

Minimal Flask 3.1.3 WSGI service for `https://api.kf-software.com/cash-timing/events` and `/cash-timing/forget`.
Completely isolated from `backend/kitchen_exhaust/` and from the static Next.js frontend.

## Privacy & Retention Design

- **No raw tokens:** `browser_token` is hashed with `HMAC-SHA256(token, SERVER_HMAC_SECRET)` before storage.
- **No financial data or PII:** Rejects unknown keys and payloads > 512 bytes. Never stores IP addresses, user agents, referrers, or precise timestamps.
- **Hard 90-day expiry:** Each `browser_summary` row expires 90 UTC days after `first_observed_day_utc` (never extended by activity). Expired rows and tombstones are purged on write and via daily CLI `cleanup`.
- **Backups:** Exclude `METRICS_DB_PATH` (and its `-wal`/`-shm` sidecars) from long-lived host backups so deleted or expired histories cannot reappear after a restore.
- **Web server logs:** Disable or minimize access-log query/body capture for `/cash-timing/*` on Hostido/Apache/LiteSpeed.

## Environment Variables

See `.env.example`:
- `METRICS_DB_PATH`: Path to the SQLite file outside the web root.
- `SERVER_HMAC_SECRET`: High-entropy random secret kept outside the repository and frontend.
- `ALLOWED_ORIGINS`: Comma-separated exact origins (production: `https://kf-software.com`). Never `*`.
- `RATE_LIMIT_PER_MINUTE`: In-memory per-process request cap (default `600`).

## Operator CLI (`report_cli.py`)

Run with `SERVER_HMAC_SECRET` and `METRICS_DB_PATH` set in the environment:

```bash
# Daily cleanup of expired rows and tombstones (recommended via cron)
python report_cli.py cleanup

# Export private aggregate acquisition, activity, and retention CSV report
python report_cli.py report --format csv

# Delete a known smoke-test token before launching a campaign
python report_cli.py forget-token <64-hex-token>
```

## Disabling Measurement Without Disabling the Calculator

In `public/tools/payday-balance/config.js`, set `enabled: false` and re-export/upload the static site. The calculator continues to work 100% locally in the browser with no measurement requests.
