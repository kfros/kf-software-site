import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Social Agency Workflow Research (Archived) | KF Software",
  },
  description:
    "Archived exploratory research documenting how small social-media agencies managed recurring content across client brands.",
  alternates: {
    canonical: "https://kf-software.com/research/social-agency-workflows/",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Social Agency Workflow Research (Archived) | KF Software",
    description:
      "Archived exploratory research documenting how small social-media agencies managed recurring content across client brands.",
    url: "https://kf-software.com/research/social-agency-workflows/",
    type: "website",
  },
};

export default function SocialAgencyWorkflowResearchPage() {
  const faqItems = [
    {
      question: "What did this research focus on?",
      answer:
        "The inquiry focused on recurring content planning, production, review, approvals, handoffs, tools, and maintaining brand voice across multiple client accounts.",
    },
    {
      question: "Is there a product resulting from this research?",
      answer:
        "No. This exploratory track concluded at the problem-validation stage and did not transition into an active commercial product.",
    },
    {
      question: "Why is this page preserved?",
      answer:
        "We preserve exploratory write-ups to document problem discovery openly and maintain historical references.",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-canvas text-ink py-12 sm:py-20 min-h-[70vh]">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header & Status */}
          <div>
            <span className="inline-flex items-center rounded-full bg-surface-muted border border-border px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink-muted">
              Archived exploratory research
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
              How small social-media agencies manage recurring client content
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-muted">
              This page documents an earlier research track conducted by Kyryl Frosyniak
              exploring the operational friction small social-media agencies face when
              producing, reviewing, and managing recurring content across client brands.
            </p>

            {/* Archive Notice Callout */}
            <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-5 text-sm sm:text-base leading-relaxed text-ink">
              <p className="font-semibold text-ink mb-1">Archive Notice</p>
              <p className="text-ink-muted">
                This documents an earlier research track and is not a current KF Software
                offering or active recruitment campaign. We are no longer conducting interviews
                for this project.
              </p>
            </div>
          </div>

          {/* Link back to current work */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            <a
              href="/#products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover focus:outline-none focus:ring-2 focus:ring-focus rounded"
            >
              <span>Explore current products & experiments</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Section: Historical Questions */}
          <section className="mt-12 pt-10 border-t border-border">
            <h2 className="text-xl sm:text-2xl font-bold text-ink flex items-center gap-2.5">
              <HelpCircle className="h-5 w-5 text-brand" aria-hidden="true" />
              <span>Research questions & scope</span>
            </h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-xs"
                >
                  <h3 className="text-base font-bold text-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
