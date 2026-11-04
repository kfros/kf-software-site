"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "kf-theme";

function getSystemTheme(): "light" | "dark" {
  try {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
  } catch {
    // Graceful fallback
  }
  return "light";
}

function getInitialTheme(): "light" | "dark" {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
      return getSystemTheme();
    }
  } catch {
    // Graceful fallback
  }
  return "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = getInitialTheme();
    setTheme(current);
    setMounted(true);

    const handleStorageOrEvent = () => {
      const updated = getInitialTheme();
      setTheme(updated);
    };

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          const next = e.matches ? "dark" : "light";
          setTheme(next);
          if (next === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.style.colorScheme = "light";
          }
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener("kf-theme-change", handleStorageOrEvent);
    mediaQuery?.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("kf-theme-change", handleStorageOrEvent);
      mediaQuery?.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    try {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
      localStorage.setItem(STORAGE_KEY, nextTheme);
      window.dispatchEvent(new Event("kf-theme-change"));
    } catch {
      // Graceful degradation if localStorage is blocked
    }
  };

  const actionLabel = mounted
    ? theme === "dark"
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={actionLabel}
      title={actionLabel}
      className={`flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-border bg-surface text-ink shadow-sm hover:bg-surface-muted transition shrink-0 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 ${className}`}
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="h-5 w-5 text-ink transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5 text-ink transition-transform duration-200" aria-hidden="true" />
        )
      ) : (
        <span className="h-5 w-5 block" aria-hidden="true" />
      )}
    </button>
  );
}

