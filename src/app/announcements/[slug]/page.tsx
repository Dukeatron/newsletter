import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Rule } from "@/components/ui/Rule";
import { PostBody } from "@/components/post/PostBody";
import { getAllAnnouncements, getAnnouncementBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllAnnouncements().map((announcement) => ({
    slug: announcement.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);
  if (!announcement) return {};
  return { title: announcement.title, description: announcement.excerpt };
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const announcement = getAnnouncementBySlug(slug);
  if (!announcement || announcement.draft) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Announcement</Eyebrow>
      <h1 className="mt-2 font-display text-5xl text-midnight">
        {announcement.title}
      </h1>
      <span className="mt-4 block font-label text-xs uppercase tracking-[0.1em] text-midnight/50">
        {new Date(announcement.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <Rule className="my-8" />
      <PostBody content={announcement.content} />
    </article>
  );
}
