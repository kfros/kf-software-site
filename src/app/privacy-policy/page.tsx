import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../contact-modal";
import { Shield } from "lucide-react";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";

export const metadata: Metadata = {
  title: "Privacy Policy — KF Software",
  description: "Privacy Policy for applications developed by KYRYL FROSYNIAK Solutions.",
  alternates: {
    canonical: "https://kf-software.com/privacy-policy/",
  },
  openGraph: {
    title: "Privacy Policy — KF Software",
    description: "Privacy Policy for applications developed by KYRYL FROSYNIAK Solutions.",
    url: "https://kf-software.com/privacy-policy/",
    type: "website",
  },
};

export default function PrivacyPolicy() {
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
      title: "Data Controller",
      content:
        "The data controller is KYRYL FROSYNIAK SOLUTIONS, VAT ID: 8992892536, Address: Wrocław, Świeradowska 51/57, Email: contact@kf-software.com.",
    },
    {
      number: 2,
      title: "Purposes and Legal Basis",
      content:
        "We process data to provide mobile services (Art. 6(1)(b) GDPR), including user account management, data synchronization, and features available in a specific application. We may also process data to improve the quality of our services (Art. 6(1)(f) GDPR).",
    },
    {
      number: 3,
      title: "Collected Data and Features",
      content:
        "Depending on the specific application and only with the user's explicit permission, our applications may access the device's camera, microphone, or authentication/login data. The camera may be used for AR features, environment scanning, or visual content creation. The microphone may be used for audio analysis or recording audio materials at the user's request. Login data, such as email address and name, may be obtained from Google/Apple providers for authentication. We do not access these features unless explicitly requested by the user and necessary for the app's functionality.",
    },
    {
      number: 4,
      title: "Security and Storage",
      content:
        "Data is stored in Google Firebase. We use Firebase Security Rules to restrict access to data according to the user's account and the functionality of the app. Data is encrypted in transit and at rest.",
    },
    {
      number: 5,
      title: "User Rights",
      content:
        "You have the right to access, delete ('right to be forgotten'), and object to data processing. Contact: contact@kf-software.com.",
    },
    {
      number: 6,
      title: "Data Deletion",
      content:
        "Users can delete their account and all associated data at any time directly within the app or by sending an email request to contact@kf-software.com. For email requests, data will be permanently deleted within 7 business days. This process includes the removal of the user profile and associated records from the Firebase database.",
    },
    {
      number: 7,
      title: "Analytics and Session Recording",
      content:
        "Our website uses Microsoft Clarity to understand how visitors interact with our pages. Clarity collects interaction data, such as clicks, scrolls, page visits, browser/device specifications, and approximate usage behavior. We use this information to improve our website, user experience, and product pages. These cookies are set and data is collected only after you have given consent in the cookie banner. We do not use Microsoft Clarity to collect personally identifying information or sensitive medical data.",
    },
  ];

  return (
    <>
      <PageClarityTags siteSection="legal" product="kf_software" pageType="legal" />
      <Header activeItem="" navItems={navItems} />
      <main className="bg-[#F8FAFC] min-h-screen py-14 px-5 sm:py-24 sm:px-6">
        <article className="mx-auto max-w-[900px] bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-12 shadow-sm">
          <div className="flex items-center gap-3.5 mb-6 text-[#1A535C]">
            <Shield className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-wider">LEGAL AGREEMENT</span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-[#0F1A2C] leading-tight mb-3 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#526174] mb-8 font-medium">Last updated 21.01.2026</p>

          <p className="text-[17px] leading-relaxed text-[#0F1A2C] mb-10 pb-6 border-b border-[#E2E8F0]">
            This Privacy Policy explains how KYRYL FROSYNIAK Solutions processes personal data in connection with its applications and services.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.number} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-[#0F1A2C] mb-4 sm:text-2xl flex gap-3">
                  <span className="text-[#1A535C]">{section.number}.</span>
                  {section.title}
                </h2>
                <p className="text-base leading-[1.8] text-[#526174]">
                  {section.content}
                </p>
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
