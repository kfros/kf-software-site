# Payday Balance Calculator — PostHog Cloud EU Setup, Privacy & Dashboard Guide

This document defines the production setup, privacy controls, deletion workflow, and dashboard configuration for `/tools/payday-balance/` (`schema_version: 3`, `tool: payday_balance`).

---

## 1. PostHog Cloud EU Project & Privacy Settings

1. **Create a dedicated EU project:**
   - Sign in to PostHog Cloud EU (`https://eu.posthog.com`) and create a separate project dedicated to **Payday Balance Calculator** (do not mix with other products or environments).
2. **Configure Project Privacy & Data Storage (`Settings -> Project`):**
   - **Discard client IP data:** Enable **Discard client IP data** so PostHog drops client IP addresses before storage.
   - **GeoIP enrichment:** Disable the **GeoIP** transformation/app in **Data pipeline -> Transformations** so geographic properties (`$geoip_*`) are never added.
   - **Disable unused transformations & features:** Keep Session Replay, Autocapture, Heatmaps, Surveys, Error Tracking, and Web Vitals **disabled**. The calculator does not load `posthog-js` and sends events exclusively via direct `POST https://eu.i.posthog.com/i/v0/e/` with `$process_person_profile: false`.
3. **Retention Policy (Target: 90 Days):**
   - Check the project's **Data retention / Custom retention** setting in PostHog EU and set event retention to **90 days** if available on the active plan.
   - Note that provider-side scheduled cleanup runs asynchronously. If custom 90-day event retention is not available on the current plan tier, document the actual provider retention period in the privacy notice before enabling analytics in production; never equate browser `localStorage` expiry (90 days) with server-side event retention.

---

## 2. Public Token & Activation Gate

The calculator ships with `enabled: false` by default (`NEXT_PUBLIC_POSTHOG_PAYDAY_ENABLED` unset).

- **Environment variables (build-time only):**
  - `NEXT_PUBLIC_POSTHOG_PAYDAY_ENABLED=true`
  - `NEXT_PUBLIC_POSTHOG_PAYDAY_TOKEN=<phc_PUBLIC_PROJECT_TOKEN>` (use only the public project token starting with `phc_`; **never** use a personal API key starting with `phx_`).
  - Optional for a dedicated non-production test project only: `NEXT_PUBLIC_POSTHOG_PAYDAY_ALLOW_NON_PROD=true` (when omitted or `false`, `localhost`, preview, and staging origins automatically block event transmission so dev builds never pollute production).
- **Pre-enable verification checklist:**
  1. Verify in a test project that after clicking **Allow usage measurement**, `calculator_visit`, `own_calculation_completed`, and `example_calculation_completed` arrive at `https://eu.i.posthog.com/i/v0/e/` with HTTP 200 and no CSP or CORS errors.
  2. Inspect the stored event in PostHog EU **Activity / Explore** and confirm:
     - `$process_person_profile` is `false` (personless event).
     - Only the allowlisted properties (`schema_version: 3`, `tool: "payday_balance"`, `first_source`, `visit_source`, `campaign`, `content`) are stored, with no `$ip`, `$geoip_*`, full URL/referrer, or financial values.
  3. Verify the deletion workflow for a test `distinct_id` (see Section 3) before setting `NEXT_PUBLIC_POSTHOG_PAYDAY_ENABLED=true` for production export.

---

## 3. Stopping Measurement & Deleting Event History

1. **Client-side Stop (`Stop usage measurement`):**
   - Clicking **Stop usage measurement** in the calculator immediately aborts any in-flight request, deletes `cash_timing_metrics_browser_v3` (tracking UUID and `first_source`) from `localStorage`, and sets `cash_timing_metrics_consent_v3 = "rejected"` across open tabs.
   - For the remainder of the current page view, the stopped UUID remains visible in memory so the visitor can click **Copy usage reference** to include their UUID in a deletion request via `/privacy-policy/` (`contact@kf-software.com`).
