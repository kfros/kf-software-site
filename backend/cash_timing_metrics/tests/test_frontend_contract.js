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

// 1. All 7 numeric_acceptance_cases (preserved without weakening)
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

// 3. v3 Attribution: priority (src -> utm_source -> referrer -> direct_or_unknown), aliases, spoofed hosts, pin content
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?src=pinterest&campaign=cash_timing_v1&content=p02", "", "kf-software.com"),
  { visit_source: "pinterest", campaign: "cash_timing_v1", content: "p02" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?src=twitter&utm_campaign=cash_timing_v1&utm_content=p01", "", "kf-software.com"),
  { visit_source: "x", campaign: "cash_timing_v1", content: "p01" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?src=unknown_src&utm_source=threads.com&utm_content=p03", "", "kf-software.com"),
  { visit_source: "threads", campaign: "none", content: "p03" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("?utm_source=unknown_vendor&utm_campaign=other&content=invalid", "https://www.pinterest.co.uk/pin/123/", "kf-software.com"),
  { visit_source: "pinterest", campaign: "none", content: "none" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("", "https://www.pinterest.de/pin/456/", "kf-software.com"),
  { visit_source: "pinterest", campaign: "none", content: "none" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("", "https://facebook.com.attacker.example/path", "kf-software.com"),
  { visit_source: "other_referral", campaign: "none", content: "none" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("", "https://kf-software.com/", "kf-software.com"),
  { visit_source: "site_internal", campaign: "none", content: "none" }
);
assert.deepStrictEqual(
  Telemetry.classifyAttribution("", "", "kf-software.com"),
  { visit_source: "direct_or_unknown", campaign: "none", content: "none" }
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

// 4. Full DOM + v3 PostHog EU Telemetry + StrictMode mount/unmount + Sentinel checks
function makeDomEnv(ls, ss, requests, opts = {}) {
  const elements = {};
  const listeners = {};
  const makeEl = (id = "") => {
    const classes = new Set(
      id === "result-panel" ||
        id === "stale-warning" ||
        id === "example-mode-banner" ||
        id === "consent-banner" ||
        id === "usage-reference-wrap"
        ? ["hidden"]
        : []
    );
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
      addEventListener: (ev, fn) => {
        if (!elListeners[ev]) elListeners[ev] = new Set();
        elListeners[ev].add(fn);
      },
      removeEventListener: (ev, fn) => {
        if (elListeners[ev]) elListeners[ev].delete(fn);
      },
      trigger: (ev, arg) => {
        if (elListeners[ev]) {
          Array.from(elListeners[ev]).forEach((fn) => fn(arg || { preventDefault: () => { } }));
        }
      },
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
    "decline-metrics-btn", "privacy-status-text", "stop-metrics-btn", "copy-reference-btn",
    "usage-reference-wrap", "usage-reference-code", "privacy-feedback",
    "err-currency", "err-balance", "err-next-payday", "err-spending-allowance", "err-buffer"
  ];
  ids.forEach((id) => { elements[id] = makeEl(id); });

  const win = {
    __KF_PAYDAY_AUTO_MOUNT__: false,
    KF_PAYDAY_METRICS_CONFIG: {
      enabled: opts.metricsEnabled !== false,
      publicProjectToken: opts.token || "phc_test_public_project_token_eu",
      productionOrigin: "https://kf-software.com",
      allowNonProductionOrigin: opts.allowNonProd || false,
      timeoutMs: 1000,
      maxInMemoryRetries: opts.maxRetries !== undefined ? opts.maxRetries : 0
    },
    localStorage: ls,
    sessionStorage: ss,
    location: {
      origin: opts.origin || "https://kf-software.com",
      search: opts.search !== undefined ? opts.search : "?src=pinterest&campaign=cash_timing_v1&content=p02",
      hash: opts.hash || "#guide-heading",
      pathname: "/tools/payday-balance/",
      hostname: "kf-software.com"
    },
    history: {
      replaceState: (_s, _t, u) => { win.location.search = ""; win.location.replacedTo = u; }
    },
    addEventListener: (ev, fn) => {
      if (!listeners[ev]) listeners[ev] = new Set();
      listeners[ev].add(fn);
    },
    removeEventListener: (ev, fn) => {
      if (listeners[ev]) listeners[ev].delete(fn);
    },
    triggerStorage: (e) => {
      if (listeners.storage) {
        Array.from(listeners.storage).forEach((fn) => fn(e));
      }
    }
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
    navigator: {
      globalPrivacyControl: Boolean(opts.gpc),
      doNotTrack: opts.dnt || "0",
      clipboard: {
        writeText: async (txt) => { win.__copiedText = txt; }
      }
    },
    crypto: {
      randomUUID: () => crypto.randomUUID(),
      getRandomValues: (arr) => crypto.randomFillSync(arr)
    },
    fetch: async (url, fetchOpts) => {
      if (opts.failFetch) throw new Error("Network blocked");
      requests.push({ url, opts: fetchOpts, body: JSON.parse(fetchOpts.body) });
      return { ok: true, status: 200 };
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
    Set,
    Map,
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

  const unmount = win.PaydayBalanceApp.mountPaydayCalculator({
    window: win,
    document: doc,
    Engine: win.PaydayBalanceEngine,
    Telemetry: win.PaydayBalanceTelemetry
  });

  return { elements, win, doc, unmount };
}

async function runDomAndPrivacyTests() {
  const ls = mkStorage();
  const ss = mkStorage();
  const requests = [];

  // Pre-existing Clarity consent or v2 consent must NOT activate v3 PostHog measurement
  ls.setItem("kf_analytics_consent", "accepted");
  ls.setItem("cash_timing_usage_consent_v2", "accepted");

  const env1 = makeDomEnv(ls, ss, requests);
  const { elements, win, doc } = env1;

  // Simulate React 18 StrictMode unmount + remount
  env1.unmount();
  const remountUnmount = win.PaydayBalanceApp.mountPaydayCalculator({
    window: win,
    document: doc,
    Engine: win.PaydayBalanceEngine,
    Telemetry: win.PaydayBalanceTelemetry
  });

  // Financial storage empty by default; no v3 analytics ID before consent; safe hash preserved
  assert.strictEqual(ls.getItem("cash_timing_saved_inputs_v2"), null);
  assert.strictEqual(ls.getItem(Telemetry.IDENTITY_KEY), null);
  assert.strictEqual(win.location.replacedTo, "/tools/payday-balance/#guide-heading");

  // Enter sentinel financial values before consent & calculate
  const futurePayday = Engine.getTodayLocalIso(new Date(Date.now() + 5 * 86400000));
  elements["currency"].value = "EUR";
  elements["balance"].value = "987654.32";
  elements["next-payday"].value = futurePayday;
  elements["spending-allowance"].value = "111.22";
  elements["buffer"].value = "333.44";
  elements["add-bill-btn"].trigger("click");
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
  assert.strictEqual(ls.getItem("cash_timing_saved_inputs_v2"), null);

  // Opt in to Remember my inputs -> saves under cash_timing_saved_inputs_v2, still 0 analytics events/tokens
  elements["remember-inputs"].checked = true;
  elements["remember-inputs"].trigger("change");
  assert.ok(ls.getItem("cash_timing_saved_inputs_v2").includes("SENTINEL_BILL_LABEL_998877"));
  assert.strictEqual(ls.getItem(Telemetry.IDENTITY_KEY), null);
  assert.strictEqual(requests.length, 0);

  // Grant v3 usage measurement consent -> sends calculator_visit once (no retroactive calculation replay)
  elements["allow-metrics-btn"].trigger("click");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests.length, 1);
  assert.strictEqual(requests[0].url, "https://eu.i.posthog.com/i/v0/e/");
  assert.strictEqual(requests[0].body.event, "calculator_visit");
  assert.deepStrictEqual(
    Object.keys(requests[0].body).sort(),
    ["api_key", "distinct_id", "event", "properties", "timestamp", "uuid"]
  );
  assert.deepStrictEqual(
    Object.keys(requests[0].body.properties).sort(),
    ["$process_person_profile", "campaign", "content", "first_source", "schema_version", "tool", "visit_source"]
  );
  assert.strictEqual(requests[0].body.properties.$process_person_profile, false);
  assert.strictEqual(requests[0].body.properties.schema_version, 3);
  assert.strictEqual(requests[0].body.properties.tool, "payday_balance");
  assert.strictEqual(requests[0].body.properties.first_source, "pinterest");
  assert.strictEqual(requests[0].body.properties.visit_source, "pinterest");
  assert.strictEqual(requests[0].body.properties.campaign, "cash_timing_v1");
  assert.strictEqual(requests[0].body.properties.content, "p02");

  // Edit balance -> marks result outdated; recalculate -> sends own_calculation_completed once
  elements["balance"].value = "987600.00";
  elements["balance"].trigger("input");
  assert.strictEqual(elements["stale-warning"].classList.contains("hidden"), false);

  elements["calc-form"].trigger("submit");
  // Rapid double-submit without input change must NOT send a duplicate calculation event
  elements["calc-form"].trigger("submit");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests.length, 2);
  assert.strictEqual(requests[1].body.event, "own_calculation_completed");

  // Direct return on a new page open preserves first_source=pinterest while visit_source=direct_or_unknown
  remountUnmount();
  makeDomEnv(ls, ss, requests, { search: "", referrer: "" });
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests.length, 3);
  assert.strictEqual(requests[2].body.event, "calculator_visit");
  assert.strictEqual(requests[2].body.properties.first_source, "pinterest");
  assert.strictEqual(requests[2].body.properties.visit_source, "direct_or_unknown");
  assert.strictEqual(requests[2].body.properties.campaign, "none");
  assert.strictEqual(requests[2].body.properties.content, "none");

  // Load example -> unmodified calculate sends example_calculation_completed; editing transitions to own-mode
  const envExample = makeDomEnv(ls, ss, requests, { search: "", referrer: "" });
  envExample.elements["load-example-btn"].trigger("click");
  envExample.elements["calc-form"].trigger("submit");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests[requests.length - 1].body.event, "example_calculation_completed");

  // Edit spending in example mode -> promotes to own mode and sends own_calculation_completed
  envExample.elements["spending-allowance"].value = "300.00";
  envExample.elements["spending-allowance"].trigger("input");
  assert.strictEqual(envExample.elements["example-mode-banner"].classList.contains("hidden"), true);
  envExample.elements["calc-form"].trigger("submit");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(requests[requests.length - 1].body.event, "own_calculation_completed");

  // Stop usage measurement -> removes local tracking ID, keeps reference in memory for click-to-copy, leaves saved inputs intact
  const activeUuid = JSON.parse(ls.getItem(Telemetry.IDENTITY_KEY)).distinct_id;
  envExample.elements["stop-metrics-btn"].trigger("click");
  assert.strictEqual(ls.getItem(Telemetry.IDENTITY_KEY), null);
  assert.strictEqual(ls.getItem(Telemetry.CONSENT_KEY), "rejected");
  assert.ok(ls.getItem("cash_timing_saved_inputs_v2").includes("SENTINEL_BILL_LABEL_998877"));
  envExample.elements["copy-reference-btn"].trigger("click");
  assert.strictEqual(envExample.win.__copiedText, activeUuid);

  // Clear all -> clears financial inputs & cash_timing_saved_inputs_v2, leaves privacy consent rejected
  envExample.elements["clear-all-btn"].trigger("click");
  assert.strictEqual(ls.getItem("cash_timing_saved_inputs_v2"), null);
  assert.strictEqual(ls.getItem(Telemetry.CONSENT_KEY), "rejected");

  // Assert NO sentinel value ever appeared in any network request or title
  const reqDump = JSON.stringify({ requests, title: doc.title });
  for (const s of ["SENTINEL_BILL_LABEL_998877", "987654", "987600", "456.78", "111.22", "333.44", "EUR", futurePayday]) {
    assert.strictEqual(reqDump.includes(s), false, `Sentinel leaked into network/metadata: ${s}`);
  }

  // Non-production origin (localhost) without allowNonProductionOrigin blocks PostHog requests
  const localhostReqs = [];
  const localhostLs = mkStorage();
  const envLocalhost = makeDomEnv(localhostLs, ss, localhostReqs, {
    origin: "http://localhost:3000",
    allowNonProd: false
  });
  envLocalhost.elements["allow-metrics-btn"].trigger("click");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(localhostReqs.length, 0);

  // Personal secret key (phx_) is rejected even on production origin
  const phxReqs = [];
  const envPhx = makeDomEnv(mkStorage(), ss, phxReqs, {
    token: "phx_personal_secret_key_should_never_work"
  });
  envPhx.elements["allow-metrics-btn"].trigger("click");
  await new Promise((r) => setTimeout(r, 20));
  assert.strictEqual(phxReqs.length, 0);

  // Palette state transitions: positive (485) => shortfall (115) => zero (0) => positive (485)
  const env3 = makeDomEnv(mkStorage(), mkStorage(), []);
  env3.elements["load-example-btn"].trigger("click");
  env3.elements["spending-allowance"].value = "300.00";
  env3.elements["spending-allowance"].trigger("input");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$485.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), true);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), false);

  env3.elements["balance"].value = "1600.00";
  env3.elements["balance"].trigger("input");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$115.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), true);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), false);

  env3.elements["balance"].value = "1715.00";
  env3.elements["balance"].trigger("input");
  env3.elements["calc-form"].trigger("submit");
  assert.strictEqual(env3.elements["result-amount"].textContent, "$0.00");
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-positive"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-shortfall"), false);
  assert.strictEqual(env3.elements["result-hero"].classList.contains("is-zero"), true);

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

  // Verify exported static HTML (out/tools/payday-balance/index.html) when present
  const exportedPath = path.join(repoRoot, "out/tools/payday-balance/index.html");
  if (fs.existsSync(exportedPath)) {
    const html = fs.readFileSync(exportedPath, "utf8");
    assert.ok(html.includes('aria-label="Primary navigation"'), "Missing shared Header nav");
    assert.strictEqual((html.match(/<h1[\s>]/g) || []).length, 1, "Expected exactly 1 h1");
    assert.ok(html.includes('href="https://kf-software.com/tools/payday-balance/"'), "Missing canonical URL");
    assert.ok(html.includes('name="referrer" content="no-referrer"'), "Missing no-referrer meta");
    assert.ok(/http-equiv="Content-Security-Policy"[^>]*script-src 'self' 'sha256-/.test(html), "Missing SHA-256 CSP");
    assert.ok(/connect-src 'self' https:\/\/eu\.i\.posthog\.com/.test(html), "Missing PostHog EU connect-src");
    assert.ok(!/unsafe-eval/.test(html), "CSP must not contain unsafe-eval");
    assert.ok(!/clarity\.ms\/tag/.test(html), "Must not contain Clarity tag script");
    assert.ok(html.includes("How this payday balance calculator works"), "Missing static SEO content");
  }
}

runDomAndPrivacyTests().then(() => {
  console.log("All v3 frontend engine, PostHog EU telemetry, and shell contract tests passed!");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
