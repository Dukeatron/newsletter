import { Eyebrow } from "@/components/ui/Eyebrow";
import { PostCard } from "@/components/post/PostCard";
import { getAllPosts } from "@/lib/content";

export const metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Blog</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">All issues</h1>
      <div className="mt-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="font-body text-midnight/60">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
