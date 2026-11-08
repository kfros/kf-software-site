import React from "react";
import type { Metadata } from "next";
import {
  Volume2,
  Users,
  Plane,
  Activity,
  TrendingUp,
  HeartHandshake,
  Lock,
  Ban,
  Code,
  ShieldAlert,
  ClipboardCheck,
  Smartphone,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { HeroPhones } from "@/components/HeroPhones";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { StatusLabel } from "@/components/editorial/StatusLabel";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../store-links";

export const metadata: Metadata = {
  title: "ChillPup — Calm Dog Routines | KF Software",
  description:
    "Short, owner-guided calming routines for fireworks, loud noises, visitors, travel, and everyday dog stress moments.",
  alternates: {
    canonical: "https://kf-software.com/chillpup/",
  },
  keywords: [
    "dog calming app",
    "dog fireworks fear support",
    "dog loud noise support",
    "stressful dog moments",
    "owner-guided dog routines",
    "calming routines for dogs",
  ],
  openGraph: {
    title: "ChillPup — Calm Dog Routines | KF Software",
    description: "Short, owner-guided calming routines for fireworks, loud noises, visitors, travel, and everyday dog stress moments.",
    url: "https://kf-software.com/chillpup/",
    type: "website",
  },
};

export default function ChillPupLanding() {
  const steps = [
    {
      title: "Notice how your dog is doing",
      text: "Start with a quick check-in based on what you can actually observe.",
    },
    {
      title: "Follow a few gentle steps",
      text: "Use short owner-guided routines designed for calm, practical support.",
    },
    {
      title: "Move at your dog’s pace",
      text: "There is no rush. Continue only when your dog seems ready.",
    },
    {
      title: "Check what helped",
      text: "After each routine, note whether things seemed calmer, better, the same, or worse.",
    },
  ];

  const featureGrid = [
    {
      title: "Fireworks & loud noises",
      text: "Quick support when sudden sounds make your dog uneasy.",
      icon: Volume2,
    },
    {
      title: "Visitors at home",
      text: "Gentle steps for calmer greetings and less tension.",
      icon: Users,
    },
    {
      title: "Travel and new places",
      text: "Simple guidance when routines change.",
      icon: Plane,
    },
    {
      title: "Everyday stress & change",
      text: "Structured steps when regular patterns get disrupted.",
      icon: Activity,
    },
  ];

  const appFeatures = [
    {
      title: "Fast check-in",
      text: "Quick options so you do not have to think when your dog is already reacting.",
      icon: ClipboardCheck,
    },
    {
      title: "Gentle, step-by-step guidance",
      text: "Short text cards designed to be read while you stay near your dog.",
      icon: Smartphone,
    },
    {
      title: "Progress over time",
      text: "See patterns and understand what seems to help your dog.",
      icon: TrendingUp,
    },
    {
      title: "Gentle & owner-guided",
      text: "You stay in control. Your dog sets the pace.",
      icon: HeartHandshake,
    },
  ];

  const principles = [
    {
      title: "Small steps",
      text: "No rushing. No forcing. Progress happens at your dog’s pace.",
      icon: Compass,
    },
    {
      title: "Owner-guided",
      text: "ChillPup supports what you do with your dog. It does not replace your judgment.",
      icon: HeartHandshake,
    },
    {
      title: "Privacy-conscious",
      text: "No camera. No microphone. No behavior surveillance.",
      icon: Lock,
    },
    {
      title: "Clear choices",
      text: "No pressure, no tricks, no confusing subscription flow.",
      icon: Ban,
    },
    {
      title: "Focused product",
      text: "ChillPup does one narrow job: calm guidance for stressful dog moments.",
      icon: Code,
    },
  ];

  return (
    <>
      <PageClarityTags siteSection="chillpup" product="chillpup" pageType="landing" />
      <Header activeItem="ChillPup" />
      <main className="theme-chillpup bg-canvas text-ink">
        {/* 1. Hero Section (Asymmetric Product Proposition & Real Mobile Screens) */}
        <section className="py-14 sm:py-20 lg:py-24 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Copy Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <StatusLabel status="LIVE PRODUCT" />
                  <span className="text-xs font-mono text-ink-muted">
                    iOS App Store & Google Play
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
                  ChillPup is for moments when your dog is already stressed and you do not want to search through long articles on your phone.
                </h1>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-muted max-w-2xl">
                  Short, owner-guided routines for fireworks, loud noises, visitors, travel,
                  and everyday tension. Know what to do when your dog needs calm support.
                </p>

                <div className="mt-8 flex flex-row items-center gap-4 flex-wrap">
                  <a
                    href={APP_STORE_URL}
                    aria-label="Download ChillPup on the App Store"
                    className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg shrink-0"
                  >
                    <AppStoreBadge className="h-[40px] sm:h-[42px] w-auto" />
                  </a>

                  <a
                    href={GOOGLE_PLAY_URL}
                    aria-label="Get ChillPup on Google Play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg shrink-0"
                  >
                    <GooglePlayBadge className="h-[40px] sm:h-[42px] w-auto" />
                  </a>

                  <a
                    href="/chillpup/guides/"
                    className="inline-flex h-[40px] sm:h-[42px] items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus shrink-0"
                  >
                    <span>Browse free guides</span>
                    <ArrowRight className="h-4 w-4 text-brand" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Visual Column (5 cols) */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <HeroPhones />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Problem Premise & Real Canine Calm Banner */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-product-accent">
                The Problem
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink leading-tight">
                When your dog is stressed, long advice is too slow.
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-muted">
                When fireworks start or guests arrive, most owners do not need another long training guide. They need a calm sequence they can follow without guessing.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
              <img
                src="/images/chillpup_banner.jpg"
                alt="A calm dog resting at home while its owner gently stays nearby."
                className="w-full h-auto object-cover max-h-[460px]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 3. Solution Sequence (01 to 04) */}
        <section className="py-16 sm:py-20 border-b border-border" id="solution">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-product-accent">
                Guided Method
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
                Simple guidance when the moment is already happening.
              </h2>
              <p className="mt-4 text-base text-ink-muted leading-relaxed">
                ChillPup gives you short routines you can follow right away, without pressure or complicated theory. It is a small independent app built by KF Software and is intentionally narrow: no camera, no microphone, no behavior diagnosis. Just short routines for moments when the owner needs a clear next step.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-product-accent block mb-3">
                      STEP 0{index + 1}
                    </span>
                    <h3 className="text-base font-bold text-ink mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Real Stressful Moments */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface-muted/30" id="stressful_moments">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-product-accent">
                Situational Support
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
                Built for real stressful moments.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featureGrid.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-border bg-surface p-6 shadow-xs"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-product-soft text-product-accent mb-4 border border-product-accent/20">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-ink mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. App Features & Real Screen Evidence */}
        <section className="py-16 sm:py-20 border-b border-border" id="app_features">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Real App Screens (5 cols) */}
              <div className="lg:col-span-5 flex gap-4 sm:gap-6 justify-center items-center">
                <div className="relative rounded-2xl bg-slate-950 p-[5px] shadow-md border border-slate-800 w-[150px] sm:w-[180px]">
                  <div className="relative aspect-[591/1280] w-full overflow-hidden rounded-xl bg-white">
                    <img
                      src="/screens/chillpup-home.jpg"
                      alt="ChillPup home screen showing current signs and routines"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="relative rounded-2xl bg-slate-950 p-[5px] shadow-md border border-slate-800 w-[150px] sm:w-[180px]">
                  <div className="relative aspect-[564/1280] w-full overflow-hidden rounded-xl bg-white">
                    <img
                      src="/screens/chillpup-session.jpg"
                      alt="ChillPup guided calming routine screen"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Features Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-product-accent mb-2">
                  Application Flow
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink mb-8 leading-tight tracking-tight">
                  What ChillPup helps you do.
                </h2>
                <div className="space-y-6">
                  {appFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-product-soft text-product-accent border border-product-accent/20 mt-0.5">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-ink leading-snug">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-muted">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Principles Section */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface-muted/30" id="principles">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-product-accent">
                Product Values
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink leading-tight tracking-tight">
                Designed to stay calm and clear.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
              {principles.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-surface shadow-xs"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-product-soft text-product-accent border border-product-accent/20">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-ink mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-ink-muted">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Trust Disclaimer Soft Callout Box */}
        <section className="py-16 sm:py-20 border-b border-border" id="trust_disclaimer">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-ink">
                  <ShieldAlert className="h-6 w-6 shrink-0 text-brand" strokeWidth={2} />
                  <h2 className="text-lg sm:text-xl font-bold">Owner-guided support, not medical advice.</h2>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                  ChillPup is not a veterinary or diagnostic app. It does not diagnose anxiety,
                  treat medical conditions, or replace professional help. It helps you follow
                  gentle, structured routines and notice what seems to help your dog over time.
                </p>
                <p className="text-xs leading-relaxed text-ink-muted border-t border-border pt-4 mt-2">
                  If your dog shows severe distress, self-injury, aggression, breathing trouble,
                  collapse, or sudden behavior changes, contact a veterinarian or qualified
                  behavior professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. ChillPup Guides Knowledge Base Banner */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface-muted/30" id="guides">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-product-accent">
                  Knowledge Base
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  ChillPup Behavioral Guides
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Read our practical, step-by-step guides for dogs scared of fireworks, night walks, rain, or door freezing. Complete with clear veterinary safety thresholds.
                </p>
              </div>
              <a
                href="/chillpup/guides/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus shrink-0"
              >
                <span>Explore ChillPup Guides</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* 9. Final CTA Section */}
        <section className="py-16 sm:py-20" id="final_cta">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink leading-tight tracking-tight">
              Ready when your dog needs a calmer moment.
            </h2>
            <p className="mt-4 text-base text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Keep short, gentle routines close for fireworks, visitors, travel, and everyday tension.
            </p>
            <div className="mt-8 flex flex-row items-center justify-center gap-4 flex-wrap">
              <a
                href={APP_STORE_URL}
                aria-label="Download ChillPup on the App Store"
                className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg shrink-0"
              >
                <AppStoreBadge className="h-[40px] sm:h-[42px] w-auto" />
              </a>

              <a
                href={GOOGLE_PLAY_URL}
                aria-label="Get ChillPup on Google Play"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg shrink-0"
              >
                <GooglePlayBadge className="h-[40px] sm:h-[42px] w-auto" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}
