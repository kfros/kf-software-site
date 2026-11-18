"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "kf-theme";
let inMemoryManualTheme: "light" | "dark" | null = null;

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

function readStoredManualTheme(): "light" | "dark" | null {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
    }
  } catch {
    return inMemoryManualTheme;
  }
  return inMemoryManualTheme;
}

function applyThemeToDocument(target: "light" | "dark"): void {
  if (typeof document === "undefined") return;
  if (target === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }
}

function getInitialTheme(): "light" | "dark" {
  const manual = readStoredManualTheme();
  if (manual) {
    return manual;
  }
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  return getSystemTheme();
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = getInitialTheme();
    setTheme(current);
    applyThemeToDocument(current);
    setMounted(true);

    const syncFromStoreOrSystem = () => {
      const manual = readStoredManualTheme();
      const resolved = manual || getSystemTheme();
      setTheme(resolved);
      applyThemeToDocument(resolved);
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) {
        if (e.newValue === "dark" || e.newValue === "light") {
          inMemoryManualTheme = e.newValue;
        } else if (e.newValue === null) {
          inMemoryManualTheme = null;
        }
        syncFromStoreOrSystem();
      }
    };

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!readStoredManualTheme()) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        applyThemeToDocument(next);
      }
    };

    window.addEventListener("kf-theme-change", syncFromStoreOrSystem);
    window.addEventListener("storage", handleStorageEvent);
    mediaQuery?.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("kf-theme-change", syncFromStoreOrSystem);
      window.removeEventListener("storage", handleStorageEvent);
      mediaQuery?.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    inMemoryManualTheme = nextTheme;
    setTheme(nextTheme);
    applyThemeToDocument(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Graceful degradation in memory if localStorage is blocked
    }

    try {
      window.dispatchEvent(new Event("kf-theme-change"));
    } catch {
      // Ignore
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
