import React from "react";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  Code,
  Heart,
  Compass,
  ShieldAlert,
  Lock,
  TrendingUp,
  FileText,
  Camera,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import {
  brandIdentity,
  heroContent,
  featuredProduct,
  companyPrinciples,
} from "./content";
import { ContactModal } from "./contact-modal";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./store-links";

export default function MainLanding() {
  return (
    <>
      <PageClarityTags siteSection="home" product="kf_software" pageType="landing" />
        <Header activeItem="Home" />
        <main className="bg-canvas text-ink">
          <HeroSection />
          <ValueBadges />
          <ProductsSection />
          <PrinciplesSection />
        </main>
        <Footer />
        <ContactModal />
      </>
      );
}

      function HeroSection() {
  return (
      <section
        className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24"
        id="home"
      >
        <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {brandIdentity.tagline}
            </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.12]">
                {heroContent.heading}
              </h1>
                <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted">
                  {heroContent.subheading}
                </p>
                  <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                    <a
                      className="inline-flex h-[48px] sm:h-[52px] items-center justify-center gap-2.5 rounded-[16px] bg-brand px-6 sm:px-7 font-bold text-white shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                      href="#products"
                    >
                      <span>Explore products</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                    <a
                      className="inline-flex h-[48px] sm:h-[52px] items-center justify-center gap-2.5 rounded-[16px] border border-border bg-surface px-6 sm:px-7 font-bold text-ink transition hover:bg-surface-muted hover:border-ink focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                      href="#contact"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4 opacity-80" />
                      <span>Contact us</span>
                    </a>
                  </div>
                </div>

                {/* Multi-product showcase */}
                <div className="flex flex-col gap-4">
                  {/* ChillPup showcase card */}
                  <div className="theme-chillpup rounded-3xl border border-border bg-surface p-5 sm:p-6 shadow-sm transition hover:shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-surface-muted overflow-hidden shrink-0 border border-border p-0.5">
                          <img
                            src="/images/chillpup-icon.png"
                            alt="ChillPup app icon"
                            className="w-full h-full object-cover rounded-xl"
                            width={56}
                            height={56}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base sm:text-lg font-bold text-ink">ChillPup</h2>
                            <span className="inline-flex items-center rounded-full bg-product-soft px-2.5 py-0.5 text-[11px] font-bold text-product-accent uppercase tracking-wider">
                              Live product
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                            Owner-guided routines for stressful dog moments.
                          </p>
                        </div>
                      </div>
                      <a
                        href="/chillpup/"
                        aria-label="View ChillPup"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-muted hover:text-product-accent hover:bg-product-soft transition focus:outline-none focus:ring-2 focus:ring-focus"
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Kitchen Exhaust showcase card */}
                  <div className="theme-kitchen-exhaust rounded-3xl border border-border bg-surface p-5 sm:p-6 shadow-sm transition hover:shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-surface-muted overflow-hidden shrink-0 border border-border">
                          <img
                            src="/kitchen-exhaust/hood-interior-after.jpg"
                            alt="Kitchen exhaust report demo thumbnail"
                            className="w-full h-full object-cover"
                            width={56}
                            height={56}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base sm:text-lg font-bold text-ink">Kitchen Exhaust Reports</h2>
                            <span className="inline-flex items-center rounded-full bg-product-soft px-2.5 py-0.5 text-[11px] font-bold text-product-accent uppercase tracking-wider">
                              Workflow experiment
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                            Field photos and notes turned into a customer-ready PDF report.
                          </p>
                        </div>
                      </div>
                      <a
                        href="/kitchen-exhaust-reports/"
                        aria-label="View Kitchen Exhaust report demo"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-ink-muted hover:text-product-accent hover:bg-product-soft transition focus:outline-none focus:ring-2 focus:ring-focus"
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              );
}

              function ValueBadges() {
  return (
              <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                  <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-border rounded-2xl border border-border bg-surface p-6 shadow-xs">
                    {heroContent.badges.map((badge, idx) => {
                      const Icon = badge.icon;
                      return (
                        <div
                          className={`flex items-center gap-4 ${idx > 0 ? "md:pl-6" : ""}`}
                          key={badge.text}
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-brand">
                              <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
                            </div>
                              <p className="text-sm font-semibold text-ink leading-snug whitespace-pre-line">
                                {badge.text}
                              </p>
                          </div>
                          );
        })}
                        </div>
    </section>
                  );
}

                  function ProductsSection() {
  return (
                    <section className="py-16 sm:py-20 bg-surface-muted/50 border-y border-border" id="products">
                      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <div className="max-w-2xl mb-12">
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                                OUR WORK
                              </p>
                              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                                Products & experiments
                              </h2>
                              <p className="mt-3 text-base text-ink-muted leading-relaxed">
                                We develop focused software tools for specific real-world workflows, distinguishing
                                active public products from exploratory customer experiments.
                              </p>
                            </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                                  {/* Panel 1: ChillPup */}
                                  <div className="theme-chillpup rounded-3xl border border-border bg-surface p-6 sm:p-10 shadow-sm flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between gap-3 mb-6">
                                        <span className="inline-flex items-center rounded-full bg-product-soft px-3 py-1 text-xs font-bold text-product-accent uppercase tracking-wider">
                                          Live product
                                        </span>
                                        <div className="h-10 w-10 rounded-xl overflow-hidden border border-border">
                                          <img
                                            src="/images/chillpup-icon.png"
                                            alt="ChillPup icon"
                                            className="w-full h-full object-cover"
                                            width={40}
                                            height={40}
                                          />
                                        </div>
                                      </div>

                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                                          {featuredProduct.title}
                                        </h3>
                                          <p className="mt-2 text-base font-bold text-product-accent leading-snug">
                                            {featuredProduct.subtitle}
                                          </p>
                                            <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                                              {featuredProduct.description}
                                            </p>

                                              <div className="mt-6 space-y-2.5">
                                                {featuredProduct.features.map((feature) => (
                                                  <div key={feature.title} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted">
                                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-product-accent shrink-0" />
                                                    <span>
                                                      <strong className="text-ink font-semibold">{feature.title}:</strong> {feature.desc}
                                                    </span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4">
                                              <div className="flex flex-wrap items-center gap-3">
                                                <a
                                                  href="/chillpup/"
                                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                                                >
                                                  <span>Explore ChillPup</span>
                                                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                                </a>
                                              </div>

                                              <div className="flex items-center gap-3 flex-wrap">
                                                <a
                                                  href={APP_STORE_URL}
                                                  aria-label="Download ChillPup on the App Store"
                                                  className="transition hover:opacity-85 shrink-0"
                                                >
                                                  <AppStoreBadge className="h-[36px] w-auto" />
                                                </a>
                                                <a
                                                  href={GOOGLE_PLAY_URL}
                                                  aria-label="Get ChillPup on Google Play"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="transition hover:opacity-85 shrink-0"
                                                >
                                                  <GooglePlayBadge className="h-[36px] w-auto" />
                                                </a>
                                              </div>
                                            </div>
                                          </div>

                                                  {/* Panel 2: Kitchen Exhaust Reports */}
                                                  <div className="theme-kitchen-exhaust rounded-3xl border border-border bg-surface p-6 sm:p-10 shadow-sm flex flex-col justify-between">
                                                    <div>
                                                      <div className="flex items-center justify-between gap-3 mb-6">
                                                        <span className="inline-flex items-center rounded-full bg-product-soft px-3 py-1 text-xs font-bold text-product-accent uppercase tracking-wider">
                                                          Workflow experiment
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                                                          <Camera className="h-4 w-4 text-product-accent" aria-hidden="true" />
                                                          <span>Field Reporting</span>
                                                        </div>
                                                      </div>

                                                      <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                                                        Kitchen Exhaust Reports
                                                      </h3>
                                                      <p className="mt-2 text-base font-bold text-product-accent leading-snug">
                                                        Customer-ready PDF service reports from technician photos and notes.
                                                      </p>
                                                      <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                                                        A demonstration workflow that turns provided technician notes and
                                                        before-and-after photos into a customer-ready service report without
                                                        asking technicians to adopt a new field app.
                                                      </p>

                                                      {/* Visual preview: paired photos */}
                                                      <div className="mt-6 grid grid-cols-2 gap-3">
                                                        <div className="overflow-hidden rounded-xl border border-border bg-surface-muted">
                                                          <div className="p-1.5 bg-surface text-[10px] font-bold uppercase tracking-wider text-product-accent border-b border-border text-center">
                                                            Before
                                                          </div>
                                                          <img
                                                            src="/kitchen-exhaust/hood-interior-before.jpg"
                                                            alt="Sample kitchen exhaust hood interior before cleaning"
                                                            width={400}
                                                            height={300}
                                                            className="w-full h-auto aspect-[4/3] object-cover"
                                                          />
                                                        </div>
                                                        <div className="overflow-hidden rounded-xl border border-border bg-surface-muted">
                                                          <div className="p-1.5 bg-surface text-[10px] font-bold uppercase tracking-wider text-product-accent border-b border-border text-center">
                                                            After
                                                          </div>
                                                          <img
                                                            src="/kitchen-exhaust/hood-interior-after.jpg"
                                                            alt="Sample kitchen exhaust hood interior after cleaning"
                                                            width={400}
                                                            height={300}
                                                            className="w-full h-auto aspect-[4/3] object-cover"
                                                          />
                                                        </div>
                                                      </div>

                                                      <p className="mt-3 text-xs text-ink-muted leading-normal">
                                                        Fictional demonstration case. The photographs and sample report are AI-generated demonstration materials for workflow evaluation.
                                                      </p>
                                                    </div>

                                                    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                                                      <a
                                                        href="/kitchen-exhaust-reports/"
                                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                                                      >
                                                        <span>View report demo</span>
                                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                                      </a>
                                                      <a
                                                        href="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-product-accent hover:underline"
                                                      >
                                                        <FileText className="h-4 w-4" aria-hidden="true" />
                                                        <span>Sample PDF</span>
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
      </div>
                                        </section>
                                        );
}

                                        function PrinciplesSection() {
  const principleIcons = [Compass, ShieldAlert, Lock, Code];

                                        return (
                                              <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:px-8">
                                                <div className="max-w-2xl mx-auto text-left sm:text-center mb-16">
                                                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                                                    ENGINEERING ETHOS
                                                  </p>
                                                  <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                                                    How we build
                                                  </h2>
                                                  <p className="mt-3 text-base text-ink-muted leading-relaxed">
                                                    The guiding principles behind every project, product, and workflow we create.
                                                  </p>
                                                </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                                      {companyPrinciples.map((principle, idx) => {
                                                        const Icon = principleIcons[idx] || Compass;
                                                        return (
                                                          <div
                                                            key={principle.title}
                                                            className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between"
                                                          >
                                                              <div>
                                                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-brand">
                                                                  <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.85} />
                                                                </div>
                                                                <h3 className="text-base font-bold text-ink mb-2">
                                                                  {principle.title}
                                                                </h3>
                                                                <p className="text-sm text-ink-muted leading-relaxed">
                                                                  {principle.desc}
                                                                </p>
                                                              </div>
                                                            </div>
                                                            );
        })}
                                                          </div>
    </section>
  );
}
