import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_ROOT, "posts");
const ANNOUNCEMENTS_DIR = path.join(CONTENT_ROOT, "announcements");
const TEMP_PAGES_DIR = path.join(CONTENT_ROOT, "temp-pages");

export const CATEGORIES = ["leader", "verdict", "cohort", "errata"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  leader: "The Leader",
  verdict: "The Verdict",
  cohort: "The Cohort",
  errata: "Errata & Excuses",
};

const postFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()).default([]),
  excerpt: z.string(),
  cover: z.string().optional(),
  author: z.string(),
  rating: z.number().min(0).max(10).optional(),
  issue: z.number().optional(),
  draft: z.boolean().optional().default(false),
});

const announcementFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  cover: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

const tempPageFrontmatterSchema = z.object({
  title: z.string(),
  expiresAt: z.string().optional(),
  noindex: z.boolean().optional().default(false),
});

export type Post = z.infer<typeof postFrontmatterSchema> & {
  slug: string;
  content: string;
  readingTime: string;
};

export type Announcement = z.infer<typeof announcementFrontmatterSchema> & {
  slug: string;
  content: string;
  readingTime: string;
};

export type TempPage = z.infer<typeof tempPageFrontmatterSchema> & {
  slug: string;
  content: string;
};

function readMdxFiles(dir: string): { slug: string; content: string; data: Record<string, unknown> }[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = (data.slug as string | undefined) ?? file.replace(/\.mdx$/, "");
      return { slug, content, data };
    });
}

function byDateDesc<T extends { date: string }>(a: T, b: T): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllPosts({ includeDrafts = false } = {}): Post[] {
  const posts = readMdxFiles(POSTS_DIR).map(({ slug, content, data }) => {
    const frontmatter = postFrontmatterSchema.parse(data);
    return {
      ...frontmatter,
      slug,
      content,
      readingTime: readingTime(content).text,
    };
  });

  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort(byDateDesc);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts({ includeDrafts: true }).find((post) => post.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllAnnouncements({ includeDrafts = false } = {}): Announcement[] {
  const announcements = readMdxFiles(ANNOUNCEMENTS_DIR).map(({ slug, content, data }) => {
    const frontmatter = announcementFrontmatterSchema.parse(data);
    return {
      ...frontmatter,
      slug,
      content,
      readingTime: readingTime(content).text,
    };
  });

  return announcements
    .filter((announcement) => includeDrafts || !announcement.draft)
    .sort(byDateDesc);
}

export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  return getAllAnnouncements({ includeDrafts: true }).find(
    (announcement) => announcement.slug === slug
  );
}

function isExpired(page: TempPage): boolean {
  return Boolean(page.expiresAt && new Date(page.expiresAt).getTime() < Date.now());
}

export function getAllTempPages(): TempPage[] {
  return readMdxFiles(TEMP_PAGES_DIR)
    .map(({ slug, content, data }) => {
      const frontmatter = tempPageFrontmatterSchema.parse(data);
      return { ...frontmatter, slug, content };
    })
    .filter((page) => !isExpired(page));
}

export function getTempPageBySlug(slug: string): TempPage | undefined {
  return getAllTempPages().find((page) => page.slug === slug);
}

/**
 * Unified view over posts + announcements used by the admin send flow to
 * detect anything published in content but missing from sent_log.
 */
export type Sendable = {
  contentType: "post" | "announcement";
  slug: string;
  title: string;
  date: string;
};

export function getAllSendableContent(): Sendable[] {
  const posts: Sendable[] = getAllPosts().map((post) => ({
    contentType: "post",
    slug: post.slug,
    title: post.title,
    date: post.date,
  }));

  const announcements: Sendable[] = getAllAnnouncements().map((announcement) => ({
    contentType: "announcement",
    slug: announcement.slug,
    title: announcement.title,
    date: announcement.date,
  }));

  return [...posts, ...announcements].sort(byDateDesc);
}
