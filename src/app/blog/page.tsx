import React from "react";
import type { Metadata } from "next";
import { 
  BookOpen, 
  ArrowRight, 
  ShieldAlert, 
  Footprints, 
  Volume2, 
  HeartHandshake, 
  Stethoscope, 
  Moon, 
  Compass, 
  Home, 
  Clock, 
  AlertTriangle,
  Activity
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { HeroPhones } from "@/components/HeroPhones";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../store-links";
import { 
  featuredCoreArticles, 
  safetyArticles, 
  allArticles 
} from "./blog-posts";

// SEO metadata updated for ChillPup blog focus
export const metadata: Metadata = {
  title: "Dog Stress & Calm Routine Guides | ChillPup Blog | KF Software",
  description: "Practical ChillPup guides for dog walk fear, fireworks, loud noises, everyday stress, and safe next steps for owners.",
  alternates: {
    canonical: "https://kf-software.com/blog/",
  },
  openGraph: {
    title: "Dog Stress & Calm Routine Guides | ChillPup Blog",
    description: "Owner-guided guides for stressful dog moments, walk refusal, loud noises, and safe next steps.",
    url: "https://kf-software.com/blog/",
    type: "website",
  },
};

export default function BlogPage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ];

  const categories = [
    { label: "Walk Fear", href: "#walk-fear", icon: Footprints },
    { label: "Noise & Fireworks", href: "#noise-fireworks", icon: Volume2 },
    { label: "Home Stress", href: "#home-stress", icon: Home },
    { label: "Being Alone", href: "#being-alone", icon: Moon },
    { label: "Vet-Ready", href: "#safety-guides", icon: Stethoscope },
    { label: "Senior Dogs", href: "#safety-guides", icon: Clock },
  ];

  return (
    <>
      <PageClarityTags siteSection="blog" product="kf_software" pageType="blog_index" />
      <Header activeItem="Blog" navItems={navItems} />
      
      <main className="min-h-screen bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white text-[#526174]">
        
        {/* Section 1: Hero Section */}
        <section 
          id="hero" 
          aria-labelledby="hero-title"
          className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-100/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Copy Block */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                  CHILLPUP GUIDES
                </span>
                <h1 
                  id="hero-title"
                  className="mt-4 text-4xl font-extrabold tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl leading-[1.15]"
                >
                  Practical guides for stressful dog moments.
                </h1>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#526174] max-w-2xl">
                  Owner-guided articles about dog fear, walk refusal, loud noises, everyday stress, and safe next steps.
                </p>
                <div className="mt-10 flex flex-row items-center gap-4 flex-wrap">
                  <a
                    href="#walk-fear"
                    className="inline-flex h-[48px] items-center justify-center rounded-xl bg-[#0F766E] px-6 font-semibold text-white shadow-sm transition hover:bg-[#0B5F59] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2"
                  >
                    Explore Walk Fear guides
                  </a>
                  <a
                    href="/chillpup/"
                    className="inline-flex h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-[#0F1A2C] shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    Download ChillPup
                  </a>
                </div>
              </div>

              {/* Visual Block using existing HeroPhones component */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <HeroPhones />
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Walk Fear / Outdoor Freezing Grid */}
        <section 
          id="walk-fear" 
          aria-labelledby="walk-fear-title"
          className="py-16 sm:py-24 border-b border-slate-100/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                FEATURED CLUSTER
              </span>
              <h2 
                id="walk-fear-title"
                className="mt-2 text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl"
              >
                Start here: Walk Fear / Outdoor Freezing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#526174]">
                Practical guides for dogs who freeze at the door, refuse walks, panic after fireworks, or struggle with outdoor confidence.
              </p>
            </div>

            {/* Core Card Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredCoreArticles.map((article) => (
                <article 
                  key={article.slug}
                  className="group flex flex-col justify-between p-6 sm:p-8 bg-white border border-slate-200/60 rounded-[24px] shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex flex-row items-center gap-2 mb-4">
                      <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-[#0F766E] border border-teal-100">
                        {article.category}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-[#526174] border border-slate-100">
                        {article.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F1A2C] leading-snug group-hover:text-[#0F766E] transition duration-200">
                      <a href={article.href} className="focus:outline-none">
                        <span className="absolute inset-0 z-0 rounded-[24px]" aria-hidden="true" />
                        {article.title}
                      </a>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#526174]">
                      {article.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F766E] relative z-10">
                    <span>
                      {article.relatedRoutine ? `Routine: ${article.relatedRoutine}` : "Safety-First Guide"}
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition duration-200" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Browse by stressful moment */}
        <section 
          id="categories" 
          aria-labelledby="categories-title"
          className="bg-[#FAF8F5] py-12 border-b border-slate-100/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 
              id="categories-title"
              className="text-center text-2xl font-extrabold text-[#0F1A2C] mb-8"
            >
              Browse by stressful moment
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <a
                    key={cat.label}
                    href={cat.href}
                    className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#0F1A2C] shadow-sm hover:border-[#0F766E] hover:text-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition duration-200"
                  >
                    <Icon className="h-4 w-4 text-[#0F766E]" />
                    <span>{cat.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5: Safety Guides (When it may not be just anxiety) */}
        {/* Placed before the "Latest" feed and after Category section to ensure clean boundary alignment */}
        <section 
          id="safety-guides" 
          aria-labelledby="safety-guides-title"
          className="py-16 sm:py-24 border-b border-slate-100/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldAlert className="h-6 w-6 shrink-0" strokeWidth={2} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  SAFETY & EXCLUSIONS
                </span>
              </div>
              <h2 
                id="safety-guides-title"
                className="mt-2 text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl"
              >
                When it may not be just anxiety
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#526174]">
                Some behavior changes need tracking and a vet conversation before trying calming routines. Rule out pain, cognitive shifts, or medical events.
              </p>
            </div>

            {/* Warning-styled Card Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {safetyArticles.map((article) => (
                <article 
                  key={article.slug}
                  className="group flex flex-col justify-between p-6 sm:p-8 bg-[#FFFDF9] border border-amber-200/60 rounded-[24px] shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex flex-row items-center gap-2 mb-4">
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 border border-amber-100">
                        {article.category}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-[#FFFbeb] px-2 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200">
                        {article.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F1A2C] leading-snug group-hover:text-amber-800 transition duration-200">
                      <a href={article.href} className="focus:outline-none">
                        <span className="absolute inset-0 z-0 rounded-[24px]" aria-hidden="true" />
                        {article.title}
                      </a>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#526174]">
                      {article.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-amber-800 relative z-10">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Vet-ready tracking guide
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition duration-200" />
                  </div>
                </article>
              ))}
            </div>

            {/* Boundary Safety Notice */}
            <div className="mt-12 rounded-[24px] border border-amber-200/50 bg-[#FDFBF7] p-6 text-center text-sm leading-relaxed text-slate-700">
              <p className="max-w-3xl mx-auto">
                <strong>Important Safety Note:</strong> ChillPup is built for stressful dog moments, not medical conditions. If your dog exhibits signs of pain, severe lethargy, collapse, sudden aggression, or unexplained shaking, contact a veterinarian immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Latest ChillPup guides (combines all articles) */}
        <section 
          id="latest" 
          aria-labelledby="latest-title"
          className="py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 
                id="latest-title"
                className="text-3xl font-extrabold text-[#0F1A2C]"
              >
                Latest ChillPup guides
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#526174]">
                Short, practical articles for stressful dog moments.
              </p>
            </div>

            {/* Combined Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allArticles.map((article) => {
                const isSafety = article.isBoundaryContent;
                return (
                  <article 
                    key={article.slug}
                    className={`group flex flex-col justify-between p-6 rounded-[24px] border transition duration-300 ${
                      isSafety 
                        ? "bg-[#FFFDF9] border-amber-200/40 hover:border-amber-300 hover:shadow-md" 
                        : "bg-white border-slate-200/60 hover:border-[#0F766E] hover:shadow-md"
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border ${
                          isSafety 
                            ? "bg-amber-50 text-amber-800 border-amber-100" 
                            : "bg-teal-50 text-[#0F766E] border-teal-100"
                        }`}>
                          {article.category}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500 border border-slate-100">
                          {article.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0F1A2C] leading-snug group-hover:text-[#0F766E] transition duration-200">
                        <a href={article.href}>
                          {article.title}
                        </a>
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#526174]">
                        {article.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F766E]">
                      <span>Read Guide</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition duration-200" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: App CTA Block (Need a gentle next step?) */}
        <section 
          id="app-cta" 
          aria-labelledby="app-cta-title"
          className="bg-[#FAF8F5] py-16 sm:py-24 border-t border-b border-slate-100"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-[#E7DCCB] bg-[#F8F6F1] p-8 sm:p-12 text-center shadow-sm">
              <h2 
                id="app-cta-title"
                className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl leading-tight"
              >
                Need a gentle next step?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                ChillPup gives you short, owner-guided routines for stressful dog moments, without camera tracking, microphone monitoring, or diagnostic claims.
              </p>
              
              {/* Badges and CTAs */}
              <div className="mt-8 flex flex-row items-center justify-center gap-4 flex-wrap">
                {/* App Store Badge */}
                <a
                  href={APP_STORE_URL}
                  aria-label="Get ChillPup on the App Store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-85 shrink-0"
                >
                  <AppStoreBadge className="h-[40px] sm:h-[42px] w-auto" />
                </a>

                {/* Google Play Badge */}
                <a
                  href={GOOGLE_PLAY_URL}
                  aria-label="Get ChillPup on Google Play"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-85 shrink-0"
                >
                  <GooglePlayBadge className="h-[40px] sm:h-[42px] w-auto" />
                </a>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="/chillpup/"
                  className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B5F59]"
                >
                  Try ChillPup
                </a>
                <a
                  href="/blog/dog-suddenly-scared-to-go-outside/"
                  className="inline-flex h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-[#0F1A2C] shadow-sm transition hover:bg-slate-50"
                >
                  Start with the guide
                </a>
              </div>

              {/* Veterinary Disclaimer */}
              <p className="mt-8 border-t border-slate-200/60 pt-6 text-xs leading-relaxed text-[#526174] max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> ChillPup is not a veterinary or diagnostic app. If your dog shows sudden severe symptoms, pain, collapse, seizures, appetite changes, or unexplained panting or shaking, contact a veterinarian.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ContactModal />
    </>
  );
}
