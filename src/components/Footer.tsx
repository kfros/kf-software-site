import React from "react";
import { Mail } from "lucide-react";
import { KfLogoMark } from "./KfLogoMark";

export function Footer() {
  const navGroups = [
    {
      title: "PRODUCTS",
      links: [
        { label: "ChillPup", href: "/chillpup/" },
        { label: "Kitchen Exhaust Reports", href: "/kitchen-exhaust-reports/" },
      ],
    },
    {
      title: "SERVICES",
      links: [
        { label: "Engineering", href: "/engineering/" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "KF Software Blog", href: "/blog/" },
        { label: "ChillPup Guides", href: "/chillpup/guides/" },
        { label: "Support", href: "/support/" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About", href: "/about/" },
        { label: "Business Details", href: "/business-details/" },
        { label: "Privacy Policy", href: "/privacy-policy/" },
        { label: "Terms of Use", href: "/terms-of-use/" },
      ],
    },
  ];

  return (
      <footer className="bg-surface border-t border-border text-ink-muted pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-12 pb-12 border-b border-border">
              {/* Brand Column */}
              <div className="flex flex-col items-start w-full lg:max-w-[240px]">
                <div className="flex items-center gap-3">
                    <KfLogoMark className="text-ink h-9 w-9 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-bold tracking-[0.14em] text-ink uppercase leading-none">
                      KF SOFTWARE
                    </span>
                </div>
                  <p className="mt-3.5 text-xs leading-relaxed text-ink-muted">
                    Small software. Focused problems.
                  </p>
                  <a
                    href="mailto:contact@kf-software.com"
                    aria-label="Email KF Software"
                    className="mt-4 flex h-9 w-9 items-center justify-center rounded-xl bg-surface-muted border border-border text-ink transition hover:bg-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    <Mail className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
              </div>

              {/* Navigation Groups Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:flex lg:gap-10 xl:gap-16 w-full lg:w-auto justify-between lg:justify-start">
                {navGroups.map((group) => (
                  <div key={group.title} className="min-w-[110px]">
                      <h4 className="text-[13px] font-bold tracking-[0.08em] uppercase text-ink mb-3.5 block">
                        {group.title}
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="text-[14px] text-ink-muted hover:text-ink transition leading-[1.8] inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                  </div>
                ))}
              </div>

              {/* Business Details Card */}
              <div className="w-full lg:w-[320px] lg:min-w-[300px] lg:max-w-[360px] shrink-0">
                    <div className="bg-surface-muted border border-border rounded-[16px] p-5 sm:p-6 text-ink">
                      <div className="flex flex-col gap-2 text-[14px] leading-[1.8]">
                        <p className="font-semibold text-ink">KYRYL FROSYNIAK Solutions</p>
                        <p className="text-ink-muted">Wrocław, Poland</p>
                        <p>
                          Contact:{" "}
                          <a
                            href="mailto:contact@kf-software.com"
                            className="text-brand hover:underline transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded"
                          >
                            contact@kf-software.com
                          </a>
                        </p>
                          <p className="mt-1 pt-2 border-t border-border text-xs text-ink-muted">
                            NIP: 8992892536 | REGON: 388052186
                          </p>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Bottom Bar */}
                  <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
                    <p>© {new Date().getFullYear()} KF Software. All rights reserved.</p>
                    <p>Built with care & transparency.</p>
                  </div>
                </div>
              </footer>
              );
}
