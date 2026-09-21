import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PostCard } from "@/components/post/PostCard";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  getPostsByCategory,
  type Category,
} from "@/lib/content";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.includes(category as Category)) return {};
  return { title: CATEGORY_LABELS[category as Category] };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!CATEGORIES.includes(category as Category)) notFound();

  const typedCategory = category as Category;
  const posts = getPostsByCategory(typedCategory);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Category</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">
        {CATEGORY_LABELS[typedCategory]}
      </h1>
      <div className="mt-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="font-body text-midnight/60">No posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}
