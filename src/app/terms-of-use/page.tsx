import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — KF Software",
  description: "Terms of Use for applications developed by KYRYL FROSYNIAK Solutions.",
  alternates: {
    canonical: "https://kf-software.com/terms-of-use/",
  },
  openGraph: {
    title: "Terms of Use — KF Software",
    description: "Terms of Use for applications developed by KYRYL FROSYNIAK Solutions.",
    url: "https://kf-software.com/terms-of-use/",
    type: "website",
  },
};

export default function TermsOfUse() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ];

  const sections = [
    {
      number: 1,
      title: "Use of the App",
      body: "You agree to use the app only for lawful purposes. You must not misuse the app or attempt to interfere with its normal operation.",
    },
    {
      number: 2,
      title: "Accounts",
      body: "Some features may require you to create an account. You are responsible for maintaining the confidentiality of your account information. We reserve the right to suspend or terminate accounts that violate these Terms.",
    },
    {
      number: 3,
      title: "Subscriptions and Payments",
      body: (
        <>
          Some features are available through a paid subscription (&quot;Premium Access&quot;).
          Payment will be charged to your Apple ID account at confirmation of purchase.
          Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. You can manage or cancel your subscription in your device settings: Settings → Apple ID → Subscriptions. Refunds are handled by Apple:{" "}
          <a
            href="https://reportaproblem.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A535C] font-semibold hover:underline"
          >
            https://reportaproblem.apple.com/
          </a>
        </>
      ),
    },
    {
      number: 4,
      title: "No Guarantees",
      body: "The app is provided \"as is\" without warranties of any kind. We do not guarantee specific results from using the app. If the app relates to health or behavior, including pets, it does not replace professional advice.",
    },
    {
      number: 5,
      title: "Limitation of Liability",
      body: "We are not responsible for any indirect, incidental, or consequential damages arising from the use of the app.",
    },
    {
      number: 6,
      title: "Account Deletion",
      body: "You can delete your account and all associated data directly in the app. Once deleted, your data cannot be restored.",
    },
    {
      number: 7,
      title: "Changes to Terms",
      body: "We may update these Terms from time to time. Continued use of the app after changes means you accept the updated Terms.",
    },
    {
      number: 8,
      title: "Contact",
      body: (
        <>
          If you have any questions, contact us at:{" "}
          <a
            href="mailto:contact@kf-software.com"
            className="text-[#1A535C] font-semibold hover:underline"
          >
            contact@kf-software.com
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <Header activeItem="" navItems={navItems} />
      <main className="bg-[#F8FAFC] min-h-screen py-14 px-5 sm:py-24 sm:px-6">
        <article className="mx-auto max-w-[900px] bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3.5 mb-6 text-[#1A535C]">
            <FileText className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-wider">LEGAL AGREEMENT</span>
          </div>

          <h1 className="text-4xl font-extrabold text-[#0F1A2C] leading-tight mb-3 sm:text-5xl">
            Terms of Use
          </h1>
          <p className="text-sm text-[#526174] mb-8 font-medium">Last updated: April 2026</p>

          <p className="text-[17px] leading-relaxed text-[#0F1A2C] mb-10 pb-6 border-b border-[#E2E8F0]">
            These Terms of Use (&quot;Terms&quot;) govern your use of applications developed by KYRYL FROSYNIAK Solutions (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By using our applications, you agree to these Terms.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.number} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-[#0F1A2C] mb-4 sm:text-2xl flex gap-3">
                  <span className="text-[#1A535C]">{section.number}.</span>
                  {section.title}
                </h2>
                <div className="text-base leading-[1.8] text-[#526174]">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}
