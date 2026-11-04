import type { LucideIcon } from "lucide-react";
import { Code, Heart, ShieldCheck } from "lucide-react";

import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./store-links";
import { primaryNavigation, NavItem } from "@/config/site-navigation";

export { primaryNavigation };
export type { NavItem };

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

export const navigationLinks: NavigationLink[] = primaryNavigation;

export const heroContent = {
  heading: "Small software for real-world problems.",
  subheading:
    "We build small software products from idea to launch: web apps, mobile apps, automation tools, and niche utilities.",
  ctaPrimary: { label: "Explore products", href: "#products" },
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

export const companyPrinciples = [
  {
    title: "Narrow, useful products",
    desc: "Build for a defined problem instead of trying to cover every workflow.",
  },
  {
    title: "Clear limits",
    desc: "Describe what a product does and does not do without inflated claims.",
  },
  {
    title: "Privacy by default",
    desc: "Collect only the information needed to provide the experience.",
  },
  {
    title: "Evidence before expansion",
    desc: "Test workflows and behavior before investing in broader functionality.",
  },
];

export const principlesSection = {
  title: "How we build",
  cards: companyPrinciples satisfies PrincipleCard[],
};
