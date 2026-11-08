import React from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  Database,
  RefreshCw,
  Server,
  ShieldCheck,
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
          <section className="max-w-3xl pb-12 sm:pb-16 border-b border-border">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
              Backend Engineering Services
            </span>
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

          {/* Editorial Capability Index */}
          <section className="py-16 sm:py-20 border-b border-border" aria-labelledby="capabilities-heading">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
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

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilityAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="flex items-start gap-4 p-2 rounded-xl"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-brand border border-border mt-0.5">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">
                        {area.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Engagement Sequence */}
          <section className="py-16 sm:py-20 border-b border-border" aria-labelledby="engagement-heading">
            <div className="max-w-2xl mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
                Working Together
              </span>
              <h2 id="engagement-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                How an engagement starts
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                Work is structured around concrete technical objectives with direct founder communication and bounded commitments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {engagementSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-brand block mb-2">
                      STEP {step.step}
                    </span>
                    <h3 className="text-base font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Studio boundaries callout */}
            <div className="mt-10 rounded-xl border border-border bg-surface-muted p-5 sm:p-6">
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
          <section className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-ink-muted">
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
