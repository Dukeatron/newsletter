import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CategoryChip } from "@/components/ui/CategoryChip";
import { IssueBadge } from "@/components/ui/IssueBadge";
import { TagList } from "@/components/ui/TagList";
import { Rule } from "@/components/ui/Rule";
import { PostBody } from "@/components/post/PostBody";
import { CATEGORY_LABELS, getAllPosts, getPostBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>{CATEGORY_LABELS[post.category]}</Eyebrow>
      <h1 className="mt-2 font-display text-5xl text-midnight">{post.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="font-label text-xs uppercase tracking-[0.1em] text-midnight/50">
          By {post.author} · {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </span>
        {post.issue !== undefined && <IssueBadge issue={post.issue} />}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <CategoryChip category={post.category} />
      </div>
      <Rule className="my-8" />
      <PostBody content={post.content} />
      {post.tags.length > 0 && (
        <>
          <Rule className="my-8" />
          <TagList tags={post.tags} />
        </>
      )}
    </article>
  );
}
