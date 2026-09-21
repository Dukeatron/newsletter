import Link from "next/link";
import type { Category } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/content";

export function CategoryChip({ category }: { category: Category }) {
  return (
    <Link
      href={`/blog/category/${category}`}
      className="inline-flex items-center rounded-full border border-champagne bg-ink px-3 py-1 font-label text-[11px] font-medium uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-80"
    >
      {CATEGORY_LABELS[category]}
    </Link>
  );
}
