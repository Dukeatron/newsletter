import { Eyebrow } from "@/components/ui/Eyebrow";
import { SendButton } from "@/components/admin/SendButton";
import { getAllSendableContent } from "@/lib/content";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminSendPage() {
  const sendable = getAllSendableContent();
  const supabase = getSupabaseServiceClient();

  const { data: sentLog } = await supabase
    .from("sent_log")
    .select("content_type, slug, sent_at, recipient_count");

  const sentMap = new Map(
    (sentLog ?? []).map((entry) => [`${entry.content_type}:${entry.slug}`, entry])
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Admin</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">
        Send notifications
      </h1>
      <p className="mt-3 font-body text-midnight/70">
        New posts and announcements appear here until you send them.
      </p>

      <div className="mt-10 divide-y divide-midnight/10">
        {sendable.map((item) => {
          const sent = sentMap.get(`${item.contentType}:${item.slug}`);
          return (
            <div
              key={`${item.contentType}:${item.slug}`}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.1em] text-umber">
                  {item.contentType}
                </p>
                <p className="font-display text-xl text-midnight">
                  {item.title}
                </p>
                {sent && (
                  <p className="mt-1 font-body text-xs text-midnight/50">
                    Sent {new Date(sent.sent_at).toLocaleString()} to{" "}
                    {sent.recipient_count} subscriber(s)
                  </p>
                )}
              </div>
              {sent ? (
                <span className="font-label text-xs uppercase tracking-[0.1em] text-midnight/40">
                  Sent
                </span>
              ) : (
                <SendButton
                  contentType={item.contentType}
                  slug={item.slug}
                  title={item.title}
                />
              )}
            </div>
          );
        })}
        {sendable.length === 0 && (
          <p className="py-4 font-body text-midnight/60">No content yet.</p>
        )}
      </div>
    </div>
  );
}
