"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "copied" | "error";

export function CopySubscribersButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState<number | null>(null);

  async function handleClick() {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/subscribers");
      const data: { emails?: string[] } = await res.json();
      const emails = data.emails ?? [];
      await navigator.clipboard.writeText(emails.join(", "));
      setCount(emails.length);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "loading"}
        className="border border-midnight px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.15em] text-midnight transition-colors hover:bg-midnight hover:text-bone disabled:opacity-50"
      >
        {status === "loading" ? "Copying…" : "Copy subscriber emails"}
      </button>
      {status === "copied" && (
        <p className="mt-2 font-body text-sm text-umber">
          Copied {count} email{count === 1 ? "" : "s"} — paste into your
          email client&apos;s BCC field.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 font-body text-sm text-red-700">
          Could not copy — try again.
        </p>
      )}
    </div>
  );
}
