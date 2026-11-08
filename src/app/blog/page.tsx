import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Compass,
  Footprints,
  Layers,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import {
  editorialTracks,
  getArticlesByTrack,
  publishedArticles,
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
  return (
    <>
      <PageClarityTags siteSection="blog" product="kf_software" pageType="landing" />
      <Header activeItem="Blog" />

      <main className="min-h-screen bg-canvas text-ink py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header & Hero */}
          <section className="max-w-3xl pb-12 sm:pb-16 border-b border-border">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              KF Software Journal
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Notes from building, testing, and maintaining software.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
              First-hand engineering decisions, product tradeoffs, market-discovery lessons, and practical guidance from KF Software products.
            </p>
          </section>

          {/* Editorial Tracks Summary Bar */}
          <section className="py-12 border-b border-border" aria-labelledby="tracks-heading">
            <h2 id="tracks-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted mb-6">
              Editorial Tracks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorialTracks.map((track) => {
                const Icon = trackIcons[track.id] || BookOpen;
                const articles = getArticlesByTrack(track.id);
                const hasArticles = articles.length > 0;

                return (
                  <div
                    key={track.id}
                    id={track.anchorId}
                    className="flex flex-col justify-between p-4 rounded-xl border border-border bg-surface shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border border-border ${
                            track.accent === "chillpup"
                              ? "bg-teal-500/10 text-teal-700 dark:text-teal-300"
                              : "bg-surface-muted text-brand"
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        {hasArticles && (
                          <span className="font-mono text-[11px] text-ink-muted font-semibold">
                            {articles.length} {articles.length === 1 ? "article" : "articles"}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-ink">
                        {track.label}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                        {track.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border">
                      {track.hubHref ? (
                        <a
                          href={track.hubHref}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                        >
                          <span>Explore hub</span>
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-ink-muted italic">
                          Editorial notes in preparation
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Publication Ledger / Index */}
          <section className="py-12 sm:py-16 border-b border-border" aria-labelledby="articles-heading">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                  Publication Index
                </span>
                <h2 id="articles-heading" className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  All published articles & guides
                </h2>
              </div>
              <span className="text-xs font-mono text-ink-muted">
                {publishedArticles.length} published records
              </span>
            </div>

            <div className="divide-y divide-border">
              {publishedArticles.map((article: ArticleRecord) => (
                <article
                  key={article.slug}
                  className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition hover:bg-surface-muted/40 px-2 rounded-lg"
                >
                  {/* Metadata Column (3 cols) */}
                  <div className="md:col-span-3 flex flex-wrap md:flex-col gap-2 text-xs">
                    <span className="font-mono font-bold uppercase tracking-wider text-brand">
                      {article.category || "General"}
                    </span>
                    <span className="text-ink-muted font-mono">
                      {article.datePublished}
                    </span>
                    {article.badge && (
                      <span className="inline-block self-start font-mono text-[10px] uppercase text-ink-muted px-1.5 py-0.5 rounded border border-border bg-surface">
                        {article.badge}
                      </span>
                    )}
                  </div>

                  {/* Narrative Column (9 cols) */}
                  <div className="md:col-span-9 space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug">
                      <a
                        href={article.href}
                        className="hover:text-brand transition focus:outline-none focus:underline"
                      >
                        {article.title}
                      </a>
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-3xl">
                      {article.description}
                    </p>
                    <div className="pt-2">
                      <a
                        href={article.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                      >
                        <span>Read complete guide</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Restrained Cross-links */}
          <section className="py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-ink-muted">
            <div>
              <p className="font-semibold text-ink">
                Building small software and solving technical bottlenecks.
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                Have a defined backend problem or want to test a workflow prototype?
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/engineering/"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus"
              >
                Discuss an engineering problem
              </a>
              <a
                href="/#products"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus"
              >
                Explore products
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
