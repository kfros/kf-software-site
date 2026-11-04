import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Layers,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";

export const metadata: Metadata = {
  title: "Backend Engineering | KF Software by Kyryl Frosyniak",
  description:
    "Focused senior backend engineering for .NET systems, integrations, data-heavy workflows, modernization, and stabilization.",
  alternates: {
    canonical: "https://kf-software.com/engineering/",
  },
  openGraph: {
    title: "Backend Engineering | KF Software by Kyryl Frosyniak",
    description:
      "Focused senior backend engineering for .NET systems, integrations, data-heavy workflows, modernization, and stabilization.",
    url: "https://kf-software.com/engineering/",
    type: "website",
  },
};

const capabilityAreas = [
  {
    icon: Server,
    title: ".NET backends and APIs",
    description:
      "Design, implementation, refactoring, testing, and operationally clear service boundaries.",
  },
  {
    icon: Database,
    title: "Integrations and data workflows",
    description:
      "Reliable movement and transformation of data across services, databases, queues, and external systems.",
  },
  {
    icon: RefreshCw,
    title: "Migration and modernization",
    description:
      "Incremental replacement of legacy or vendor-owned behavior while keeping delivery risk visible.",
  },
  {
    icon: ShieldCheck,
    title: "Stabilization and technical delivery",
    description:
      "Focused investigation, defect reduction, and delivery support when ownership or system behavior is unclear.",
  },
];

const engagementSteps = [
  {
    step: "01",
    title: "Initial Context & Constraints",
    description:
      "Describe the system, current problem, technical constraints, and desired operational outcome.",
  },
  {
    step: "02",
    title: "Fit & Scope Assessment",
    description:
      "KF Software reviews whether the problem fits available senior expertise, schedule, and architectural scope.",
  },
  {
    step: "03",
    title: "Bounded Step & Delivery Cadence",
    description:
      "If there is a mutual fit, agree on a bounded first milestone, verifiable artifacts, and a direct communication cadence.",
  },
];

export default function EngineeringPage() {
  return (
    <>
      <PageClarityTags siteSection="engineering" product="kf_software" pageType="landing" />
      <Header activeItem="Engineering" />

      <main className="min-h-screen bg-canvas text-ink py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
              <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              Engineering
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Senior backend engineering for complex systems.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
              KF Software provides focused engineering support for .NET backends, integrations, data-heavy workflows, and system modernization.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/support/#contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Discuss an engineering problem
              </a>
              <a
                href="/blog/#engineering-notes"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Read engineering notes
              </a>
            </div>
          </section>

          {/* Capability Areas Grid */}
          <section className="mt-16 sm:mt-20" aria-labelledby="capabilities-heading">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Core Capabilities
                </span>
                <h2 id="capabilities-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Where KF Software helps
                </h2>
              </div>
              <p className="text-sm text-ink-muted max-w-md">
                Senior individual contributor execution focused on backend reliability, maintainability, and clean architecture.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {capabilityAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs transition hover:border-brand/40"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted border border-border text-brand">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-ink">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How an engagement starts */}
          <section className="mt-16 sm:mt-20 rounded-[28px] border border-border bg-surface-raised p-8 sm:p-10 lg:p-12 shadow-sm" aria-labelledby="engagement-heading">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Working Together
              </span>
              <h2 id="engagement-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                How an engagement starts
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                Work is structured around concrete technical objectives with direct founder communication and bounded commitments.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {engagementSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-brand block mb-2">
                      STEP {step.step}
                    </span>
                    <h3 className="text-base font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-5 sm:p-6">
              <h4 className="text-sm font-bold text-ink mb-1.5">
                Studio Boundaries & Focus
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                KF Software is an independent studio led by Kyryl Frosyniak. We take on a small number of concurrent technical engagements where deep backend experience directly moves the needle. We do not provide outsourced volume staffing, 24/7 on-call rotation, or unvetted junior delegations.
              </p>
            </div>

            <div className="mt-8 flex justify-start">
              <a
                href="/support/#contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                <span>Initiate an engineering inquiry</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* Cross links */}
          <section className="mt-16 sm:mt-20 border-t border-border pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-ink-muted">
            <p>
              Looking for our software products instead?
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/#products"
                className="font-semibold text-brand hover:underline"
              >
                View products →
              </a>
              <a
                href="/about/"
                className="font-semibold text-ink hover:underline"
              >
                About KF Software →
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

