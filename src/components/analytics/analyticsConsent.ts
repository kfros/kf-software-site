"use client";

export type ConsentDecision = "accepted" | "rejected";

const CONSENT_KEY = "kf_analytics_consent";

export function getConsentDecision(): ConsentDecision | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  const saved = localStorage.getItem(CONSENT_KEY);
  if (saved === "accepted" || saved === "rejected") {
    return saved;
  }
  return undefined;
}

export function saveConsentDecision(decision: ConsentDecision): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(CONSENT_KEY, decision);
  
  // Update Clarity dynamically if it is loaded
  if (window.clarity) {
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: decision === "accepted" ? "granted" : "denied"
    });
  }
}