2. **Server-side Event Deletion Workflow:**
   - Because events are ingested with `$process_person_profile: false` (personless events), deleting a person profile does not apply.
   - When a user submits their **Usage reference (`distinct_id` UUID)** to `contact@kf-software.com`, or when cleaning up operator smoke-test UUIDs before a campaign:
     - Exclude the `distinct_id` immediately from all insights/cohorts via a project filter (`distinct_id != '<UUID>'`), and
     - Submit a targeted event deletion request for `distinct_id = '<UUID>'` via PostHog EU project admin/support tools (or, if retiring the experiment entirely, delete the dedicated PostHog EU project).
   - Never embed a PostHog personal/secret API key (`phx_...`) in the frontend to automate deletion.

---

## 4. Dashboard Specification & Formulas

Create a dashboard named **Payday Balance Calculator — v3 Usage & Retention** in the dedicated PostHog EU project.

### Global Filters (applied to all insights)
- `properties.schema_version = 3`
- `properties.tool = 'payday_balance'`
- Project timezone set to **UTC** for day-boundary consistency.
- Exclude any known operator smoke-test `distinct_id` values (`distinct_id NOT IN (...)`).

### View 1: Acquisition (`calculator_visit`)
- **Event:** `calculator_visit`
- **Aggregation:** Unique users / `Count(DISTINCT distinct_id)`
- **Breakdowns:**
  1. By `properties.visit_source` (current session source)
  2. By `properties.first_source` (initial consented acquisition source)
  3. By `properties.campaign` and `properties.content` (`p01`, `p02`, `p03`, `none`)

### View 2: Activation (Visit → Own Calculation)
- **Series A:** `calculator_visit` — `Count(DISTINCT distinct_id)` (`visited_browsers`)
- **Series B:** `own_calculation_completed` — `Count(DISTINCT distinct_id)` (`activated_browsers`)
- **Formula:** `B / A` (displayed alongside both absolute counts `A` and `B`).

### View 3: Calculations (`own` vs `example`)
- **Series A:** `own_calculation_completed` — Total count (explicit valid own submits) AND `Count(DISTINCT distinct_id)`.
- **Series B:** `example_calculation_completed` — Total count AND `Count(DISTINCT distinct_id)` (tracked separately; never counted toward activation or retention).

### View 4: Useful Return (Later UTC Day Own Calculation)
- **Definition:** A browser (`distinct_id`) whose earliest `own_calculation_completed` UTC date is `activation_day = toDate(min(timestamp))` and that has at least one `own_calculation_completed` event with `toDate(timestamp) > activation_day`.
- Same-day repeat submits and later `calculator_visit` events without `own_calculation_completed` do **not** count as useful returns.

### View 5: Cohort Retention Windows (Days 1–7, 8–14, 15–30)
Use a HogQL insight so only mature cohorts (whose full window has elapsed by the last complete UTC day `yesterday()`) are included in each window's denominator:

```sql
WITH
  yesterday() AS cutoff_day,
  browser_own_days AS (
    SELECT
      distinct_id,
      any(properties.first_source) AS first_source,
      min(toDate(timestamp)) AS activation_day,
      groupUniqArray(toDate(timestamp)) AS own_days
    FROM events
    WHERE event = 'own_calculation_completed'
      AND properties.schema_version = 3
      AND properties.tool = 'payday_balance'
      AND toDate(timestamp) <= cutoff_day
    GROUP BY distinct_id
  )
SELECT
  activation_day,
  first_source,
  countIf(dateDiff('day', activation_day, cutoff_day) >= 7) AS eligible_1_7,
  countIf(
    dateDiff('day', activation_day, cutoff_day) >= 7
    AND arrayExists(d -> dateDiff('day', activation_day, d) BETWEEN 1 AND 7, own_days)
  ) AS returned_1_7,
  countIf(dateDiff('day', activation_day, cutoff_day) >= 14) AS eligible_8_14,
  countIf(
    dateDiff('day', activation_day, cutoff_day) >= 14
    AND arrayExists(d -> dateDiff('day', activation_day, d) BETWEEN 8 AND 14, own_days)
  ) AS returned_8_14,
  countIf(dateDiff('day', activation_day, cutoff_day) >= 30) AS eligible_15_30,
  countIf(
    dateDiff('day', activation_day, cutoff_day) >= 30
    AND arrayExists(d -> dateDiff('day', activation_day, d) BETWEEN 15 AND 30, own_days)
  ) AS returned_15_30
FROM browser_own_days
GROUP BY activation_day, first_source
ORDER BY activation_day ASC, first_source ASC
```
