import React from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Footprints,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../../contact-modal";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../store-links";
import { getChillPupGuides, ArticleRecord } from "../../blog/blog-posts";

export const metadata: Metadata = {
  title: "ChillPup Guides | Practical Support for Stressful Dog Moments",
  description:
    "Practical owner-guided articles for walk fear, fireworks, loud noises, wet weather, and safe next steps.",
  alternates: {
    canonical: "https://kf-software.com/chillpup/guides/",
  },
  openGraph: {
    title: "ChillPup Guides | Practical Support for Stressful Dog Moments",
    description:
      "Practical owner-guided articles for walk fear, fireworks, loud noises, wet weather, and safe next steps.",
    url: "https://kf-software.com/chillpup/guides/",
    type: "website",
  },
};

export default function ChillPupGuidesHubPage() {
  const guides = getChillPupGuides();

  // Distinct categories present among published guides
  const categories = Array.from(
    new Set(guides.map((g) => g.category).filter(Boolean))
  ) as string[];

  return (
    <>
      <PageClarityTags siteSection="guides" product="chillpup" pageType="guides_hub" />
      <Header activeItem="ChillPup" />

      <main className="theme-chillpup min-h-screen bg-canvas text-ink py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back link */}
          <div className="mb-8">
            <a
              href="/chillpup/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition focus:outline-none focus:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to ChillPup Overview</span>
            </a>
          </div>

          {/* Hero */}
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              ChillPup Knowledge Base
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              ChillPup Guides
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-muted">
              Practical, step-by-step calming routines and safety checks for stressful dog moments—fireworks, loud sounds, walk refusal, and wet weather reluctance.
            </p>
          </section>

          {/* App download strip */}
          <section className="mt-8 rounded-2xl border border-border bg-surface p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Footprints className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand">
                  Mobile Companion
                </p>
                <p className="text-sm font-semibold text-ink">
                  Access guided routines anytime on your phone
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={APP_STORE_URL}
                aria-label="Download ChillPup on the App Store"
                className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg"
              >
                <AppStoreBadge className="h-[36px] w-auto" />
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                aria-label="Get ChillPup on Google Play"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg"
              >
                <GooglePlayBadge className="h-[36px] w-auto" />
              </a>
            </div>
          </section>

          {/* Veterinary Safety Boundary */}
          <section className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6 text-ink">
            <div className="flex items-start gap-3.5">
              <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm leading-relaxed text-ink-muted space-y-1">
                <p className="font-semibold text-ink">
                  Veterinary & Safety Boundary
                </p>
                <p>
                  ChillPup routines are owner-guided exercises intended for everyday behavioral stress. They do not replace veterinary care or medical diagnosis. If your dog shows sudden severe symptoms, pain, collapse, or unexplained trembling, contact your veterinarian immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Topic Grouped Articles */}
          <section className="mt-12 sm:mt-16 space-y-12" aria-labelledby="all-guides-heading">
            <h2 id="all-guides-heading" className="text-2xl font-bold text-ink">
              Published Guides ({guides.length})
            </h2>

            {categories.map((category) => {
              const categoryGuides = guides.filter((g) => g.category === category);
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-border">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Topic
                    </span>
                    <h3 className="text-lg font-bold text-ink">{category}</h3>
                    <span className="text-xs text-ink-muted">
                      ({categoryGuides.length} {categoryGuides.length === 1 ? "guide" : "guides"})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryGuides.map((guide) => (
                      <HubGuideCard key={guide.slug} guide={guide} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Return link */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm">
            <a
              href="/chillpup/"
              className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover focus:outline-none focus:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to ChillPup</span>
            </a>
            <a
              href="/blog/"
              className="inline-flex items-center gap-2 font-semibold text-ink-muted hover:text-ink focus:outline-none focus:underline"
            >
              <span>Explore KF Software Blog</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <ContactModal />
    </>
  );
}

function HubGuideCard({ guide }: { guide: ArticleRecord }) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-xs transition hover:border-brand/40 focus-within:ring-2 focus-within:ring-focus">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {guide.badge && (
            <span className="rounded-md bg-surface-muted border border-border px-2.5 py-0.5 text-xs font-semibold text-ink-muted">
              {guide.badge}
            </span>
          )}
          {guide.relatedRoutine && (
            <span className="rounded-md bg-brand-soft border border-brand/20 px-2.5 py-0.5 text-xs font-semibold text-brand">
              {guide.relatedRoutine}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-ink leading-snug">
          <a
            href={guide.href}
            className="hover:text-brand transition focus:outline-none"
          >
            {guide.title}
          </a>
        </h3>
        <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
          {guide.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold">
        <span className="text-ink-muted">Published: {guide.datePublished}</span>
        <a
          href={guide.href}
          className="inline-flex items-center gap-1 text-brand hover:text-brand-hover focus:outline-none focus:underline"
        >
          <span>Read guide</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

