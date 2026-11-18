(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PaydayBalanceApp = factory();
    if (
      typeof document !== "undefined" &&
      root.__KF_PAYDAY_AUTO_MOUNT__ !== false &&
      document.getElementById("calc-form")
    ) {
      root.PaydayBalanceApp.mountPaydayCalculator();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var SAVED_INPUTS_KEY = "cash_timing_saved_inputs_v2";

  function mountPaydayCalculator(options) {
    var opts = options || {};
    var win = opts.window || (typeof window !== "undefined" ? window : null);
    var doc = opts.document || (typeof document !== "undefined" ? document : null);
    if (!win || !doc) {
      return function () {};
    }

    var Engine = opts.Engine || win.PaydayBalanceEngine;
    var Telemetry = opts.Telemetry || win.PaydayBalanceTelemetry;
    if (!Engine || !Telemetry) {
      return function () {};
    }

    var form = doc.getElementById("calc-form");
    if (!form) {
      return function () {};
    }

    var state = {
      mode: "own", // "own" | "example"
      asOf: Engine.getTodayLocalIso(),
      bills: [],
      billCounter: 0,
      hasCalculated: false,
      isStale: false,
      isSubmitting: false,
      calculationEventSentForCurrentState: false
    };

    var telemetry = Telemetry.createTelemetryClient(opts.telemetryDeps || {});
    var cleanups = [];

    function on(el, eventName, handler) {
      if (!el || typeof el.addEventListener !== "function") return;
      el.addEventListener(eventName, handler);
      cleanups.push(function () {
        if (typeof el.removeEventListener === "function") {
          el.removeEventListener(eventName, handler);
        }
      });
    }

    // DOM refs
    var todayBadge = doc.getElementById("today-badge");
    var exampleBanner = doc.getElementById("example-mode-banner");
    var currencyEl = doc.getElementById("currency");
    var balanceEl = doc.getElementById("balance");
    var nextPaydayEl = doc.getElementById("next-payday");
    var spendingEl = doc.getElementById("spending-allowance");
    var bufferEl = doc.getElementById("buffer");
    var billsContainer = doc.getElementById("bills-container");
    var billsEmptyMsg = doc.getElementById("bills-empty-msg");
    var billsLimitError = doc.getElementById("bills-limit-error");
    var addBillBtn = doc.getElementById("add-bill-btn");
    var loadExampleBtn = doc.getElementById("load-example-btn");
    var clearAllBtn = doc.getElementById("clear-all-btn");
    var rememberCheckbox = doc.getElementById("remember-inputs");
    var storageWarningEl = doc.getElementById("storage-warning");

    var resultPanel = doc.getElementById("result-panel");
    var staleWarning = doc.getElementById("stale-warning");
    var resultHero = doc.getElementById("result-hero");
    var resultLabel = doc.getElementById("result-label");
    var resultAmount = doc.getElementById("result-amount");
    var resultMeta = doc.getElementById("result-meta");
    var resultQualification = doc.getElementById("result-qualification");
    var shortfallNoteEl = doc.getElementById("shortfall-note");
    var breakdownList = doc.getElementById("breakdown-list");
    var resultBillsBody = doc.getElementById("result-bills-body");
    var resultBillsWrap = doc.getElementById("result-bills-wrap");
    var resultAnnouncement = doc.getElementById("result-announcement");

    var consentBanner = doc.getElementById("consent-banner");
    var allowMetricsBtn = doc.getElementById("allow-metrics-btn");
    var declineMetricsBtn = doc.getElementById("decline-metrics-btn");
    var privacyStatusText = doc.getElementById("privacy-status-text");
    var stopMetricsBtn = doc.getElementById("stop-metrics-btn");
    var copyReferenceBtn = doc.getElementById("copy-reference-btn");
    var usageReferenceWrap = doc.getElementById("usage-reference-wrap");
    var usageReferenceCode = doc.getElementById("usage-reference-code");
    var privacyFeedbackEl = doc.getElementById("privacy-feedback");

    function addDaysToIso(isoDate, offsetDays) {
      var parsed = Engine.parseCalendarDate(isoDate);
      if (!parsed) return isoDate;
      var d = new Date(parsed.year, parsed.month - 1, parsed.day + offsetDays);
      return Engine.getTodayLocalIso(d);
    }

    function refreshTodayBadge() {
      var latestToday = Engine.getTodayLocalIso();
      if (state.hasCalculated && latestToday !== state.asOf) {
        state.isStale = true;
        if (staleWarning) staleWarning.classList.remove("hidden");
      }
      state.asOf = latestToday;
      if (todayBadge) {
        todayBadge.textContent = "Today: " + state.asOf;
      }
    }

    function promoteExampleToOwnMode() {
      if (state.mode === "example") {
        state.mode = "own";
        if (exampleBanner) {
          exampleBanner.classList.add("hidden");
        }
      }
    }

    function markOutdated() {
      state.calculationEventSentForCurrentState = false;
      if (state.hasCalculated) {
        state.isStale = true;
        if (staleWarning) staleWarning.classList.remove("hidden");
      }
    }

    function handleUserFieldMutation() {
      promoteExampleToOwnMode();
      markOutdated();
      saveInputsIfEnabled();
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
        if (fields[i].el) fields[i].el.removeAttribute("aria-invalid");
        var errEl = doc.getElementById(fields[i].errId);
        if (errEl) errEl.textContent = "";
      }
      if (billsLimitError) billsLimitError.textContent = "";
    }

    function updateEmptyBillsState() {
      if (!billsEmptyMsg) return;
      if (state.bills.length === 0) {
        billsEmptyMsg.classList.remove("hidden");
      } else {
        billsEmptyMsg.classList.add("hidden");
      }
    }

    function renderBillRows(billErrors) {
      if (!billsContainer) return;
      billsContainer.innerHTML = "";
      var errList = Array.isArray(billErrors) ? billErrors : [];

      for (var i = 0; i < state.bills.length; i++) {
        (function (index) {
          var bill = state.bills[index];
          var rowErr = errList[index] || {};

          var rowDiv = doc.createElement("div");
          rowDiv.className = "bill-row";
          rowDiv.setAttribute("data-bill-id", bill.id);

          // Label field
          var labelField = doc.createElement("div");
          labelField.className = "field";
          var labelLbl = doc.createElement("label");
          labelLbl.setAttribute("for", bill.id + "-label");
          labelLbl.textContent = "Bill name (optional)";
          var labelInput = doc.createElement("input");
          labelInput.type = "text";
          labelInput.id = bill.id + "-label";
          labelInput.maxLength = 120;
          labelInput.autocomplete = "off";
          labelInput.placeholder = "e.g. Electric bill";
          labelInput.value = bill.label;
          labelInput.addEventListener("input", function () {
            bill.label = labelInput.value;
            handleUserFieldMutation();
          });
          labelField.appendChild(labelLbl);
          labelField.appendChild(labelInput);

          // Amount field
          var amtField = doc.createElement("div");
          amtField.className = "field";
          var amtLbl = doc.createElement("label");
          amtLbl.setAttribute("for", bill.id + "-amount");
          amtLbl.textContent = "Amount";
          var amtInput = doc.createElement("input");
          amtInput.type = "text";
          amtInput.inputMode = "decimal";
          amtInput.id = bill.id + "-amount";
          amtInput.autocomplete = "off";
          amtInput.placeholder = "e.g. 315.00";
          amtInput.value = bill.amount;
          var amtErr = doc.createElement("span");
          amtErr.className = "field-error";
          amtErr.id = bill.id + "-amount-err";
          amtInput.setAttribute("aria-describedby", amtErr.id);
          if (rowErr.amount) {
            amtInput.setAttribute("aria-invalid", "true");
            amtErr.textContent = rowErr.amount;
          }
          amtInput.addEventListener("input", function () {
            bill.amount = amtInput.value;
            handleUserFieldMutation();
          });
          amtField.appendChild(amtLbl);
          amtField.appendChild(amtInput);
          amtField.appendChild(amtErr);

          // Due date field
          var dateField = doc.createElement("div");
          dateField.className = "field";
          var dateLbl = doc.createElement("label");
          dateLbl.setAttribute("for", bill.id + "-date");
          dateLbl.textContent = "Due date";
          var dateInput = doc.createElement("input");
          dateInput.type = "date";
          dateInput.id = bill.id + "-date";
          dateInput.value = bill.dueDate;
          var dateErr = doc.createElement("span");
          dateErr.className = "field-error";
          dateErr.id = bill.id + "-date-err";
          dateInput.setAttribute("aria-describedby", dateErr.id);
          if (rowErr.dueDate) {
            dateInput.setAttribute("aria-invalid", "true");
            dateErr.textContent = rowErr.dueDate;
          }
          dateInput.addEventListener("input", function () {
            bill.dueDate = dateInput.value;
            handleUserFieldMutation();
          });
          dateField.appendChild(dateLbl);
          dateField.appendChild(dateInput);
          dateField.appendChild(dateErr);

          // Remove button
          var removeWrap = doc.createElement("div");
          removeWrap.className = "field";
          var spacerLbl = doc.createElement("span");
          spacerLbl.className = "field-hint";
          spacerLbl.textContent = "Action";
          var removeBtn = doc.createElement("button");
          removeBtn.type = "button";
          removeBtn.className = "btn btn-danger btn-small";
          removeBtn.textContent = "Remove";
          removeBtn.setAttribute("aria-label", "Remove bill " + (bill.label || "#" + (index + 1)));
          removeBtn.addEventListener("click", function () {
            state.bills.splice(index, 1);
            promoteExampleToOwnMode();
            markOutdated();
            renderBillRows([]);
            updateEmptyBillsState();
            saveInputsIfEnabled();
          });
          removeWrap.appendChild(spacerLbl);
          removeWrap.appendChild(removeBtn);

          // Already deducted checkbox
          var dedWrap = doc.createElement("div");
          dedWrap.className = "bill-deducted-wrap";
          var dedLbl = doc.createElement("label");
          dedLbl.className = "checkbox-label";
          var dedInput = doc.createElement("input");
          dedInput.type = "checkbox";
          dedInput.checked = Boolean(bill.alreadyDeducted);
          dedInput.addEventListener("change", function () {
            bill.alreadyDeducted = dedInput.checked;
            handleUserFieldMutation();
          });
          var dedSpan = doc.createElement("span");
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
        if (billsLimitError) {
          billsLimitError.textContent = "Maximum of " + Engine.MAX_BILLS + " bill rows reached.";
        }
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
        currency: currencyEl ? currencyEl.value : "USD",
        balance: balanceEl ? balanceEl.value : "",
        nextPayday: nextPaydayEl ? nextPaydayEl.value : "",
        spendingAllowance: spendingEl ? spendingEl.value : "0",
        buffer: bufferEl ? bufferEl.value : "0",
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
      if (!rememberCheckbox || !rememberCheckbox.checked || state.mode !== "own") {
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
        win.localStorage.setItem(SAVED_INPUTS_KEY, JSON.stringify(payload));
        if (storageWarningEl) storageWarningEl.textContent = "";
      } catch (_e) {
        if (storageWarningEl) {
          storageWarningEl.textContent = "Browser storage is unavailable; continuing in memory only.";
        }
      }
    }

    function deleteSavedInputs() {
      try {
        win.localStorage.removeItem(SAVED_INPUTS_KEY);
      } catch (_e) {
        // Ignore storage failures
      }
    }

    function restoreSavedInputs() {
      try {
        var raw = win.localStorage.getItem(SAVED_INPUTS_KEY);
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

        // Flag expired payday on restore and require recalculation
        if (nextPaydayEl.value && nextPaydayEl.value < state.asOf) {
          nextPaydayEl.setAttribute("aria-invalid", "true");
          var errPayday = doc.getElementById("err-next-payday");
          if (errPayday) {
            errPayday.textContent =
              "Saved payday (" + nextPaydayEl.value + ") has passed. Update it and click Calculate.";
          }
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
        if (order[i].flag && order[i].el) {
          order[i].el.focus();
          return;
        }
      }
      for (var j = 0; j < errors.bills.length; j++) {
        var be = errors.bills[j];
        if (be.amount) {
          var ae = doc.getElementById(state.bills[j].id + "-amount");
          if (ae) { ae.focus(); return; }
        }
        if (be.dueDate) {
          var de = doc.getElementById(state.bills[j].id + "-date");
          if (de) { de.focus(); return; }
        }
      }
    }

    function resetResultStateClasses() {
      if (!resultHero) return;
      resultHero.classList.remove("is-positive");
      resultHero.classList.remove("is-shortfall");
      resultHero.classList.remove("is-zero");
    }

    function renderResult(res) {
      resultPanel.classList.remove("hidden");
      staleWarning.classList.add("hidden");
      state.hasCalculated = true;
      state.isStale = false;

      resetResultStateClasses();

      var cur = res.currency;
      if (res.shortfallToPlanMinor > 0) {
        resultHero.classList.add("is-shortfall");
        resultLabel.textContent = "Shortfall against your plan";
        resultAmount.textContent = Engine.formatMinor(res.shortfallToPlanMinor, cur);
        shortfallNoteEl.textContent =
          "Estimated amount you could move: " + Engine.formatMinor(0, cur) +
          ". Includes your chosen buffer; this does not necessarily mean your bank account will overdraw.";
        shortfallNoteEl.classList.remove("hidden");
      } else if (res.estimatedTransferMinor > 0) {
        resultHero.classList.add("is-positive");
        resultLabel.textContent = "Estimated amount you could move";
        resultAmount.textContent = Engine.formatMinor(res.estimatedTransferMinor, cur);
        shortfallNoteEl.textContent = "";
        shortfallNoteEl.classList.add("hidden");
      } else {
        resultHero.classList.add("is-zero");
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

      breakdownList.innerHTML = "";
      var lines = [
        { label: "Current account balance", val: Engine.formatMinor(res.balanceMinor, cur) },
        { label: "Included unpaid bills (due on or before " + res.nextPayday + ")", val: "−" + Engine.formatMinor(res.commitmentsMinor, cur) },
        { label: "Other spending until payday", val: "−" + Engine.formatMinor(res.spendingAllowanceMinor, cur) },
        { label: "Amount to leave untouched (buffer)", val: "−" + Engine.formatMinor(res.bufferMinor, cur) }
      ];
      for (var i = 0; i < lines.length; i++) {
        var li = doc.createElement("li");
        var s1 = doc.createElement("span");
        s1.textContent = lines[i].label;
        var s2 = doc.createElement("span");
        s2.className = "num";
        s2.textContent = lines[i].val;
        li.appendChild(s1);
        li.appendChild(s2);
        breakdownList.appendChild(li);
      }

      resultBillsBody.innerHTML = "";
      if (res.bills.length === 0) {
        resultBillsWrap.classList.add("hidden");
      } else {
        resultBillsWrap.classList.remove("hidden");
        for (var b = 0; b < res.bills.length; b++) {
          var bill = res.bills[b];
          var tr = doc.createElement("tr");

          var tdDate = doc.createElement("td");
          tdDate.textContent = bill.dueDate;

          var tdLabel = doc.createElement("td");
          tdLabel.textContent = bill.label;

          var tdAmt = doc.createElement("td");
          tdAmt.textContent = Engine.formatMinor(bill.amountMinor, cur);

          var tdStatus = doc.createElement("td");
          var pill = doc.createElement("span");
          pill.className = "pill " + (bill.included ? "pill-included" : "pill-excluded");
          pill.textContent = bill.included ? "Included" : "Excluded";
          var reasonSpan = doc.createElement("span");
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
      if (state.isSubmitting) {
        return;
      }
      state.isSubmitting = true;

      try {
        refreshTodayBadge();
        clearFieldErrors();

        var res = Engine.calculatePaydayBalance(getFormInputPayload());
        if (!res.ok) {
          resultPanel.classList.add("hidden");
          resetResultStateClasses();
          state.hasCalculated = false;
          state.isStale = false;
          state.calculationEventSentForCurrentState = false;

          if (res.errors.currency) {
            currencyEl.setAttribute("aria-invalid", "true");
            doc.getElementById("err-currency").textContent = res.errors.currency;
          }
          if (res.errors.balance) {
            balanceEl.setAttribute("aria-invalid", "true");
            doc.getElementById("err-balance").textContent = res.errors.balance;
          }
          if (res.errors.nextPayday) {
            nextPaydayEl.setAttribute("aria-invalid", "true");
            doc.getElementById("err-next-payday").textContent = res.errors.nextPayday;
          }
          if (res.errors.spendingAllowance) {
            spendingEl.setAttribute("aria-invalid", "true");
            doc.getElementById("err-spending-allowance").textContent = res.errors.spendingAllowance;
          }
          if (res.errors.buffer) {
            bufferEl.setAttribute("aria-invalid", "true");
            doc.getElementById("err-buffer").textContent = res.errors.buffer;
          }
          if (res.errors.billsLimit && billsLimitError) {
            billsLimitError.textContent = res.errors.billsLimit;
          }
          renderBillRows(res.errors.bills);
          focusFirstInvalid(res.errors);
          return;
        }

        renderBillRows([]);
        renderResult(res);
        saveInputsIfEnabled();

        if (!state.calculationEventSentForCurrentState) {
          state.calculationEventSentForCurrentState = true;
          var eventName =
            state.mode === "example"
              ? "example_calculation_completed"
              : "own_calculation_completed";
          telemetry.trackEvent(eventName);
        }
      } finally {
        state.isSubmitting = false;
      }
    }

    function loadExample() {
      refreshTodayBadge();
      clearFieldErrors();
      state.mode = "example";
      state.calculationEventSentForCurrentState = false;
      if (rememberCheckbox) rememberCheckbox.checked = false;
      if (exampleBanner) exampleBanner.classList.remove("hidden");

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
      resetResultStateClasses();
      state.hasCalculated = false;
      state.isStale = false;
      state.calculationEventSentForCurrentState = false;
    }

    function clearAllFinancialInputs() {
      refreshTodayBadge();
      clearFieldErrors();
      state.mode = "own";
      if (exampleBanner) exampleBanner.classList.add("hidden");

      currencyEl.value = "USD";
      balanceEl.value = "";
      nextPaydayEl.value = "";
      spendingEl.value = "0";
      bufferEl.value = "0";
      state.bills = [];
      state.billCounter = 0;
      renderBillRows([]);

      if (rememberCheckbox) rememberCheckbox.checked = false;
      deleteSavedInputs();

      resultPanel.classList.add("hidden");
      resetResultStateClasses();
      staleWarning.classList.add("hidden");
      state.hasCalculated = false;
      state.isStale = false;
      state.calculationEventSentForCurrentState = false;
      resultAnnouncement.textContent = "";
    }

    function updatePrivacyUi() {
      var infraOk = telemetry.isInfrastructureAvailable();
      var consent = telemetry.getConsentState();
      var refUuid = telemetry.getUsageReference();

      if (usageReferenceWrap && usageReferenceCode) {
        if (refUuid) {
          usageReferenceWrap.classList.remove("hidden");
          usageReferenceCode.textContent = refUuid;
          if (copyReferenceBtn) copyReferenceBtn.disabled = false;
        } else {
          usageReferenceWrap.classList.add("hidden");
          usageReferenceCode.textContent = "";
          if (copyReferenceBtn) copyReferenceBtn.disabled = true;
        }
      }

      if (telemetry.isPrivacySignalActive()) {
        if (consentBanner) consentBanner.classList.add("hidden");
        if (privacyStatusText) {
          privacyStatusText.textContent =
            "Usage measurement is disabled because your browser sends a Global Privacy Control or Do Not Track signal.";
        }
        if (stopMetricsBtn) stopMetricsBtn.disabled = true;
        return;
      }

      if (!infraOk) {
        if (consentBanner) consentBanner.classList.add("hidden");
        if (privacyStatusText) {
          privacyStatusText.textContent =
            "Usage measurement is currently disabled in this build. The calculator runs locally in your browser with no analytics requests.";
        }
        if (stopMetricsBtn) stopMetricsBtn.disabled = true;
        return;
      }

      if (consent === "unknown") {
        if (consentBanner) consentBanner.classList.remove("hidden");
        if (privacyStatusText) {
          privacyStatusText.textContent =
            "Usage measurement is off (no permission given yet). No random browser ID has been created.";
        }
        if (stopMetricsBtn) stopMetricsBtn.disabled = true;
      } else if (consent === "accepted") {
        if (consentBanner) consentBanner.classList.add("hidden");
        if (privacyStatusText) {
          privacyStatusText.textContent =
            "Usage measurement is active (PostHog EU, random browser ID for up to 90 days, no financial figures sent).";
        }
        if (stopMetricsBtn) stopMetricsBtn.disabled = false;
      } else {
        if (consentBanner) consentBanner.classList.add("hidden");
        if (privacyStatusText) {
          privacyStatusText.textContent =
            "Usage measurement is stopped. Local tracking ID and attribution have been cleared from this browser.";
        }
        if (stopMetricsBtn) stopMetricsBtn.disabled = true;
      }
    }

    // Attach listeners
    on(form, "submit", handleCalculate);

    [currencyEl, balanceEl, nextPaydayEl, spendingEl, bufferEl].forEach(function (el) {
      on(el, "input", handleUserFieldMutation);
    });

    on(addBillBtn, "click", function () {
      addBillRow();
    });

    on(loadExampleBtn, "click", loadExample);
    on(clearAllBtn, "click", clearAllFinancialInputs);

    on(rememberCheckbox, "change", function () {
      if (rememberCheckbox.checked) {
        saveInputsIfEnabled();
      } else {
        deleteSavedInputs();
        if (storageWarningEl) storageWarningEl.textContent = "";
      }
    });

    on(allowMetricsBtn, "click", function () {
      if (telemetry.grantConsent()) {
        if (!win.__KF_PAYDAY_VISIT_TRACKED__) {
          win.__KF_PAYDAY_VISIT_TRACKED__ = true;
          telemetry.trackEvent("calculator_visit");
        }
      }
      if (privacyFeedbackEl) privacyFeedbackEl.textContent = "";
      updatePrivacyUi();
    });

    on(declineMetricsBtn, "click", function () {
      telemetry.rejectConsent();
      if (privacyFeedbackEl) privacyFeedbackEl.textContent = "";
      updatePrivacyUi();
    });

    on(stopMetricsBtn, "click", function () {
      telemetry.stopMeasurement();
      if (privacyFeedbackEl) {
        privacyFeedbackEl.textContent =
          "Usage measurement stopped and local browser ID deleted. Stopping stops new events immediately; to request deletion of previously received events, copy your usage reference above and contact us via the Privacy Policy page.";
      }
      updatePrivacyUi();
    });

    on(copyReferenceBtn, "click", function () {
      var refUuid = telemetry.getUsageReference();
      if (!refUuid) return;
      if (win.navigator && win.navigator.clipboard && typeof win.navigator.clipboard.writeText === "function") {
        win.navigator.clipboard.writeText(refUuid).then(
          function () {
            if (privacyFeedbackEl) {
              privacyFeedbackEl.textContent = "Usage reference copied to clipboard.";
            }
          },
          function () {
            if (privacyFeedbackEl) {
              privacyFeedbackEl.textContent = "Could not copy automatically. Select and copy the usage reference text above.";
            }
          }
        );
      } else if (privacyFeedbackEl) {
        privacyFeedbackEl.textContent = "Select and copy the usage reference text above.";
      }
    });

    var unbindConsentSync = telemetry.onConsentSync(function () {
      updatePrivacyUi();
    });
    cleanups.push(unbindConsentSync);
    cleanups.push(function () {
      telemetry.destroy();
    });

    // Init
    refreshTodayBadge();
    restoreSavedInputs();
    updateEmptyBillsState();
    updatePrivacyUi();

    if (
      telemetry.isInfrastructureAvailable() &&
      telemetry.getConsentState() === "accepted" &&
      !win.__KF_PAYDAY_VISIT_TRACKED__
    ) {
      win.__KF_PAYDAY_VISIT_TRACKED__ = true;
      telemetry.trackEvent("calculator_visit");
    }

    return function unmount() {
      for (var i = 0; i < cleanups.length; i++) {
        try {
          cleanups[i]();
        } catch (_e) {
          // Ignore
        }
      }
      cleanups = [];
    };
  }

  return {
    mountPaydayCalculator: mountPaydayCalculator
  };
});
