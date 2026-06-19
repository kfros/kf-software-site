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
 * Safely tracks a custom event in Microsoft Clarity.
 * Normalizes event name, filters PII, and only triggers if analytics consent was accepted.
 */
export function trackClarityEvent(eventName: string): void {
  if (typeof window === "undefined") {
    return;
  }

  // Strictly check consent before tracking any custom events
  if (getConsentDecision() !== "accepted") {
    return;
  }

  // Ensure queue exists to prevent throwing before script loads
  window.clarity = window.clarity || function(...args) {
    (window.clarity!.q = window.clarity!.q || []).push(args);
  };

  // Normalize eventName (lowercase, replace non-alphanumeric with underscores)
  const normalizedEventName = eventName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_");

  window.clarity("event", normalizedEventName);
}

/**
 * Safely sets a custom tag in Microsoft Clarity.
 * Only triggers if analytics consent was accepted.
 */
export function setClarityTag(key: string, value: string | string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  // Strictly check consent before setting custom tags
  if (getConsentDecision() !== "accepted") {
    return;
  }

  window.clarity = window.clarity || function(...args) {
    (window.clarity!.q = window.clarity!.q || []).push(args);
  };

  const normalizedKey = key.toLowerCase().trim().replace(/[^a-z0-9_]/g, "_");
  
  if (Array.isArray(value)) {
    const normalizedValues = value.map(val => 
      val.toLowerCase().trim().replace(/[^a-z0-9_]/g, "_")
    );
    window.clarity("set", normalizedKey, normalizedValues);
  } else {
    const normalizedValue = value.toLowerCase().trim().replace(/[^a-z0-9_]/g, "_");
    window.clarity("set", normalizedKey, normalizedValue);
  }
}
