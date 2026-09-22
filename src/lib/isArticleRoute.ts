const ARTICLE_PATTERNS = [/^\/blog\/[^/]+$/, /^\/announcements\/[^/]+$/];

/**
 * True only for an actual post/announcement detail page — excludes the
 * index pages and the category/tag sub-routes (which have more than one
 * segment after /blog).
 */
export function isArticleRoute(pathname: string): boolean {
  return ARTICLE_PATTERNS.some((pattern) => pattern.test(pathname));
}
