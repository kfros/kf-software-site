import React from "react";

export type StatusType =
  | "live-product"
  | "LIVE PRODUCT"
  | "workflow-experiment"
  | "WORKFLOW EXPERIMENT"
  | "engineering-note"
  | "ENGINEERING NOTE";

interface StatusLabelProps {
  status: StatusType | string;
  className?: string;
}

export function StatusLabel({ status, className = "" }: StatusLabelProps) {
  let labelText = status;
  let variantClasses = "border-border bg-surface-muted text-ink-muted";

  const upper = status.toUpperCase();

  if (upper === "LIVE PRODUCT" || upper === "LIVE-PRODUCT") {
    labelText = "LIVE PRODUCT";
    variantClasses =
      "border-teal-700/25 bg-teal-500/10 text-teal-800 dark:border-teal-400/25 dark:bg-teal-400/10 dark:text-teal-300";
  } else if (upper === "WORKFLOW EXPERIMENT" || upper === "WORKFLOW-EXPERIMENT") {
    labelText = "WORKFLOW EXPERIMENT";
    variantClasses =
      "border-amber-700/25 bg-amber-500/10 text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300";
  } else if (upper === "ENGINEERING NOTE" || upper === "ENGINEERING-NOTE") {
    labelText = "ENGINEERING NOTE";
    variantClasses =
      "border-brand/25 bg-brand-soft text-brand dark:border-brand/30 dark:bg-brand-soft/50 dark:text-brand";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border font-mono text-[11px] font-bold tracking-wider uppercase ${variantClasses} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />
      <span>{labelText}</span>
    </span>
  );
}

