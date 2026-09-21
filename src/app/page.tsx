import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PostCard } from "@/components/post/PostCard";
import { getAllPosts } from "@/lib/content";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="border-b border-midnight/10 bg-ink px-6 py-24 text-center">
        <h1 className="font-display text-5xl tracking-wide text-paper sm:text-6xl">
          Marque &amp; Manners
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-lg text-paper/80">
          A newsletter on cars, ownership, and the manners of the road.
        </p>
        <Link
          href="/subscribe"
          className="mt-8 inline-block bg-champagne px-6 py-3 font-label text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-champagne/80"
        >
          Subscribe
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Eyebrow>Latest</Eyebrow>
        <h2 className="mt-2 font-display text-4xl text-midnight">
          Recent Issues
        </h2>
        <div className="mt-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          {posts.length === 0 && (
            <p className="font-body text-midnight/60">No posts yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
