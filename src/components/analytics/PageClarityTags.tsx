"use client";

import { useEffect } from "react";
import {
  setClarityTag,
  applyKitchenExhaustExperimentTags,
  CLARITY_TAGS,
} from "@/lib/clarity";
import { getConsentDecision } from "./analyticsConsent";

interface PageClarityTagsProps {
  siteSection: string;
  product: string;
  pageType: string;
  experiment?: string;
  experimentSurface?: string;
  enableCampaignAttribution?: boolean;
}

export function PageClarityTags({
  siteSection,
  product,
  pageType,
  experiment,
  experimentSurface,
  enableCampaignAttribution,
}: PageClarityTagsProps) {
  useEffect(() => {
    function applyTags() {
      if (getConsentDecision() !== "accepted") {
        return;
      }

      setClarityTag(CLARITY_TAGS.SITE_SECTION, siteSection);
      setClarityTag(CLARITY_TAGS.PRODUCT, product);
      setClarityTag(CLARITY_TAGS.PAGE_TYPE, pageType);

      if (experiment) {
        setClarityTag(CLARITY_TAGS.EXPERIMENT, experiment);
      }
      if (experimentSurface) {
        setClarityTag(CLARITY_TAGS.EXPERIMENT_SURFACE, experimentSurface);
      }
      if (enableCampaignAttribution) {
        applyKitchenExhaustExperimentTags();
      }
    }

    // Apply immediately if consent was already granted
    applyTags();

    // Listen for consent decision change if user accepts on banner
    function handleConsentChange(e: Event) {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === "accepted") {
        applyTags();
      }
    }

    window.addEventListener("kf_consent_change", handleConsentChange);
    return () => {
      window.removeEventListener("kf_consent_change", handleConsentChange);
    };
  }, [
    siteSection,
    product,
    pageType,
    experiment,
    experimentSurface,
    enableCampaignAttribution,
  ]);

  return null;
}
