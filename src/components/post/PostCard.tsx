import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CategoryChip } from "@/components/ui/CategoryChip";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { CATEGORY_LABELS, type Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-midnight/10 py-8 first:pt-0">
      <Eyebrow>{CATEGORY_LABELS[post.category]}</Eyebrow>
      <h2 className="mt-2 font-display text-3xl text-midnight">
        <Link href={`/blog/${post.slug}`} className="hover:text-umber">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 font-body text-base text-midnight/80">{post.excerpt}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <CategoryChip category={post.category} />
        {post.rating !== undefined && <RatingBadge rating={post.rating} />}
        <span className="font-label text-[11px] uppercase tracking-[0.1em] text-midnight/50">
          {post.readingTime}
        </span>
      </div>
    </article>
  );
}
