import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Business Details | KF Software",
  },
  description: "Public business and contact details for KF Software in Wrocław, Poland.",
  alternates: {
    canonical: "https://kf-software.com/business-details/",
  },
  openGraph: {
    title: "Business Details | KF Software",
    description: "Public business and contact details for KF Software in Wrocław, Poland.",
    url: "https://kf-software.com/business-details/",
    type: "website",
  },
};

export default function BusinessDetailsPage() {
  const businessFields = [
    { label: "Brand", value: "KF Software" },
    { label: "Registered business name", value: "KYRYL FROSYNIAK Solutions" },
    { label: "Location", value: "Wrocław, Poland" },
    { label: "NIP", value: "8992892536" },
    { label: "REGON", value: "388052186" },
    {
      label: "Contact",
      value: "contact@kf-software.com",
      link: "mailto:contact@kf-software.com",
    },
  ];

  return (
    <>
        <Header />
        <main className="min-h-[65vh] flex flex-col justify-center bg-canvas text-ink py-16 sm:py-24">
          <div className="mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-brand shadow-xs mb-6 border border-border">
                  <Building2 className="h-8 w-8" aria-hidden="true" />
                </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                    COMPANY
                  </p>
                    <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                      Business Details
                    </h1>
                  </div>

                      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
                        <dl className="divide-y divide-border">
                          {businessFields.map((field) => (
                <div
                  key={field.label}
                  className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted shrink-0">
                    {field.label}
                  </dt>
                  <dd className="text-[15px] font-medium text-ink sm:text-right break-words">
                    {field.link ? (
                      <a
                        href={field.link}
                        id="contact"
                        className="text-brand underline underline-offset-2 hover:text-brand-hover transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
                      >
                        {field.value}
                      </a>
                    ) : (
                      field.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 font-semibold text-ink shadow-sm transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
              href="/"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </a>
          </div>
        </div>
                    </main>
                    <Footer />
                  </>
                  );
}
