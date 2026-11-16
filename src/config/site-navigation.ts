export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavigation: NavItem[] = [
  { label: "ChillPup", href: "/chillpup/" },
  { label: "Payday calculator", href: "/tools/payday-balance/" },
  { label: "Engineering", href: "/engineering/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
];
