"use client";

import React, { useState, useRef } from "react";
import { trackClarityEvent } from "@/lib/clarity";
import { CheckCircle2, AlertCircle, Loader2, Send, FileText, Download } from "lucide-react";

const API_ENDPOINT = "https://api.kf-software.com/v1/kitchen-exhaust-requests";
const REQUEST_TIMEOUT_MS = 15000;
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const ERROR_MESSAGES: Record<number, string> = {
  400: "Check the email and description, then try again.",
  403: "This request could not be submitted from the current page.",
  413: "The description is too large. Shorten it and try again.",
  415: "The request format was not accepted. Refresh the page and try again.",
  503: "The request service is temporarily unavailable. Try again later or email requests@kf-software.com.",
};

const NETWORK_OR_TIMEOUT_ERROR =
  "We could not reach the request service. Check your connection and try again, or email requests@kf-software.com.";
const FALLBACK_ERROR =
  "Something went wrong. Try again later or email requests@kf-software.com.";

export function RequestSampleForm() {
  const [email, setEmail] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; projectDetails?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);

  const formStartedRef = useRef(false);
  const statusSummaryRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const detailsInputRef = useRef<HTMLTextAreaElement>(null);

  const handleInteraction = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackClarityEvent("ke_form_started");
    }
  };

  const validate = (): boolean => {
    const errors: { email?: string; projectDetails?: string } = {};
    const trimmedEmail = email.trim();
    const normalizedDetails = projectDetails.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

    if (!trimmedEmail) {
      errors.email = "Work email is required.";
    } else if (trimmedEmail.length > 254) {
      errors.email = "Work email must not exceed 254 characters.";
    } else if (/[\r\n]/.test(email) || !EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!normalizedDetails) {
      errors.projectDetails = "Please describe what you would like the report to document.";
    } else if (normalizedDetails.length < 10) {
      errors.projectDetails = "Description must be at least 10 characters.";
    } else if (normalizedDetails.length > 2000) {
      errors.projectDetails = "Description must not exceed 2000 characters.";
    }

    if (errors.email || errors.projectDetails) {
      setFieldErrors(errors);
      setFormError("Please correct the errors in the form before submitting.");
      setStatus("error");
      trackClarityEvent("ke_form_submit_error");

      // Focus the first invalid field
      if (errors.email) {
        emailInputRef.current?.focus();
      } else if (errors.projectDetails) {
        detailsInputRef.current?.focus();
      }
      return false;
    }

    setFieldErrors({});
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "submitting") {
      return;
    }

    // Reset stale errors
    setFormError(null);
    setFieldErrors({});

    if (!validate()) {
      return;
    }

    const trimmedEmail = email.trim();
    const normalizedDetails = projectDetails.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

    trackClarityEvent("ke_form_submit_attempt");
    setStatus("submitting");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          project_details: normalizedDetails,
          source_page: "kitchen-exhaust-reports",
          website: website,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 201) {
        const data = await response.json().catch(() => null);
        if (data && data.accepted === true) {
          setStatus("success");
          trackClarityEvent("ke_form_submit_success");
          setTimeout(() => {
            statusSummaryRef.current?.focus();
          }, 50);
          return;
        }

        // Malformed 201 payload
        setFormError(FALLBACK_ERROR);
        setStatus("error");
        trackClarityEvent("ke_form_submit_error");
        setTimeout(() => {
          statusSummaryRef.current?.focus();
        }, 50);
        return;
      }

      const errorMsg = ERROR_MESSAGES[response.status] || FALLBACK_ERROR;
      setFormError(errorMsg);
      setStatus("error");
      trackClarityEvent("ke_form_submit_error");
      setTimeout(() => {
        statusSummaryRef.current?.focus();
      }, 50);
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (
        err instanceof Error &&
        (err.name === "AbortError" ||
          err.message.toLowerCase().includes("network") ||
          err.message.toLowerCase().includes("fetch"))
      ) {
        setFormError(NETWORK_OR_TIMEOUT_ERROR);
      } else {
        setFormError(NETWORK_OR_TIMEOUT_ERROR);
      }

      setStatus("error");
      trackClarityEvent("ke_form_submit_error");
      setTimeout(() => {
        statusSummaryRef.current?.focus();
      }, 50);
    }
  };

  return (
    <div className="w-full">
      {/* Live region for accessibility updates */}
      <div aria-live="polite" className="sr-only">
        {status === "submitting" && "Sending request..."}
        {status === "success" &&
          "Request received. We will reply by email with the next step for sending anonymized photos and notes."}
        {status === "error" && formError}
      </div>

      {status === "success" ? (
        <div
          ref={statusSummaryRef}
          tabIndex={-1}
          className="rounded-2xl border border-teal-200 bg-teal-50/70 p-6 sm:p-8 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A535C]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1A535C] text-white">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F1A2C]">Request received</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
                Request received. We will reply by email with the next step for sending
                anonymized photos and notes.
              </p>
              <div className="mt-4 pt-4 border-t border-teal-200/60 text-xs text-slate-600">
                Submitted email: <span className="font-semibold text-slate-800">{email.trim()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {formError && (
            <div
              ref={statusSummaryRef}
              tabIndex={-1}
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
                <p className="leading-snug">{formError}</p>
              </div>
            </div>
          )}

          {/* Honeypot field (visually hidden without aria-hidden on a focusable element) */}
          <div
            className="absolute opacity-0 pointer-events-none -z-10 h-0 w-0 overflow-hidden"
            tabIndex={-1}
          >
            <label htmlFor="website-field">Website</label>
            <input
              id="website-field"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="request-email"
              className="block text-sm font-semibold text-[#0F1A2C] mb-1.5"
            >
              Work email <span className="text-red-500">*</span>
            </label>
            <input
              ref={emailInputRef}
              id="request-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              disabled={status === "submitting"}
              value={email}
              onFocus={handleInteraction}
              onChange={(e) => {
                handleInteraction();
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:cursor-not-allowed ${
                fieldErrors.email
                  ? "border-red-400 focus:ring-red-500"
                  : "border-slate-300 focus:border-transparent focus:ring-[#1A535C]"
              }`}
              placeholder="technician@servicecompany.com"
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Project details field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="request-details"
                className="block text-sm font-semibold text-[#0F1A2C]"
              >
                What would you like the report to document? <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-500">
                {projectDetails.length}/2000
              </span>
            </div>
            <textarea
              ref={detailsInputRef}
              id="request-details"
              name="project_details"
              required
              rows={4}
              maxLength={2000}
              disabled={status === "submitting"}
              value={projectDetails}
              onFocus={handleInteraction}
              onChange={(e) => {
                handleInteraction();
                setProjectDetails(e.target.value);
                if (fieldErrors.projectDetails) {
                  setFieldErrors((prev) => ({ ...prev, projectDetails: undefined }));
                }
              }}
              aria-invalid={!!fieldErrors.projectDetails}
              aria-describedby={
                fieldErrors.projectDetails
                  ? "details-help details-error"
                  : "details-help"
              }
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:cursor-not-allowed resize-y min-h-[120px] ${
                fieldErrors.projectDetails
                  ? "border-red-400 focus:ring-red-500"
                  : "border-slate-300 focus:border-transparent focus:ring-[#1A535C]"
              }`}
              placeholder="e.g. Hood interior, baffle filters, and accessible ductwork for a commercial restaurant kitchen service visit."
            />
            <p id="details-help" className="mt-1.5 text-xs text-slate-500 leading-normal">
              10 to 2000 characters. Do not include confidential customer information here.
            </p>
            {fieldErrors.projectDetails && (
              <p id="details-error" className="mt-1.5 text-xs sm:text-sm text-red-600 font-medium">
                {fieldErrors.projectDetails}
              </p>
            )}
          </div>

          {/* Privacy statement */}
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs text-slate-600 leading-relaxed">
            We use your email and description only to respond to this request. Do not
            submit confidential customer details in this form. See our{" "}
            <a
              href="/privacy-policy/"
              className="text-[#1A535C] font-semibold underline hover:text-[#0F1A2C] focus:outline-none focus:ring-1 focus:ring-[#1A535C] rounded"
            >
              Privacy Policy
            </a>
            .
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1A2C] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-white" aria-hidden="true" />
                  <span>Sending request...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 opacity-90" aria-hidden="true" />
                  <span>Request a free sample</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export function SamplePdfViewer() {
  const handleView = () => {
    trackClarityEvent("ke_demo_view_click");
  };

  const handleDownload = () => {
    trackClarityEvent("ke_demo_download_click");
  };

  return (
    <div className="w-full space-y-4">
      {/* Top action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#0F1A2C]">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F1A2C]">
              Pinecrest Family Diner — Sample Report
            </p>
            <p className="text-xs text-slate-500">
              PDF document (demonstration case)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleView}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1A2C] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
          >
            <span>View sample PDF</span>
          </a>
          <a
            href="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf"
            download="pinecrest-family-diner-sample-report.pdf"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#0F1A2C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
          >
            <Download className="h-4 w-4 opacity-80" aria-hidden="true" />
            <span>Download sample PDF</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF container */}
      <div className="w-full h-[520px] sm:h-[680px] lg:h-[840px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-100">
        <object
          data="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf#toolbar=1"
          type="application/pdf"
          title="Fictional Kitchen Exhaust Service Sample Report PDF"
          className="w-full h-full"
        >
          {/* Visible fallback if browser cannot embed PDF */}
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-slate-50 text-slate-700">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200/80 text-slate-700 mb-4">
              <FileText className="h-7 w-7" aria-hidden="true" />
            </div>
            <h4 className="text-base font-bold text-[#0F1A2C] mb-2">
              Pinecrest Family Diner Sample Report
            </h4>
            <p className="max-w-md text-sm text-slate-600 mb-6 leading-relaxed">
              PDF preview is not supported directly by your browser. You can view or download
              the full sample report document using the links below.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleView}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1A2C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
              >
                <span>View sample PDF</span>
              </a>
              <a
                href="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf"
                download="pinecrest-family-diner-sample-report.pdf"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#0F1A2C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
              >
                <Download className="h-4 w-4 opacity-80" aria-hidden="true" />
                <span>Download sample PDF</span>
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}

