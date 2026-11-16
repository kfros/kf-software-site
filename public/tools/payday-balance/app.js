(function () {
  "use strict";

  var Engine = window.PaydayBalanceEngine;
  var Telemetry = window.PaydayBalanceTelemetry;
  var SAVED_INPUTS_KEY = "cash_timing_saved_inputs_v2";

  if (!Engine || !Telemetry) {
    return;
  }

  var state = {
    mode: "own", // "own" | "example"
    asOf: Engine.getTodayLocalIso(),
    bills: [],
    billCounter: 0,
    hasCalculated: false,
    isStale: false
  };

  var telemetry = Telemetry.createTelemetryClient();

  // DOM refs
  var form = document.getElementById("calc-form");
  var todayBadge = document.getElementById("today-badge");
  var exampleBanner = document.getElementById("example-mode-banner");
  var currencyEl = document.getElementById("currency");
  var balanceEl = document.getElementById("balance");
  var nextPaydayEl = document.getElementById("next-payday");
  var spendingEl = document.getElementById("spending-allowance");
  var bufferEl = document.getElementById("buffer");
  var billsContainer = document.getElementById("bills-container");
  var billsEmptyMsg = document.getElementById("bills-empty-msg");
  var billsLimitError = document.getElementById("bills-limit-error");
  var addBillBtn = document.getElementById("add-bill-btn");
  var loadExampleBtn = document.getElementById("load-example-btn");
  var clearAllBtn = document.getElementById("clear-all-btn");
  var rememberCheckbox = document.getElementById("remember-inputs");
  var storageWarningEl = document.getElementById("storage-warning");

  var resultPanel = document.getElementById("result-panel");
  var staleWarning = document.getElementById("stale-warning");
  var resultHero = document.getElementById("result-hero");
  var resultLabel = document.getElementById("result-label");
  var resultAmount = document.getElementById("result-amount");
  var resultMeta = document.getElementById("result-meta");
  var resultQualification = document.getElementById("result-qualification");
  var shortfallNoteEl = document.getElementById("shortfall-note");
  var breakdownList = document.getElementById("breakdown-list");
  var resultBillsBody = document.getElementById("result-bills-body");
  var resultBillsWrap = document.getElementById("result-bills-wrap");
  var resultAnnouncement = document.getElementById("result-announcement");

  var consentBanner = document.getElementById("consent-banner");
  var allowMetricsBtn = document.getElementById("allow-metrics-btn");
  var declineMetricsBtn = document.getElementById("decline-metrics-btn");
  var privacyStatusText = document.getElementById("privacy-status-text");
  var stopMetricsBtn = document.getElementById("stop-metrics-btn");
  var deleteHistoryBtn = document.getElementById("delete-history-btn");
  var privacyFeedbackEl = document.getElementById("privacy-feedback");

  function addDaysToIso(isoDate, offsetDays) {
    var parsed = Engine.parseCalendarDate(isoDate);
    if (!parsed) return isoDate;
    var d = new Date(parsed.year, parsed.month - 1, parsed.day + offsetDays);
    return Engine.getTodayLocalIso(d);
  }

  function refreshTodayBadge() {
    state.asOf = Engine.getTodayLocalIso();
    todayBadge.textContent = "Today: " + state.asOf;
  }

  function markOutdated() {
    if (state.hasCalculated) {
      state.isStale = true;
      staleWarning.classList.remove("hidden");
    }
  }

  function clearFieldErrors() {
    var fields = [
      { el: currencyEl, errId: "err-currency" },
      { el: balanceEl, errId: "err-balance" },
      { el: nextPaydayEl, errId: "err-next-payday" },
      { el: spendingEl, errId: "err-spending-allowance" },
      { el: bufferEl, errId: "err-buffer" }
    ];
    for (var i = 0; i < fields.length; i++) {
      fields[i].el.removeAttribute("aria-invalid");
      document.getElementById(fields[i].errId).textContent = "";
    }
    billsLimitError.textContent = "";
  }

  function updateEmptyBillsState() {
    if (state.bills.length === 0) {
      billsEmptyMsg.classList.remove("hidden");
    } else {
      billsEmptyMsg.classList.add("hidden");
    }
  }

  function renderBillRows(billErrors) {
    billsContainer.innerHTML = "";
    var errList = Array.isArray(billErrors) ? billErrors : [];

    for (var i = 0; i < state.bills.length; i++) {
      (function (index) {
        var bill = state.bills[index];
        var rowErr = errList[index] || {};

        var rowDiv = document.createElement("div");
        rowDiv.className = "bill-row";
        rowDiv.setAttribute("data-bill-id", bill.id);

        // Label field
        var labelField = document.createElement("div");
        labelField.className = "field";
        var labelLbl = document.createElement("label");
        labelLbl.setAttribute("for", bill.id + "-label");
        labelLbl.textContent = "Bill name (optional)";
        var labelInput = document.createElement("input");
        labelInput.type = "text";
        labelInput.id = bill.id + "-label";
        labelInput.maxLength = 120;
        labelInput.autocomplete = "off";
        labelInput.placeholder = "e.g. Electric bill";
        labelInput.value = bill.label;
        labelInput.addEventListener("input", function () {
          bill.label = labelInput.value;
          markOutdated();
          saveInputsIfEnabled();
        });
        labelField.appendChild(labelLbl);
        labelField.appendChild(labelInput);

        // Amount field
        var amtField = document.createElement("div");
        amtField.className = "field";
        var amtLbl = document.createElement("label");
        amtLbl.setAttribute("for", bill.id + "-amount");
        amtLbl.textContent = "Amount";
        var amtInput = document.createElement("input");
        amtInput.type = "text";
        amtInput.inputMode = "decimal";
        amtInput.id = bill.id + "-amount";
        amtInput.autocomplete = "off";
        amtInput.placeholder = "e.g. 315.00";
        amtInput.value = bill.amount;
        var amtErr = document.createElement("span");
        amtErr.className = "field-error";
        amtErr.id = bill.id + "-amount-err";
        amtInput.setAttribute("aria-describedby", amtErr.id);
        if (rowErr.amount) {
          amtInput.setAttribute("aria-invalid", "true");
          amtErr.textContent = rowErr.amount;
        }
        amtInput.addEventListener("input", function () {
          bill.amount = amtInput.value;
          markOutdated();
          saveInputsIfEnabled();
        });
        amtField.appendChild(amtLbl);
        amtField.appendChild(amtInput);
        amtField.appendChild(amtErr);

        // Due date field
        var dateField = document.createElement("div");
        dateField.className = "field";
        var dateLbl = document.createElement("label");
        dateLbl.setAttribute("for", bill.id + "-date");
        dateLbl.textContent = "Due date";
        var dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.id = bill.id + "-date";
        dateInput.value = bill.dueDate;
        var dateErr = document.createElement("span");
        dateErr.className = "field-error";
        dateErr.id = bill.id + "-date-err";
        dateInput.setAttribute("aria-describedby", dateErr.id);
        if (rowErr.dueDate) {
          dateInput.setAttribute("aria-invalid", "true");
          dateErr.textContent = rowErr.dueDate;
        }
        dateInput.addEventListener("input", function () {
          bill.dueDate = dateInput.value;
          markOutdated();
          saveInputsIfEnabled();
        });
        dateField.appendChild(dateLbl);
        dateField.appendChild(dateInput);
        dateField.appendChild(dateErr);

        // Remove button
        var removeWrap = document.createElement("div");
        removeWrap.className = "field";
        var spacerLbl = document.createElement("span");
        spacerLbl.className = "field-hint";
        spacerLbl.textContent = "Action";
        var removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-danger btn-small";
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("aria-label", "Remove bill " + (bill.label || "#" + (index + 1)));
        removeBtn.addEventListener("click", function () {
          state.bills.splice(index, 1);
          markOutdated();
          renderBillRows([]);
          updateEmptyBillsState();
          saveInputsIfEnabled();
        });
        removeWrap.appendChild(spacerLbl);
        removeWrap.appendChild(removeBtn);

        // Already deducted checkbox
        var dedWrap = document.createElement("div");
        dedWrap.className = "bill-deducted-wrap";
        var dedLbl = document.createElement("label");
        dedLbl.className = "checkbox-label";
        var dedInput = document.createElement("input");
        dedInput.type = "checkbox";
        dedInput.checked = Boolean(bill.alreadyDeducted);
        dedInput.addEventListener("change", function () {
          bill.alreadyDeducted = dedInput.checked;
          markOutdated();
          saveInputsIfEnabled();
        });
        var dedSpan = document.createElement("span");
        dedSpan.textContent = "Already deducted from the current balance entered above";
        dedLbl.appendChild(dedInput);
        dedLbl.appendChild(dedSpan);
        dedWrap.appendChild(dedLbl);

        rowDiv.appendChild(labelField);
        rowDiv.appendChild(amtField);
        rowDiv.appendChild(dateField);
        rowDiv.appendChild(removeWrap);
        rowDiv.appendChild(dedWrap);
        billsContainer.appendChild(rowDiv);
      })(i);
    }

    updateEmptyBillsState();
  }

  function addBillRow(initial) {
    if (state.bills.length >= Engine.MAX_BILLS) {
      billsLimitError.textContent = "Maximum of " + Engine.MAX_BILLS + " bill rows reached.";
      return;
    }
    state.billCounter += 1;
    var data = initial || {};
    state.bills.push({
      id: "bill-" + state.billCounter,
      label: typeof data.label === "string" ? data.label : "",
      amount: typeof data.amount === "string" ? data.amount : "",
      dueDate: typeof data.dueDate === "string" ? data.dueDate : "",
      alreadyDeducted: Boolean(data.alreadyDeducted)
    });
    markOutdated();
    renderBillRows([]);
    saveInputsIfEnabled();
  }

  function getFormInputPayload() {
    return {
      asOf: state.asOf,
      currency: currencyEl.value,
      balance: balanceEl.value,
      nextPayday: nextPaydayEl.value,
      spendingAllowance: spendingEl.value,
      buffer: bufferEl.value,
      bills: state.bills.map(function (b) {
        return {
          id: b.id,
          label: b.label,
          amount: b.amount,
          dueDate: b.dueDate,
          alreadyDeducted: b.alreadyDeducted
        };
      })
    };
  }

  function saveInputsIfEnabled() {
    if (!rememberCheckbox.checked || state.mode !== "own") {
      return;
    }
    try {
      var payload = {
        schema_version: 2,
        currency: currencyEl.value,
        balance: balanceEl.value,
        nextPayday: nextPaydayEl.value,
        spendingAllowance: spendingEl.value,
        buffer: bufferEl.value,
        bills: state.bills.map(function (b) {
          return {
            label: b.label,
            amount: b.amount,
            dueDate: b.dueDate,
            alreadyDeducted: Boolean(b.alreadyDeducted)
          };
        })
      };
      window.localStorage.setItem(SAVED_INPUTS_KEY, JSON.stringify(payload));
      storageWarningEl.textContent = "";
    } catch (_e) {
      storageWarningEl.textContent = "Browser storage is unavailable; continuing in memory only.";
    }
  }

  function deleteSavedInputs() {
    try {
      window.localStorage.removeItem(SAVED_INPUTS_KEY);
    } catch (_e) {
      // Ignore storage failures
    }
  }

  function restoreSavedInputs() {
    try {
      var raw = window.localStorage.getItem(SAVED_INPUTS_KEY);
      if (!raw) {
        return;
      }
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.schema_version !== 2 || !Engine.CURRENCIES[parsed.currency]) {
        deleteSavedInputs();
        return;
      }
      state.mode = "own";
      currencyEl.value = parsed.currency;
      balanceEl.value = typeof parsed.balance === "string" ? parsed.balance : "";
      nextPaydayEl.value = typeof parsed.nextPayday === "string" ? parsed.nextPayday : "";
      spendingEl.value = typeof parsed.spendingAllowance === "string" ? parsed.spendingAllowance : "0";
      bufferEl.value = typeof parsed.buffer === "string" ? parsed.buffer : "0";
      state.bills = [];
      if (Array.isArray(parsed.bills)) {
        for (var i = 0; i < Math.min(parsed.bills.length, Engine.MAX_BILLS); i++) {
          var row = parsed.bills[i];
          if (row && typeof row === "object") {
            state.billCounter += 1;
            state.bills.push({
              id: "bill-" + state.billCounter,
              label: typeof row.label === "string" ? row.label : "",
              amount: typeof row.amount === "string" ? row.amount : "",
              dueDate: typeof row.dueDate === "string" ? row.dueDate : "",
              alreadyDeducted: Boolean(row.alreadyDeducted)
            });
          }
        }
      }
      rememberCheckbox.checked = true;
      renderBillRows([]);

      // Check for expired payday on restore
      if (nextPaydayEl.value && nextPaydayEl.value < state.asOf) {
        nextPaydayEl.setAttribute("aria-invalid", "true");
        document.getElementById("err-next-payday").textContent =
          "Saved payday (" + nextPaydayEl.value + ") has passed. Update it and click Calculate.";
      }
    } catch (_e) {
      deleteSavedInputs();
    }
  }

  function focusFirstInvalid(errors) {
    var order = [
      { flag: errors.currency, el: currencyEl },
      { flag: errors.balance, el: balanceEl },
      { flag: errors.nextPayday, el: nextPaydayEl },
      { flag: errors.spendingAllowance, el: spendingEl },
      { flag: errors.buffer, el: bufferEl }
    ];
    for (var i = 0; i < order.length; i++) {
      if (order[i].flag) {
        order[i].el.focus();
        return;
      }
    }
    for (var j = 0; j < errors.bills.length; j++) {
      var be = errors.bills[j];
      if (be.amount) {
        var ae = document.getElementById(state.bills[j].id + "-amount");
        if (ae) { ae.focus(); return; }
      }
      if (be.dueDate) {
        var de = document.getElementById(state.bills[j].id + "-date");
        if (de) { de.focus(); return; }
      }
    }
  }

  function renderResult(res) {
    resultPanel.classList.remove("hidden");
    staleWarning.classList.add("hidden");
    state.hasCalculated = true;
    state.isStale = false;

    var cur = res.currency;
    if (res.shortfallToPlanMinor > 0) {
      resultHero.classList.add("is-shortfall");
      resultLabel.textContent = "Shortfall against your plan";
      resultAmount.textContent = Engine.formatMinor(res.shortfallToPlanMinor, cur);
      shortfallNoteEl.textContent =
        "Estimated amount you could move: " + Engine.formatMinor(0, cur) +
        ". Includes your chosen buffer; this does not necessarily mean your bank account will overdraw.";
      shortfallNoteEl.classList.remove("hidden");
    } else {
      resultHero.classList.remove("is-shortfall");
      resultLabel.textContent = "Estimated amount you could move";
      resultAmount.textContent = Engine.formatMinor(res.estimatedTransferMinor, cur);
      shortfallNoteEl.textContent = "";
      shortfallNoteEl.classList.add("hidden");
    }

    resultMeta.textContent =
      "Currency: " + cur + " · Period: " + res.asOf + " through " + res.nextPayday +
      (state.mode === "example" ? " · Example mode" : "");
    resultQualification.textContent =
      "Based only on the balance, bills, spending and buffer you entered.";

    // Breakdown list
    breakdownList.innerHTML = "";
    var lines = [
      { label: "Current account balance", val: Engine.formatMinor(res.balanceMinor, cur) },
      { label: "Included unpaid bills (due on or before " + res.nextPayday + ")", val: "−" + Engine.formatMinor(res.commitmentsMinor, cur) },
      { label: "Other spending until payday", val: "−" + Engine.formatMinor(res.spendingAllowanceMinor, cur) },
      { label: "Amount to leave untouched (buffer)", val: "−" + Engine.formatMinor(res.bufferMinor, cur) }
    ];
    for (var i = 0; i < lines.length; i++) {
      var li = document.createElement("li");
      var s1 = document.createElement("span");
      s1.textContent = lines[i].label;
      var s2 = document.createElement("span");
      s2.className = "num";
      s2.textContent = lines[i].val;
      li.appendChild(s1);
      li.appendChild(s2);
      breakdownList.appendChild(li);
    }

    // Dated bill table
    resultBillsBody.innerHTML = "";
    if (res.bills.length === 0) {
      resultBillsWrap.classList.add("hidden");
    } else {
      resultBillsWrap.classList.remove("hidden");
      for (var b = 0; b < res.bills.length; b++) {
        var bill = res.bills[b];
        var tr = document.createElement("tr");

        var tdDate = document.createElement("td");
        tdDate.textContent = bill.dueDate;

        var tdLabel = document.createElement("td");
        tdLabel.textContent = bill.label;

        var tdAmt = document.createElement("td");
        tdAmt.textContent = Engine.formatMinor(bill.amountMinor, cur);

        var tdStatus = document.createElement("td");
        var pill = document.createElement("span");
        pill.className = "pill " + (bill.included ? "pill-included" : "pill-excluded");
        pill.textContent = bill.included ? "Included" : "Excluded";
        var reasonSpan = document.createElement("span");
        reasonSpan.textContent = " " + bill.statusReason;
        tdStatus.appendChild(pill);
        tdStatus.appendChild(reasonSpan);

        tr.appendChild(tdDate);
        tr.appendChild(tdLabel);
        tr.appendChild(tdAmt);
        tr.appendChild(tdStatus);
        resultBillsBody.appendChild(tr);
      }
    }

    resultAnnouncement.textContent =
      res.shortfallToPlanMinor > 0
        ? "Shortfall against your plan: " + Engine.formatMinor(res.shortfallToPlanMinor, cur)
        : "Estimated amount you could move: " + Engine.formatMinor(res.estimatedTransferMinor, cur);
  }

  function handleCalculate(e) {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    refreshTodayBadge();
    clearFieldErrors();

    var res = Engine.calculatePaydayBalance(getFormInputPayload());
    if (!res.ok) {
      resultPanel.classList.add("hidden");
      state.hasCalculated = false;
      state.isStale = false;

      if (res.errors.currency) {
        currencyEl.setAttribute("aria-invalid", "true");
        document.getElementById("err-currency").textContent = res.errors.currency;
      }
      if (res.errors.balance) {
        balanceEl.setAttribute("aria-invalid", "true");
        document.getElementById("err-balance").textContent = res.errors.balance;
      }
      if (res.errors.nextPayday) {
        nextPaydayEl.setAttribute("aria-invalid", "true");
        document.getElementById("err-next-payday").textContent = res.errors.nextPayday;
      }
      if (res.errors.spendingAllowance) {
        spendingEl.setAttribute("aria-invalid", "true");
        document.getElementById("err-spending-allowance").textContent = res.errors.spendingAllowance;
      }
      if (res.errors.buffer) {
        bufferEl.setAttribute("aria-invalid", "true");
        document.getElementById("err-buffer").textContent = res.errors.buffer;
      }
      if (res.errors.billsLimit) {
        billsLimitError.textContent = res.errors.billsLimit;
      }
      renderBillRows(res.errors.bills);
      focusFirstInvalid(res.errors);
      return;
    }

    renderBillRows([]);
    renderResult(res);
    saveInputsIfEnabled();

    var eventName =
      state.mode === "example"
        ? "example_calculation_completed"
        : "own_calculation_completed";
    telemetry.trackEvent(eventName);
  }

  function loadExample() {
    refreshTodayBadge();
    clearFieldErrors();
    state.mode = "example";
    exampleBanner.classList.remove("hidden");

    currencyEl.value = "USD";
    balanceEl.value = "2200.00";
    nextPaydayEl.value = addDaysToIso(state.asOf, 4);
    spendingEl.value = "0.00";
    bufferEl.value = "200.00";

    state.bills = [];
    state.billCounter = 0;
    addBillRow({
      label: "Electric & water bill",
      amount: "315.00",
      dueDate: state.asOf,
      alreadyDeducted: false
    });
    addBillRow({
      label: "Rent installment",
      amount: "900.00",
      dueDate: addDaysToIso(state.asOf, 2),
      alreadyDeducted: false
    });

    resultPanel.classList.add("hidden");
    state.hasCalculated = false;
    state.isStale = false;
  }

  function clearAllFinancialInputs() {
    refreshTodayBadge();
    clearFieldErrors();
    state.mode = "own";
    exampleBanner.classList.add("hidden");

    currencyEl.value = "USD";
    balanceEl.value = "";
    nextPaydayEl.value = "";
    spendingEl.value = "0";
    bufferEl.value = "0";
    state.bills = [];
    state.billCounter = 0;
    renderBillRows([]);

    rememberCheckbox.checked = false;
    deleteSavedInputs();

    resultPanel.classList.add("hidden");
    staleWarning.classList.add("hidden");
    state.hasCalculated = false;
    state.isStale = false;
    resultAnnouncement.textContent = "";
  }

  function updatePrivacyUi() {
    var infraOk = telemetry.isInfrastructureAvailable();
    var consent = telemetry.getConsentState();
    var hasToken = telemetry.hasDeletableToken();

    if (telemetry.isPrivacySignalActive()) {
      consentBanner.classList.add("hidden");
      privacyStatusText.textContent =
        "Usage measurement is disabled because your browser sends a Global Privacy Control or Do Not Track signal.";
      stopMetricsBtn.disabled = true;
      deleteHistoryBtn.disabled = !hasToken;
      return;
    }

    if (!infraOk) {
      consentBanner.classList.add("hidden");
      privacyStatusText.textContent =
        "Usage measurement is currently disabled in this deployment. The calculator works completely offline in your browser.";
      stopMetricsBtn.disabled = true;
      deleteHistoryBtn.disabled = true;
      return;
    }

    if (consent === "unset") {
      consentBanner.classList.remove("hidden");
      privacyStatusText.textContent =
        "Usage measurement is off (no permission given yet). No random browser ID has been created.";
      stopMetricsBtn.disabled = true;
      deleteHistoryBtn.disabled = !hasToken;
    } else if (consent === "accepted") {
      consentBanner.classList.add("hidden");
      privacyStatusText.textContent =
        "Usage measurement is allowed (up to 90 days, no financial figures sent).";
      stopMetricsBtn.disabled = false;
      deleteHistoryBtn.disabled = false;
    } else {
      consentBanner.classList.add("hidden");
      privacyStatusText.textContent = hasToken
        ? "Usage measurement is stopped. A local deletion handle remains until expiry so you can delete past usage history."
        : "Usage measurement is off.";
      stopMetricsBtn.disabled = true;
      deleteHistoryBtn.disabled = !hasToken;
    }
  }

  // Event listeners
  form.addEventListener("submit", handleCalculate);

  [currencyEl, balanceEl, nextPaydayEl, spendingEl, bufferEl].forEach(function (el) {
    el.addEventListener("input", function () {
      markOutdated();
      saveInputsIfEnabled();
    });
  });

  addBillBtn.addEventListener("click", function () {
    addBillRow();
  });

  loadExampleBtn.addEventListener("click", loadExample);
  clearAllBtn.addEventListener("click", clearAllFinancialInputs);

  rememberCheckbox.addEventListener("change", function () {
    if (rememberCheckbox.checked) {
      saveInputsIfEnabled();
    } else {
      deleteSavedInputs();
      storageWarningEl.textContent = "";
    }
  });

  allowMetricsBtn.addEventListener("click", function () {
    if (telemetry.grantConsent()) {
      telemetry.trackEvent("calculator_visit");
    }
    privacyFeedbackEl.textContent = "";
    updatePrivacyUi();
  });

  declineMetricsBtn.addEventListener("click", function () {
    telemetry.declineConsent();
    privacyFeedbackEl.textContent = "";
    updatePrivacyUi();
  });

  stopMetricsBtn.addEventListener("click", function () {
    telemetry.stopMeasurement();
    privacyFeedbackEl.textContent =
      "Measurement stopped across open tabs. Stopping does not erase previously received records; use Delete my usage history to remove them.";
    updatePrivacyUi();
  });

  deleteHistoryBtn.addEventListener("click", function () {
    deleteHistoryBtn.disabled = true;
    privacyFeedbackEl.textContent = "Requesting deletion of usage history...";
    telemetry.deleteUsageHistory().then(function (result) {
      if (result.ok) {
        privacyFeedbackEl.textContent =
          "Usage history deletion confirmed and local browser ID removed. Saved financial inputs (if any) were not touched.";
      } else {
        privacyFeedbackEl.textContent = result.error || "Deletion could not be confirmed. Please retry.";
      }
      updatePrivacyUi();
    });
  });

  telemetry.onConsentSync(function () {
    updatePrivacyUi();
  });

  // Init
  refreshTodayBadge();
  restoreSavedInputs();
  updateEmptyBillsState();
  updatePrivacyUi();

  if (telemetry.isInfrastructureAvailable() && telemetry.getConsentState() === "accepted") {
    telemetry.trackEvent("calculator_visit");
  }
})();
