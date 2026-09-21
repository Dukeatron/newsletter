import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { emailColors, emailFonts } from "@/emails/theme";

export function EmailShell({
  previewText,
  unsubscribeUrl,
  siteUrl,
  children,
}: {
  previewText: string;
  unsubscribeUrl?: string;
  siteUrl: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body
        style={{
          backgroundColor: emailColors.bone,
          fontFamily: emailFonts.body,
          margin: 0,
          padding: "32px 0",
        }}
      >
        <Container style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Section style={{ textAlign: "center", paddingBottom: "16px" }}>
            <Text
              style={{
                fontFamily: emailFonts.display,
                fontSize: "22px",
                letterSpacing: "0.15em",
                color: emailColors.midnight,
                textTransform: "uppercase",
              }}
            >
              Marque{" "}
              <span style={{ color: emailColors.umber, fontStyle: "italic" }}>
                &amp;
              </span>{" "}
              Manners
            </Text>
          </Section>
          <Hr style={{ borderColor: emailColors.champagne, opacity: 0.5 }} />
          <Section style={{ padding: "24px 8px" }}>{children}</Section>
          <Hr style={{ borderColor: emailColors.champagne, opacity: 0.5 }} />
          <Section style={{ textAlign: "center", paddingTop: "16px" }}>
            <Text
              style={{
                fontFamily: emailFonts.label,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: emailColors.midnight,
                opacity: 0.6,
              }}
            >
              <Link href={siteUrl} style={{ color: emailColors.umber }}>
                View online
              </Link>
              {unsubscribeUrl && (
                <>
                  {"  ·  "}
                  <Link
                    href={unsubscribeUrl}
                    style={{ color: emailColors.umber }}
                  >
                    Unsubscribe
                  </Link>
                </>
              )}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
