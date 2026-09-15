import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Mail, ExternalLink, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Social Agency Workflow Research | KF Software",
  },
  description:
    "Exploratory research into how small social-media agencies produce, review, and manage recurring content across client brands.",
  alternates: {
    canonical: "https://kf-software.com/research/social-agency-workflows/",
  },
  openGraph: {
    title: "Social Agency Workflow Research | KF Software",
    description:
      "Exploratory research into how small social-media agencies produce, review, and manage recurring content across client brands.",
    url: "https://kf-software.com/research/social-agency-workflows/",
    type: "website",
  },
};

export default function SocialAgencyWorkflowResearchPage() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog/" },
    { label: "Research", href: "/research/social-agency-workflows/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ];

  const participationItems = [
    "A 20–25 minute conversation or written answers",
    "No preparation required",
    "You may skip any question",
    "Nothing will be attributed publicly without your explicit permission",
  ];

  const faqItems = [
    {
      question: "What will you ask about?",
      answer:
        "The conversation focuses on recurring content planning, production, review, approvals, handoffs, tools, and maintaining context across multiple client brands.",
    },
    {
      question: "Is there a product already?",
      answer:
        "There is no product being offered as part of this research. I am first trying to understand whether the workflow problem is real and recurring.",
    },
    {
      question: "Will my answers be published?",
      answer:
        "Nothing will be attributed to you or your organization publicly without your explicit permission.",
    },
    {
      question: "Can I answer asynchronously?",
      answer:
        "Yes. You can reply in writing by email if that is more convenient than a call.",
    },
  ];

  return (
    <>
      <Header activeItem="Research" navItems={navItems} />
      <main className="bg-gradient-to-b from-[#F6F8FA] to-white py-12 sm:py-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header & Introduction */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
              RESEARCH
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0F1A2C] leading-tight">
              How small social-media agencies manage recurring client content
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#334155]">
              I’m Kyryl Frosyniak, an independent software developer based in
              Wrocław, Poland. I’m currently researching how small social-media
              agencies produce, review, and manage recurring content across
              multiple client brands.
            </p>

            {/* Non-sales Callout */}
            <div className="mt-6 rounded-2xl border border-teal-200/80 bg-teal-50/70 p-4 sm:p-5">
              <p className="text-[15px] font-semibold text-[#0F1A2C] leading-relaxed">
                This is exploratory research, not a product demo or sales call.
              </p>
            </div>

            <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[#526174]">
              I’m speaking with agency owners and team members involved in
              content production, review, tooling, handoffs, or workflow
              decisions.
            </p>
          </div>

          {/* Section: Participation */}
          <section className="mt-12 pt-10 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#0F1A2C]">Participation</h2>
            <ul className="mt-5 space-y-3 text-[#334155]">
              {participationItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0F766E] mt-0.5">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] sm:text-base leading-normal">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Contact */}
          <section id="contact" className="mt-12 pt-10 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#0F1A2C]">Contact</h2>
            <p className="mt-2 text-[15px] text-[#526174]">
              Feel free to reach out directly by email or connect on LinkedIn to
              participate or ask questions.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:contact@kf-software.com"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0F1A2C] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A535C]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#0F1A2C] group-hover:bg-[#0F1A2C] group-hover:text-white transition">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#0F1A2C]">
                      contact@kf-software.com
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/kyryl-frosyniak/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#0F1A2C] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A535C]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#0F1A2C] group-hover:bg-[#0F1A2C] group-hover:text-white transition">
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      LinkedIn
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#0F1A2C]">
                      Kyryl Frosyniak
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </section>

          {/* Section: Questions (FAQ) */}
          <section className="mt-12 pt-10 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-[#0F1A2C] flex items-center gap-2.5">
              <HelpCircle className="h-6 w-6 text-[#0F766E]" aria-hidden="true" />
              <span>Questions</span>
            </h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#0F1A2C]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-[15px] sm:text-base leading-relaxed text-[#526174]">
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
