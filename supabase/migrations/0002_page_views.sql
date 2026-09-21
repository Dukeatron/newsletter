-- Page views: lightweight, privacy-friendly analytics for /admin/metrics.
-- No IP storage, no cookies, no per-visitor identity — just aggregate
-- counts by path/post/device/country/time.
create table page_views (
  id          bigint generated always as identity primary key,
  path        text not null,
  post_slug   text,
  referrer    text,
  country     text,
  device      text not null default 'unknown'
                check (device in ('mobile', 'tablet', 'desktop', 'unknown')),
  created_at  timestamptz not null default now()
);

create index page_views_created_at_idx on page_views (created_at);
create index page_views_post_slug_idx on page_views (post_slug) where post_slug is not null;
create index page_views_path_idx on page_views (path);

alter table page_views enable row level security;
-- No anon policies: writes go through /api/track using the service role
-- key, same pattern as subscribers/sent_log.
