import { Eyebrow } from "@/components/ui/Eyebrow";
import { AmpersandMark } from "@/components/ui/AmpersandMark";

export const metadata = { title: "Unsubscribed" };

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const success = status === "success";

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <AmpersandMark variant="umber" size="lg" className="mx-auto block" />
      <Eyebrow className="mt-6">Unsubscribe</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">
        {success ? "You've been unsubscribed." : "That link didn't work."}
      </h1>
      <p className="mt-4 font-body text-midnight/70">
        {success
          ? "Sorry to see you go. You can resubscribe any time from the homepage."
          : "That unsubscribe link is invalid or has already been used."}
      </p>
    </div>
  );
}
