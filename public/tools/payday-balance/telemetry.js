(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PaydayBalanceTelemetry = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var CONSENT_KEY = "cash_timing_metrics_consent_v3";
  var IDENTITY_KEY = "cash_timing_metrics_browser_v3";
  var NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
  var POSTHOG_EU_ENDPOINT = "https://eu.i.posthog.com/i/v0/e/";
  var PRODUCTION_ORIGIN = "https://kf-software.com";

  var SOURCE_ENUM = [
    "facebook",
    "x",
    "threads",
    "linkedin",
    "reddit",
    "moneysavingexpert",
    "pinterest",
    "youtube",
    "google",
    "bing",
    "creator",
    "site_internal",
    "other_referral",
    "direct_or_unknown"
  ];

  var CAMPAIGN_ENUM = ["cash_timing_v1", "none"];
  var CONTENT_ENUM = ["p01", "p02", "p03", "none"];

  var EVENT_ENUM = [
    "calculator_visit",
    "own_calculation_completed",
    "example_calculation_completed"
  ];

  var SOURCE_PARAM_ALIASES = {
    "facebook": "facebook",
    "fb": "facebook",
    "facebook.com": "facebook",
    "fb.com": "facebook",
    "x": "x",
    "twitter": "x",
    "t.co": "x",
    "x.com": "x",
    "twitter.com": "x",
    "threads": "threads",
    "threads.com": "threads",
    "threads.net": "threads",
    "linkedin": "linkedin",
    "linkedin.com": "linkedin",
    "lnkd.in": "linkedin",
    "reddit": "reddit",
    "reddit.com": "reddit",
    "redd.it": "reddit",
    "moneysavingexpert": "moneysavingexpert",
    "moneysavingexpert.com": "moneysavingexpert",
    "pinterest": "pinterest",
    "pinterest.com": "pinterest",
    "pinterest.co.uk": "pinterest",
    "pinterest.de": "pinterest",
    "pin.it": "pinterest",
    "youtube": "youtube",
    "youtube.com": "youtube",
    "youtu.be": "youtube",
    "google": "google",
    "bing": "bing",
    "creator": "creator",
    "site_internal": "site_internal"
  };

  var REFERRER_HOST_MAP = {
    "facebook.com": "facebook",
    "fb.com": "facebook",
    "x.com": "x",
    "twitter.com": "x",
    "t.co": "x",
    "threads.com": "threads",
    "threads.net": "threads",
    "linkedin.com": "linkedin",
    "lnkd.in": "linkedin",
    "reddit.com": "reddit",
    "redd.it": "reddit",
    "moneysavingexpert.com": "moneysavingexpert",
    "pinterest.com": "pinterest",
    "pinterest.co.uk": "pinterest",
    "pinterest.de": "pinterest",
    "pinterest.fr": "pinterest",
    "pinterest.ca": "pinterest",
    "pinterest.com.au": "pinterest",
    "pinterest.es": "pinterest",
    "pinterest.it": "pinterest",
    "pinterest.pl": "pinterest",
    "pin.it": "pinterest",
    "youtube.com": "youtube",
    "youtu.be": "youtube",
    "bing.com": "bing",
    "google.com": "google",
    "google.co.uk": "google",
    "google.pl": "google",
    "google.de": "google",
    "google.fr": "google",
    "google.ca": "google",
    "google.com.au": "google",
    "google.es": "google",
    "google.it": "google"
  };

  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  function isKnownSource(val) {
    return typeof val === "string" && SOURCE_ENUM.indexOf(val) !== -1;
  }

  function isKnownCampaign(val) {
    return typeof val === "string" && CAMPAIGN_ENUM.indexOf(val) !== -1;
  }

  function isKnownContent(val) {
    return typeof val === "string" && CONTENT_ENUM.indexOf(val) !== -1;
  }

  function normalizeSourceParam(raw) {
    if (!raw || typeof raw !== "string") {
      return null;
    }
    var key = raw.trim().toLowerCase();
    return SOURCE_PARAM_ALIASES[key] || null;
  }

  function matchReferrerHostname(hostname, ownHostname) {
    if (!hostname || typeof hostname !== "string") {
      return null;
    }
    var clean = hostname.toLowerCase().replace(/\.$/, "");
    if (!clean) {
      return null;
    }
    if (ownHostname) {
      var cleanOwn = ownHostname.toLowerCase().replace(/\.$/, "");
      if (clean === cleanOwn) {
        return "site_internal";
      }
    }
    var domains = Object.keys(REFERRER_HOST_MAP);
    for (var i = 0; i < domains.length; i++) {
      var domain = domains[i];
      if (clean === domain || clean.endsWith("." + domain)) {
        return REFERRER_HOST_MAP[domain];
      }
    }
    return "other_referral";
  }

  /**
   * Classify visit_source, campaign, and content from URL query and document.referrer.
   * Priority for visit_source: allowed src -> allowed utm_source -> document.referrer hostname -> direct_or_unknown.
   */
  function classifyAttribution(searchStr, referrerStr, ownHostname) {
    var visitSource = null;
    var campaign = "none";
    var content = "none";

    var params = null;
    try {
      params = new URLSearchParams(searchStr || "");
    } catch (_e) {
      params = null;
    }

    if (params) {
      var fromSrc = normalizeSourceParam(params.get("src"));
      var fromUtmSource = normalizeSourceParam(params.get("utm_source"));
      if (fromSrc) {
        visitSource = fromSrc;
      } else if (fromUtmSource) {
        visitSource = fromUtmSource;
      }

      var rawCampaign = (params.get("campaign") || params.get("utm_campaign") || "").trim();
      if (rawCampaign && isKnownCampaign(rawCampaign) && rawCampaign !== "none") {
        campaign = rawCampaign;
      }

      var rawContent = (params.get("content") || params.get("utm_content") || "").trim();
      if (rawContent && isKnownContent(rawContent) && rawContent !== "none") {
        content = rawContent;
      }
    }

    if (!visitSource && referrerStr && typeof referrerStr === "string") {
      try {
        var refUrl = new URL(referrerStr);
        if (refUrl.protocol === "http:" || refUrl.protocol === "https:") {
          var matched = matchReferrerHostname(refUrl.hostname, ownHostname);
          if (matched) {
            visitSource = matched;
          }
        }
      } catch (_e2) {
        // Ignore malformed referrer
      }
    }

    if (!visitSource) {
      visitSource = "direct_or_unknown";
    }

    return {
      visit_source: visitSource,
      campaign: campaign,
      content: content
    };
  }

  function generateUuidV4(cryptoObj) {
    if (cryptoObj && typeof cryptoObj.randomUUID === "function") {
      return cryptoObj.randomUUID().toLowerCase();
    }
    if (cryptoObj && typeof cryptoObj.getRandomValues === "function") {
      var bytes = new Uint8Array(16);
      cryptoObj.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      var hex = [];
      for (var i = 0; i < 16; i++) {
        hex.push(bytes[i].toString(16).padStart(2, "0"));
      }
      return (
        hex.slice(0, 4).join("") + "-" +
        hex.slice(4, 6).join("") + "-" +
        hex.slice(6, 8).join("") + "-" +
        hex.slice(8, 10).join("") + "-" +
        hex.slice(10, 16).join("")
      );
    }
    return null;
  }

  /**
   * Validate and build a closed-allowlist PostHog v3 capture payload.
   * Returns null if any field violates the strict schema.
   */
  function buildAllowlistedPayload(params) {
    if (!params || typeof params !== "object") {
      return null;
    }
    var apiKey = typeof params.apiKey === "string" ? params.apiKey.trim() : "";
    // Reject empty or personal secret keys (phx_)
    if (!apiKey || /^phx_/i.test(apiKey)) {
      return null;
    }
    var distinctId = typeof params.distinctId === "string" ? params.distinctId.trim().toLowerCase() : "";
    if (!UUID_RE.test(distinctId)) {
      return null;
    }
    var eventUuid = typeof params.eventUuid === "string" ? params.eventUuid.trim().toLowerCase() : "";
    if (!UUID_RE.test(eventUuid)) {
      return null;
    }
    var eventName = params.eventName;
    if (EVENT_ENUM.indexOf(eventName) === -1) {
      return null;
    }
    var timestamp = params.timestamp;
    if (typeof timestamp !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(timestamp)) {
      return null;
    }
    var firstSource = isKnownSource(params.firstSource) ? params.firstSource : null;
    var visitSource = isKnownSource(params.visitSource) ? params.visitSource : null;
    var campaign = isKnownCampaign(params.campaign) ? params.campaign : null;
    var content = isKnownContent(params.content) ? params.content : null;

    if (!firstSource || !visitSource || !campaign || !content) {
      return null;
    }

    return {
      api_key: apiKey,
      distinct_id: distinctId,
      uuid: eventUuid,
      event: eventName,
      timestamp: timestamp,
      properties: {
        $process_person_profile: false,
        schema_version: 3,
        tool: "payday_balance",
        first_source: firstSource,
        visit_source: visitSource,
        campaign: campaign,
        content: content
      }
    };
  }

  function createTelemetryClient(deps) {
    var env = deps || {};
    var win = env.window || (typeof window !== "undefined" ? window : null);
    var doc = env.document || (typeof document !== "undefined" ? document : null);
    var nav = env.navigator || (typeof navigator !== "undefined" ? navigator : null);
    var cryptoObj = env.crypto || (typeof crypto !== "undefined" ? crypto : null);
    var fetchFn = env.fetch || (typeof fetch === "function" ? fetch.bind(globalThis) : null);
    var nowFn = typeof env.now === "function" ? env.now : function () { return Date.now(); };

    var defaultConfig = {
      enabled: false,
      publicProjectToken: "",
      endpoint: POSTHOG_EU_ENDPOINT,
      productionOrigin: PRODUCTION_ORIGIN,
      allowNonProductionOrigin: false,
      timeoutMs: 3500,
      maxInMemoryRetries: 1
    };

    var config = Object.assign(
      {},
      defaultConfig,
      (win && win.KF_PAYDAY_METRICS_CONFIG) || {},
      env.config || {}
    );

    var localStore = null;
    try {
      localStore = env.localStorage || (win && win.localStorage) || null;
      if (localStore) {
        localStore.setItem("__kf_v3_probe__", "1");
        localStore.removeItem("__kf_v3_probe__");
      }
    } catch (_e) {
      localStore = null;
    }

    var inFlightControllers = new Set();
    var pendingRetryTimers = new Set();
    var visitSentForPageOpen = false;
    var lastStoppedReferenceUuid = null;

    function isPrivacySignalActive() {
      if (nav && nav.globalPrivacyControl === true) {
        return true;
      }
      var dnt = (nav && nav.doNotTrack) || (win && win.doNotTrack) || (nav && nav.msDoNotTrack);
      return dnt === "1" || dnt === "yes";
    }

    function hasCryptoUuid() {
      return Boolean(
        cryptoObj &&
        (typeof cryptoObj.randomUUID === "function" || typeof cryptoObj.getRandomValues === "function")
      );
    }

    function isAllowedOrigin() {
      if (config.allowNonProductionOrigin === true) {
        return true;
      }
      var currentOrigin = win && win.location && typeof win.location.origin === "string"
        ? win.location.origin
        : "";
      return currentOrigin === config.productionOrigin;
    }

    function isValidPublicToken(tok) {
      if (typeof tok !== "string") return false;
      var trimmed = tok.trim();
      // Reject empty or personal secret API keys (phx_)
      return trimmed.length >= 8 && !/^phx_/i.test(trimmed);
    }

    function isInfrastructureAvailable() {
      return Boolean(
        config.enabled === true &&
        isValidPublicToken(config.publicProjectToken) &&
        isAllowedOrigin() &&
        localStore &&
        hasCryptoUuid() &&
        fetchFn &&
        !isPrivacySignalActive()
      );
    }

    // Classify current page visit in memory only (cached on window across React StrictMode remounts)
    // and strip query string while preserving safe hash
    var inMemoryAttribution =
      win && win.__KF_PAYDAY_INITIAL_ATTRIBUTION__
        ? win.__KF_PAYDAY_INITIAL_ATTRIBUTION__
        : classifyAttribution(
            win && win.location ? win.location.search : "",
            doc ? doc.referrer : "",
            win && win.location ? win.location.hostname : ""
          );

    if (win && !win.__KF_PAYDAY_INITIAL_ATTRIBUTION__) {
      win.__KF_PAYDAY_INITIAL_ATTRIBUTION__ = inMemoryAttribution;
    }

    if (win && win.history && typeof win.history.replaceState === "function" && win.location) {
      if (win.location.search) {
        try {
          var rawHash = typeof win.location.hash === "string" ? win.location.hash : "";
          var safeHash = /^#[A-Za-z0-9_-]+$/.test(rawHash) ? rawHash : "";
          win.history.replaceState(null, "", win.location.pathname + safeHash);
        } catch (_e2) {
          // Ignore replaceState failures
        }
      }
    }

    function abortAllInFlightAndRetries() {
      inFlightControllers.forEach(function (ctrl) {
        try {
          ctrl.abort();
        } catch (_e) {
          // Ignore
        }
      });
      inFlightControllers.clear();

      pendingRetryTimers.forEach(function (timerId) {
        clearTimeout(timerId);
      });
      pendingRetryTimers.clear();
    }

    function readStoredIdentity() {
      if (!localStore) {
        return null;
      }
      try {
        var raw = localStore.getItem(IDENTITY_KEY);
        if (!raw) {
          return null;
        }
        var parsed = JSON.parse(raw);
        if (
          !parsed ||
          typeof parsed.distinct_id !== "string" ||
          !UUID_RE.test(parsed.distinct_id) ||
          !isKnownSource(parsed.first_source) ||
          typeof parsed.created_at !== "number" ||
          typeof parsed.expires_at !== "number"
        ) {
          localStore.removeItem(IDENTITY_KEY);
          return null;
        }
        if (nowFn() >= parsed.expires_at) {
          // Fixed 90-day expiry reached: clear ID, attribution, and reset consent to unknown
          localStore.removeItem(IDENTITY_KEY);
          localStore.removeItem(CONSENT_KEY);
          visitSentForPageOpen = false;
          return null;
        }
        return parsed;
      } catch (_e) {
        return null;
      }
    }

    function getConsentState() {
      if (!localStore) {
        return "unknown";
      }
      try {
        // Check identity expiry first so expired IDs reset consent to unknown
        readStoredIdentity();
        var val = localStore.getItem(CONSENT_KEY);
        if (val === "accepted" || val === "rejected") {
          return val;
        }
        return "unknown";
      } catch (_e) {
        return "unknown";
      }
    }

    function ensureIdentityForConsentedBrowser() {
      if (!isInfrastructureAvailable() || getConsentState() !== "accepted") {
        return null;
      }
      var existing = readStoredIdentity();
      if (existing) {
        return existing;
      }
      var uuid = generateUuidV4(cryptoObj);
      if (!uuid) {
        return null;
      }
      var createdAt = nowFn();
      var record = {
        distinct_id: uuid,
        first_source: inMemoryAttribution.visit_source,
        created_at: createdAt,
        expires_at: createdAt + NINETY_DAYS_MS
      };
      try {
        localStore.setItem(IDENTITY_KEY, JSON.stringify(record));
        lastStoppedReferenceUuid = null;
        return record;
      } catch (_e) {
        return null;
      }
    }

    function sendCaptureRequest(payload, attemptNumber) {
      if (!isInfrastructureAvailable() || getConsentState() !== "accepted") {
        return Promise.resolve(false);
      }

      var controller = typeof AbortController === "function" ? new AbortController() : null;
      var timeoutId = null;
      if (controller) {
        inFlightControllers.add(controller);
        timeoutId = setTimeout(function () {
          controller.abort();
        }, config.timeoutMs);
      }

      return fetchFn(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "omit",
        referrerPolicy: "no-referrer",
        mode: "cors",
        signal: controller ? controller.signal : undefined
      })
        .then(function (res) {
          if (timeoutId) clearTimeout(timeoutId);
          if (controller) inFlightControllers.delete(controller);
          if (res && res.ok) {
            return true;
          }
          var status = res ? res.status : 0;
          if ((status === 429 || status >= 500) && attemptNumber < config.maxInMemoryRetries) {
            return retryInMemory(payload, attemptNumber + 1);
          }
          return false;
        })
        .catch(function () {
          if (timeoutId) clearTimeout(timeoutId);
          if (controller) inFlightControllers.delete(controller);
          if (attemptNumber < config.maxInMemoryRetries && getConsentState() === "accepted") {
            return retryInMemory(payload, attemptNumber + 1);
          }
          return false;
        });
    }

    function retryInMemory(payload, nextAttempt) {
      if (getConsentState() !== "accepted" || !isInfrastructureAvailable()) {
        return Promise.resolve(false);
      }
      return new Promise(function (resolve) {
        var tid = setTimeout(function () {
          pendingRetryTimers.delete(tid);
          if (getConsentState() !== "accepted" || !isInfrastructureAvailable()) {
            resolve(false);
            return;
          }
          sendCaptureRequest(payload, nextAttempt).then(resolve);
        }, 250);
        pendingRetryTimers.add(tid);
      });
    }

    function trackEvent(eventName) {
      if (EVENT_ENUM.indexOf(eventName) === -1) {
        return Promise.resolve(false);
      }
      if (!isInfrastructureAvailable() || getConsentState() !== "accepted") {
        return Promise.resolve(false);
      }
      if (eventName === "calculator_visit") {
        if (visitSentForPageOpen) {
          return Promise.resolve(false);
        }
        visitSentForPageOpen = true;
      }

      var identity = ensureIdentityForConsentedBrowser();
      if (!identity) {
        if (eventName === "calculator_visit") {
          visitSentForPageOpen = false;
        }
        return Promise.resolve(false);
      }

      var eventUuid = generateUuidV4(cryptoObj);
      if (!eventUuid) {
        return Promise.resolve(false);
      }

      var payload = buildAllowlistedPayload({
        apiKey: config.publicProjectToken,
        distinctId: identity.distinct_id,
        eventUuid: eventUuid,
        eventName: eventName,
        timestamp: new Date(nowFn()).toISOString(),
        firstSource: identity.first_source,
        visitSource: inMemoryAttribution.visit_source,
        campaign: inMemoryAttribution.campaign,
        content: inMemoryAttribution.content
      });

      if (!payload) {
        return Promise.resolve(false);
      }

      return sendCaptureRequest(payload, 0);
    }

    function grantConsent() {
      if (!isInfrastructureAvailable()) {
        return false;
      }
      try {
        localStore.setItem(CONSENT_KEY, "accepted");
      } catch (_e) {
        return false;
      }
      ensureIdentityForConsentedBrowser();
      return true;
    }

    function stopMeasurement() {
      abortAllInFlightAndRetries();
      var currentIdentity = readStoredIdentity();
      if (currentIdentity && currentIdentity.distinct_id) {
        lastStoppedReferenceUuid = currentIdentity.distinct_id;
      }
      if (localStore) {
        try {
          localStore.removeItem(IDENTITY_KEY);
          localStore.setItem(CONSENT_KEY, "rejected");
        } catch (_e) {
          // Ignore
        }
      }
      visitSentForPageOpen = false;
    }

    function rejectConsent() {
      stopMeasurement();
    }

    function getUsageReference() {
      var active = readStoredIdentity();
      if (active && active.distinct_id) {
        return active.distinct_id;
      }
      return lastStoppedReferenceUuid;
    }

    function getCurrentAttribution() {
      var active = readStoredIdentity();
      return {
        first_source: active ? active.first_source : null,
        visit_source: inMemoryAttribution.visit_source,
        campaign: inMemoryAttribution.campaign,
        content: inMemoryAttribution.content
      };
    }

    function onConsentSync(callback) {
      if (!win || typeof win.addEventListener !== "function") {
        return function () {};
      }
      function handler(e) {
        if (!e || e.key === null || e.key === CONSENT_KEY || e.key === IDENTITY_KEY) {
          var state = getConsentState();
          if (state !== "accepted") {
            abortAllInFlightAndRetries();
            visitSentForPageOpen = false;
          }
          if (typeof callback === "function") {
            callback(state);
          }
        }
      }
      win.addEventListener("storage", handler);
      return function () {
        win.removeEventListener("storage", handler);
      };
    }

    function destroy() {
      abortAllInFlightAndRetries();
    }

    return {
      isInfrastructureAvailable: isInfrastructureAvailable,
      isPrivacySignalActive: isPrivacySignalActive,
      getConsentState: getConsentState,
      getUsageReference: getUsageReference,
      getCurrentAttribution: getCurrentAttribution,
      grantConsent: grantConsent,
      rejectConsent: rejectConsent,
      stopMeasurement: stopMeasurement,
      trackEvent: trackEvent,
      onConsentSync: onConsentSync,
      destroy: destroy
    };
  }

  return {
    CONSENT_KEY: CONSENT_KEY,
    IDENTITY_KEY: IDENTITY_KEY,
    POSTHOG_EU_ENDPOINT: POSTHOG_EU_ENDPOINT,
    PRODUCTION_ORIGIN: PRODUCTION_ORIGIN,
    SOURCE_ENUM: SOURCE_ENUM,
    CAMPAIGN_ENUM: CAMPAIGN_ENUM,
    CONTENT_ENUM: CONTENT_ENUM,
    EVENT_ENUM: EVENT_ENUM,
    classifyAttribution: classifyAttribution,
    buildAllowlistedPayload: buildAllowlistedPayload,
    createTelemetryClient: createTelemetryClient
  };
});
