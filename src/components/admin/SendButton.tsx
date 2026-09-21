"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SendButton({
  contentType,
  slug,
  title,
}: {
  contentType: "post" | "announcement";
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleClick() {
    const confirmed = window.confirm(
      `Send "${title}" to every confirmed subscriber? This can't be undone.`
    );
    if (!confirmed) return;

    setStatus("loading");
    setMessage(null);

    const res = await fetch("/api/admin/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType, slug }),
    });
    const data: { message?: string } = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setMessage(data.message ?? "Send failed.");
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className="bg-midnight px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.15em] text-bone transition-colors hover:bg-umber disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send now"}
      </button>
      {message && <p className="mt-2 text-sm text-red-700">{message}</p>}
    </div>
  );
}
