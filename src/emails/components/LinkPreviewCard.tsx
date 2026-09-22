import { Heading, Img, Section, Text } from "@react-email/components";
import { emailColors, emailFonts } from "@/emails/theme";

/**
 * Branded link-preview card matching the "LINK PREVIEW" mockup in
 * public/brand/applications.png: bordered card, eyebrow, large serif
 * title, emblem pinned near the bottom. The whole card is a single
 * clickable link through to the live post/announcement.
 */
export function LinkPreviewCard({
  eyebrow,
  title,
  href,
  siteUrl,
}: {
  eyebrow: string;
  title: string;
  href: string;
  siteUrl: string;
}) {
  return (
    <a href={href} style={{ textDecoration: "none", display: "block" }}>
      <Section
        style={{
          backgroundColor: emailColors.bone,
          border: `1px solid ${emailColors.umber}`,
          padding: "28px 24px",
        }}
      >
        <Text
          style={{
            fontFamily: emailFonts.label,
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: emailColors.umber,
            margin: 0,
          }}
        >
          {eyebrow}
        </Text>
        <Heading
          as="h2"
          style={{
            fontFamily: emailFonts.display,
            color: emailColors.midnight,
            fontSize: "26px",
            lineHeight: 1.25,
            margin: "12px 0 0",
          }}
        >
          {title}
        </Heading>
        <Img
          src={`${siteUrl}/brand/monogram.png`}
          alt="Marque & Manners"
          width={28}
          height={28}
          style={{ marginTop: "28px" }}
        />
      </Section>
    </a>
  );
}
