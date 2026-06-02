"use client";

import React, { useState, useEffect } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    // Initialize state on mount in case page is already scrolled
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  function scrollToTop() {
    // Check if the user has requested reduced motion at OS level
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0F1A2C]/72 text-white shadow-[0_10px_30px_rgba(15,26,44,0.18)] backdrop-blur-[8px] transition hover:bg-[#0F1A2C]/92 focus:outline-none focus:ring-2 focus:ring-[#1A535C] focus:ring-offset-2 focus:ring-offset-[#0F1A2C] print:hidden cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" style={{ color: "#069494" }} />
      </svg>
    </button>
  );
}
