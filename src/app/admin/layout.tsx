import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b border-midnight/10 bg-stone">
        <div className="mx-auto flex max-w-3xl gap-6 px-6 py-3">
          <Link
            href="/admin/send"
            className="font-label text-xs uppercase tracking-[0.15em] text-midnight/70 hover:text-umber"
          >
            Send
          </Link>
          <Link
            href="/admin/metrics"
            className="font-label text-xs uppercase tracking-[0.15em] text-midnight/70 hover:text-umber"
          >
            Metrics
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
