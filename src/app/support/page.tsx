import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { Mail, ArrowRight } from "lucide-react";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";

export const metadata: Metadata = {
  title: "Support | KF Software",
  description: "Need help with ChillPup or a KF Software product? Contact us and we will help you find the next step.",
  alternates: {
    canonical: "https://kf-software.com/support/",
  },
  openGraph: {
    title: "Support | KF Software",
    description: "Need help with ChillPup or a KF Software product? Contact us and we will help you find the next step.",
    url: "https://kf-software.com/support/",
    type: "website",
  },
};

export default function SupportPlaceholder() {
  return (
    <>
      <PageClarityTags siteSection="support" product="kf_software" pageType="support" />
      <Header />
      <main className="min-h-[70vh] flex flex-col justify-center bg-canvas text-ink py-16 sm:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-brand border border-border mb-6">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">
            Support Desk
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl tracking-tight">
            How can we help?
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-muted">
            Need help with ChillPup or a KF Software product? You can open our contact form by clicking below, or email us directly at{" "}
            <a href="mailto:support@kf-software.com" className="text-brand font-semibold hover:underline">
              support@kf-software.com
            </a>
            . We will help you find the next step.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              href="#contact"
            >
              <span>Contact Form</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-ink shadow-xs transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              href="/"
            >
              <span>Back Home</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}
