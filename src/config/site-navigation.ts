export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "ChillPup", href: "/chillpup/" },
  { label: "Kitchen Exhaust", href: "/kitchen-exhaust-reports/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
];

export const kitchenExhaustSubnavigation: NavItem[] = [
  { label: "Demo", href: "#sample-report" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Free sample", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

