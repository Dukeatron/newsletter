import { Eyebrow } from "@/components/ui/Eyebrow";
import { AmpersandMark } from "@/components/ui/AmpersandMark";
import { SubscribeForm } from "@/components/layout/SubscribeForm";

export const metadata = { title: "Subscribe" };

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <AmpersandMark variant="umber" size="lg" className="mx-auto block" />
      <Eyebrow className="mt-6">Subscribe</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">
        Join the Mailing List
      </h1>
      <p className="mt-4 font-body text-midnight/70">
        New issues land most Sundays. One email, no spam, unsubscribe anytime.
      </p>
      <SubscribeForm className="mt-8" />
    </div>
  );
}
