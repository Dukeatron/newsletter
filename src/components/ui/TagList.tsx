import Link from "next/link";

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
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
