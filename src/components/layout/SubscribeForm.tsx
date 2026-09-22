"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const isValidFormat = email === "" || EMAIL_PATTERN.test(email);
  const showFormatError = touched && email !== "" && !isValidFormat;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setTouched(true);
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: { message?: string } = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Check your inbox to confirm.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
            setMessage(null);
          }}
          onBlur={() => setTouched(true)}
          aria-invalid={showFormatError}
          className={`w-full flex-1 border bg-bone px-3 py-2 font-body text-sm text-midnight placeholder:text-midnight/40 focus:outline-none ${
            showFormatError
              ? "border-error focus:border-error"
              : "border-midnight/20 focus:border-umber"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap border border-champagne bg-ink px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {showFormatError && !message && (
        <p className="mt-2 font-body text-sm text-error">
          That doesn&apos;t look like a valid email address.
        </p>
      )}
      {message && (
        <p
          className={`mt-2 font-body text-sm ${
            status === "error" ? "text-error" : "text-umber"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
