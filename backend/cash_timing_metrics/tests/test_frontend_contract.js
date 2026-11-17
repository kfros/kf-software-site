"use strict";

const assert = require("assert");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "../../..");
const Engine = require(path.join(repoRoot, "public/tools/payday-balance/engine.js"));
const Telemetry = require(path.join(repoRoot, "public/tools/payday-balance/telemetry.js"));

const DEFAULTS = {
  currency: "USD",
  asOf: "2026-11-14",
  nextPayday: "2026-11-18",
  spendingAllowance: "0",
  buffer: "200"
};

// 1. All 7 numeric_acceptance_cases
const CASES = [
  {
    id: "original_example",
    input: {
      ...DEFAULTS,
      balance: "2200",
      bills: [
        { amount: "315", dueDate: "2026-11-14", alreadyDeducted: false },
        { amount: "900", dueDate: "2026-11-16", alreadyDeducted: false }
      ]
    },
    expected: { transfer: 78500, shortfall: 0 }
  },
  {
    id: "payment_reflected_once",
    input: {
      ...DEFAULTS,
      balance: "1885",
      bills: [
        { amount: "315", dueDate: "2026-11-14", alreadyDeducted: true },
        { amount: "900", dueDate: "2026-11-16", alreadyDeducted: false }
      ]
    },
    expected: { transfer: 78500, shortfall: 0 }
  },
  {
    id: "shortfall",
    input: {
      ...DEFAULTS,
      balance: "1200",
      bills: [
        { amount: "315", dueDate: "2026-11-14", alreadyDeducted: false },
        { amount: "900", dueDate: "2026-11-16", alreadyDeducted: false }
      ]
    },
    expected: { transfer: 0, shortfall: 21500 }
  },
  {
    id: "everyday_spending",
    input: {
      ...DEFAULTS,
      balance: "2200",
      spendingAllowance: "300",
      bills: [
        { amount: "315", dueDate: "2026-11-14", alreadyDeducted: false },
        { amount: "900", dueDate: "2026-11-16", alreadyDeducted: false }
      ]
    },
    expected: { transfer: 48500, shortfall: 0 }
  },
  {
    id: "date_boundaries",
    input: {
      ...DEFAULTS,
      balance: "1000",
      bills: [
        { amount: "100", dueDate: "2026-11-10", alreadyDeducted: false },
        { amount: "250", dueDate: "2026-11-18", alreadyDeducted: false },
        { amount: "400", dueDate: "2026-11-19", alreadyDeducted: false }
      ]
    },
    expected: { transfer: 45000, shortfall: 0 }
  },
  {
    id: "decimal_precision",
    input: {
      ...DEFAULTS,
      balance: "100.30",
      buffer: "0",
      bills: [
        { amount: "0.10", dueDate: "2026-11-14", alreadyDeducted: false },
        { amount: "0.20", dueDate: "2026-11-14", alreadyDeducted: false }
      ]
    },
    expected: { transfer: 10000, shortfall: 0 }
  },
  {
    id: "negative_balance",
    input: {
      ...DEFAULTS,
      balance: "-50",
      buffer: "0",
      bills: []
    },
    expected: { transfer: 0, shortfall: 5000 }
  }
];

for (const c of CASES) {
  const res = Engine.calculatePaydayBalance(c.input);
  assert.strictEqual(res.ok, true, `Case ${c.id} failed`);
  assert.strictEqual(res.estimatedTransferMinor, c.expected.transfer, `${c.id} transfer mismatch`);
  assert.strictEqual(res.shortfallToPlanMinor, c.expected.shortfall, `${c.id} shortfall mismatch`);
}

