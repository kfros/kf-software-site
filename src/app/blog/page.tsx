import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Footprints,
  Volume2,
  Moon,
  AlertTriangle,
  ChevronRight,
  CloudRain
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
  const pickerCards = [
    {
      label: "Won’t go outside",
      href: "/blog/dog-suddenly-scared-to-go-outside/",
      badge: "Walk Fear",
      icon: Footprints,
      isSafety: false
    },
    {
      label: "Prepare for fireworks",
      href: "/blog/prepare-dog-for-fireworks-without-making-fear-worse/",
      badge: "Noise & Fireworks",
      icon: Volume2,
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
      label: "Still shaken indoors",
      href: "/blog/dog-still-shaken-after-fireworks/",
      badge: "Noise & Fireworks",
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
      label: "Won’t pee in rain",
      href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/",
      badge: "Weather Potty",
      icon: CloudRain,
      isSafety: false
    }
  ];

  const supportingArticles = [
    {
      title: "How to Prepare Your Dog for Fireworks Without Making Fear Worse",
      href: "/blog/prepare-dog-for-fireworks-without-making-fear-worse/"
    },
    {
      title: "Dog Still Shaken After Fireworks? How to Help Them Recover at Home",
      href: "/blog/dog-still-shaken-after-fireworks/"
    },
    {
      title: "Dog Scared to Go Outside After Fireworks? What to Do First",
      href: "/blog/dog-freezes-on-walks-after-fireworks/"
    },
    {
      title: "Dog Scared of Night Walks? Gentle Ways to Make Evening Walks Easier",
      href: "/blog/dog-suddenly-scared-of-night-walks/"
    },
    {
      title: "Dog Won’t Pee in the Rain? What’s Normal and When to Call a Vet",
      href: "/blog/dog-refuses-to-pee-outside-after-thunder-or-rain/"
    }
  ];

  return (
    <>
      <PageClarityTags siteSection="blog" product="kf_software" pageType="blog_index" />
      <Header activeItem="Blog" />

        <main className="theme-chillpup min-h-screen bg-canvas text-ink">
          {/* Section 1: Hero Section */}
          <section
            id="hero"
            aria-labelledby="hero-title"
            className="relative overflow-hidden py-16 sm:py-20 border-b border-border bg-surface"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

                {/* Copy Block */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-product-accent">
                      CHILLPUP GUIDES
                    </span>
                    <h1
                      id="hero-title"
                      className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.15]"
                    >
                      Practical guides for stressful dog moments.
                    </h1>
                      <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-muted max-w-2xl">
                        Choose the situation closest to your dog’s behavior and start with a safe, gentle next step.
                      </p>
                      <div className="mt-10 flex flex-row items-center gap-4 flex-wrap">
                        <a
                          href="#problem-picker"
                          className="inline-flex h-[48px] items-center justify-center rounded-xl bg-brand px-6 font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                        >
                          Choose your problem
                        </a>
                        <a
                          href="/chillpup/"
                          className="inline-flex h-[48px] items-center justify-center rounded-xl border border-border bg-surface px-6 font-semibold text-ink shadow-sm transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
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
            className="py-16 bg-surface-muted/50 border-b border-border"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2
                  id="problem-picker-title"
                  className="text-3xl font-extrabold text-ink"
                >
                  What is your dog struggling with?
                </h2>
                  <p className="mt-3 text-base text-ink-muted">
                    Start with the closest stressful moment.
                  </p>
              </div>

              {/* Card Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {pickerCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <a
                      key={card.href}
                      href={card.href}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface hover:border-product-accent hover:shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-focus"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-product-soft text-product-accent border border-border transition duration-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-product-accent">
                              {card.badge}
                            </span>
                              <span className="mt-0.5 text-base font-bold text-ink leading-snug group-hover:text-product-accent transition duration-150">
                                {card.label}
                              </span>
                            </div>
                          </a>
                          );
              })}
                        </div>
                      </div>
                    </section>

        {/* Section 3: Featured Walk Fear Cluster */ }
                  <section
                    id="walk-fear"
                    aria-labelledby="walk-fear-title"
                    className="py-16 sm:py-20 border-b border-border bg-surface"
                  >
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mb-12">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-product-accent">
                            FEATURED GUIDES
                          </span>
                          <h2
                            id="walk-fear-title"
                            className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl"
                          >
                            Start here: Walk Fear & Fireworks Recovery
                          </h2>
                            <p className="mt-4 text-base leading-relaxed text-ink-muted">
                              For dogs who freeze at the door, refuse walks, prepare for fireworks, stay unsettled afterward, or struggle with outdoor confidence.
                            </p>
                          </div>

                          {/* Pillar + Supporting Layout */}
                          <div className="grid gap-8 lg:grid-cols-12 items-stretch">

                            {/* Large Pillar Card */}
                              <article className="lg:col-span-7 flex flex-col justify-between bg-surface border border-border rounded-[28px] shadow-sm hover:shadow-md transition duration-300 relative group overflow-hidden">
                                <div className="relative w-full aspect-[16/9] overflow-hidden">
                                  <Image
                                    src="/assets/door/chillpup-door-sitting.jpg"
                                    alt="A small dog sitting calmly near a door before going outside"
                                    fill
                                    unoptimized={true}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-8 flex-grow flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="inline-flex items-center rounded-md bg-product-soft px-2 py-1 text-xs font-medium text-product-accent border border-border">
                                          Walk Fear
                                        </span>
                                          <span className="inline-flex items-center rounded-md bg-surface-muted px-2 py-1 text-xs font-medium text-ink-muted border border-border">
                                            Pillar Guide
                                          </span>
                                        </div>
                                          <h3 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight group-hover:text-product-accent transition duration-200">
                                            <a href="/blog/dog-suddenly-scared-to-go-outside/" className="focus:outline-none">
                                              <span className="absolute inset-0 z-0" aria-hidden="true" />
                                              Why Is My Dog Suddenly Scared to Go Outside?
                                            </a>
                                          </h3>
                                            <p className="mt-4 text-base leading-relaxed text-ink-muted">
                                              If your dog has suddenly started refusing walks, hiding at the front door, or freezing in familiar yards, it is rarely a simple training issue. Read how to trace past noise events, check safety setups, and begin outdoor confidence resets.
                                            </p>
                                          </div>
                                            <div className="mt-8 pt-5 border-t border-border flex items-center justify-between text-sm font-semibold text-product-accent relative z-10">
                                              <span>Routine: Outdoor Confidence Reset</span>
                                              <div className="flex items-center gap-1 group-hover:translate-x-1.5 transition duration-200">
                                                <span>Read the guide</span>
                                                <ArrowRight className="h-4 w-4" />
                                              </div>
                                            </div>
                                          </div>
                                        </article>

                                        {/* Supporting Articles List */}
                                        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                                          {supportingArticles.map((article) => (
                                            <a
                                              key={article.href}
                                              href={article.href}
                                              className="flex items-center justify-between p-5 bg-surface border border-border rounded-2xl shadow-xs hover:border-product-accent hover:shadow-soft transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-focus"
                                            >
                                              <div className="flex flex-col text-left pr-4">
                                                  <span className="text-[11px] font-bold uppercase tracking-wider text-product-accent">
                                                    ChillPup Guide
                                                  </span>
                                                    <span className="mt-1 text-sm sm:text-base font-bold text-ink leading-snug group-hover:text-product-accent transition duration-150">
                                                      {article.title}
                                                    </span>
                                                  </div>
                                                  <ChevronRight className="h-5 w-5 text-ink-muted shrink-0 group-hover:text-product-accent group-hover:translate-x-0.5 transition duration-200" />
                                                </a>
                ))}
                                              </div>

                                            </div>
          </div>
                                      </section>

                                      {/* Section 4: App CTA Block (Need a gentle next step?) */}
                                      <section
                                        id="app-cta"
                                        aria-labelledby="app-cta-title"
                                        className="bg-surface-muted/50 py-16 border-b border-border"
                                      >
                                        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                                            <div className="rounded-[32px] border border-border bg-surface p-8 sm:p-12 text-center shadow-sm">
                                              <h2
                                                id="app-cta-title"
                                                className="text-3xl font-extrabold text-ink sm:text-4xl leading-tight"
                                              >
                                                Need a gentle next step?
                                              </h2>
                                                <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
                                                  ChillPup gives you short, owner-guided routines for stressful dog moments, without camera tracking, microphone monitoring, or diagnostic claims.
                                                </p>

                                                {/* Badges and CTAs */}
                                                <div className="mt-8 flex flex-row items-center justify-center gap-4 flex-wrap">
                                                  <a
                                                    href={APP_STORE_URL}
                                                    aria-label="Get ChillPup on the App Store"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="transition hover:opacity-85 shrink-0"
                                                  >
                                                    <AppStoreBadge className="h-[40px] sm:h-[42px] w-auto" />
                                                  </a>

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
                                                    className="inline-flex h-[44px] items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                                                  >
                                                    Try ChillPup
                                                  </a>
                                                  <a
                                                    href="/blog/dog-suddenly-scared-to-go-outside/"
                                                    className="inline-flex h-[44px] items-center justify-center rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                                                  >
                                                    Start with the guide
                                                  </a>
                                                </div>

                                                {/* Veterinary Disclaimer */}
                                                  <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-ink-muted max-w-2xl mx-auto">
                                                    <strong>Disclaimer:</strong> ChillPup is not a veterinary or diagnostic app. If your dog shows sudden severe symptoms, pain, collapse, seizures, appetite changes, or unexplained panting or shaking, contact a veterinarian.
                                                  </p>
                                                </div>
                                            </div>
                                          </section>

                                          {/* Section 5: Browse guides by situation */}
                                          <section
                                            id="guides-footer-link"
                                            className="py-12 text-center bg-canvas"
                                          >
                                            <div className="mx-auto max-w-6xl px-4">
                                              <a
                                                href="#problem-picker"
                                                className="inline-flex items-center gap-1.5 text-sm font-bold text-product-accent hover:underline transition focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-3 py-1.5 border border-border bg-surface hover:bg-surface-muted"
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
