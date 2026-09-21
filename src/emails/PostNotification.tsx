import { Heading, Markdown, Text } from "@react-email/components";
import { EmailShell } from "@/emails/layout/EmailShell";
import { LinkPreviewCard } from "@/emails/components/LinkPreviewCard";
import { emailColors, emailFonts } from "@/emails/theme";
import { CATEGORY_LABELS, type Category } from "@/lib/content";

export function PostNotificationEmail({
  title,
  category,
  excerpt,
  content,
  postUrl,
  siteUrl,
  unsubscribeUrl,
  issue,
}: {
  title: string;
  category: Category;
  excerpt: string;
  content: string;
  postUrl: string;
  siteUrl: string;
  unsubscribeUrl: string;
  issue?: number;
}) {
  const eyebrow = issue
    ? `Issue ${String(issue).padStart(2, "0")}`
    : CATEGORY_LABELS[category];
  return (
    <EmailShell
      previewText={excerpt}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text
        style={{
          fontFamily: emailFonts.label,
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: emailColors.umber,
        }}
      >
        {CATEGORY_LABELS[category]}
      </Text>
      <Heading
        as="h1"
        style={{
          fontFamily: emailFonts.display,
          color: emailColors.midnight,
          fontSize: "28px",
        }}
      >
        {title}
      </Heading>
      <div style={{ padding: "8px 0 24px" }}>
        <LinkPreviewCard eyebrow={eyebrow} title={title} href={postUrl} />
      </div>
      <Markdown
        markdownCustomStyles={{
          p: { fontSize: "16px", color: emailColors.midnight, lineHeight: 1.6 },
          h2: { fontFamily: emailFonts.display, color: emailColors.midnight },
        }}
      >
        {content}
      </Markdown>
    </EmailShell>
  );
}

export default PostNotificationEmail;
