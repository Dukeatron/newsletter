import { TagList } from "@/components/ui/TagList";
import { PostCard } from "@/components/post/PostCard";
import { getAllPosts, getAllTags } from "@/lib/content";

export const metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-midnight">Blog</h1>
      {tags.length > 0 && (
        <div className="mt-6">
          <p className="font-label text-[11px] uppercase tracking-[0.15em] text-umber">
            Filter by tag
          </p>
          <TagList tags={tags} className="mt-3" />
        </div>
      )}
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
