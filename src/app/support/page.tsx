import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { ArrowLeft, HeartHandshake } from "lucide-react";

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
  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ];

  return (
    <>
      <Header activeItem="Support" navItems={navItems} />
      <main className="min-h-[60vh] flex flex-col justify-center bg-gradient-to-b from-[#F6F8FA] to-white py-16 sm:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] shadow-sm mb-6 border border-slate-100">
            <HeartHandshake className="h-8 w-8" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
            SUPPORT
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-[#0F1A2C] sm:text-4xl">
            How can we help?
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#526174]">
            Need help with ChillPup or a KF Software product? You can open our contact form by clicking below, or email us directly at <a href="mailto:support@kf-software.com" className="text-[#0F766E] font-semibold hover:underline">support@kf-software.com</a>. We will help you find the next step.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#0F1A2C] px-6 font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
              href="#contact"
            >
              <span>Contact Form</span>
            </a>
            <a
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-[#0F1A2C] shadow-sm transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              href="/"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}
