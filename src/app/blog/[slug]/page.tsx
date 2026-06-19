import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModal } from "../../contact-modal";
import { ArrowLeft, BookOpen, ShieldAlert, AlertTriangle } from "lucide-react";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { allArticles } from "../blog-posts";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for Next.js static export
export function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata for SEO
export function generateMetadata({ params }: PageProps): Metadata {
  const article = allArticles.find((a) => a.slug === params.slug);
  if (!article) {
    return {
      title: "Guide Not Found | ChillPup Blog",
    };
  }

  return {
    title: `${article.title} | ChillPup Guide | KF Software`,
    description: article.description,
    alternates: {
      canonical: `https://kf-software.com/blog/${article.slug}/`,
    },
    openGraph: {
      title: `${article.title} | ChillPup Guide`,
      description: article.description,
      url: `https://kf-software.com/blog/${article.slug}/`,
      type: "article",
    },
  };
}

export default function BlogPlaceholderPage({ params }: PageProps) {
  const article = allArticles.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog/" },
    { label: "Support", href: "/support/" },
    { label: "About", href: "/about/" },
  ];

  const isSafety = article.isBoundaryContent;

  return (
    <>
      <PageClarityTags siteSection="blog" product="kf_software" pageType="blog_article" />
      <Header activeItem="Blog" navItems={navItems} />
      
      <main className="min-h-[80vh] bg-gradient-to-b from-[#FAF6F0] via-[#FCFAF7] to-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <div className="mb-8">
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#0B5F59] transition focus:outline-none focus:underline"
              href="/blog/"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to ChillPup Guides</span>
            </a>
          </div>

          {/* Article Container */}
          <article 
            className={`rounded-[32px] border p-8 sm:p-12 shadow-sm ${
              isSafety 
                ? "bg-[#FFFDF9] border-amber-200/60" 
                : "bg-white border-slate-200/60"
            }`}
          >
            {/* Badges and tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold border ${
                isSafety 
                  ? "bg-amber-50 text-amber-800 border-amber-100" 
                  : "bg-teal-50 text-[#0F766E] border-teal-100"
              }`}>
                {article.category}
              </span>
              <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider border ${
                isSafety 
                  ? "bg-[#FFFbeb] text-amber-900 border-amber-200" 
                  : "bg-slate-50 text-slate-600 border-slate-100"
              }`}>
                {article.badge}
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1A2C] leading-tight">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#526174] border-l-4 border-slate-200 pl-4 italic">
              {article.description}
            </p>

            {/* Status Notice */}
            <div className="mt-8 border-t border-slate-100 pt-8 text-base leading-relaxed text-[#526174] space-y-4">
              <div className="flex items-center gap-3 text-[#0F766E]">
                <BookOpen className="h-5 w-5 shrink-0" />
                <h2 className="font-bold text-lg">Guide currently compiling</h2>
              </div>
              <p>
                Our team is currently compiling and formatting the step-by-step ChillPup calming routine and safety observations for this specific scenario.
              </p>
              <p>
                We build guides using behavioral observations and safe, owner-guided routines designed to avoid triggers and support natural calm. Check back soon for the complete published routine.
              </p>
            </div>

            {/* Safety Disclaimer */}
            <div className={`mt-10 rounded-2xl border p-6 ${
              isSafety 
                ? "bg-amber-50/50 border-amber-200/50 text-slate-800" 
                : "bg-slate-50 border-slate-200/50 text-slate-700"
            }`}>
              <div className="flex items-center gap-2 mb-3 text-amber-900">
                {isSafety ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <ShieldAlert className="h-5 w-5 shrink-0" />}
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  {isSafety ? "Critical Safety & Vet-Ready Guidance" : "Safety Disclaimer"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {isSafety 
                  ? "Sudden changes in dog behavior (like shaking, confusion, panting, or touching sensitivity) can be signs of physiological pain, cognitive shifts, or medical emergencies. Please trace and write down exactly when these behaviors occur and contact a veterinarian before initiating behavioral routines."
                  : "ChillPup routines are owner-guided exercises intended for everyday behavioral stress. They do not replace veterinary advice, behavioral therapy, or professional medical diagnosis."
                }
              </p>
              <p className="text-xs sm:text-sm leading-relaxed mt-3 border-t border-amber-200/20 pt-3 text-[#526174]">
                If your dog shows symptoms of physical distress, collapse, breathing difficulty, or sudden unexplained aggression, contact a veterinary professional immediately.
              </p>
            </div>

          </article>
        </div>
      </main>

      <Footer />
      <ContactModal />
    </>
  );
}
