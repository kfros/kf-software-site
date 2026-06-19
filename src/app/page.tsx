import {
  ArrowRight,
  Check,
  Download,
  Mail,
  ClipboardCheck,
  TrendingUp,
  BadgeCheck,
  Compass,
  ShieldAlert,
  HeartHandshake,
  Lock,
  Ban,
  Code,
} from "lucide-react";
import {
  brandIdentity,
  featuredProduct,
  heroContent,
  principlesSection,
} from "./content";
import { ContactModal } from "./contact-modal";
import { HeroPhones } from "@/components/HeroPhones";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageClarityTags } from "@/components/analytics/PageClarityTags";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./store-links";

export default function MainLanding() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "ChillPup", href: "/chillpup/" },
    { label: "Blog", href: "/blog" },
    { label: "Support", href: "#support" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <PageClarityTags siteSection="home" product="kf_software" pageType="landing" />
      <Header activeItem="Home" navItems={navItems} />
      <main>
        <HeroSection />
        <ValueBadges />
        <FeaturedProduct />
        <PrinciplesGrid />
      </main>
      <Footer />
      <ContactModal />
    </>
  );
}


function HeroSection() {
  return (
    <section
      className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24"
      id="home"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">
          {brandIdentity.tagline}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-brand-primary sm:text-5xl lg:text-6xl">
          {heroContent.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {heroContent.subheading}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex h-[52px] items-center justify-center gap-[10px] rounded-[18px] bg-[#0F1A2C] px-[28px] font-bold text-white shadow-sm transition hover:bg-[#16243A] focus:outline-none focus:ring-2 focus:ring-[#0F1A2C] focus:ring-offset-2"
            href={heroContent.ctaPrimary.href}
          >
            <span>{heroContent.ctaPrimary.label}</span>
            <ArrowRight aria-hidden="true" className="h-5 w-5 opacity-90" />
          </a>
          <a
            className="inline-flex h-[52px] items-center justify-center gap-[10px] rounded-[18px] border border-[#CBD5E1] bg-transparent px-[28px] font-bold text-[#0F1A2C] transition hover:bg-[#F8FAFC] hover:border-[#0F1A2C] focus:outline-none focus:ring-2 focus:ring-[#0F1A2C] focus:ring-offset-2"
            href={heroContent.ctaSecondary.href}
          >
            <Mail aria-hidden="true" className="h-5 w-5 opacity-80" />
            <span>{heroContent.ctaSecondary.label}</span>
          </a>
        </div>
      </div>

      <HeroPhones />
    </section>
  );
}

function ValueBadges() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-3 md:divide-x md:divide-slate-200">
        {heroContent.badges.map((badge, idx) => {
          const Icon = badge.icon;

          return (
            <div
              className={`flex flex-col items-center justify-center p-4 text-center bg-transparent border-none shadow-none ${idx > 0 ? "md:pl-8" : ""
                }`}
              key={badge.text}
            >
              <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center text-[#0F1A2C]">
                <Icon aria-hidden="true" className="h-9 w-9" strokeWidth={1.85} />
              </div>
              <p className="text-[15px] font-medium leading-[1.35] text-[#0F1A2C] whitespace-pre-line text-center">
                {badge.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedProduct() {
  const featureIcons = [ClipboardCheck, TrendingUp, BadgeCheck, Compass];

  return (
    <section
      className="bg-white py-16 sm:py-20"
      id={featuredProduct.id}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#E2E8F0] bg-[#F6F8FA] p-6 sm:p-10 lg:p-14 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr_1.15fr] lg:gap-12 items-center">

            {/* App Icon Column */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-[96px] h-[96px] sm:w-[108px] sm:h-[108px] lg:w-[128px] lg:h-[128px] rounded-[24px] sm:rounded-[28px] bg-white shadow-soft overflow-hidden shrink-0 flex items-center justify-center p-0 border border-slate-100">
                <img
                  src="/images/chillpup-icon.png"
                  alt="ChillPup app icon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Copy & Badges Column */}
            <div className="flex flex-col">
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#0F4C5C]">
                {featuredProduct.badge}
              </p>
              <h3 className="mt-4 text-[32px] lg:text-[40px] font-extrabold text-[#0F1A2C] leading-none">
                {featuredProduct.title}
              </h3>
              <p className="mt-3 text-[20px] lg:text-[24px] font-bold text-[#0F4C5C] leading-[1.25]">
                {featuredProduct.subtitle}
              </p>
              <p className="mt-5 text-[16px] leading-[1.65] text-[#526174]">
                {featuredProduct.description}
              </p>

              {/* Store Badges */}
              <div className="mt-8 flex flex-row items-center gap-4 flex-wrap">
                {/* App Store Badge */}
                <a
                  href={APP_STORE_URL}
                  aria-label="Download ChillPup on the App Store"
                  className="transition hover:opacity-85 shrink-0"
                >
                  <AppStoreBadge className="h-[40px] sm:h-[42px] w-auto" />
                </a>

                {/* Google Play Badge */}
                <a
                  href={GOOGLE_PLAY_URL}
                  aria-label="Get ChillPup on Google Play"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-85 shrink-0"
                >
                  <GooglePlayBadge className="h-[40px] sm:h-[42px] w-auto" />
                </a>
              </div>
            </div>

            {/* Features Column with vertical separator */}
            <div className="lg:border-l lg:border-slate-200 lg:pl-12 flex flex-col gap-6 lg:gap-7 self-stretch justify-center">
              {featuredProduct.features.map((feature, idx) => {
                const Icon = featureIcons[idx] || Check;
                return (
                  <div key={feature.title} className="flex gap-4 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                      <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.85} />
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-[#0F1A2C] leading-none">
                        {feature.title}
                      </h4>
                      <p className="mt-1.5 text-[15px] leading-[1.45] text-[#526174]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function PrinciplesGrid() {
  const principleIcons = [ShieldAlert, HeartHandshake, Lock, Ban, Code];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:px-8 bg-transparent">
      {/* Centered Heading */}
      <div className="text-left sm:text-center max-w-3xl mx-auto mb-16">
        <h2
          className="text-[28px] sm:text-[34px] font-extrabold text-[#0F1A2C] leading-tight"
          id="about"
        >
          {principlesSection.title}
        </h2>
      </div>

      {/* Five-Item Principles Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-y-0 items-start">
        {principlesSection.cards.map((card, idx) => {
          const Icon = principleIcons[idx] || ShieldAlert;
          return (
            <div
              className={`flex flex-col items-center p-3 text-center bg-transparent border-none shadow-none px-4 sm:px-6 lg:px-8 relative lg:border-l lg:border-slate-200/80 ${idx === 0 ? "lg:border-l-0" : ""
                }`}
              key={card.title}
            >
              {/* Icon Container */}
              <div className="mb-5 flex h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] items-center justify-center text-[#0F1A2C] transition-colors duration-300 hover:text-[#2F8F6B] cursor-pointer">
                <Icon aria-hidden="true" className="h-11 w-11 sm:h-14 sm:w-14" strokeWidth={1.85} />
              </div>
              {/* Title */}
              <h3 className="text-[17px] font-extrabold text-[#0F1A2C] leading-[1.25] mb-3">
                {card.title}
              </h3>
              {/* Description */}
              <p className="text-[15px] leading-[1.55] text-[#526174] max-w-[220px] mx-auto">
                {card.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Support & Blog Blocks */}
      <div className="mt-20 sm:mt-24 grid gap-6 md:grid-cols-2">
        <section
          className="rounded-[24px] bg-[#0F1A2C] p-6 sm:p-8 text-white shadow-soft transition-all duration-300 hover:bg-[#16243A] flex flex-col justify-between"
          id="support"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">Support</h3>
            <p className="mt-3 text-[15px] leading-[1.55] text-white/80">
              Need help with ChillPup or a KF Software product? Send us a clear
              message and we will help you find the next step.
            </p>
          </div>
          <div className="mt-6">
            <a
              className="inline-flex h-[42px] items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0F1A2C] transition hover:text-[#1A535C] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0F1A2C]"
              href="#contact"
            >
              <span>Contact support</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>
        <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-sm hover:border-[#0F1A2C] transition-all duration-300 flex flex-col justify-between" id="blog">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight text-[#0F1A2C]">Blog</h3>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#526174]">
              Notes about small software, practical automation, and building
              focused products will appear here.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}


