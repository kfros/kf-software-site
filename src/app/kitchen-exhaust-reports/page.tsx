import React from "react";
import type { Metadata } from "next";
import {
  FileText,
  Camera,
  FileCheck2,
  Clock,
  Mail,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Building,
  CheckCircle,
  Info,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { RequestSampleForm, SamplePdfViewer } from "./RequestSampleForm";

export const metadata: Metadata = {
  title: {
    absolute: "Kitchen Exhaust Service Report Sample | KF Software",
  },
  description:
    "See a fictional kitchen exhaust service report assembled from technician notes and before-and-after photos, then request one free sample report.",
  alternates: {
    canonical: "https://kf-software.com/kitchen-exhaust-reports/",
  },
  openGraph: {
    type: "website",
    url: "https://kf-software.com/kitchen-exhaust-reports/",
    title: "Kitchen Exhaust Service Report Sample | KF Software",
    description:
      "View a fictional customer-ready report and request one free sample built from anonymized field notes and photos.",
  },
};

const navItems = [
  { label: "Demo", href: "#sample-report" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Free sample", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

const galleryPairs = [
  {
    component: "Hood interior",
    description: "Inspection of main kitchen hood canopy and interior fire barriers.",
    before: {
      src: "/kitchen-exhaust/hood-interior-before.jpg",
      alt: "Fictional hood interior before cleaning showing heavy grease buildup",
      caption: "Heavy grease accumulation across canopy interior prior to service",
    },
    after: {
      src: "/kitchen-exhaust/hood-interior-after.jpg",
      alt: "Fictional hood interior after cleaning down to bare metal",
      caption: "Interior stainless steel canopy degreased and cleaned to bare metal",
    },
  },
  {
    component: "Accessible duct",
    description: "Horizontal grease exhaust duct run accessed via inspection hatch.",
    before: {
      src: "/kitchen-exhaust/accessible-duct-before.jpg",
      alt: "Fictional accessible horizontal duct section before cleaning showing interior deposits",
      caption: "Accessible duct interior showing significant combustible grease deposits",
    },
    after: {
      src: "/kitchen-exhaust/accessible-duct-after.jpg",
      alt: "Fictional accessible horizontal duct section after cleaning showing cleared interior surface",
      caption: "Accessible duct run thoroughly cleared and washed to bare metal",
    },
  },
  {
    component: "Rooftop exhaust fan",
    description: "Rooftop upblast utility fan housing, fan bowl, and discharge blades.",
    before: {
      src: "/kitchen-exhaust/rooftop-exhaust-fan-before.jpg",
      alt: "Fictional rooftop exhaust fan housing and blades before cleaning showing accumulated grease",
      caption: "Rooftop exhaust fan assembly with residue across impeller and bowl",
    },
    after: {
      src: "/kitchen-exhaust/rooftop-exhaust-fan-after.jpg",
      alt: "Fictional rooftop exhaust fan housing and blades after cleaning showing cleaned fan assembly",
      caption: "Rooftop exhaust fan bowl and blades fully cleaned and wiped clean",
    },
  },
];

const faqItems = [
  {
    question: "Do technicians need to install an app?",
    answer: "No. This experiment starts with the photos and notes your team already produces.",
  },
  {
    question: "Is the sample really free?",
    answer: "Yes. We will assemble one demonstration report at no cost so both sides can evaluate the workflow.",
  },
  {
    question: "How do I send photos and notes?",
    answer: "Submit the short request form. We will reply by email with the next step for sending anonymized materials.",
  },
  {
    question: "Is this a compliance or safety inspection?",
    answer: "No. The report organizes supplied service information and photographs; it does not certify compliance or safety.",
  },
  {
    question: "How quickly will the sample be ready?",
    answer: "We aim to return it within one business day after receiving complete, usable materials. This is a target, not a guaranteed service level.",
  },
];

export default function KitchenExhaustReportsPage() {
  return (
    <>
      <PageClarityTags
        siteSection="kitchen_exhaust"
        product="report_service"
        pageType="demo_landing"
      />
      <Header activeItem="Demo" navItems={navItems} />

      <main className="bg-white text-slate-900 overflow-x-hidden">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24 lg:py-28 border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A535C]/10 px-3.5 py-1 text-xs font-bold tracking-wider text-[#1A535C] uppercase">
                Kitchen Exhaust Service Reports
              </span>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#0F1A2C] sm:text-5xl lg:text-6xl leading-[1.12]">
                Turn field photos and service notes into a customer-ready report
              </h1>
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
                Send the photos and notes your crew already produces. We will assemble
                one demonstration report at no cost, without asking technicians to adopt
                a new app.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#sample-report"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1A2C] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
                >
                  <span>View the sample report</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#0F1A2C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
                >
                  <span>Request a free sample</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INPUTS TO OUTPUT SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                Use the field materials you already have
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                The sample shows how unstructured technician notes and service photos can
                be organized into a consistent customer-facing PDF. The first test is a
                concierge service, not a self-serve software claim.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Inputs Box */}
              <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A535C] mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1A535C]/10 text-[#1A535C]">
                      1
                    </span>
                    <span>What you supply</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1A2C] mb-6">
                    Raw service documentation
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F1A2C]">
                        <FileText className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F1A2C]">Technician notes</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Unstructured notes describing equipment, areas serviced, and access notes.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F1A2C]">
                        <Camera className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F1A2C]">Before and after photos</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Field snapshots showing components before cleaning and after service.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F1A2C]">
                        <Building className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F1A2C]">
                          Basic job and contractor details
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Facility name, service date, contractor name, and crew identifier.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Output Box */}
              <div className="lg:col-span-6 rounded-3xl border border-[#1A535C]/30 bg-gradient-to-br from-[#1A535C]/5 via-white to-slate-50 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A535C] mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1A535C] text-white">
                      2
                    </span>
                    <span>Demonstration deliverable</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1A2C] mb-2">
                    A structured, customer-ready PDF report
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    A single clear, professional PDF documenting the service encounter with structured
                    metadata, side-by-side component photographs, and clear observations.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-800">
                        Side-by-side paired before and after photographs
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-800">
                        Itemized component sections (hoods, ducts, fans)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-800">
                        Consistent contractor branding and service summary
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-800">
                        Concierge assembly without requiring technicians to use new software
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>Assembled concierge demonstration</span>
                  <a
                    href="#sample-report"
                    className="font-semibold text-[#1A535C] hover:text-[#0F1A2C] inline-flex items-center gap-1"
                  >
                    <span>View demo report</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SELECTED BEFORE/AFTER GALLERY */}
        <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1A535C]">
                Demonstration Component Gallery
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                Paired field photography examples
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Representative service area pairs from the Pinecrest Family Diner sample report,
                illustrating how before and after conditions are presented together.
              </p>
            </div>

            <div className="space-y-10 sm:space-y-12">
              {galleryPairs.map((pair, index) => (
                <div
                  key={pair.component}
                  className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-6 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-[#1A535C] uppercase tracking-wider">
                        Component {index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0F1A2C] mt-0.5">
                        {pair.component}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                      {pair.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                    {/* Before Image */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 uppercase tracking-wide">
                          Before
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Initial condition</span>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs">
                        <img
                          src={pair.before.src}
                          alt={pair.before.alt}
                          width={864}
                          height={768}
                          className="w-full h-auto object-cover aspect-[4/3] block"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        {pair.before.caption}
                      </p>
                    </div>

                    {/* After Image */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center rounded-lg bg-teal-100 px-2.5 py-1 text-xs font-bold text-[#1A535C] uppercase tracking-wide">
                          After
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Post-cleaning condition</span>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs">
                        <img
                          src={pair.after.src}
                          alt={pair.after.alt}
                          width={864}
                          height={768}
                          className="w-full h-auto object-cover aspect-[4/3] block"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        {pair.after.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Adjacent Demo Disclosure */}
            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6 text-slate-800 shadow-xs">
              <div className="flex items-start gap-3.5">
                <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
                  <p className="font-semibold text-slate-900 mb-1">Demonstration Notice</p>
                  <p>
                    Fictional demonstration case. Company names, job details, and service data
                    are fictional. The photographs are AI-generated. This sample is for workflow
                    demonstration only and is not a certification, compliance determination, or
                    safety inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EMBEDDED SAMPLE PDF SECTION */}
        <section
          id="sample-report"
          className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1A535C]">
                Demonstration Document
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                Pinecrest Family Diner sample report
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Review the complete multi-page demonstration report assembled from fictional
                job specifications, service notes, and paired photography.
              </p>
            </div>

            <SamplePdfViewer />

            {/* Adjacent Demo Disclosure */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 text-slate-700 shadow-xs">
              <div className="flex items-start gap-3.5">
                <ShieldAlert className="h-5 w-5 text-[#1A535C] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Fictional sample scope
                  </span>
                  Fictional demonstration case. Company names, job details, and service data
                  are fictional. The photographs are AI-generated. This sample is for workflow
                  demonstration only and is not a certification, compliance determination, or
                  safety inspection.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS SECTION */}
        <section
          id="how-it-works"
          className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1A535C]">
                Concierge Process
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                How the free sample works
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                We handle the layout work directly so you can see how your existing photos
                and notes translate into a finished PDF report without altering your field habits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F1A2C] text-white font-bold text-base mb-6">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F1A2C] mb-2.5">
                    Send a short request
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tell us what kind of kitchen exhaust service report you need.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-4 w-4 text-[#1A535C]" aria-hidden="true" />
                  <span>Submit the request form below</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F1A2C] text-white font-bold text-base mb-6">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F1A2C] mb-2.5">
                    Reply with anonymized materials
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We will email you with the next step for sending photos and technician notes.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <FileText className="h-4 w-4 text-[#1A535C]" aria-hidden="true" />
                  <span>Anonymized field photos and notes</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F1A2C] text-white font-bold text-base mb-6">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F1A2C] mb-2.5">
                    Review the assembled PDF
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We aim to return the demonstration report within one business day after receiving usable materials.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-4 w-4 text-[#1A535C]" aria-hidden="true" />
                  <span>Target: 1 business day (not a guaranteed SLA)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FREE SAMPLE OFFER AND BOUNDARIES SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-12 shadow-sm">
              <div className="max-w-3xl">
                <span className="text-xs font-bold tracking-wider uppercase text-[#1A535C]">
                  Experiment Offer & Scope
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                  One free sample report
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                  The sample is intended to test whether this reporting workflow fits your
                  operation. No signup or sales call is required. Please remove customer names,
                  addresses, phone numbers, and other sensitive information before sending materials.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
                  <div className="flex items-start gap-3.5">
                    <ShieldAlert className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-sm font-bold text-[#0F1A2C]">Reporting Boundary</h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        The report documents information and photographs supplied by the requester.
                        It is not a certification, compliance determination, or safety inspection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. REQUEST FORM SECTION */}
        <section
          id="contact"
          className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-bold tracking-wider uppercase text-[#1A535C]">
                  Get Started
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                  Request your free sample report
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Leave a work email and a short description. We will reply with the next step
                  for sending anonymized photos and notes.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-slate-700 leading-normal">
                      No software setup or credit card required
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-slate-700 leading-normal">
                      Use materials your crew already gathers on site
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1A535C] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-slate-700 leading-normal">
                      Target turnaround within one business day after receiving usable materials
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
                  <RequestSampleForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section
          id="faq"
          className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold tracking-wider uppercase text-[#1A535C]">
                Questions & Answers
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1A2C] tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Clear details on what this demonstration experiment provides and how it operates.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqItems.map((item) => (
                <div key={item.question} className="py-6 sm:py-8">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F1A2C] flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-[#1A535C] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item.question}</span>
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pl-8">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

