import { Eyebrow } from "@/components/ui/Eyebrow";
import { AmpersandMark } from "@/components/ui/AmpersandMark";

export const metadata = { title: "Subscription confirmed" };

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const success = status === "success";

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <AmpersandMark variant="umber" size="lg" className="mx-auto block" />
      <Eyebrow className="mt-6">Subscribe</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">
        {success ? "You're in." : "That link didn't work."}
      </h1>
      <p className="mt-4 font-body text-midnight/70">
        {success
          ? "Thanks for confirming — the next issue of Marque & Manners will land in your inbox."
          : "That confirmation link is invalid or has expired. Try subscribing again."}
      </p>
    </div>
  );
}
