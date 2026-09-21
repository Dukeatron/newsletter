import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllAnnouncements } from "@/lib/content";

export const metadata = { title: "Announcements" };

export default function AnnouncementsIndexPage() {
  const announcements = getAllAnnouncements();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Announcements</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">Announcements</h1>
      <div className="mt-10">
        {announcements.map((announcement) => (
          <article
            key={announcement.slug}
            className="border-b border-midnight/10 py-8 first:pt-0"
          >
            <span className="font-label text-[11px] uppercase tracking-[0.1em] text-midnight/50">
              {new Date(announcement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <h2 className="mt-2 font-display text-3xl text-midnight">
              <Link
                href={`/announcements/${announcement.slug}`}
                className="hover:text-umber"
              >
                {announcement.title}
              </Link>
            </h2>
            <p className="mt-3 font-body text-base text-midnight/80">
              {announcement.excerpt}
            </p>
          </article>
        ))}
        {announcements.length === 0 && (
          <p className="font-body text-midnight/60">No announcements yet.</p>
        )}
      </div>
    </div>
  );
}
