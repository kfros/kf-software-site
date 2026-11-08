"use client";

import React, { useState, useEffect } from "react";
import { Mail, Menu, X } from "lucide-react";
import { KfLogoMark } from "./KfLogoMark";
import { brandIdentity } from "@/app/content";
import { primaryNavigation, NavItem } from "@/config/site-navigation";
import { ThemeToggle } from "./ThemeToggle";

export type { NavItem };

interface HeaderProps {
  activeItem?: string;
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

  export function Header({
    activeItem,
    navItems = primaryNavigation,
    ctaLabel = "Contact",
    ctaHref = "/support/#contact",
  }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile menu on Escape key press
    useEffect(() => {
      if (!isOpen) return;

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-3.5 sm:px-6 lg:px-8">
            {/* Logo/Wordmark */}
            <a
              className="group flex items-center gap-3.5 sm:gap-4 shrink-0 focus:outline-none focus:ring-2 focus:ring-focus rounded-lg"
              href="/"
              aria-label="KF Software Home"
            >
              <KfLogoMark className="text-ink h-10 w-10 sm:h-11 sm:w-11 shrink-0" />
              <span className="flex flex-col">
                  <span className="block text-sm sm:text-base font-bold tracking-[0.14em] text-ink uppercase leading-tight">
                    {brandIdentity.logoText}
                  </span>
                    <span className="hidden sm:block text-[14px] leading-tight text-ink-muted mt-0.5">
                      {brandIdentity.tagline}
                    </span>
                  </span>
                </a>

                {/* Desktop Horizontal Navigation - visible >= 1024px */}
                <nav
                  aria-label="Primary navigation"
                  className="hidden lg:flex items-center gap-6 lg:gap-8"
                >
                  {navItems.map((link) => {
                    const isActive = link.label === activeItem;
                    return (
                      <a
                className={`relative py-1 text-[15px] font-medium transition focus:outline-none focus:ring-2 focus:ring-focus rounded ${isActive ? "text-ink font-bold" : "text-ink-muted hover:text-ink"
                          }`}
                        href={link.href}
                        key={link.label}
                      >
                        {link.label}
                        {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-brand rounded-full" />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Desktop Actions (ThemeToggle + CTA) - visible >= 1024px */}
                <div className="hidden lg:flex items-center gap-3">
                  <ThemeToggle />
                  <a
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand text-white px-5 text-sm font-semibold shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                    href={ctaHref}
                  >
                    <Mail aria-hidden="true" className="h-4 w-4 opacity-80" />
                    <span>{ctaLabel}</span>
                  </a>
                </div>

                {/* Mobile controls: Theme toggle + Hamburger */}
                <div className="flex lg:hidden items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-ink shadow-sm hover:bg-surface-muted transition shrink-0 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                  >
                    {isOpen ? (
                      <X className="h-5.5 w-5.5" aria-hidden="true" />
                    ) : (
                      <Menu className="h-5.5 w-5.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Slide-down/Dropdown Navigation Panel - visible < 1024px */}
              {isOpen && (
                <div
                  id="mobile-menu"
                  className="lg:hidden absolute left-0 right-0 top-full z-50 border-t border-border bg-surface px-6 py-6 shadow-md animate-fade-in"
                >
                    <nav className="flex flex-col gap-3">
                      {navItems.map((link) => {
                        const isActive = link.label === activeItem;
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                  className={`block py-2.5 px-3 text-[16px] font-semibold transition-colors rounded-xl ${isActive
                                ? "text-ink border-l-4 border-brand bg-surface-muted font-bold"
                                : "text-ink-muted hover:text-ink hover:bg-surface-muted"
                              }`}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </nav>

                    {/* Contact action inside mobile menu */}
                      <div className="mt-6 border-t border-border pt-6">
                        <a
                          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
                          href={ctaHref}
                          onClick={() => setIsOpen(false)}
                        >
                          <Mail aria-hidden="true" className="h-4.5 w-4.5 opacity-80" />
                          <span>{ctaLabel}</span>
                        </a>
                      </div>
                    </div>
      )}
                  </header>
                  );
}
