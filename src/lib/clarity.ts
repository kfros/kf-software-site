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
 * Global site events.
 */
export const CLARITY_EVENTS = {
  // Global Events
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
