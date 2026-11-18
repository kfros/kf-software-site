"use client";

import React, { useEffect } from "react";
import Engine from "../../../../public/tools/payday-balance/engine.js";
import Telemetry from "../../../../public/tools/payday-balance/telemetry.js";
import AppController from "../../../../public/tools/payday-balance/app.js";

const BUILD_METRICS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_POSTHOG_PAYDAY_ENABLED === "true",
  publicProjectToken: process.env.NEXT_PUBLIC_POSTHOG_PAYDAY_TOKEN || "",
  allowNonProductionOrigin:
    process.env.NEXT_PUBLIC_POSTHOG_PAYDAY_ALLOW_NON_PROD === "true",
};

export function PaydayBalanceCalculatorClient() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const win = window as unknown as Record<string, unknown>;
    win.__KF_PAYDAY_AUTO_MOUNT__ = false;
    win.PaydayBalanceEngine = Engine;
    win.PaydayBalanceTelemetry = Telemetry;
    win.KF_PAYDAY_METRICS_CONFIG = {
      ...BUILD_METRICS_CONFIG,
      ...(typeof win.KF_PAYDAY_METRICS_CONFIG === "object" && win.KF_PAYDAY_METRICS_CONFIG
        ? (win.KF_PAYDAY_METRICS_CONFIG as Record<string, unknown>)
        : {}),
    };

    const unmount = AppController.mountPaydayCalculator({
      window,
      document,
      Engine,
      Telemetry,
    });

    return () => {
      if (typeof unmount === "function") {
        unmount();
      }
    };
  }, []);

  return (
    <>
      <section
        className="consent-card hidden"
        id="consent-banner"
        aria-labelledby="consent-heading"
      >
        <h2 id="consent-heading">Optional usage measurement (off by default)</h2>
        <p className="privacy-status">
          Optional usage measurement helps us see which links bring visitors and
          whether the same browser uses the calculator again. With your
          permission, we send a random browser ID, event time and a broad source
          label to PostHog EU. We do not send your balances, bills, dates,
          spending, results or form contents. No session recordings. You can
          stop at any time.
        </p>
        <div className="toolbar">
          <button
            type="button"
            className="btn btn-primary btn-small"
            id="allow-metrics-btn"
          >
            Allow usage measurement
          </button>
          <button
            type="button"
            className="btn btn-small"
            id="decline-metrics-btn"
          >
            Not now
          </button>
        </div>
      </section>

      <section className="card" aria-labelledby="calc-heading">
        <div className="card-header">
          <h2 id="calc-heading">Your figures (one account, one currency)</h2>
          <span className="badge" id="today-badge">
            Today: local date
          </span>
        </div>

        <div
          className="mode-banner hidden"
          id="example-mode-banner"
          role="status"
        >
          Example mode: sample fictional figures are loaded. Editing any field or
          clicking Clear all switches to your own figures.
        </div>

        <form id="calc-form" noValidate>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                defaultValue="USD"
                aria-describedby="err-currency"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PLN">PLN</option>
              </select>
              <span className="field-hint">
                One currency per calculation; no exchange rates applied.
              </span>
              <span className="field-error" id="err-currency" role="alert" />
            </div>

            <div className="field">
              <label htmlFor="balance">Current account balance</label>
              <input
                id="balance"
                name="balance"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="e.g. 1234.56 or -50.00"
                aria-describedby="hint-balance err-balance"
              />
              <span className="field-hint" id="hint-balance">
                Accepts 1234.56 or 1234,56 without thousands separators.
                Negative balances allowed.
              </span>
              <span className="field-error" id="err-balance" role="alert" />
            </div>

            <div className="field">
              <label htmlFor="next-payday">Next expected payday</label>
              <input
                id="next-payday"
                name="next-payday"
                type="date"
                aria-describedby="hint-payday err-next-payday"
              />
              <span className="field-hint" id="hint-payday">
                Today or a future date. Expected income is not counted as money
                already available.
              </span>
              <span className="field-error" id="err-next-payday" role="alert" />
            </div>

            <div className="field">
              <label htmlFor="spending-allowance">
                Other spending until payday
              </label>
              <input
                id="spending-allowance"
                name="spending-allowance"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                defaultValue="0"
                placeholder="e.g. 150.00"
                aria-describedby="hint-spending err-spending-allowance"
              />
              <span className="field-hint" id="hint-spending">
                Total planned groceries, transport, and other spending not
                listed as bills (0 allowed).
              </span>
              <span
                className="field-error"
                id="err-spending-allowance"
                role="alert"
              />
            </div>

            <div className="field">
              <label htmlFor="buffer">Amount to leave untouched</label>
              <input
                id="buffer"
                name="buffer"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                defaultValue="0"
                placeholder="e.g. 200.00"
                aria-describedby="hint-buffer err-buffer"
              />
              <span className="field-hint" id="hint-buffer">
                Additional reserve separate from bills and planned spending (0
                allowed).
              </span>
              <span className="field-error" id="err-buffer" role="alert" />
            </div>
          </div>

          <div className="bills-section">
            <div className="card-header">
              <h3>Bills and pending transactions</h3>
              <button
                type="button"
                className="btn btn-secondary btn-small"
                id="add-bill-btn"
              >
                Add bill
              </button>
            </div>
            <p className="field-hint">
              Include unpaid bills and pending transactions you need to cover.
              If a pending transaction has already reduced the balance you
              entered, mark it as already deducted so it is not counted twice.
              Bank balance labels differ: check what your displayed balance
              includes. Do not list the same expense again under other spending.
            </p>
            <p className="field-hint" id="bills-empty-msg">
              No bills listed. Continue only if you have no additional bills to
              cover in this period.
            </p>
            <span className="field-error" id="bills-limit-error" role="alert" />
            <div className="bills-list" id="bills-container" />
          </div>

          <div className="actions-row">
            <button
              type="submit"
              className="btn btn-primary"
              id="calculate-btn"
            >
              Calculate
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              id="load-example-btn"
            >
              Load example
            </button>
            <button
              type="button"
              className="btn btn-danger"
              id="clear-all-btn"
            >
              Clear all
            </button>
          </div>

          <div className="persistence-box">
            <label className="checkbox-label">
              <input type="checkbox" id="remember-inputs" />
              <span>
                <strong>Remember my inputs on this device</strong> (optional,
                off by default). Saved locally in unencrypted browser storage (
                <code>localStorage</code>); anyone using this browser profile
                may access it. Clear all removes saved financial inputs only.
              </span>
            </label>
            <p className="field-error" id="storage-warning" role="status" />
          </div>
        </form>
      </section>

      <section
        className="card hidden"
        id="result-panel"
        aria-labelledby="result-heading"
      >
        <div className="card-header">
          <h2 id="result-heading">Result</h2>
        </div>

        <div
          className="stale-warning hidden"
          id="stale-warning"
          role="status"
        >
          Inputs have changed since your last calculation. Click Calculate to
          update this result.
        </div>

        <div className="result-hero" id="result-hero">
          <p className="result-label" id="result-label">
            Estimated amount you could move
          </p>
          <p className="result-amount" id="result-amount">
            $0.00
          </p>
          <p className="result-meta" id="result-meta" />
          <p className="result-meta" id="result-qualification" />
          <p className="result-meta hidden" id="shortfall-note" />
        </div>

        <div
          className="field-hint"
          id="result-announcement"
          aria-live="polite"
        />

        <h3>Breakdown</h3>
        <ul className="breakdown-list" id="breakdown-list" />

        <div className="table-wrap hidden" id="result-bills-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Due date</th>
                <th scope="col">Bill</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody id="result-bills-body" />
          </table>
        </div>

        <ul className="limitations-list">
          <li>
            Unlisted expenses, interest, fees and income delays can change the
            result.
          </li>
          <li>
            This covers the period before the next paycheck, not your whole
            monthly budget.
          </li>
          <li>No bank verification or guarantee that a transfer is safe.</li>
        </ul>
      </section>

      <section
        className="card"
        id="privacy-settings"
        aria-labelledby="privacy-heading"
      >
        <div className="card-header">
          <h2 id="privacy-heading">Usage privacy &amp; data notice</h2>
        </div>
        <div className="prose">
          <p>
            Your financial figures are calculated in your browser and are never
            sent to us or any analytics service. They are saved on this device
            only if you check <strong>Remember my inputs on this device</strong>
            .
          </p>
          <p>
            Optional usage measurement helps us see which links bring visitors
            and whether the same browser uses the calculator again. With your
            permission, we send a random browser ID (stored locally for up to 90
            days), event time, and a broad source label to{" "}
            <strong>PostHog Cloud EU</strong> (with client IP discard enabled,
            GeoIP disabled, and person profiles disabled). Direct HTTPS requests
            still expose standard network connection metadata such as your IP
            address to hosting and the analytics endpoint in transit. Event
            retention in PostHog EU is configured for a target of 90 days
            (subject to the project plan and provider cleanup schedule).
          </p>
        </div>
        <p className="privacy-status" id="privacy-status-text" />
        <div className="reference-box hidden" id="usage-reference-wrap">
          <span>
            Usage reference (browser UUID):{" "}
            <code className="reference-code" id="usage-reference-code" />
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-small"
            id="copy-reference-btn"
          >
            Copy usage reference
          </button>
        </div>
        <div className="toolbar">
          <button
            type="button"
            className="btn btn-small"
            id="stop-metrics-btn"
          >
            Stop usage measurement
          </button>
        </div>
        <p className="field-hint" style={{ marginTop: "0.5rem" }}>
          Stopping usage measurement immediately deletes your local tracking ID
          and stops new events, but does not automatically erase events already
          received by PostHog EU. To request deletion of previously received
          events, copy your usage reference above before closing this tab and
          contact us via our <a href="/privacy-policy/">Privacy Policy</a>.
        </p>
        <p
          className="privacy-status"
          id="privacy-feedback"
          role="status"
          aria-live="polite"
        />
      </section>
    </>
  );
}
