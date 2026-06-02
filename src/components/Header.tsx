"use client";

import React, { useState, useEffect } from "react";
import { Mail, Menu, X } from "lucide-react";
import { KfLogoMark } from "./KfLogoMark";
import { brandIdentity } from "@/app/content";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  activeItem?: string;
  navItems?: NavItem[];
}

export function Header({ activeItem, navItems = [] }: HeaderProps) {
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
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-3.5 sm:px-6 lg:px-8">
        {/* Logo/Wordmark */}
        <a
          className="group flex items-center gap-3.5 sm:gap-4 shrink-0"
          href="/"
          aria-label="KF Software home"
        >
          <KfLogoMark className="text-[#1A2B42] h-10 w-10 sm:h-11 sm:w-11 shrink-0" />
          <span className="flex flex-col">
            <span className="block text-sm sm:text-base font-bold tracking-[0.14em] text-[#0F1A2C] uppercase leading-tight">
              {brandIdentity.logoText}
            </span>
            <span className="hidden sm:block text-[14px] leading-tight text-[#526174] mt-0.5">
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
                className={`relative py-1 text-[15px] font-medium text-[#526174] transition hover:text-[#0F1A2C] ${
                  isActive ? "text-[#0F1A2C]" : ""
                }`}
                href={link.href}
                key={link.label}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1A535C] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Contact CTA Button - visible >= 1024px */}
        <a
          className="hidden lg:inline-flex h-[40px] sm:h-[46px] items-center justify-center gap-2 rounded-[16px] bg-[#0F1A2C] px-5 sm:px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
          href="#contact"
        >
          <Mail aria-hidden="true" className="h-4 w-4 opacity-80" />
          <span>Contact</span>
        </a>

        {/* Mobile Menu Toggler Trigger Button - visible < 1024px */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0F1A2C] shadow-sm hover:bg-slate-50 transition shrink-0 focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
        >
          {isOpen ? (
            <X className="h-5.5 w-5.5" aria-hidden="true" />
          ) : (
            <Menu className="h-5.5 w-5.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Slide-down/Dropdown Navigation Panel - visible < 1024px */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute left-0 right-0 top-full z-50 border-t border-[#E2E8F0] bg-white px-6 py-6 shadow-md animate-fade-in"
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((link) => {
              const isActive = link.label === activeItem;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-[16px] font-semibold text-[#526174] hover:text-[#0F1A2C] transition-colors rounded ${
                    isActive ? "text-[#0F1A2C] border-l-2 border-[#1A535C] pl-2 -ml-2 font-bold bg-[#F6F8FA]/60" : ""
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Contact action inside mobile menu */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <a
              className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#0F1A2C] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A535C] focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2"
              href="#contact"
              onClick={() => setIsOpen(false)}
            >
              <Mail aria-hidden="true" className="h-4.5 w-4.5 opacity-80" />
              <span>Contact support</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
