/**
 * Fail-closed route gate for financial routes that must never load
 * Microsoft Clarity, session replay, or the general Clarity consent banner.
 */

const ISOLATED_PREFIXES = [
  "/tools/payday-balance",
  "/research/cash-timing",
] as const;

export function normalizeRoutePath(rawPath: string | null | undefined): string | null {
  if (!rawPath || typeof rawPath !== "string") {
    return null;
  }
  const withoutQueryOrHash = rawPath.split(/[?#]/)[0] || "";
  const trimmed = withoutQueryOrHash
    .trim()
    .toLowerCase()
    .replace(/\/index\.html$/, "")
    .replace(/\/+$/, "");
  return trimmed || "/";
}

/**
 * Returns true if the path is unknown/unset (fail-closed) or matches an isolated financial route.
 */
export function isIsolatedFinancialRoute(
  nextPathname: string | null | undefined,
  windowPathname?: string | null | undefined
): boolean {
  const normNext = normalizeRoutePath(nextPathname);
  const normWin =
    windowPathname !== undefined
      ? normalizeRoutePath(windowPathname)
      : typeof window !== "undefined" && window.location
      ? normalizeRoutePath(window.location.pathname)
      : null;

  // Fail-closed until both router pathname and window location are available
  if (!normNext || !normWin) {
    return true;
  }

  for (const prefix of ISOLATED_PREFIXES) {
    if (
      normNext === prefix ||
      normNext.startsWith(prefix + "/") ||
      normWin === prefix ||
      normWin.startsWith(prefix + "/")
    ) {
      return true;
    }
  }

  return false;
}
