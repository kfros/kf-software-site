import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  Code2,
  Compass,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Building2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { brandIdentity, publicPillars } from "@/app/content";
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header & Hero */}
          <section className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              KF Software by Kyryl Frosyniak
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Independent software products and senior engineering.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-muted">
              KF Software is an independent software studio founded by Kyryl Frosyniak in Wrocław, Poland. It builds focused software products, validates workflow ideas before expanding them, and provides selected backend engineering support.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="/#products"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Explore products
              </a>
              <a
                href="/engineering/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                View engineering
              </a>
              <a
                href="/blog/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Read the blog
              </a>
            </div>
          </section>

          {/* Core Studio Pillars */}
          <section className="mt-16 sm:mt-20" aria-labelledby="pillars-heading">
            <h2 id="pillars-heading" className="text-2xl font-bold text-ink">
              How the studio is organized
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-muted">
              Our public work is organized into three distinct pillars:
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted border border-border text-brand mb-4">
                    <Layers className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-ink">Products</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                    Focused software products and workflow experiments, including ChillPup and Kitchen Exhaust Reports.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <a
                    href="/#products"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <span>View products</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted border border-border text-brand mb-4">
                    <Code2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-ink">Engineering</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                    Senior backend engineering for .NET backends, system integrations, migrations, and stabilization.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <a
                    href="/engineering/"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <span>Explore services</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted border border-border text-brand mb-4">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-ink">KF Software Blog</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                    First-hand notes on architecture, product building, market discovery, and practical ChillPup routines.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border">
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

          {/* Legal Identity & Founder Info */}
          <section className="mt-16 sm:mt-20 rounded-[28px] border border-border bg-surface-raised p-8 sm:p-10 shadow-sm" aria-labelledby="identity-heading">
            <div id="kyryl-frosyniak" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted border border-border text-brand">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="identity-heading" className="text-lg font-bold text-ink">
                  Company Identity & Registration
                </h2>
                <p className="text-xs text-ink-muted">Official legal and business details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm leading-relaxed">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Legal Operating Entity
                </p>
                <p className="font-semibold text-ink">{brandIdentity.legalName}</p>
                <p className="text-ink-muted">Founder & Principal: Kyryl Frosyniak</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
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
              <span>Direct communication: <a href="mailto:contact@kf-software.com" className="text-brand hover:underline">contact@kf-software.com</a></span>
              <a
                href="/business-details/"
                className="font-semibold text-brand hover:underline focus:outline-none"
              >
                View full registration & address details →
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <ContactModal />
    </>
  );
}
