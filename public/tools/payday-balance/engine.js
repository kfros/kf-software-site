(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PaydayBalanceEngine = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var CURRENCIES = {
    USD: { code: "USD", symbol: "$", minorUnit: 2 },
    EUR: { code: "EUR", symbol: "\u20AC", minorUnit: 2 },
    GBP: { code: "GBP", symbol: "\u00A3", minorUnit: 2 },
    PLN: { code: "PLN", symbol: "PLN ", minorUnit: 2 }
  };

  var MAX_ABS_MINOR = 100000000; // 1,000,000.00 currency units
  var MAX_BILLS = 100;

  /**
   * Parse a YYYY-MM-DD string as a strict local calendar date without UTC conversion.
   * Returns { year, month, day, iso } or null if invalid.
   */
  function parseCalendarDate(value) {
    if (typeof value !== "string") {
      return null;
    }
    var trimmed = value.trim();
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    if (!match) {
      return null;
    }
    var year = Number(match[1]);
    var month = Number(match[2]);
    var day = Number(match[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return null;
    }
    var daysInMonth = [
      31,
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ];
    if (day > daysInMonth[month - 1]) {
      return null;
    }
    return {
      year: year,
      month: month,
      day: day,
      iso: trimmed
    };
  }

  /**
   * Return the browser's current local calendar date as YYYY-MM-DD.
   */
  function getTodayLocalIso(nowDate) {
    var d = nowDate instanceof Date ? nowDate : new Date();
    var y = String(d.getFullYear());
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  /**
   * Parse a decimal money string into integer minor units without floating-point arithmetic.
   * Accepts 1234.56 or 1234,56 without thousands separators.
   * Rejects empty, exponent notation, NaN/Infinity, >2 decimals, ambiguous separators.
   */
  function parseMoneyToMinor(raw, options) {
    var opts = options || {};
    var allowNegative = Boolean(opts.allowNegative);
    var allowZero = opts.allowZero !== false;

    if (typeof raw === "number") {
      if (!Number.isFinite(raw)) {
        return { ok: false, error: "Enter a valid number." };
      }
      raw = String(raw);
    }

    if (typeof raw !== "string") {
      return { ok: false, error: "Enter an amount." };
    }

    var trimmed = raw.trim();
    if (!trimmed) {
      return { ok: false, error: "This field is required." };
    }

    // Reject exponent notation, spaces, or unexpected characters
    if (/[eE\s]/.test(trimmed)) {
      return { ok: false, error: "Enter a plain number without spaces or exponent notation (e.g. 1234.56)." };
    }

    // Reject ambiguous mixed separators (both '.' and ',')
    if (trimmed.indexOf(".") !== -1 && trimmed.indexOf(",") !== -1) {
      return { ok: false, error: "Do not use thousands separators. Use a single dot or comma for decimals (e.g. 1234.56)." };
    }

    var match = /^([+-])?(\d+)(?:[.,](\d*))?$/.exec(trimmed);
    if (!match) {
      return { ok: false, error: "Enter a valid amount such as 1234.56 or 1234,56." };
    }

    var signStr = match[1] || "";
    var wholeStr = match[2];
    var fracStr = match[3];

    if (match[0].indexOf(".") !== -1 || match[0].indexOf(",") !== -1) {
      if (fracStr === undefined || fracStr.length === 0) {
        return { ok: false, error: "Include digits after the decimal separator (e.g. 12.50)." };
      }
      if (fracStr.length > 2) {
        return { ok: false, error: "Use at most two decimal places." };
      }
    }

    if (signStr === "+" ) {
      return { ok: false, error: "Do not include a plus sign." };
    }

    var isNegative = signStr === "-";
    if (isNegative && !allowNegative) {
      return { ok: false, error: "Amount cannot be negative." };
    }

    var paddedFrac = (fracStr || "").padEnd(2, "0");
    if (wholeStr.length > 9) {
      return { ok: false, error: "Amount must be at most 1,000,000.00." };
    }

    var minor = Number(wholeStr) * 100 + Number(paddedFrac);
    if (!Number.isSafeInteger(minor) || minor > MAX_ABS_MINOR) {
      return { ok: false, error: "Amount must be at most 1,000,000.00." };
    }

    if (minor === 0 && !allowZero) {
      return { ok: false, error: "Amount must be greater than zero." };
    }

    var signedMinor = isNegative && minor !== 0 ? -minor : minor;
    return { ok: true, minor: signedMinor };
  }

  /**
   * Format integer minor units to human-readable currency string.
   */
  function formatMinor(minor, currencyCode) {
    var spec = CURRENCIES[currencyCode] || CURRENCIES.USD;
    var isNeg = minor < 0;
    var abs = Math.abs(minor);
    var whole = Math.floor(abs / 100);
    var frac = String(abs % 100).padStart(2, "0");
    var wholeFormatted = whole.toLocaleString("en-US");
    var prefix = isNeg ? "-" : "";
    return prefix + spec.symbol + wholeFormatted + "." + frac;
  }

  /**
   * Validate inputs and compute the payday balance breakdown.
   * Pure function: no DOM, no storage, no telemetry.
   */
  function calculatePaydayBalance(input) {
    var errors = {
      balance: null,
      nextPayday: null,
      spendingAllowance: null,
      buffer: null,
      currency: null,
      billsLimit: null,
      bills: []
    };

    var currency = input && typeof input.currency === "string" && CURRENCIES[input.currency]
      ? input.currency
      : null;
    if (!currency) {
      errors.currency = "Select a supported currency (USD, EUR, GBP, or PLN).";
    }

    var asOfParsed = parseCalendarDate(input && input.asOf);
    if (!asOfParsed) {
      return {
        ok: false,
        errors: errors,
        fatalError: "Could not determine today's local calendar date."
      };
    }

    var balanceParsed = parseMoneyToMinor(input ? input.balance : "", {
      allowNegative: true,
      allowZero: true
    });
    if (!balanceParsed.ok) {
      errors.balance = balanceParsed.error;
    }

    var paydayParsed = parseCalendarDate(input ? input.nextPayday : "");
    if (!paydayParsed) {
      errors.nextPayday = "Enter a valid payday date (YYYY-MM-DD).";
    } else if (paydayParsed.iso < asOfParsed.iso) {
      errors.nextPayday = "Next expected payday cannot be before today (" + asOfParsed.iso + ").";
    }

    var spendingRaw = input && input.spendingAllowance !== undefined && String(input.spendingAllowance).trim() !== ""
      ? input.spendingAllowance
      : "0";
    var spendingParsed = parseMoneyToMinor(spendingRaw, {
      allowNegative: false,
      allowZero: true
    });
    if (!spendingParsed.ok) {
      errors.spendingAllowance = spendingParsed.error;
    }

    var bufferRaw = input && input.buffer !== undefined && String(input.buffer).trim() !== ""
      ? input.buffer
      : "0";
    var bufferParsed = parseMoneyToMinor(bufferRaw, {
      allowNegative: false,
      allowZero: true
    });
    if (!bufferParsed.ok) {
      errors.buffer = bufferParsed.error;
    }

    var rawBills = Array.isArray(input && input.bills) ? input.bills : [];
    if (rawBills.length > MAX_BILLS) {
      errors.billsLimit = "You can enter at most " + MAX_BILLS + " bill rows.";
    }

    var parsedBills = [];
    var hasBillError = false;

    for (var i = 0; i < rawBills.length; i++) {
      var row = rawBills[i] || {};
      var rowErr = { amount: null, dueDate: null };

      var amtParsed = parseMoneyToMinor(row.amount, {
        allowNegative: false,
        allowZero: false
      });
      if (!amtParsed.ok) {
        rowErr.amount = amtParsed.error;
        hasBillError = true;
      }

      var dueParsed = parseCalendarDate(row.dueDate);
      if (!dueParsed) {
        rowErr.dueDate = "Enter a valid due date (YYYY-MM-DD).";
        hasBillError = true;
      }

      errors.bills.push(rowErr);

      if (amtParsed.ok && dueParsed) {
        var label = typeof row.label === "string" ? row.label.trim().slice(0, 120) : "";
        var alreadyDeducted = Boolean(row.alreadyDeducted);
        parsedBills.push({
          id: row.id || "bill-" + i,
          label: label || "Unnamed bill",
          amountMinor: amtParsed.minor,
          dueDate: dueParsed.iso,
          alreadyDeducted: alreadyDeducted
        });
      }
    }

    var hasErrors = Boolean(
      errors.currency ||
      errors.balance ||
      errors.nextPayday ||
      errors.spendingAllowance ||
      errors.buffer ||
      errors.billsLimit ||
      hasBillError
    );

    if (hasErrors) {
      return { ok: false, errors: errors };
    }

    // Sort bills chronologically for display
    parsedBills.sort(function (a, b) {
      if (a.dueDate < b.dueDate) return -1;
      if (a.dueDate > b.dueDate) return 1;
      return 0;
    });

    var commitmentsMinor = 0;
    var excludedMinor = 0;
    var classifiedBills = [];

    for (var j = 0; j < parsedBills.length; j++) {
      var bill = parsedBills[j];
      var isOverdue = bill.dueDate < asOfParsed.iso;
      var isDueOnPayday = bill.dueDate === paydayParsed.iso;
      var isAfterPayday = bill.dueDate > paydayParsed.iso;

      var included = false;
      var statusReason = "";

      if (bill.alreadyDeducted) {
        included = false;
        statusReason = "Excluded: already deducted from your entered balance";
        excludedMinor += bill.amountMinor;
      } else if (isAfterPayday) {
        included = false;
        statusReason = "Excluded: due after next payday (" + paydayParsed.iso + ")";
        excludedMinor += bill.amountMinor;
      } else {
        included = true;
        commitmentsMinor += bill.amountMinor;
        if (isOverdue) {
          statusReason = "Included: overdue unpaid bill";
        } else if (isDueOnPayday) {
          statusReason = "Included: due on payday (conservatively covered)";
        } else {
          statusReason = "Included: due before payday";
        }
      }

      classifiedBills.push({
        id: bill.id,
        label: bill.label,
        amountMinor: bill.amountMinor,
        dueDate: bill.dueDate,
        alreadyDeducted: bill.alreadyDeducted,
        included: included,
        isOverdue: isOverdue,
        statusReason: statusReason
      });
    }

    var balanceAfterCommitmentsMinor =
      balanceParsed.minor - commitmentsMinor - spendingParsed.minor;
    var headroomMinor = balanceAfterCommitmentsMinor - bufferParsed.minor;
    var estimatedTransferMinor = headroomMinor > 0 ? headroomMinor : 0;
    var shortfallToPlanMinor = headroomMinor < 0 ? -headroomMinor : 0;

    return {
      ok: true,
      currency: currency,
      asOf: asOfParsed.iso,
      nextPayday: paydayParsed.iso,
      balanceMinor: balanceParsed.minor,
      commitmentsMinor: commitmentsMinor,
      excludedMinor: excludedMinor,
      spendingAllowanceMinor: spendingParsed.minor,
      bufferMinor: bufferParsed.minor,
      balanceAfterCommitmentsMinor: balanceAfterCommitmentsMinor,
      headroomMinor: headroomMinor,
      estimatedTransferMinor: estimatedTransferMinor,
      shortfallToPlanMinor: shortfallToPlanMinor,
      bills: classifiedBills
    };
  }

  return {
    CURRENCIES: CURRENCIES,
    MAX_ABS_MINOR: MAX_ABS_MINOR,
    MAX_BILLS: MAX_BILLS,
    parseCalendarDate: parseCalendarDate,
    getTodayLocalIso: getTodayLocalIso,
    parseMoneyToMinor: parseMoneyToMinor,
    formatMinor: formatMinor,
    calculatePaydayBalance: calculatePaydayBalance
  };
});
