import React from "react";
import { Mail } from "lucide-react";
import { KfLogoMark } from "./KfLogoMark";

export function Footer() {
  const navGroups = [
    {
      title: "PRODUCTS",
      links: [{ label: "ChillPup", href: "/chillpup" }],
    },
    {
      title: "RESOURCES",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { label: "About", href: "/about" },
        { label: "Business Details", href: "/business-details" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms-of-use" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0F1A2C] text-[#CBD5E1] pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-12 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="flex flex-col items-start w-full lg:max-w-[240px]">
            <div className="flex items-center gap-3">
              <KfLogoMark className="text-white h-9 w-9 shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold tracking-[0.14em] text-white uppercase leading-none">
                KF SOFTWARE
              </span>
            </div>
            <p className="mt-3.5 text-xs leading-relaxed text-[#CBD5E1]">
              Small software. Focused problems.
            </p>
            <a
              href="mailto:contact@kf-software.com"
              aria-label="Email KF Software"
              className="mt-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#CBD5E1] transition hover:text-white hover:bg-white/[0.1] hover:border-white/[0.2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail className="h-4.5 w-4.5" aria-hidden="true" />
            </a>
          </div>

          {/* Navigation Groups Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:flex lg:gap-10 xl:gap-16 w-full lg:w-auto justify-between lg:justify-start">
            {navGroups.map((group) => (
              <div key={group.title} className="min-w-[110px]">
                <h4 className="text-[13px] font-bold tracking-[0.08em] uppercase text-white mb-3.5 block">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-[#CBD5E1] hover:text-white transition leading-[1.8] inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
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
            <div className="bg-white/[0.03] border border-white/[0.22] rounded-[16px] p-5 sm:p-6">
              <div className="flex flex-col gap-2 text-[14px] leading-[1.8] text-[#E2E8F0]">
                <p className="font-semibold text-white">KYRYL FROSYNIAK Solutions</p>
                <p>Wrocław, Poland</p>
                <p>
                  Contact:{" "}
                  <a
                    href="mailto:contact@kf-software.com"
                    className="text-white hover:underline transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    contact@kf-software.com
                  </a>
                </p>
                <p className="mt-1 pt-2 border-t border-white/[0.08] text-xs text-[#CBD5E1]/70">
                  NIP: 8992892536 | REGON: 388052186
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-2 text-center text-[14px] text-[#CBD5E1]">
          &copy; {new Date().getFullYear()} KF Software. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
