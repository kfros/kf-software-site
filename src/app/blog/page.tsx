import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Compass,
  Footprints,
  Layers,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import {
  editorialTracks,
  getArticlesByTrack,
  getChillPupGuides,
  ArticleRecord,
} from "./blog-posts";

export const metadata: Metadata = {
  title: "KF Software Blog | Engineering, Products & Market Discovery",
  description:
    "First-hand notes on backend engineering, building focused software products, market discovery, and practical ChillPup guides.",
  alternates: {
    canonical: "https://kf-software.com/blog/",
  },
  openGraph: {
    title: "KF Software Blog | Engineering, Products & Market Discovery",
    description:
      "First-hand notes on backend engineering, building focused software products, market discovery, and practical ChillPup guides.",
    url: "https://kf-software.com/blog/",
    type: "website",
  },
};

const trackIcons = {
  "engineering-notes": Code2,
  "product-build-notes": Layers,
  "market-discovery": Compass,
  "chillpup-guides": Footprints,
};

export default function BlogLandingPage() {
  const chillPupGuides = getChillPupGuides();
  const topGuides = chillPupGuides.slice(0, 3);

  return (
    <>
      <PageClarityTags siteSection="blog" product="kf_software" pageType="landing" />
      <Header activeItem="Blog" />

      <main className="min-h-screen bg-canvas text-ink py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header & Hero */}
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              Engineering, Products & Discovery
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Notes from building, testing, and maintaining software.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
              First-hand engineering decisions, product tradeoffs, market-discovery lessons, and practical guidance from KF Software products.
            </p>
          </section>

          {/* Four Editorial Tracks Grid */}
          <section className="mt-12 sm:mt-16" aria-labelledby="tracks-heading">
            <h2 id="tracks-heading" className="sr-only">
              Editorial Tracks
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {editorialTracks.map((track) => {
                const Icon = trackIcons[track.id] || BookOpen;
                const articles = getArticlesByTrack(track.id);
                const hasArticles = articles.length > 0;

                return (
                  <div
                    key={track.id}
                    id={track.anchorId}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs transition hover:border-brand/40 focus-within:ring-2 focus-within:ring-focus"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border ${
                            track.accent === "chillpup"
                              ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                              : "bg-surface-muted text-brand"
                          }`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        {hasArticles && (
                          <span className="rounded-full bg-surface-muted border border-border px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
                            {articles.length} {articles.length === 1 ? "guide" : "guides"}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 text-base font-bold text-ink">
                        {track.label}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      {track.hubHref ? (
                        <a
                          href={track.hubHref}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover focus:outline-none focus:underline"
                        >
                          <span>Explore hub</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-xs text-ink-muted italic">
                          Editorial notes in preparation
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dedicated ChillPup Guides Panel */}
          <section className="mt-16 sm:mt-20 theme-chillpup" aria-labelledby="chillpup-guides-panel">
            <div className="rounded-[28px] border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-border">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                    <Footprints className="h-3.5 w-3.5" aria-hidden="true" />
                    Product Hub
                  </div>
                  <h2 id="chillpup-guides-panel" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    ChillPup Guides
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-ink-muted max-w-2xl leading-relaxed">
                    Practical, owner-guided routines for stressful dog moments. Step-by-step calming sequences with clear veterinary safety boundaries.
                  </p>
                </div>
                <a
                  href="/chillpup/guides/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 shrink-0"
                >
                  <span>View all {chillPupGuides.length} guides</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              {/* Three Guide Previews */}
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {topGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </div>
          </section>

          {/* Restrained CTA */}
          <section className="mt-16 sm:mt-20 rounded-2xl border border-border bg-surface-muted p-8 sm:p-10 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-ink">
                Building small software and solving technical bottlenecks.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                Looking to discuss a focused backend problem or explore our software tools?
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/engineering/"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                >
                  Discuss an engineering problem
                </a>
                <a
                  href="/#products"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                >
                  Explore products
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

function GuideCard({ guide }: { guide: ArticleRecord }) {
  return (
    <a
      href={guide.href}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition hover:border-brand/40 hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-focus"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {guide.category && (
            <span className="rounded-md bg-brand-soft border border-brand/20 px-2 py-0.5 text-xs font-semibold text-brand">
              {guide.category}
            </span>
          )}
          {guide.badge && (
            <span className="rounded-md bg-surface-muted border border-border px-2 py-0.5 text-xs font-medium text-ink-muted">
              {guide.badge}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-ink group-hover:text-brand transition leading-snug">
          {guide.title}
        </h3>
        <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
          {guide.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-brand">
        <span>Read guide</span>
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </a>
  );
}
