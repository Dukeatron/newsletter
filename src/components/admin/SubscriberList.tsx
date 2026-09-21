"use client";

export function SubscriberList({ emails }: { emails: string[] }) {
  const joined = emails.join(", ");

  return (
    <div>
      <p className="font-label text-[11px] uppercase tracking-[0.15em] text-umber">
        Confirmed Subscribers ({emails.length})
      </p>
      <textarea
        readOnly
        value={joined || "No confirmed subscribers yet."}
        onClick={(event) => event.currentTarget.select()}
        rows={4}
        className="mt-2 w-full resize-y border border-midnight/20 bg-bone p-3 font-mono text-xs text-midnight focus:border-umber focus:outline-none"
      />
      <p className="mt-1 font-body text-xs text-midnight/50">
        Click the list to select it all, then copy — paste into your email
        client&apos;s BCC field.
      </p>
    </div>
  );
}
