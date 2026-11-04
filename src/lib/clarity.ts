import { getConsentDecision } from "@/components/analytics/analyticsConsent";

declare global {
  interface Window {
    clarity?: {
      (...args: any[]): void;
      q?: any[];
    };
  }
}

/**
 * Central event dictionary for Microsoft Clarity.
 * Pre-existing global events and Kitchen Exhaust funnel events.
 */
export const CLARITY_EVENTS = {
  // Kitchen Exhaust Funnel Events
  KE_PDF_OPEN: "ke_pdf_open",
  KE_PDF_DOWNLOAD: "ke_pdf_download",
  KE_FORM_START: "ke_form_start",
  KE_FORM_SUBMIT_ATTEMPT: "ke_form_submit_attempt",
  KE_FORM_SUBMIT_SUCCESS: "ke_form_submit_success",
  KE_FORM_SUBMIT_ERROR: "ke_form_submit_error",

  // Pre-existing Global Events
  SUPPORT_EMAIL_CLICK: "support_email_click",
  CONTACT_EMAIL_CLICK: "contact_email_click",
  APP_STORE_CLICK: "app_store_click",
  BLOG_TO_CHILLPUP_CLICK: "blog_to_chillpup_click",
  CHILLPUP_CTA_CLICK: "chillpup_cta_click",
  EXTERNAL_LINK_CLICK: "external_link_click",
} as const;

export type ClarityEventName =
  | typeof CLARITY_EVENTS[keyof typeof CLARITY_EVENTS]
  | string;

/**
 * Central custom tag dictionary for Microsoft Clarity.
 */
export const CLARITY_TAGS = {
  SITE_SECTION: "site_section",
  PRODUCT: "product",
  PAGE_TYPE: "page_type",
  EXPERIMENT: "experiment",
  EXPERIMENT_SURFACE: "experiment_surface",
  ERROR_TYPE: "error_type",
  UTM_SOURCE: "utm_source",
  UTM_MEDIUM: "utm_medium",
  UTM_CAMPAIGN: "utm_campaign",
} as const;

export type ClarityTagName =
  | typeof CLARITY_TAGS[keyof typeof CLARITY_TAGS]
  | string;

/**
 * Allowlisted query parameter values for cohort attribution.
 * Unapproved keys or values must never be forwarded to Clarity.
 */
export const ALLOWED_CAMPAIGN_PARAMS = {
  utm_source: ["outreach", "community"],
  utm_medium: ["email", "social"],
  utm_campaign: ["ke_cohort_2", "ke_cohort_3"],
} as const;

export type AllowedErrorType = "timeout" | "network" | "server" | "unexpected";

const ALLOWED_ERROR_TYPES: readonly AllowedErrorType[] = [
  "timeout",
  "network",
  "server",
  "unexpected",
];

/**
 * Safely tracks a custom event in Microsoft Clarity.
 * Normalizes event name and only triggers if analytics consent was accepted.
 * Safely no-ops if window, Clarity, or consent is unavailable.
 */
export function trackClarityEvent(eventName: ClarityEventName): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    if (getConsentDecision() !== "accepted") {
      return;
    }

    window.clarity =
      window.clarity ||
      function (...args) {
        (window.clarity!.q = window.clarity!.q || []).push(args);
      };

    const normalizedEventName = eventName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_]/g, "_")
      .replace(/_+/g, "_");

    window.clarity("event", normalizedEventName);
  } catch {
    // Analytics failure must never disrupt product behavior
  }
}

/**
 * Safely sets a custom tag in Microsoft Clarity.
 * Only triggers if analytics consent was accepted.
 */
export function setClarityTag(
  key: ClarityTagName,
  value: string | string[]
): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    if (getConsentDecision() !== "accepted") {
      return;
    }

    window.clarity =
      window.clarity ||
      function (...args) {
        (window.clarity!.q = window.clarity!.q || []).push(args);
      };

    const normalizedKey = key
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_]/g, "_");

    if (Array.isArray(value)) {
      const normalizedValues = value.map((val) =>
        val.toLowerCase().trim().replace(/[^a-z0-9_]/g, "_")
      );
      window.clarity("set", normalizedKey, normalizedValues);
    } else {
      const normalizedValue = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_]/g, "_");
      window.clarity("set", normalizedKey, normalizedValue);
    }
  } catch {
    // Analytics failure must never disrupt product behavior
  }
}

/**
 * Typed helpers for Kitchen Exhaust funnel events
 */

export function trackKePdfOpen(): void {
  trackClarityEvent(CLARITY_EVENTS.KE_PDF_OPEN);
}

export function trackKePdfDownload(): void {
  trackClarityEvent(CLARITY_EVENTS.KE_PDF_DOWNLOAD);
}

export function trackKeFormStart(): void {
  trackClarityEvent(CLARITY_EVENTS.KE_FORM_START);
}

export function trackKeFormSubmitAttempt(): void {
  trackClarityEvent(CLARITY_EVENTS.KE_FORM_SUBMIT_ATTEMPT);
}

export function trackKeFormSubmitSuccess(): void {
  trackClarityEvent(CLARITY_EVENTS.KE_FORM_SUBMIT_SUCCESS);
}

export function trackKeFormSubmitError(errorType?: AllowedErrorType): void {
  if (errorType && ALLOWED_ERROR_TYPES.includes(errorType)) {
    setClarityTag(CLARITY_TAGS.ERROR_TYPE, errorType);
  }
  trackClarityEvent(CLARITY_EVENTS.KE_FORM_SUBMIT_ERROR);
}

/**
 * Applies always-on experiment tags and checks window.location.search
 * for allowlisted campaign parameters.
 */
export function applyKitchenExhaustExperimentTags(): void {
  try {
    if (typeof window === "undefined") {
      return;
    }

    if (getConsentDecision() !== "accepted") {
      return;
    }

    // Always-on experiment tags for Kitchen Exhaust page
    setClarityTag(CLARITY_TAGS.EXPERIMENT, "ke_v1");
    setClarityTag(CLARITY_TAGS.EXPERIMENT_SURFACE, "kitchen_exhaust_reports");

    // Read allowlisted campaign parameters from query string
    const searchParams = new URLSearchParams(window.location.search);

    const source = searchParams.get("utm_source");
    if (
      source &&
      ALLOWED_CAMPAIGN_PARAMS.utm_source.includes(
        source as (typeof ALLOWED_CAMPAIGN_PARAMS.utm_source)[number]
      )
    ) {
      setClarityTag(CLARITY_TAGS.UTM_SOURCE, source);
    }

    const medium = searchParams.get("utm_medium");
    if (
      medium &&
      ALLOWED_CAMPAIGN_PARAMS.utm_medium.includes(
        medium as (typeof ALLOWED_CAMPAIGN_PARAMS.utm_medium)[number]
      )
    ) {
      setClarityTag(CLARITY_TAGS.UTM_MEDIUM, medium);
    }

    const campaign = searchParams.get("utm_campaign");
    if (
      campaign &&
      ALLOWED_CAMPAIGN_PARAMS.utm_campaign.includes(
        campaign as (typeof ALLOWED_CAMPAIGN_PARAMS.utm_campaign)[number]
      )
    ) {
      setClarityTag(CLARITY_TAGS.UTM_CAMPAIGN, campaign);
    }
  } catch {
    // Safety guard
  }
}
