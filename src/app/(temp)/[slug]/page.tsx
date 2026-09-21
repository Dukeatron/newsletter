import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostBody } from "@/components/post/PostBody";
import { getAllTempPages, getTempPageBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllTempPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getTempPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    robots: page.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function TempPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getTempPageBySlug(slug);
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-5xl text-midnight">{page.title}</h1>
      <div className="mt-8">
        <PostBody content={page.content} />
      </div>
    </article>
  );
}
