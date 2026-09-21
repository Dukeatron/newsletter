import { Heading, Markdown, Text } from "@react-email/components";
import { EmailShell } from "@/emails/layout/EmailShell";
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
}: {
  title: string;
  category: Category;
  excerpt: string;
  content: string;
  postUrl: string;
  siteUrl: string;
  unsubscribeUrl: string;
}) {
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
      <Markdown
        markdownCustomStyles={{
          p: { fontSize: "16px", color: emailColors.midnight, lineHeight: 1.6 },
          h2: { fontFamily: emailFonts.display, color: emailColors.midnight },
        }}
      >
        {content}
      </Markdown>
      <Text style={{ fontSize: "14px" }}>
        <a href={postUrl} style={{ color: emailColors.umber }}>
          Read on the site →
        </a>
      </Text>
    </EmailShell>
  );
}

export default PostNotificationEmail;
