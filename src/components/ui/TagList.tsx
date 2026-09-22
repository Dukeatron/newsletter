import Link from "next/link";
import { cn } from "@/lib/cn";

export function TagList({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/blog/tag/${tag}`}
            className="inline-flex items-center rounded-full border border-champagne px-3 py-1 font-label text-[11px] uppercase tracking-[0.1em] text-umber transition-colors hover:bg-champagne/20"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
