-- Subscribers: newsletter/mailing list signups with double opt-in.
create table subscribers (
  id                uuid primary key default gen_random_uuid(),
  email             text not null unique,
  status            text not null default 'pending'
                      check (status in ('pending', 'confirmed', 'unsubscribed')),
  unsubscribe_token uuid not null default gen_random_uuid(),
  confirm_token     uuid not null default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  confirmed_at      timestamptz,
  unsubscribed_at   timestamptz
);

create index subscribers_status_idx on subscribers (status);

alter table subscribers enable row level security;

-- No anon policies: the app never calls Supabase from the browser. All
-- reads/writes go through Next.js API routes using the service role key.

-- Sent log: tracks which posts/announcements have already triggered an
-- email blast, keyed by (content_type, slug) so /admin/send is idempotent.
create table sent_log (
  id              uuid primary key default gen_random_uuid(),
  content_type    text not null check (content_type in ('post', 'announcement')),
  slug            text not null,
  sent_at         timestamptz not null default now(),
  recipient_count integer not null default 0,
  unique (content_type, slug)
);

alter table sent_log enable row level security;
-- No anon policies: service role only.
