import { render } from "@react-email/render";
import { SITE_URL } from "@/lib/resend";
import { getPostBySlug, getAnnouncementBySlug } from "@/lib/content";
import { PostNotificationEmail } from "@/emails/PostNotification";
import { AnnouncementNotificationEmail } from "@/emails/AnnouncementNotification";

/**
 * Renders the exact email a subscriber would receive, minus a personalized
 * unsubscribe link (there isn't one subscriber to personalize for here) —
 * for copy-pasting into a manual send when Resend can't reach real
 * recipients yet (no verified sending domain).
 */
export async function renderPreviewEmailHtml(
  contentType: "post" | "announcement",
  slug: string
): Promise<string | null> {
  if (contentType === "post") {
    const post = getPostBySlug(slug);
    if (!post) return null;
    return render(
      PostNotificationEmail({
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        postUrl: `${SITE_URL}/blog/${post.slug}`,
        siteUrl: SITE_URL,
        unsubscribeUrl: "",
        issue: post.issue,
      })
    );
  }

  const announcement = getAnnouncementBySlug(slug);
  if (!announcement) return null;
  return render(
    AnnouncementNotificationEmail({
      title: announcement.title,
      excerpt: announcement.excerpt,
      content: announcement.content,
      announcementUrl: `${SITE_URL}/announcements/${announcement.slug}`,
      siteUrl: SITE_URL,
      unsubscribeUrl: "",
    })
  );
}
