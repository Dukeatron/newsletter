"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MarkSentButton({
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
      `Mark "${title}" as sent WITHOUT emailing anyone through this app? Only confirm this after you've actually sent it yourself.`
    );
    if (!confirmed) return;

    setStatus("loading");
    setMessage(null);

    const res = await fetch("/api/admin/mark-sent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType, slug }),
    });
    const data: { message?: string } = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setMessage(data.message ?? "Failed.");
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className="border border-midnight/40 px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.15em] text-midnight/70 transition-colors hover:border-midnight hover:text-midnight disabled:opacity-50"
      >
        {status === "loading" ? "Marking…" : "Mark as sent"}
      </button>
      {message && <p className="mt-2 text-sm text-error">{message}</p>}
    </div>
  );
}
