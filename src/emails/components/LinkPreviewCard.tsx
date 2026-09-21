import { Heading, Section, Text } from "@react-email/components";
import { emailColors, emailFonts } from "@/emails/theme";

/**
 * Branded link-preview card matching the "LINK PREVIEW" mockup in
 * public/brand/applications.png: bordered card, eyebrow, large serif
 * title, small masthead pinned near the bottom. The whole card is a
 * single clickable link through to the live post/announcement.
 */
export function LinkPreviewCard({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href: string;
}) {
  return (
    <a href={href} style={{ textDecoration: "none", display: "block" }}>
      <Section
        style={{
          backgroundColor: emailColors.bone,
          border: `1px solid ${emailColors.champagne}`,
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
        <Text
          style={{
            fontFamily: emailFonts.display,
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: emailColors.midnight,
            margin: "28px 0 0",
          }}
        >
          Marque{" "}
          <span style={{ color: emailColors.umber, fontStyle: "italic" }}>
            &amp;
          </span>{" "}
          Manners
        </Text>
      </Section>
    </a>
  );
}
