"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getConsentDecision } from "./analyticsConsent";
import { trackClarityEvent } from "@/lib/clarity";

export function MicrosoftClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  useEffect(() => {
    if (!projectId) return;

    // Initialize Clarity queue if not already present
    window.clarity = window.clarity || function(...args) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    };

    // Apply default consentv2 settings immediately before tag runs
    const savedDecision = getConsentDecision();
    if (savedDecision === "accepted") {
      window.clarity("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "granted"
      });
    } else {
      // Default to denied if decision is rejected or not yet made
      window.clarity("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "denied"
      });
    }

    // Set up global click tracking for key events
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // 1. Support email clicks
      if (href.startsWith("mailto:support@kf-software.com")) {
        trackClarityEvent("support_email_click");
      }
      // 2. Contact email clicks
      else if (href.startsWith("mailto:contact@kf-software.com")) {
        trackClarityEvent("contact_email_click");
      }
      // 3. App Store link clicks
      else if (href.includes("apps.apple.com/app/id6762043750")) {
        trackClarityEvent("app_store_click");
      }
      // 4. Internal blog-to-chillpup transitions
      else if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/blog") &&
        (href === "/chillpup/" || href === "/chillpup")
      ) {
        trackClarityEvent("blog_to_chillpup_click");
      }
      // 5. ChillPup CTA button click (homepage Hero Explore button targets #chillpup)
      else if (href === "#chillpup") {
        trackClarityEvent("chillpup_cta_click");
      }
      // 6. Generic external link clicks (non-App-Store, non-mailto)
      else if (href.startsWith("http") && !href.includes("kf-software.com")) {
        trackClarityEvent("external_link_click");
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [projectId]);

  if (!projectId) {
    return null;
  }

  const scriptCode = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","${projectId}");
  `;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: scriptCode }}
    />
  );
}
