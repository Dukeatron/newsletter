import { AmpersandMark } from "@/components/ui/AmpersandMark";
import { SubscribeForm } from "@/components/layout/SubscribeForm";

export const metadata = { title: "Subscribe" };

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <AmpersandMark variant="umber" size="lg" className="mx-auto block" />
      <h1 className="mt-6 font-display text-4xl text-midnight">Subscribe</h1>
      <SubscribeForm className="mt-8" />
    </div>
  );
}