// 2. Edge cases: comma decimal, same-day payday, leap dates, year boundary, invalid inputs
assert.strictEqual(Engine.parseMoneyToMinor("1234,56").minor, 123456);
assert.strictEqual(Engine.parseMoneyToMinor("1,234.56").ok, false);
assert.strictEqual(Engine.parseMoneyToMinor("1.234,56").ok, false);
assert.strictEqual(Engine.parseMoneyToMinor("1e4").ok, false);
assert.strictEqual(Engine.parseMoneyToMinor("Infinity").ok, false);
assert.strictEqual(Engine.parseMoneyToMinor("NaN").ok, false);
assert.strictEqual(Engine.parseMoneyToMinor("12.345").ok, false);
assert.strictEqual(Engine.parseMoneyToMinor("1000000.01").ok, false);
assert.strictEqual(Engine.parseCalendarDate("2024-02-29") !== null, true);
assert.strictEqual(Engine.parseCalendarDate("2026-02-29"), null);
assert.strictEqual(Engine.parseCalendarDate("2026-04-31"), null);
assert.strictEqual(
  Engine.calculatePaydayBalance({ ...DEFAULTS, balance: "500", nextPayday: "2026-11-14", bills: [] }).ok,
  true
);
assert.strictEqual(
  Engine.calculatePaydayBalance({ ...DEFAULTS, balance: "500", nextPayday: "2026-11-13", bills: [] }).ok,
  false
);
assert.strictEqual(
  Engine.calculatePaydayBalance({
    ...DEFAULTS,
    asOf: "2026-12-30",
    nextPayday: "2027-01-04",
    balance: "800",
    bills: [{ amount: "200", dueDate: "2026-12-31", alreadyDeducted: false }]
  }).estimatedTransferMinor,
  40000
);

