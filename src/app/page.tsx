import React from "react";
import {
  ArrowRight,
  Mail,
  FileText,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Layers,
} from "lucide-react";
import {
  brandIdentity,
  heroContent,
  featuredProduct,
} from "./content";
import { ContactModal } from "./contact-modal";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { StatusLabel } from "@/components/editorial/StatusLabel";
import { publishedArticles, ArticleRecord } from "@/app/blog/blog-posts";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./store-links";

export default function MainLanding() {
  const latestArticles = publishedArticles.slice(0, 3);

  return (
    <>
      <PageClarityTags siteSection="home" product="kf_software" pageType="landing" />
      <Header activeItem="Home" />
      <main className="bg-canvas text-ink">
        <HeroSection />
        <WorkIndexSection />
        <FeaturedArtifactSection />
        <EngineeringStudioSection />
        {latestArticles.length > 0 && (
          <PublicationsSection articles={latestArticles} />
        )}
        <ContactSection />
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}

/**
 * 1. Asymmetric Parent-Brand Hero
 * 7/5 column relationship: concise positioning and actions beside a structured studio exhibit
 */
function HeroSection() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24 border-b border-border"
      id="home"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left narrative column (7 cols) */}
        <div className="lg:col-span-7">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand">
            {brandIdentity.tagline}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.1]">
            {heroContent.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">
            {heroContent.subheading}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
            <a
              className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm sm:text-base font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              href="#products"
            >
              <span>Explore work index</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm sm:text-base font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              href="#contact"
            >
              <Mail aria-hidden="true" className="h-4 w-4 opacity-80" />
              <span>Contact studio</span>
            </a>
          </div>

          {/* Calibrated studio footnote */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Independent software studio
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Wrocław, Poland
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Privacy by design
            </span>
          </div>
        </div>

        {/* Right artifact exhibit panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border text-xs">
              <span className="font-mono font-bold tracking-wider uppercase text-ink-muted">
                Studio Overview
              </span>
              <span className="font-mono text-[11px] text-ink-muted">
                2 Active Tracks
              </span>
            </div>

            <div className="space-y-4">
              {/* ChillPup preview row */}
              <a
                href="/chillpup/"
                className="group block rounded-xl border border-border bg-surface-muted/60 p-4 transition hover:bg-surface-muted hover:border-brand/40 focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-xl overflow-hidden shrink-0 border border-border bg-surface p-0.5">
                    <img
                      src="/images/chillpup-icon.png"
                      alt="ChillPup app icon"
                      className="w-full h-full object-cover rounded-lg"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-bold text-ink group-hover:text-brand transition">
                        ChillPup
                      </h2>
                      <StatusLabel status="LIVE PRODUCT" />
                    </div>
                    <p className="mt-1 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                      Owner-guided calming routines for stressful dog moments. Available on iOS & Android.
                    </p>
                  </div>
                </div>
              </a>

              {/* Kitchen Exhaust preview row */}
              <a
                href="/kitchen-exhaust-reports/"
                className="group block rounded-xl border border-border bg-surface-muted/60 p-4 transition hover:bg-surface-muted hover:border-brand/40 focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-xl overflow-hidden shrink-0 border border-border bg-surface">
                    <img
                      src="/kitchen-exhaust/hood-interior-after.jpg"
                      alt="Kitchen Exhaust sample report thumbnail"
                      className="w-full h-full object-cover"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-bold text-ink group-hover:text-brand transition">
                        Kitchen Exhaust Reports
                      </h2>
                      <StatusLabel status="WORKFLOW EXPERIMENT" />
                    </div>
                    <p className="mt-1 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                      Customer-ready service PDF reports assembled from field photos and technician notes.
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between text-xs text-ink-muted">
              <span>Verified repo artifacts</span>
              <a
                href="/about/"
                className="font-medium text-brand hover:underline inline-flex items-center gap-1"
              >
                <span>About studio</span>
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. Work Index Section
 * Ruled, disciplined index with explicit status, concise description, and real artifacts
 */
function WorkIndexSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border" id="products">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              Work Index
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
              Products & workflow experiments
            </h2>
          </div>
          <p className="text-sm text-ink-muted max-w-md">
            We develop focused software tools for specific real-world workflows, distinguishing active public software from exploratory customer experiments.
          </p>
        </div>

        {/* Index Items */}
        <div className="divide-y divide-border">
          {/* Index Item 1: ChillPup */}
          <article className="theme-chillpup py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusLabel status="LIVE PRODUCT" />
                <span className="text-xs font-mono text-ink-muted">
                  Mobile Application · iOS & Android
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                {featuredProduct.title} — {featuredProduct.subtitle}
              </h3>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
                {featuredProduct.description} Built for moments when your dog is already stressed and you do not want to search through long training articles on your phone.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-ink-muted">
                {featuredProduct.features.map((feat) => (
                  <div key={feat.title} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-product-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-ink font-semibold">{feat.title}:</strong> {feat.desc}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="/chillpup/"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand text-white px-5 text-sm font-semibold shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <span>Explore ChillPup</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href={APP_STORE_URL}
                    aria-label="Download ChillPup on the App Store"
                    className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg"
                  >
                    <AppStoreBadge className="h-[34px] w-auto" />
                  </a>
                  <a
                    href={GOOGLE_PLAY_URL}
                    aria-label="Get ChillPup on Google Play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg"
                  >
                    <GooglePlayBadge className="h-[34px] w-auto" />
                  </a>
                </div>
              </div>
            </div>

            {/* Artifact Frame */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border text-xs text-ink-muted">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                    Product Artifact · Mobile Screen
                  </span>
                  <span>v1.0 Production UI</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-border bg-surface-muted flex items-center justify-center p-4">
                  <div className="relative aspect-[591/1280] w-[160px] sm:w-[190px] overflow-hidden rounded-2xl border border-slate-800 shadow-md">
                    <img
                      src="/screens/chillpup-home.jpg"
                      alt="ChillPup mobile application interface showing quick routines"
                      width={591}
                      height={1280}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="mt-3 text-xs text-ink-muted leading-normal">
                  Real ChillPup interface: owner-guided routine selection designed for immediate clarity.
                </p>
              </div>
            </div>
          </article>

          {/* Index Item 2: Kitchen Exhaust Reports */}
          <article className="theme-kitchen-exhaust py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusLabel status="WORKFLOW EXPERIMENT" />
                <span className="text-xs font-mono text-ink-muted">
                  Commercial Field Service · Concierge Workflow
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Kitchen Exhaust Reports — Customer-ready PDF reports from technician photos.
              </h3>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
                A demonstration workflow that turns provided technician notes and before-and-after photos into a customer-ready service report without asking technicians to adopt a new field app.
              </p>

              <div className="pt-2 space-y-2 text-xs sm:text-sm text-ink-muted">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-product-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-ink font-semibold">Paired field photography:</strong> Side-by-side before and after evidence per serviced component.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-product-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-ink font-semibold">Zero software friction:</strong> Crews keep gathering photos and notes as they already do.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-product-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-ink font-semibold">One free sample report:</strong> Evaluated as a bounded concierge test for commercial contractors.
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="/kitchen-exhaust-reports/"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand text-white px-5 text-sm font-semibold shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <span>View report demo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="/kitchen-exhaust/pinecrest-family-diner-sample-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <FileText className="h-4 w-4 opacity-80" aria-hidden="true" />
                  <span>Sample PDF document</span>
                </a>
              </div>
            </div>

            {/* Artifact Frame: Before/After photo pair */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border text-xs text-ink-muted">
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                    Demonstration Component Exhibit
                  </span>
                  <span>Hood Interior</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="overflow-hidden rounded-xl border border-border bg-surface-muted">
                    <div className="p-1.5 bg-surface text-[10px] font-mono font-bold uppercase tracking-wider text-product-accent border-b border-border text-center">
                      Before
                    </div>
                    <img
                      src="/kitchen-exhaust/hood-interior-before.jpg"
                      alt="Sample kitchen exhaust hood interior before service"
                      width={400}
                      height={300}
                      className="w-full h-auto aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border bg-surface-muted">
                    <div className="p-1.5 bg-surface text-[10px] font-mono font-bold uppercase tracking-wider text-product-accent border-b border-border text-center">
                      After
                    </div>
                    <img
                      src="/kitchen-exhaust/hood-interior-after.jpg"
                      alt="Sample kitchen exhaust hood interior after service"
                      width={400}
                      height={300}
                      className="w-full h-auto aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-ink-muted leading-relaxed">
                  Fictional demonstration case. The photographs and sample report are AI-generated demonstration materials for workflow evaluation.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. Featured Work Area
 * Gives a real artifact generous space instead of duplicating product cards
 */
function FeaturedArtifactSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-muted/40 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
            Featured Workflow Artifact
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            From raw field notes to customer deliverable
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            Examining how real unstructured service evidence transforms into a structured multi-page document without requiring technicians to change how they work on site.
          </p>
        </div>

        {/* 3-Step Sequence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-brand block mb-2">
                STAGE 01
              </span>
              <h3 className="text-base font-bold text-ink mb-2">
                Raw Field Evidence
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Technicians gather before-and-after phone photos and brief notes as they inspect hoods, ducts, filters, and exhaust fans.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-brand block mb-2">
                STAGE 02
              </span>
              <h3 className="text-base font-bold text-ink mb-2">
                Concierge Assembly
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Materials are organized, paired into side-by-side component exhibits, and formatted with facility and contractor metadata.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-brand block mb-2">
                STAGE 03
              </span>
              <h3 className="text-base font-bold text-ink mb-2">
                Finished Customer Report
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                A clean, multi-page PDF document ready for delivery to building managers, restaurant owners, or insurance files.
              </p>
            </div>
          </div>
        </div>

        {/* The Document Exhibit Banner */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-ink shrink-0 border border-border">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand">
                  Sample Deliverable
                </span>
                <span className="text-xs text-ink-muted font-mono">· PDF</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink">
                Pinecrest Family Diner — Kitchen Exhaust Inspection Report
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                Review the multi-page demonstration document assembled from paired component photography and service observations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/kitchen-exhaust-reports/#sample-report"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand text-white px-5 text-sm font-semibold shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <span>View sample document</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/kitchen-exhaust-reports/#contact"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <span>Request free sample</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 4. Compact Engineering / Studio Section
 * Direct individual contributor execution with route to /engineering/
 */
function EngineeringStudioSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              Engineering Services
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
              Senior backend engineering for complex systems.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
              In addition to building software products, KF Software provides focused technical execution for .NET backends, system integrations, migrations, and stabilization.
            </p>
            <div className="mt-6">
              <a
                href="/engineering/"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand text-white px-5 text-sm font-semibold shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <span>View engineering capabilities</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand border border-border">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">.NET Backends & Web APIs</h3>
                <p className="mt-0.5 text-xs text-ink-muted leading-relaxed">
                  Design, refactoring, testing, and operationally clear service boundaries for enterprise .NET applications.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand border border-border">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">Integrations & Data Workflows</h3>
                <p className="mt-0.5 text-xs text-ink-muted leading-relaxed">
                  Reliable movement and transformation of business data across microservices, databases, and external third-party systems.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand border border-border">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">Stabilization & Technical Delivery</h3>
                <p className="mt-0.5 text-xs text-ink-muted leading-relaxed">
                  Direct founder execution with bounded commitments. No junior delegation, no inflated staffing layers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 5. Publication Area
 * Rendered strictly from real published registry entries
 */
function PublicationsSection({
  articles,
}: {
  articles: ArticleRecord[];
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              Journal & Guides
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
              Published notes and practical guides
            </h2>
          </div>
          <a
            href="/blog/"
            className="text-xs sm:text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1"
          >
            <span>View all articles</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="divide-y divide-border">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={article.href}
              className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4 transition hover:bg-surface-muted/40 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand">
                    {article.category || "Guide"}
                  </span>
                  <span className="text-xs text-ink-muted">· {article.datePublished}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-brand transition leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
                  {article.description}
                </p>
              </div>

              <span className="text-xs font-semibold text-brand group-hover:underline inline-flex items-center gap-1 shrink-0">
                Read guide
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 6. Restrained Final Contact Path
 */
function ContactSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" id="contact">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          Discuss a project or request a demonstration.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Whether you want to evaluate the Kitchen Exhaust reporting workflow, discuss ChillPup, or inquire about senior backend engineering, we reply directly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:contact@kf-software.com"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand text-white px-6 text-sm font-semibold shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
          >
            <Mail className="h-4 w-4 opacity-90" aria-hidden="true" />
            <span>contact@kf-software.com</span>
          </a>
          <a
            href="/support/#contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
          >
            <span>Open contact form</span>
          </a>
        </div>
      </div>
    </section>
  );
}
