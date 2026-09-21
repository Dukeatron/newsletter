import { Heading, Markdown, Text } from "@react-email/components";
import { EmailShell } from "@/emails/layout/EmailShell";
import { emailColors, emailFonts } from "@/emails/theme";

export function AnnouncementNotificationEmail({
  title,
  excerpt,
  content,
  announcementUrl,
  siteUrl,
  unsubscribeUrl,
}: {
  title: string;
  excerpt: string;
  content: string;
  announcementUrl: string;
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
        Announcement
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
        }}
      >
        {content}
      </Markdown>
      <Text style={{ fontSize: "14px" }}>
        <a href={announcementUrl} style={{ color: emailColors.umber }}>
          Read on the site →
        </a>
      </Text>
    </EmailShell>
  );
}

export default AnnouncementNotificationEmail;
