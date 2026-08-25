# Little One — newborn wishlist

An app for building a baby wishlist: a parent leaves an email and the baby's
name and immediately gets a unique edit link on screen, adds gifts to it
(product links) and shares a link/QR code with friends for reserving gifts
without duplicate purchases. Available in Polish, English, and Spanish.

## How it's built

- **Next.js 16 (App Router)** — localized routing under `app/[lang]/...`
  (`pl` / `en` / `es`), language detection and redirects in `proxy.ts`.
- **Data** — `lib/wishlist.ts` (data access layer) on top of a simple
  key-value store (`lib/db`). In production it uses Upstash Redis / Vercel
  Redis; without configured environment variables it automatically falls
  back to an in-memory store (convenient for local development,
  **non-persistent**). Lists expire after 6 months via Redis' native TTL —
  no cron job needed for cleanup.
- **No email is sent** — after entering an email and the baby's name, the
  unique edit link is shown immediately on screen (with a copy button). The
  email address is only used to enforce a "one active list per email" rule —
  if a list already exists, the app shows the link to it instead of creating
  a new one.
- **Mutations** — Server Actions in `lib/actions.ts` (adding/removing items,
  reservations, list creation).
- **QR code** — generated server-side with the `qrcode` package on the edit
  panel page.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/pl`
(or another language detected from `Accept-Language`).

Copy `.env.example` to `.env.local` if you want to connect persistent
storage (Upstash Redis). Without it the app runs fully locally with the
in-memory store.

## Deploying to Vercel

1. Connect the repo to Vercel.
2. Add persistent storage:
   - Easiest: create a **Redis** database from the project's **Storage** tab
     in the Vercel dashboard (powered by Upstash) and connect it — this
     auto-injects `KV_REST_API_URL` / `KV_REST_API_TOKEN`, which the app
     already supports.
   - Alternatively, set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
     manually from your own Upstash database.
3. Deploy — without step 2 the app will still start, but data disappears on
   every serverless instance restart, so it's required before real use.
