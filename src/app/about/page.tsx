import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { ArrowLeft, Landmark } from "lucide-react";
import { brandIdentity } from "@/app/content";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";

export const metadata: Metadata = {
  title: {
    absolute: "About | KF Software",
  },
  description:
    "KF Software is an independent software studio founded by Kyryl Frosyniak in Wrocław, Poland.",
  alternates: {
    canonical: "https://kf-software.com/about/",
  },
  openGraph: {
    title: "About | KF Software",
    description:
      "KF Software is an independent software studio founded by Kyryl Frosyniak in Wrocław, Poland.",
    url: "https://kf-software.com/about/",
    type: "website",
  },
};

export default function AboutPlaceholder() {
  return (
    <>
      <PageClarityTags siteSection="about" product="kf_software" pageType="landing" />
        <Header activeItem="About" />
        <main className="min-h-[65vh] flex flex-col justify-center bg-canvas text-ink py-16 sm:py-24">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-brand shadow-xs mb-6 border border-border">
                <Landmark className="h-8 w-8" />
              </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  ABOUT US
                </p>
                  <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                    {brandIdentity.logoText}
                  </h1>
                    <p className="mt-4 text-base leading-relaxed text-ink-muted">
                      KF Software is an independent software studio founded by Kyryl Frosyniak,
                      a software engineer based in Wrocław, Poland. It builds focused consumer
                      and business software and validates new products through direct workflow
                      research before development.
                    </p>
                      <p className="mt-4 text-base leading-relaxed text-ink-muted">
                        The studio values privacy-conscious design, clear choices, and narrow,
                        practical products without dark patterns.
                      </p>
                      <div className="mt-8 flex justify-center">
                        <a
                          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 font-semibold text-ink shadow-sm transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                          href="/"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Back to home</span>
                        </a>
                      </div>
                    </div>
                  </main>
                  <Footer />
                  <ContactModal />
                </>
                );
}
