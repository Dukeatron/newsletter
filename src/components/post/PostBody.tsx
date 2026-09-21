import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function PostBody({ content }: { content: string }) {
  return (
    <div className="prose-content font-body text-lg leading-relaxed text-midnight">
      <MDXRemote
        source={content}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
