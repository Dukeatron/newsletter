"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function SubscribeForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 border border-midnight/20 bg-bone px-3 py-2 font-body text-sm text-midnight placeholder:text-midnight/40 focus:border-umber focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="whitespace-nowrap bg-midnight px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.15em] text-bone transition-colors hover:bg-umber disabled:opacity-50"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 font-body text-sm ${
            status === "error" ? "text-red-700" : "text-umber"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
