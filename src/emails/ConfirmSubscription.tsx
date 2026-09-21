import { Button, Section, Text } from "@react-email/components";
import { EmailShell } from "@/emails/layout/EmailShell";
import { emailColors } from "@/emails/theme";

export function ConfirmSubscriptionEmail({
  confirmUrl,
  siteUrl,
}: {
  confirmUrl: string;
  siteUrl: string;
}) {
  return (
    <EmailShell previewText="Confirm your subscription to Marque & Manners" siteUrl={siteUrl}>
      <Text style={{ fontSize: "16px", color: emailColors.midnight }}>
        One more step — confirm your email to start receiving Marque &amp;
        Manners in your inbox.
      </Text>
      <Section style={{ textAlign: "center", padding: "16px 0" }}>
        <Button
          href={confirmUrl}
          style={{
            backgroundColor: emailColors.midnight,
            color: emailColors.bone,
            padding: "12px 24px",
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Confirm subscription
        </Button>
      </Section>
      <Text style={{ fontSize: "13px", color: emailColors.midnight, opacity: 0.6 }}>
        If you didn&apos;t request this, you can ignore this email.
      </Text>
    </EmailShell>
  );
}

export default ConfirmSubscriptionEmail;
