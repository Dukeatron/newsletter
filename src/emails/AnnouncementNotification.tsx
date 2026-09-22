import { Heading, Markdown, Text } from "@react-email/components";
import { EmailShell } from "@/emails/layout/EmailShell";
import { LinkPreviewCard } from "@/emails/components/LinkPreviewCard";
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
      <div style={{ padding: "8px 0 24px" }}>
        <LinkPreviewCard
          eyebrow="Announcement"
          title={title}
          href={announcementUrl}
          siteUrl={siteUrl}
        />
      </div>
      <Markdown
        markdownCustomStyles={{
          p: { fontSize: "16px", color: emailColors.midnight, lineHeight: 1.6 },
        }}
      >
        {content}
      </Markdown>
    </EmailShell>
  );
}

export default AnnouncementNotificationEmail;