// 3. Attribution & spoofed referrers
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?src=facebook&utm_campaign=cash_timing_v1", "", "kf-software.com"),
  { source: "facebook", campaign: "cash_timing_v1" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?src=unknown_src&utm_source=x&utm_campaign=cash_timing_v1", "", "kf-software.com"),
  { source: "x", campaign: "cash_timing_v1" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?utm_source=unknown_vendor&utm_campaign=other", "https://l.facebook.com/l.php?u=1", "kf-software.com"),
  { source: "facebook", campaign: "none" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("", "https://evilfacebook.com/", "kf-software.com"),
  { source: "other_referral", campaign: "none" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("", "https://kf-software.com/", "kf-software.com"),
  { source: "direct_or_unknown", campaign: "none" }
);

function mkStorage(throwOnSet = false) {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => {
      if (throwOnSet) throw new Error("QuotaExceededError");
      map.set(k, String(v));
    },
    removeItem: (k) => map.delete(k),
    get length() { return map.size; },
    key: (i) => Array.from(map.keys())[i] || null,
    dump: () => Object.fromEntries(map.entries())
  };
}

// 4. Full UI / DOM + storage + sentinel values + separation of Clear all vs Delete history
function makeDomEnv(ls, ss, requests, opts = {}) {
  const elements = {};
  const listeners = {};
  const makeEl = (id = "") => {
    const classes = new Set(id === "result-panel" || id === "stale-warning" || id === "example-mode-banner" || id === "consent-banner" ? ["hidden"] : []);
    const attrs = {};
    const elListeners = {};
    const children = [];
    return {
      id,
      value: id === "currency" ? "USD" : (id === "spending-allowance" || id === "buffer" ? "0" : ""),
      checked: false,
      disabled: false,
      textContent: "",
      innerHTML: "",
      className: "",
      children,
      classList: {
        add: (c) => classes.add(c),
        remove: (c) => classes.delete(c),
        contains: (c) => classes.has(c)
      },
      setAttribute: (k, v) => { attrs[k] = String(v); },
      getAttribute: (k) => attrs[k] || null,
      removeAttribute: (k) => { delete attrs[k]; },
      addEventListener: (ev, fn) => { elListeners[ev] = fn; },
      trigger: (ev, arg) => { if (elListeners[ev]) elListeners[ev](arg || { preventDefault: () => {} }); },
      appendChild: (c) => { children.push(c); },
      focus: () => { elements.__focused = id; }
    };
  };

  const ids = [
    "calc-form", "today-badge", "example-mode-banner", "currency", "balance", "next-payday",
    "spending-allowance", "buffer", "bills-container", "bills-empty-msg", "bills-limit-error",
    "add-bill-btn", "load-example-btn", "clear-all-btn", "remember-inputs", "storage-warning",
    "result-panel", "stale-warning", "result-hero", "result-label", "result-amount", "result-meta",
    "result-qualification", "shortfall-note", "breakdown-list", "result-bills-body",
    "result-bills-wrap", "result-announcement", "consent-banner", "allow-metrics-btn",
    "decline-metrics-btn", "privacy-status-text", "stop-metrics-btn", "delete-history-btn",
    "privacy-feedback", "err-currency", "err-balance", "err-next-payday",
    "err-spending-allowance", "err-buffer"
  ];
  ids.forEach((id) => { elements[id] = makeEl(id); });

  const win = {
    KF_PAYDAY_METRICS_CONFIG: {
      enabled: opts.metricsEnabled !== false,
      eventsEndpoint: "https://api.kf-software.com/cash-timing/events",
      forgetEndpoint: "https://api.kf-software.com/cash-timing/forget",
      timeoutMs: 1000
    },
    PaydayBalanceEngine: Engine,
    PaydayBalanceTelemetry: Telemetry,
    localStorage: ls,
    sessionStorage: ss,
    location: {
      search: opts.search || "?src=facebook&utm_campaign=cash_timing_v1",
      hash: "",
      pathname: "/tools/payday-balance/",
      hostname: "kf-software.com"
    },
    history: {
      replaceState: (_s, _t, u) => { win.location.search = ""; win.location.replacedTo = u; }
    },
    addEventListener: (ev, fn) => { listeners[ev] = fn; },
    removeEventListener: () => {},
    triggerStorage: (e) => { if (listeners.storage) listeners.storage(e); }
  };

  const doc = {
    referrer: opts.referrer || "",
    title: "Payday Balance Calculator — Plan Bills Before Payday | KF Software",
    getElementById: (id) => elements[id] || (elements[id] = makeEl(id)),
    createElement: (tag) => makeEl(tag)
  };

  const context = vm.createContext({
    window: win,
    document: doc,
    navigator: { globalPrivacyControl: Boolean(opts.gpc), doNotTrack: opts.dnt || "0" },
    crypto: { getRandomValues: (arr) => crypto.randomFillSync(arr) },
    fetch: async (url, fetchOpts) => {
      if (opts.failFetch) throw new Error("Network blocked");
      requests.push({ url, opts: fetchOpts, body: JSON.parse(fetchOpts.body) });
      return { ok: true, status: 204 };
    },
    AbortController: globalThis.AbortController,
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
    Date,
    Math,
    Number,
    String,
    Boolean,
    Array,
    Object,
    JSON,
    Promise,
    RegExp,
    URL,
    URLSearchParams
  });
  win.window = win;
  win.document = doc;
  win.navigator = context.navigator;
  win.crypto = context.crypto;
  win.fetch = context.fetch;
  context.globalThis = win;

  const engineCode = fs.readFileSync(path.join(repoRoot, "public/tools/payday-balance/engine.js"), "utf8");
  const telemetryCode = fs.readFileSync(path.join(repoRoot, "public/tools/payday-balance/telemetry.js"), "utf8");
  const appCode = fs.readFileSync(path.join(repoRoot, "public/tools/payday-balance/app.js"), "utf8");
  vm.runInContext(engineCode, context);
  vm.runInContext(telemetryCode, context);
  vm.runInContext(appCode, context);
  return { elements, win, doc };
}

async function runDomAndPrivacyTests() {
  const ls = mkStorage();
  const ss = mkStorage();
  const requests = [];

  // Pre-existing Clarity consent must not activate calculator measurement
  ls.setItem("kf_analytics_consent", "accepted");

  const { elements, win, doc } = makeDomEnv(ls, ss, requests);

  // Financial storage empty by default; no analytics token before consent
  assert.strictEqual(ls.getItem("cash_timing_saved_inputs_v2"), null);
  assert.strictEqual(ls.getItem(Telemetry.TOKEN_KEY), null);
  assert.strictEqual(win.location.replacedTo, "/tools/payday-balance/");

  // Enter sentinel financial values before consent & calculate
  const futurePayday = Engine.getTodayLocalIso(new Date(Date.now() + 5 * 86400000));
  elements["currency"].value = "EUR";
  elements["balance"].value = "987654.32";
  elements["next-payday"].value = futurePayday;
  elements["spending-allowance"].value = "111.22";
  elements["buffer"].value = "333.44";
  elements["add-bill-btn"].trigger("click");
  // Populate bill row
  const billRow = elements["bills-container"].children[0];
  billRow.children[0].children[1].value = "SENTINEL_BILL_LABEL_998877";
  billRow.children[0].children[1].trigger("input");
  billRow.children[1].children[1].value = "456.78";
  billRow.children[1].children[1].trigger("input");
  billRow.children[2].children[1].value = futurePayday;
  billRow.children[2].children[1].trigger("input");

  elements["calc-form"].trigger("submit");
  assert.strictEqual(elements["result-panel"].classList.contains("hidden"), false);
  assert.strictEqual(requests.length, 0);
  // Still not saved in localStorage because Remember checkbox is unchecked
  assert.strictEqual(ls.getItem("cash_timing_saved_inputs_v2"), null);

  // Opt in to Remember my inputs -> saves under cash_timing_saved_inputs_v2, still 0 analytics events/tokens
  elements["remember-inputs"].checked = true;
  elements["remember-inputs"].trigger("change");
  assert.ok(ls.getItem("cash_timing_saved_inputs_v2").includes("SENTINEL_BILL_LABEL_998877"));
  assert.strictEqual(ls.getItem(Telemetry.TOKEN_KEY), null);
  assert.strictEqual(requests.length, 0);

  // Now grant v2 usage measurement consent -> sends calculator_visit
  elements["allow-metrics-btn"].trigger("click");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests.length, 1);
  assert.strictEqual(requests[0].body.event, "calculator_visit");

  // Edit balance -> marks result outdated
  elements["balance"].value = "987600.00";
  elements["balance"].trigger("input");
  assert.strictEqual(elements["stale-warning"].classList.contains("hidden"), false);

  // Recalculate -> sends own_calculation_completed
  elements["calc-form"].trigger("submit");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests.length, 2);
  assert.strictEqual(requests[1].body.event, "own_calculation_completed");

  // Delete usage history -> removes telemetry token, leaves saved financial inputs intact!
  elements["delete-history-btn"].trigger("click");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests.length, 3);
  assert.strictEqual(requests[2].url, "https://api.kf-software.com/cash-timing/forget");
  assert.strictEqual(ls.getItem(Telemetry.TOKEN_KEY), null);
  assert.ok(ls.getItem("cash_timing_saved_inputs_v2").includes("SENTINEL_BILL_LABEL_998877"));

  // Clear all -> clears financial inputs & cash_timing_saved_inputs_v2, leaves privacy consent declined
  elements["clear-all-btn"].trigger("click");
  assert.strictEqual(ls.getItem("cash_timing_saved_inputs_v2"), null);
  assert.strictEqual(ls.getItem(Telemetry.CONSENT_KEY), "declined");

  // Verify NO sentinel value ever appeared in any network request or title
  const reqDump = JSON.stringify({ requests, title: doc.title });
  for (const s of ["SENTINEL_BILL_LABEL_998877", "987654", "987600", "456.78", "111.22", "333.44", "EUR", futurePayday]) {
    assert.strictEqual(reqDump.includes(s), false, `Sentinel leaked into network/metadata: ${s}`);
  }

  // Verify storage failure (QuotaExceededError) does not prevent calculation
  const throwingLs = mkStorage(true);
  const env2 = makeDomEnv(throwingLs, ss, []);
  env2.elements["balance"].value = "1000";
  env2.elements["next-payday"].value = futurePayday;
  env2.elements["remember-inputs"].checked = true;
  env2.elements["calc-form"].trigger("submit");
  assert.strictEqual(env2.elements["result-panel"].classList.contains("hidden"), false);
  assert.strictEqual(env2.elements["result-amount"].textContent, "$1,000.00");
  assert.strictEqual(env2.elements["result-hero"].classList.contains("is-positive"), true);
  assert.strictEqual(env2.elements["result-hero"].classList.contains("is-shortfall"), false);
  assert.strictEqual(env2.elements["result-hero"].classList.contains("is-zero"), false);

  // Verify palette alignment scenarios: positive (485) => shortfall (115) => zero (0) => positive (485)
  const env3 = makeDomEnv(mkStorage(), mkStorage(), []);
  env3.elements["load-example-btn"].trigger("click");
  env3.elements["spending-allowance"].value = "300.00";
  env3.elements["spending-allowance"].trigger("input");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$485.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), true);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), false);

  // Shortfall: balance 1600 => shortfall $115.00
  env3.elements["balance"].value = "1600.00";
  env3.elements["balance"].trigger("input");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$115.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), true);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), false);

  // Zero without shortfall: balance 1715 => $0.00 neutral
  env3.elements["balance"].value = "1715.00";
  env3.elements["balance"].trigger("input");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$0.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), true);

  // After 315 clears: balance 1885 and first bill marked alreadyDeducted => $485.00 positive
  env3.elements["balance"].value = "1885.00";
  env3.elements["balance"].trigger("input");
  const firstBillRow = env3.elements["bills-container"].children[0];
  const dedCheckbox = firstBillRow.children[4].children[0].children[0];
  dedCheckbox.checked = true;
  dedCheckbox.trigger("change");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$485.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), true);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), false);
}

runDomAndPrivacyTests().then(() => {
  console.log("All frontend contract tests passed!");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
