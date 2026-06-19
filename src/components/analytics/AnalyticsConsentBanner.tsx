"use client";

import { useEffect, useState } from "react";
import { getConsentDecision, saveConsentDecision, ConsentDecision } from "./analyticsConsent";

export function AnalyticsConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check consent state on mount to avoid hydration mismatch
    const decision = getConsentDecision();
    if (decision === undefined) {
      setIsVisible(true);
    }
  }, []);

  const handleDecision = (decision: ConsentDecision) => {
    saveConsentDecision(decision);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-brand-dark/95 border border-slate-800 rounded-2xl p-5 shadow-soft text-white transition-all duration-300 animate-fade-in backdrop-blur-md">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-slate-300">
            Privacy & Cookies
          </h3>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            We use Microsoft Clarity to understand user behavior and improve our product pages. We do not track ads or collect personal details. You can accept or decline analytics cookie tracking.
          </p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => handleDecision("rejected")}
            className="px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-700 rounded-xl transition hover:bg-white/5 hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          >
            Reject analytics
          </button>
          <button
            onClick={() => handleDecision("accepted")}
            className="px-4 py-2 text-xs font-semibold text-white bg-brand-accent rounded-xl transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
