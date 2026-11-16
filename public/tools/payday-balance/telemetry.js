(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PaydayBalanceTelemetry = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var CONSENT_KEY = "cash_timing_usage_consent_v2";
  var TOKEN_KEY = "cash_timing_browser_v2";
  var SESSION_ATTRIB_KEY = "cash_timing_session_attrib_v2";
  var DEDUP_KEY_PREFIX = "cash_timing_dedup_v2_";
  var NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

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
    "other_referral",
    "direct_or_unknown"
  ];

  var CAMPAIGN_ENUM = ["cash_timing_v1", "none"];

  var EVENT_ENUM = [
    "calculator_visit",
    "own_calculation_completed",
    "example_calculation_completed"
  ];

  var REFERRER_HOST_MAP = {
    "facebook.com": "facebook",
    "fb.com": "facebook",
    "x.com": "x",
    "twitter.com": "x",
    "t.co": "x",
    "threads.net": "threads",
    "linkedin.com": "linkedin",
    "lnkd.in": "linkedin",
    "reddit.com": "reddit",
    "redd.it": "reddit",
    "moneysavingexpert.com": "moneysavingexpert",
    "pinterest.com": "pinterest",
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
    "google.com.au": "google"
  };

  function isKnownSource(val) {
    return typeof val === "string" && SOURCE_ENUM.indexOf(val) !== -1;
  }

  function isKnownCampaign(val) {
    return typeof val === "string" && CAMPAIGN_ENUM.indexOf(val) !== -1;
  }

  function matchReferrerHostname(hostname, ownHostname) {
    if (!hostname || typeof hostname !== "string") {
      return null;
    }
    var clean = hostname.toLowerCase().replace(/\.$/, "");
    if (!clean) {
      return null;
    }
    if (ownHostname && clean === ownHostname.toLowerCase()) {
      return "same_origin";
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
   * Classify acquisition source and campaign from URL search and document.referrer.
   * Priority: recognized src -> recognized utm pair -> referrer hostname -> direct_or_unknown.
   */
  function classifyAttribution(searchStr, referrerStr, ownHostname) {
    var source = null;
    var campaign = "none";

    var params = null;
    try {
      params = new URLSearchParams(searchStr || "");
    } catch (_e) {
      params = null;
    }

    if (params) {
      var rawSrc = params.get("src");
      var rawUtmSource = params.get("utm_source");
      var rawUtmCampaign = params.get("utm_campaign");

      if (rawUtmCampaign && isKnownCampaign(rawUtmCampaign)) {
        campaign = rawUtmCampaign;
      }

      if (rawSrc && isKnownSource(rawSrc) && rawSrc !== "other_referral" && rawSrc !== "direct_or_unknown") {
        source = rawSrc;
      } else if (
        rawUtmSource &&
        isKnownSource(rawUtmSource) &&
        rawUtmSource !== "other_referral" &&
        rawUtmSource !== "direct_or_unknown" &&
        rawUtmCampaign &&
        isKnownCampaign(rawUtmCampaign)
      ) {
        source = rawUtmSource;
      }
    }

    if (!source && referrerStr) {
      try {
        var refUrl = new URL(referrerStr);
        if (refUrl.protocol === "http:" || refUrl.protocol === "https:") {
          var matched = matchReferrerHostname(refUrl.hostname, ownHostname);
          if (matched && matched !== "same_origin") {
            source = matched;
          }
        }
      } catch (_e2) {
        // Ignore malformed referrer
      }
    }

    if (!source) {
      source = "direct_or_unknown";
    }

    return { source: source, campaign: campaign };
  }

  function createTelemetryClient(deps) {
    var env = deps || {};
    var win = env.window || (typeof window !== "undefined" ? window : null);
    var doc = env.document || (typeof document !== "undefined" ? document : null);
    var nav = env.navigator || (typeof navigator !== "undefined" ? navigator : null);
    var cryptoObj = env.crypto || (typeof crypto !== "undefined" ? crypto : null);
    var fetchFn = env.fetch || (typeof fetch === "function" ? fetch.bind(globalThis) : null);
    var nowFn = typeof env.now === "function" ? env.now : function () { return Date.now(); };
    var config = Object.assign(
      {
        enabled: false,
        eventsEndpoint: "https://api.kf-software.com/cash-timing/events",
        forgetEndpoint: "https://api.kf-software.com/cash-timing/forget",
        timeoutMs: 3500
      },
      env.config || (win && win.KF_PAYDAY_METRICS_CONFIG) || {}
    );

    var localStore = null;
    var sessionStore = null;
    try {
      localStore = env.localStorage || (win && win.localStorage) || null;
      if (localStore) {
        localStore.setItem("__kf_probe__", "1");
        localStore.removeItem("__kf_probe__");
      }
    } catch (_e) {
      localStore = null;
    }

    try {
      sessionStore = env.sessionStorage || (win && win.sessionStorage) || null;
    } catch (_e2) {
      sessionStore = null;
    }

    function isPrivacySignalActive() {
      if (nav && nav.globalPrivacyControl === true) {
        return true;
      }
      var dnt = (nav && nav.doNotTrack) || (win && win.doNotTrack) || (nav && nav.msDoNotTrack);
      return dnt === "1" || dnt === "yes";
    }

    function hasCryptoRandom() {
      return Boolean(cryptoObj && typeof cryptoObj.getRandomValues === "function");
    }

    function isInfrastructureAvailable() {
      return Boolean(config.enabled && localStore && hasCryptoRandom() && fetchFn && !isPrivacySignalActive());
    }

    // Classify in memory on init and strip query/hash from visible URL
    var inMemoryAttribution = classifyAttribution(
      win && win.location ? win.location.search : "",
      doc ? doc.referrer : "",
      win && win.location ? win.location.hostname : ""
    );

    if (win && win.history && typeof win.history.replaceState === "function" && win.location) {
      if (win.location.search || win.location.hash) {
        try {
          win.history.replaceState(null, "", win.location.pathname);
        } catch (_e3) {
          // Ignore replaceState failures in restricted contexts
        }
      }
    }

    function getConsentState() {
      if (!localStore) {
        return "unavailable";
      }
      try {
        var val = localStore.getItem(CONSENT_KEY);
        if (val === "accepted") {
          var rawToken = localStore.getItem(TOKEN_KEY);
          if (rawToken) {
            var parsedToken = JSON.parse(rawToken);
            if (parsedToken && typeof parsedToken.expires_at === "number" && nowFn() >= parsedToken.expires_at) {
              localStore.removeItem(TOKEN_KEY);
              localStore.removeItem(CONSENT_KEY);
              clearDedupAndAttribution();
              return "unset";
            }
          }
          return "accepted";
        }
        if (val === "declined") {
          return "declined";
        }
        return "unset";
      } catch (_e) {
        return "unavailable";
      }
    }

    function readStoredTokenRecord() {
      if (!localStore) {
        return null;
      }
      try {
        var raw = localStore.getItem(TOKEN_KEY);
        if (!raw) {
          return null;
        }
        var parsed = JSON.parse(raw);
        if (
          !parsed ||
          typeof parsed.token !== "string" ||
          !/^[0-9a-f]{64}$/.test(parsed.token) ||
          typeof parsed.created_at !== "number" ||
          typeof parsed.expires_at !== "number"
        ) {
          localStore.removeItem(TOKEN_KEY);
          return null;
        }
        if (nowFn() >= parsed.expires_at) {
          // Fixed 90-day expiry reached: discard identity and require renewed consent
          localStore.removeItem(TOKEN_KEY);
          if (localStore.getItem(CONSENT_KEY) === "accepted") {
            localStore.removeItem(CONSENT_KEY);
          }
          clearDedupAndAttribution();
          return null;
        }
        return parsed;
      } catch (_e) {
        return null;
      }
    }

    function generateToken() {
      var bytes = new Uint8Array(32);
      cryptoObj.getRandomValues(bytes);
      var hex = "";
      for (var i = 0; i < bytes.length; i++) {
        hex += bytes[i].toString(16).padStart(2, "0");
      }
      return hex;
    }

    function ensureTokenForConsentedBrowser() {
      if (!isInfrastructureAvailable()) {
        return null;
      }
      var existing = readStoredTokenRecord();
      if (getConsentState() !== "accepted") {
        return null;
      }
      if (existing) {
        return existing.token;
      }
      var createdAt = nowFn();
      var record = {
        token: generateToken(),
        created_at: createdAt,
        expires_at: createdAt + NINETY_DAYS_MS
      };
      try {
        localStore.setItem(TOKEN_KEY, JSON.stringify(record));
        return record.token;
      } catch (_e) {
        return null;
      }
    }

    function getAttributionForEvent() {
      if (sessionStore) {
        try {
          var raw = sessionStore.getItem(SESSION_ATTRIB_KEY);
          if (raw) {
            var parsed = JSON.parse(raw);
            if (parsed && isKnownSource(parsed.source) && isKnownCampaign(parsed.campaign)) {
              return parsed;
            }
          }
          if (getConsentState() === "accepted") {
            sessionStore.setItem(SESSION_ATTRIB_KEY, JSON.stringify(inMemoryAttribution));
          }
        } catch (_e) {
          // Fall back to in-memory
        }
      }
      return inMemoryAttribution;
    }

    function clearDedupAndAttribution() {
      if (sessionStore) {
        try {
          sessionStore.removeItem(SESSION_ATTRIB_KEY);
          var keysToDelete = [];
          for (var i = 0; i < sessionStore.length; i++) {
            var k = sessionStore.key(i);
            if (k && k.indexOf(DEDUP_KEY_PREFIX) === 0) {
              keysToDelete.push(k);
            }
          }
          for (var j = 0; j < keysToDelete.length; j++) {
            sessionStore.removeItem(keysToDelete[j]);
          }
        } catch (_e) {
          // Ignore storage errors
        }
      }
    }

    function utcDayString() {
      return new Date(nowFn()).toISOString().slice(0, 10);
    }

    function isAlreadySentInTabToday(eventName, dayStr) {
      if (!sessionStore) {
        return false;
      }
      try {
        return sessionStore.getItem(DEDUP_KEY_PREFIX + eventName) === dayStr;
      } catch (_e) {
        return false;
      }
    }

    function markSentInTabToday(eventName, dayStr) {
      if (!sessionStore) {
        return;
      }
      try {
        sessionStore.setItem(DEDUP_KEY_PREFIX + eventName, dayStr);
      } catch (_e) {
        // Ignore storage errors
      }
    }

    function postJson(url, bodyObj) {
      var controller = typeof AbortController === "function" ? new AbortController() : null;
      var timerId = null;
      if (controller) {
        timerId = setTimeout(function () {
          controller.abort();
        }, config.timeoutMs);
      }

      return fetchFn(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
        credentials: "omit",
        referrerPolicy: "no-referrer",
        keepalive: true,
        signal: controller ? controller.signal : undefined
      }).then(
        function (res) {
          if (timerId) clearTimeout(timerId);
          return res;
        },
        function (err) {
          if (timerId) clearTimeout(timerId);
          throw err;
        }
      );
    }

    function trackEvent(eventName) {
      if (EVENT_ENUM.indexOf(eventName) === -1) {
        return Promise.resolve(false);
      }
      if (!isInfrastructureAvailable() || getConsentState() !== "accepted") {
        return Promise.resolve(false);
      }

      var token = ensureTokenForConsentedBrowser();
      if (!token) {
        return Promise.resolve(false);
      }

      var dayStr = utcDayString();
      if (isAlreadySentInTabToday(eventName, dayStr)) {
        return Promise.resolve(false);
      }

      var attrib = getAttributionForEvent();
      var payload = {
        schema_version: 2,
        browser_token: token,
        event: eventName,
        source: attrib.source,
        campaign: attrib.campaign
      };

      markSentInTabToday(eventName, dayStr);

      return postJson(config.eventsEndpoint, payload)
        .then(function (res) {
          return Boolean(res && res.ok);
        })
        .catch(function () {
          return false;
        });
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
      ensureTokenForConsentedBrowser();
      getAttributionForEvent();
      return true;
    }

    function declineConsent() {
      if (!localStore) {
        return;
      }
      try {
        localStore.setItem(CONSENT_KEY, "declined");
      } catch (_e) {
        // Ignore
      }
      clearDedupAndAttribution();
    }

    /**
     * Stop measurement immediately across tabs.
     * Retains existing token locally ONLY as an inactive deletion handle until its original expiry.
     * Makes no network request.
     */
    function stopMeasurement() {
      declineConsent();
    }

    /**
     * Stop measurement and request deletion on POST /cash-timing/forget.
     * Removes local token only after confirmed deletion.
     */
    function deleteUsageHistory() {
      stopMeasurement();
      var record = readStoredTokenRecord();
      if (!record) {
        return Promise.resolve({ ok: true, hadToken: false });
      }
      if (!config.enabled || !fetchFn) {
        return Promise.resolve({
          ok: false,
          hadToken: true,
          error: "Deletion endpoint is not enabled or network is unavailable."
        });
      }

      var payload = {
        schema_version: 2,
        browser_token: record.token
      };

      return postJson(config.forgetEndpoint, payload)
        .then(function (res) {
          if (res && res.status === 204) {
            try {
              localStore.removeItem(TOKEN_KEY);
            } catch (_e) {
              // Ignore
            }
            return { ok: true, hadToken: true };
          }
          return {
            ok: false,
            hadToken: true,
            error: "Server did not confirm deletion. Your measurement remains off; please retry."
          };
        })
        .catch(function () {
          return {
            ok: false,
            hadToken: true,
            error: "Could not reach the deletion endpoint. Your measurement remains off; please retry."
          };
        });
    }

    function hasDeletableToken() {
      return Boolean(readStoredTokenRecord());
    }

    function onConsentSync(callback) {
      if (!win || typeof win.addEventListener !== "function") {
        return function () {};
      }
      function handler(e) {
        if (e && e.key === CONSENT_KEY) {
          if (e.newValue !== "accepted") {
            clearDedupAndAttribution();
          }
          callback(getConsentState());
        }
      }
      win.addEventListener("storage", handler);
      return function () {
        win.removeEventListener("storage", handler);
      };
    }

    return {
      isInfrastructureAvailable: isInfrastructureAvailable,
      isPrivacySignalActive: isPrivacySignalActive,
      getConsentState: getConsentState,
      hasDeletableToken: hasDeletableToken,
      grantConsent: grantConsent,
      declineConsent: declineConsent,
      stopMeasurement: stopMeasurement,
      deleteUsageHistory: deleteUsageHistory,
      trackEvent: trackEvent,
      onConsentSync: onConsentSync
    };
  }

  return {
    CONSENT_KEY: CONSENT_KEY,
    TOKEN_KEY: TOKEN_KEY,
    SESSION_ATTRIB_KEY: SESSION_ATTRIB_KEY,
    SOURCE_ENUM: SOURCE_ENUM,
    CAMPAIGN_ENUM: CAMPAIGN_ENUM,
    EVENT_ENUM: EVENT_ENUM,
    classifyAttribution: classifyAttribution,
    createTelemetryClient: createTelemetryClient
  };
});
