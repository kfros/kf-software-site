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
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { HeroPhones } from "@/components/HeroPhones";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";

import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../store-links";

// Page-specific metadata for SEO
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
  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ];

  // Steps for Solution section
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

  // Features for Stressful Moments
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
      title: "Daily Calm Reset",
      text: "A short everyday routine to practice calm attention.",
      icon: Activity,
    },
  ];

  // App features
  const appFeatures = [
    {
      title: "Practical routines",
      text: "Step-by-step guidance you can actually use.",
      icon: ClipboardCheck,
    },
    {
      title: "Calm check-ins",
      text: "Quick notes before and after a routine.",
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

  // Principles strip
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
      <Header activeItem="ChillPup" navItems={navItems} />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Copy Column */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                  CHILLPUP
                </span>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl leading-[1.15]">
                  ChillPup is for moments when your dog is already stressed and you do not want to search through long articles on your phone.
                </h1>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#526174] max-w-2xl">
                  Short, owner-guided routines for fireworks, loud noises, visitors, travel,
                  and everyday tension. Know what to do when your dog needs calm support.
                </p>
                <div className="mt-10 flex flex-row items-center gap-4 flex-wrap">
                  {/* App Store Badge */}
                  <a
                    href={APP_STORE_URL}
                    aria-label="Download ChillPup on the App Store"
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
              </div>

              {/* Visual Column */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <HeroPhones />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="bg-white py-16 sm:py-24 border-t border-slate-100" id="problem">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl leading-tight">
              When your dog is stressed, long advice is too slow.
            </h2>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#526174] max-w-3xl mx-auto">
              When fireworks start or guests arrive, most owners do not need another long training guide. They need a calm sequence they can follow without guessing.
            </p>
          </div>
        </section>

        {/* Calm Moment Banner Section */}
        <section className="bg-white pb-12 sm:pb-16" id="calm_moment_banner">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[24px] bg-[#FCFAF7] border border-slate-200/60 shadow-sm transition hover:shadow-md duration-300">
              <img
                src="/images/chillpup_banner.jpg"
                alt="A calm dog resting at home while its owner gently stays nearby."
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="bg-[#FAF8F5] py-16 sm:py-24 border-t border-b border-slate-100/60" id="solution">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl">
                Simple guidance when the moment is already happening.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#526174]">
                ChillPup gives you short routines you can follow right away, without pressure or complicated theory. It is a small independent app built by KF Software and is intentionally narrow: no camera, no microphone, no behavior diagnosis. Just short routines for moments when the owner needs a clear next step.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] font-bold text-lg mb-6">
                      0{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1A2C] mb-3 leading-snug">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-[#526174]">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stressful Moments Feature Grid */}
        <section className="bg-white py-16 sm:py-24" id="stressful_moments">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl">
                Built for real stressful moments.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featureGrid.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="rounded-[24px] border border-slate-200 bg-[#FCFAF7] p-6 sm:p-8 hover:border-[#0F766E] transition duration-300">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0F766E] shadow-sm mb-5 border border-slate-100">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1A2C] mb-2">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-[#526174]">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* App Features Split Layout */}
        <section className="bg-[#FAF8F5] py-16 sm:py-24 border-t border-b border-slate-100/60" id="app_features">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Visual Column */}
              <div className="flex gap-4 sm:gap-6 justify-center items-center">
                {/* Screen 1 */}
                <div className="relative rounded-[32px] bg-slate-950 p-[5px] sm:p-[6px] shadow-lg border border-slate-800/80 w-[150px] sm:w-[190px] transform -rotate-2 hover:rotate-0 transition duration-300">
                  <div className="relative aspect-[591/1280] w-full overflow-hidden rounded-[26px] bg-white">
                    <img
                      src="/screens/chillpup-home.jpg"
                      alt="ChillPup home screen showing current signs and routines"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Screen 2 */}
                <div className="relative rounded-[32px] bg-slate-950 p-[5px] sm:p-[6px] shadow-lg border border-slate-800/80 w-[150px] sm:w-[190px] transform rotate-2 hover:rotate-0 transition duration-300">
                  <div className="relative aspect-[564/1280] w-full overflow-hidden rounded-[26px] bg-white">
                    <img
                      src="/screens/chillpup-session.jpg"
                      alt="ChillPup guided calming routine screen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Features Column */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl mb-8 leading-tight">
                  What ChillPup helps you do.
                </h2>
                <div className="space-y-6 sm:space-y-8">
                  {appFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="flex gap-4 sm:gap-5 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                          <Icon className="h-5.5 w-5.5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#0F1A2C] leading-none">{feature.title}</h3>
                          <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526174]">{feature.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="bg-white py-16 sm:py-24" id="principles">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A2C] leading-tight">
                Designed to stay calm and clear.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 lg:gap-y-0 items-start">
              {principles.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    className={`flex flex-col items-center p-3 text-center bg-transparent border-none shadow-none px-4 sm:px-6 lg:px-8 relative lg:border-l lg:border-slate-200/80 ${idx === 0 ? "lg:border-l-0" : ""
                      }`}
                    key={idx}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center text-[#0F766E] transition-colors duration-300 hover:text-emerald-600">
                      <Icon className="h-10 w-10" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-[17px] font-extrabold text-[#0F1A2C] leading-[1.25] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#526174] max-w-[200px] mx-auto">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Disclaimer Soft Callout Box */}
        <section className="bg-white pb-16 sm:pb-24" id="trust_disclaimer">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-amber-200/50 bg-[#FDFBF7] p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-amber-800">
                  <ShieldAlert className="h-6 w-6 shrink-0" strokeWidth={2} />
                  <h2 className="text-lg sm:text-xl font-bold">Owner-guided support, not medical advice.</h2>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                  ChillPup is not a veterinary or diagnostic app. It does not diagnose anxiety,
                  treat medical conditions, or replace professional help. It helps you follow
                  gentle, structured routines and notice what seems to help your dog over time.
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-[#526174] border-t border-amber-200/30 pt-4 mt-2">
                  If your dog shows severe distress, self-injury, aggression, breathing trouble,
                  collapse, or sudden behavior changes, contact a veterinarian or qualified
                  behavior professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-white py-16 sm:py-20" id="final_cta">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[28px] border border-[#E7DCCB] bg-[#F8F6F1] px-6 py-10 sm:px-12 sm:py-16 text-center shadow-sm">
              <h2 className="text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl leading-tight">
                Ready when your dog needs a calmer moment.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Keep short, gentle routines close for fireworks, visitors, travel, and everyday tension.
              </p>
              <div className="mt-8 flex flex-row items-center justify-center gap-4 flex-wrap">
                {/* App Store Badge */}
                <a
                  href={APP_STORE_URL}
                  aria-label="Download ChillPup on the App Store"
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}
