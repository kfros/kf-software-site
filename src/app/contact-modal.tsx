"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail, MessageSquare, X } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#contact") {
        setIsOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);

    if (window.location.hash === "#contact") {
      history.pushState(
        "",
        document.title,
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setFormState("error");
      setErrorMessage("Contact form is not configured yet.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("access_key", accessKey);
    formData.set("subject", "New KF Software contact request");
    formData.set("from_name", "KF Software landing page");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Submission failed");
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage("Something went wrong. Please email us directly.");
    }
  }

  if (!isOpen) {
    return null;
  }

  const isSubmitting = formState === "submitting";

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-xs animate-fade-in"
      role="dialog"
    >
      <button
        aria-label="Close contact form"
        className="absolute inset-0 cursor-default"
        onClick={closeModal}
        type="button"
      />
      <section className="relative w-full max-w-lg rounded-3xl bg-surface border border-border p-6 shadow-soft sm:p-8 text-ink">
        <button
          aria-label="Close contact form"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-muted transition hover:bg-surface-muted hover:text-ink focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
          onClick={closeModal}
          type="button"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {formState === "success" ? (
          <div className="py-10 text-center">
            <CheckCircle2
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-success"
            />
            <h2 className="mt-5 text-2xl font-bold text-ink">
              Thank you for your request.
            </h2>
            <p className="mt-3 text-ink-muted">
              We will get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Contact
            </p>
            <h2 className="mt-2 pr-10 text-2xl font-bold text-ink">
              Tell us what you need.
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Send a short note and we will reply from contact@kf-software.com.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} data-clarity-mask="true">
              <input name="access_key" type="hidden" />
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Email
                </span>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-transparent focus:ring-2 focus:ring-focus disabled:cursor-not-allowed disabled:bg-surface-muted"
                  disabled={isSubmitting}
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
                  <MessageSquare aria-hidden="true" className="h-4 w-4" />
                  Message
                </span>
                <textarea
                  className="min-h-32 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-transparent focus:ring-2 focus:ring-focus disabled:cursor-not-allowed disabled:bg-surface-muted"
                  disabled={isSubmitting}
                  name="message"
                  placeholder="How can we help?"
                  required
                />
              </label>

              {errorMessage ? (
                <p className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                  {errorMessage}
                </p>
              ) : null}

              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin"
                    />
                    Sending
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
