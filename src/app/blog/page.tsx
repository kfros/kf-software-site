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
  Clock, 
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { HeroPhones } from "@/components/HeroPhones";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../store-links";

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

  const pickerCards = [
    {
      label: "Won’t go outside",
      href: "/blog/dog-suddenly-scared-to-go-outside/",
      badge: "Walk Fear",
      icon: Footprints,
      isSafety: false
    },
    {
      label: "Freezes after fireworks",
      href: "/blog/dog-freezes-on-walks-after-fireworks/",
      badge: "Walk Fear",
      icon: Volume2,
      isSafety: false
    },
    {
      label: "Scared at night",
      href: "/blog/dog-suddenly-scared-of-night-walks/",
      badge: "Walk Fear",
      icon: Moon,
      isSafety: false
    },
    {
      label: "Panics during thunder",
      href: "/blog/how-to-help-dog-scared-of-thunder/",
      badge: "Noise & Fireworks",
      icon: Compass,
      isSafety: false
    },
    {
      label: "Suddenly shaking or panting",
      href: "/blog/dog-shaking-and-panting-not-just-anxiety/",
      badge: "Vet-Ready",
      icon: Stethoscope,
      isSafety: true
    },
    {
      label: "Senior anxiety at night",
      href: "/blog/senior-dog-suddenly-anxious-at-night/",
      badge: "Senior Tracking",
      icon: Clock,
      isSafety: true
    }
  ];

  const supportingArticles = [
    {
      title: "Dog Freezes on Walks After Fireworks or a Scary Event",
      href: "/blog/dog-freezes-on-walks-after-fireworks/"
    },
    {
      title: "Dog Suddenly Scared of Night Walks",
      href: "/blog/dog-suddenly-scared-of-night-walks/"
    },
    {
      title: "Dog Refuses to Pee Outside After Thunder or Rain",
      href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/"
    },
    {
      title: "Escape-Proof Harness for Dogs Who Panic on Walks",
      href: "/blog/escape-proof-harness-for-dogs-who-panic-on-walks/"
    }
  ];

  const safetyArticles = [
    {
      title: "Dog Shaking and Panting: When It’s Not Just Anxiety",
      href: "/blog/dog-shaking-and-panting-not-just-anxiety/"
    },
    {
      title: "Senior Dog Suddenly Anxious at Night",
      href: "/blog/senior-dog-suddenly-anxious-at-night/"
    },
    {
      title: "Dog Suddenly Snapping When Touched",
      href: "/blog/dog-suddenly-snapping-when-touched/"
    }
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
          className="relative overflow-hidden py-16 sm:py-20 border-b border-slate-100/60"
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
                  Choose the situation closest to your dog’s behavior and start with a safe, gentle next step.
                </p>
                <div className="mt-10 flex flex-row items-center gap-4 flex-wrap">
                  <a
                    href="#problem-picker"
                    className="inline-flex h-[48px] items-center justify-center rounded-xl bg-[#0F766E] px-6 font-semibold text-white shadow-sm transition hover:bg-[#0B5F59] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2"
                  >
                    Choose your problem
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

        {/* Section 2: Problem Picker */}
        <section 
          id="problem-picker" 
          aria-labelledby="problem-picker-title"
          className="py-16 bg-[#FAF8F5]/50 border-b border-slate-100/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 
                id="problem-picker-title"
                className="text-3xl font-extrabold text-[#0F1A2C]"
              >
                What is your dog struggling with?
              </h2>
              <p className="mt-3 text-base text-[#526174]">
                Start with the closest stressful moment.
              </p>
            </div>

            {/* 2x3 Card Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {pickerCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.href}
                    href={card.href}
                    className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 group focus:outline-none focus:ring-2 ${
                      card.isSafety
                        ? "bg-[#FFFDF9] border-amber-200/60 hover:border-amber-400 hover:shadow-sm focus:ring-amber-500"
                        : "bg-white border-slate-200/60 hover:border-[#0F766E] hover:shadow-sm focus:ring-[#0F766E]"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-200 ${
                      card.isSafety
                        ? "bg-amber-50 text-amber-800 border border-amber-100 group-hover:bg-amber-100"
                        : "bg-teal-50 text-[#0F766E] border border-teal-100 group-hover:bg-teal-100"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        card.isSafety ? "text-amber-850" : "text-[#0F766E]"
                      }`}>
                        {card.badge}
                      </span>
                      <span className="mt-0.5 text-base font-bold text-[#0F1A2C] leading-snug group-hover:text-[#0F766E] transition duration-155">
                        {card.label}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Featured Walk Fear Cluster */}
        <section 
          id="walk-fear" 
          aria-labelledby="walk-fear-title"
          className="py-16 sm:py-20 border-b border-slate-100/60"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                FEATURED GUIDES
              </span>
              <h2 
                id="walk-fear-title"
                className="mt-2 text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl"
              >
                Start here: Walk Fear / Outdoor Freezing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#526174]">
                For dogs who freeze at the door, refuse walks, panic after fireworks, or struggle with outdoor confidence.
              </p>
            </div>

            {/* Pillar + Supporting Layout */}
            <div className="grid gap-8 lg:grid-cols-12 items-stretch">
              
              {/* Large Pillar Card */}
              <article className="lg:col-span-7 flex flex-col justify-between p-8 bg-white border border-slate-200/60 rounded-[28px] shadow-sm hover:shadow-md transition duration-300 relative group">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-[#0F766E] border border-teal-100">
                      Walk Fear
                    </span>
                    <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500 border border-slate-150">
                      Pillar Guide
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A2C] leading-tight group-hover:text-[#0F766E] transition duration-200">
                    <a href="/blog/dog-suddenly-scared-to-go-outside/" className="focus:outline-none">
                      <span className="absolute inset-0 z-0 rounded-[28px]" aria-hidden="true" />
                      Why Is My Dog Suddenly Scared to Go Outside?
                    </a>
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#526174]">
                    If your dog has suddenly started refusing walks, hiding at the front door, or freezing in familiar yards, it is rarely a simple training issue. Read how to trace past noise events, check safety setups, and begin outdoor confidence resets.
                  </p>
                </div>
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#0F766E] relative z-10">
                  <span>Routine: Outdoor Confidence Reset</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1.5 transition duration-200">
                    <span>Read the guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>

              {/* Supporting Articles List */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {supportingArticles.map((article) => (
                  <a
                    key={article.href}
                    href={article.href}
                    className="flex items-center justify-between p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:border-[#0F766E] hover:shadow-soft transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                  >
                    <div className="flex flex-col text-left pr-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                        Walk Fear Guide
                      </span>
                      <span className="mt-1 text-sm sm:text-base font-bold text-[#0F1A2C] leading-snug group-hover:text-[#0F766E] transition duration-155">
                        {article.title}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#CBD5E1] shrink-0 group-hover:text-[#0F766E] group-hover:translate-x-0.5 transition duration-200" />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: App CTA Block (Need a gentle next step?) */}
        {/* Placed immediately after Walk Fear Cluster as requested to capture active readers */}
        <section 
          id="app-cta" 
          aria-labelledby="app-cta-title"
          className="bg-[#FAF8F5] py-16 border-t border-b border-slate-150/40"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-[#E7DCCB] bg-[#F8F6F1] p-8 sm:p-12 text-center shadow-sm">
              <h2 
                id="app-cta-title"
                className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl leading-tight"
              >
                Need a gentle next step?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-650 max-w-2xl mx-auto leading-relaxed">
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

        {/* Section 5: Compact Safety Strip (When it may not be just anxiety) */}
        <section 
          id="safety-guides" 
          aria-labelledby="safety-guides-title"
          className="py-16 bg-[#FFFDF9] border-b border-slate-100"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldAlert className="h-5 w-5 shrink-0" strokeWidth={2.2} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  SAFETY & EXCLUSIONS
                </span>
              </div>
              <h2 
                id="safety-guides-title"
                className="mt-2 text-3xl font-extrabold text-[#0F1A2C]"
              >
                When it may not be just anxiety
              </h2>
              <p className="mt-3 text-base text-[#526174]">
                Some behavior changes need tracking and a vet conversation before trying calming routines. Check safety indicators first.
              </p>
            </div>

            {/* Compact Horizontal Grid for Safety */}
            <div className="grid gap-4 md:grid-cols-3">
              {safetyArticles.map((article) => (
                <a 
                  key={article.href}
                  href={article.href}
                  className="flex flex-col justify-between p-5 bg-white border border-amber-200/60 rounded-2xl shadow-sm hover:border-amber-400 hover:shadow-soft transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <div>
                    <span className="inline-flex items-center rounded-md bg-[#FFFbeb] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900 border border-amber-200/40">
                      Safety Guide
                    </span>
                    <h3 className="mt-2 text-base font-bold text-[#0F1A2C] leading-snug group-hover:text-amber-900 transition duration-155">
                      {article.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-50 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Vet-Ready Check
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition duration-200" />
                  </div>
                </a>
              ))}
            </div>

            {/* Vet disclaimer under safety strip */}
            <p className="mt-8 text-xs leading-relaxed text-slate-500 border-t border-amber-200/30 pt-4">
              <strong>Important Safety Note:</strong> ChillPup is not a veterinary or diagnostic app. If your dog shows pain, collapse, seizures, sudden severe symptoms, appetite changes, or unexplained shaking or panting, contact a veterinarian.
            </p>
          </div>
        </section>

        {/* Section 6: Browse guides by situation (Clean footer link list) */}
        <section 
          id="guides-footer-link" 
          className="py-12 text-center bg-white"
        >
          <div className="mx-auto max-w-6xl px-4">
            <a
              href="#problem-picker"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F766E] hover:text-[#0B5F59] hover:underline transition focus:outline-none focus:ring-2 focus:ring-[#0F766E] rounded-md px-3 py-1.5 border border-slate-200/50 bg-slate-50/50 hover:bg-slate-50"
            >
              <span>Browse guides by situation</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <ContactModal />
    </>
  );
}
