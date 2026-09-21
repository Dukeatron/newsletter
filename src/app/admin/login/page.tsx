"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AmpersandMark } from "@/components/ui/AmpersandMark";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data: { message?: string } = await res.json().catch(() => ({}));
      setError(data.message ?? "Login failed.");
      setLoading(false);
      return;
    }

    router.push("/admin/send");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24 text-center">
      <AmpersandMark variant="umber" size="lg" className="mx-auto block" />
      <Eyebrow className="mt-6">Admin</Eyebrow>
      <h1 className="mt-2 font-display text-3xl text-midnight">Sign In</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-3 text-left">
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-midnight/20 bg-bone px-3 py-2 font-body text-sm text-midnight focus:border-umber focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </form>
    </div>
  );
}
