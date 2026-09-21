# Marque & Manners

Newsletter/blog site built with Next.js (App Router), Tailwind CSS v4, Supabase, and Resend. See `/Users/shreyas/.claude/plans/plan-out-a-next-js-shiny-wilkinson.md` for the full architecture writeup.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` — from a Supabase project. Run `supabase/migrations/0001_init.sql` against it (via the SQL editor or `supabase db push`).
   - `RESEND_API_KEY` / `EMAIL_FROM` — from Resend, with a verified sending domain.
   - `ADMIN_PASSWORD_HASH` — generate with `node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"`.
   - `ADMIN_SESSION_SECRET` — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
   - `SITE_URL` — your deployed URL (or `http://localhost:3000` for local dev).
3. `npm run dev`

## Writing content

- **Blog posts**: add a `.mdx` file under `content/posts/`. Frontmatter fields: `title`, `date`, `category` (one of `leader`, `verdict`, `cohort`, `errata`), `tags` (array), `excerpt`, `author`, and optionally `cover`, `rating` (0–10, for `verdict` posts), `issue`, `draft`.
- **Announcements**: add a `.mdx` file under `content/announcements/`. Frontmatter: `title`, `date`, `excerpt`, optionally `cover`, `draft`.
- **Temporary pages** (sponsor pages, one-off landing pages): add a `.mdx` file under `content/temp-pages/`. Frontmatter: `title`, optionally `expiresAt` (ISO date, page 404s after this) and `noindex`. Renders at `/<slug>`.
- **Redirects**: add `{ "source": "/old-url", "destination": "/new-url", "permanent": true }` entries to `content-config/redirects.json` and redeploy.

Push to deploy — there's no in-app editor by design (see the plan doc for why).

## Sending the newsletter

After a new post or announcement is live, go to `/admin/send` (log in with your admin password) and click "Send now" next to it. This emails every confirmed subscriber and marks the item as sent, so it won't be re-sent. Nothing sends automatically on deploy.

## Deploying

Deploy to Vercel as normal. Set the same environment variables from `.env.local` in the Vercel project settings.
