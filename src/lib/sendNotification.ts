import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { getResendClient, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { getPostBySlug, getAnnouncementBySlug } from "@/lib/content";
import { PostNotificationEmail } from "@/emails/PostNotification";
import { AnnouncementNotificationEmail } from "@/emails/AnnouncementNotification";

const BATCH_SIZE = 100;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export type SendResult =
  | { ok: true; recipientCount: number }
  | { ok: false; error: string };

export async function sendContentNotification(
  contentType: "post" | "announcement",
  slug: string
): Promise<SendResult> {
  const supabase = getSupabaseServiceClient();

  const { data: alreadySent } = await supabase
    .from("sent_log")
    .select("id")
    .eq("content_type", contentType)
    .eq("slug", slug)
    .maybeSingle();

  if (alreadySent) {
    return { ok: false, error: "This has already been sent." };
  }

  const { data: subscribers, error: subscribersError } = await supabase
    .from("subscribers")
    .select("email, unsubscribe_token")
    .eq("status", "confirmed");

  if (subscribersError) {
    return { ok: false, error: "Could not load subscribers." };
  }

  if (!subscribers || subscribers.length === 0) {
    return { ok: false, error: "No confirmed subscribers to send to." };
  }

  const resend = getResendClient();
  const batches = chunk(subscribers, BATCH_SIZE);

  for (const batch of batches) {
    const emails = batch.map((subscriber) => {
      const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?token=${subscriber.unsubscribe_token}`;

      if (contentType === "post") {
        const post = getPostBySlug(slug);
        if (!post) throw new Error("Post not found");
        return {
          from: EMAIL_FROM,
          to: subscriber.email,
          subject: post.title,
          react: PostNotificationEmail({
            title: post.title,
            category: post.category,
            excerpt: post.excerpt,
            content: post.content,
            postUrl: `${SITE_URL}/blog/${post.slug}`,
            siteUrl: SITE_URL,
            unsubscribeUrl,
          }),
        };
      }

      const announcement = getAnnouncementBySlug(slug);
      if (!announcement) throw new Error("Announcement not found");
      return {
        from: EMAIL_FROM,
        to: subscriber.email,
        subject: announcement.title,
        react: AnnouncementNotificationEmail({
          title: announcement.title,
          excerpt: announcement.excerpt,
          content: announcement.content,
          announcementUrl: `${SITE_URL}/announcements/${announcement.slug}`,
          siteUrl: SITE_URL,
          unsubscribeUrl,
        }),
      };
    });

    const { error: sendError } = await resend.batch.send(emails);
    if (sendError) {
      return { ok: false, error: sendError.message };
    }
  }

  const { error: logError } = await supabase.from("sent_log").insert({
    content_type: contentType,
    slug,
    recipient_count: subscribers.length,
  });

  if (logError) {
    return { ok: false, error: "Sent, but failed to record send_log." };
  }

  return { ok: true, recipientCount: subscribers.length };
}
