import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  Code2,
  Compass,
  Layers,
  MapPin,
  Building2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { brandIdentity } from "@/app/content";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";

export const metadata: Metadata = {
  title: "About | KF Software by Kyryl Frosyniak",
  description:
    "KF Software is an independent software studio founded by Kyryl Frosyniak in Wrocław, Poland, building focused software products and providing senior backend engineering.",
  alternates: {
    canonical: "https://kf-software.com/about/",
  },
  openGraph: {
    title: "About | KF Software by Kyryl Frosyniak",
    description:
      "KF Software is an independent software studio founded by Kyryl Frosyniak in Wrocław, Poland, building focused software products and providing senior backend engineering.",
    url: "https://kf-software.com/about/",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageClarityTags siteSection="about" product="kf_software" pageType="landing" />
      <Header activeItem="About" />

      <main className="min-h-screen bg-canvas text-ink py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Studio Header & Positioning */}
          <section className="pb-12 sm:pb-16 border-b border-border">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              Studio & Founder
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Independent software products and senior engineering.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-muted max-w-3xl">
              KF Software is an independent software studio founded by Kyryl Frosyniak in Wrocław, Poland. It builds focused software products, validates workflow ideas before expanding them, and provides selected backend engineering support.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="/#products"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Explore products
              </a>
              <a
                href="/engineering/"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                View engineering
              </a>
              <a
                href="/blog/"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Read the journal
              </a>
            </div>
          </section>

          {/* Three Operating Pillars (Ruled Editorial Layout) */}
          <section className="py-16 sm:py-20 border-b border-border" aria-labelledby="pillars-heading">
            <div className="max-w-2xl mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                Structure
              </span>
              <h2 id="pillars-heading" className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                How the studio is organized
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                Our public work is organized into three distinct tracks with clear technical boundaries:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted border border-border text-brand mb-2">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-ink">Products</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                  Focused software products and workflow experiments, including ChillPup and Kitchen Exhaust Reports.
                </p>
                <div className="pt-2">
                  <a
                    href="/#products"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <span>View products</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted border border-border text-brand mb-2">
                  <Code2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-ink">Engineering</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                  Senior backend engineering for .NET backends, system integrations, migrations, and stabilization.
                </p>
                <div className="pt-2">
                  <a
                    href="/engineering/"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <span>Explore services</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted border border-border text-brand mb-2">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-ink">KF Software Blog</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                  First-hand notes on architecture, product building, market discovery, and practical ChillPup routines.
                </p>
                <div className="pt-2">
                  <a
                    href="/blog/"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <span>Read articles</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Identity & Founder Info (Bounded editorial card) */}
          <section className="pt-16 sm:pt-20" aria-labelledby="identity-heading">
            <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10 shadow-xs">
              <div id="kyryl-frosyniak" className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted border border-border text-brand">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="identity-heading" className="text-lg font-bold text-ink">
                    Company Identity & Registration
                  </h2>
                  <p className="text-xs text-ink-muted">Official legal and business details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm leading-relaxed">
                <div className="space-y-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                    Legal Operating Entity
                  </p>
                  <p className="font-semibold text-ink">{brandIdentity.legalName}</p>
                  <p className="text-ink-muted">Founder & Principal: Kyryl Frosyniak</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                    Location & Registration
                  </p>
                  <p className="text-ink flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
                    <span>{brandIdentity.location}</span>
                  </p>
                  <p className="text-ink-muted font-mono text-xs">{brandIdentity.taxIdentifiers}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
                <span>
                  Direct communication:{" "}
                  <a href="mailto:contact@kf-software.com" className="text-brand hover:underline font-semibold">
                    contact@kf-software.com
                  </a>
                </span>
                <a
                  href="/business-details/"
                  className="font-semibold text-brand hover:underline focus:outline-none"
                >
                  View full registration & address details →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <ContactModal />
    </>
  );
}
