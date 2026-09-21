import { getSupabaseServiceClient } from "@/lib/supabase/server";

export type ConfirmedSubscriber = { email: string; unsubscribe_token: string };

export async function getConfirmedSubscribers(): Promise<ConfirmedSubscriber[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("subscribers")
    .select("email, unsubscribe_token")
    .eq("status", "confirmed");

  if (error || !data) return [];
  return data;
}

export async function getConfirmedSubscriberEmails(): Promise<string[]> {
  const subscribers = await getConfirmedSubscribers();
  return subscribers.map((subscriber) => subscriber.email);
}
