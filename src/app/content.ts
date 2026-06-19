import type { LucideIcon } from "lucide-react";
import { Code, Heart, ShieldCheck } from "lucide-react";

import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./store-links";

export interface NavigationLink {
  label: string;
  href: string;
}

export interface HeroBadge {
  icon: LucideIcon;
  text: string;
}

export interface StoreButton {
  type: "app-store" | "google-play";
  label: string;
  url: string;
  active: boolean;
}

export interface FeatureItem {
  title: string;
  desc: string;
}

export interface PrincipleCard {
  title: string;
  desc: string;
}

export const brandIdentity = {
  logoText: "KF SOFTWARE",
  tagline: "Small software. Focused problems.",
  legalName: "KYRYL FROSYNIAK Solutions",
  location: "Wrocław, Poland",
  email: "contact@kf-software.com",
  taxIdentifiers: "NIP: 8992892536 | REGON: 388052186",
};

export const navigationLinks: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "ChillPup", href: "#chillpup" },
  { label: "Blog", href: "/blog/" },
  { label: "Support", href: "#support" },
  { label: "About", href: "#about" },
];

export const heroContent = {
  heading: "Small software for real-world problems.",
  subheading:
    "We build small software products from idea to launch: web apps, mobile apps, automation tools, and niche utilities.",
  ctaPrimary: { label: "Explore ChillPup", href: "#chillpup" },
  ctaSecondary: { label: "Contact us", href: "#contact" },
  badges: [
    { icon: ShieldCheck, text: "Privacy-conscious\nby design" },
    { icon: Heart, text: "Clear choices,\nno pressure" },
    { icon: Code, text: "Built with care\nand transparency" },
  ] satisfies HeroBadge[],
};

export const featuredProduct = {
  id: "chillpup",
  badge: "FEATURED PRODUCT",
  title: "ChillPup",
  subtitle: "Gentle routines for stressful dog moments.",
  description:
    "Short, owner-guided routines for fireworks, loud noises, visitors, travel, and daily tension. Know what to do when your dog needs you most.",
  storeButtons: [
    {
      type: "app-store",
      label: "Download on the App Store",
      url: APP_STORE_URL,
      active: true,
    },
    {
      type: "google-play",
      label: "Get ChillPup on Google Play",
      url: GOOGLE_PLAY_URL,
      active: true,
    },
  ] satisfies StoreButton[],
  features: [
    {
      title: "Practical routines",
      desc: "Step-by-step guidance you can actually use.",
    },
    {
      title: "Track what helps",
      desc: "Quick check-ins before and after.",
    },
    {
      title: "Build progress over time",
      desc: "See patterns and understand your dog better.",
    },
    {
      title: "Gentle & owner-guided",
      desc: "You are in control. Your dog sets the pace.",
    },
  ] satisfies FeatureItem[],
};

export const principlesSection = {
  title: "Built with principles that matter",
  cards: [
    {
      title: "No medical or diagnostic claims",
      desc: "ChillPup is not a veterinary or diagnostic app. It provides owner-guided support only.",
    },
    {
      title: "Gentle behavior principles",
      desc: "Routines inspired by proven behavior-support approaches like gradual exposure, relaxation and positive experiences.",
    },
    {
      title: "Privacy first",
      desc: "Your data stays yours. We collect only what is necessary to run the app.",
    },
    {
      title: "Clear choices",
      desc: "No pressure, no tricks, no hidden costs. Just clear value.",
    },
    {
      title: "Small & focused",
      desc: "We build narrow, useful apps that solve real problems instead of trying to do everything.",
    },
  ] satisfies PrincipleCard[],
};
