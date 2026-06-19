"use client";

import { useEffect } from "react";
import { setClarityTag } from "@/lib/clarity";

interface PageClarityTagsProps {
  siteSection: string;
  product: string;
  pageType: string;
}

export function PageClarityTags({ siteSection, product, pageType }: PageClarityTagsProps) {
  useEffect(() => {
    setClarityTag("site_section", siteSection);
    setClarityTag("product", product);
    setClarityTag("page_type", pageType);
  }, [siteSection, product, pageType]);

  return null;
}
