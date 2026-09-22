import { AmpersandMark } from "@/components/ui/AmpersandMark";
import { SubscribeForm } from "@/components/layout/SubscribeForm";

export const metadata = { title: "Subscribe" };

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="sr-only">Subscribe</h1>
      <AmpersandMark variant="umber" size="lg" className="mx-auto block" />
      <SubscribeForm className="mt-8" />
    </div>
  );
}
