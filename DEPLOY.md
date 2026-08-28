# Deploying

The site builds to static files, so it runs on any static host. `www.ruderal.ch`
already resolves to Vercel, so that is the shortest path; Cloudflare Pages works
identically and only differs in the DNS step.

## Build settings

| | |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 22 |

## Environment variables

Set these on the host. All three are needed at build time.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=zxtziudd
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://www.ruderal.ch
SANITY_READ_TOKEN=<viewer token — see below>
```

`SANITY_READ_TOKEN` is a secret and is not in the repo. The value is in
`.env.local`, which is gitignored. A new one can be made at
sanity.io/manage → API → Tokens, with the **Viewer** role.

It is not a `NEXT_PUBLIC_` variable on purpose: every Sanity read happens during
the build, so the token stays on the build machine and never reaches a browser.
A public dataset alone is not enough — new Sanity projects do not grant the
public role read access to documents, so an anonymous query returns nothing
without failing.

## Vercel

1. Import the GitHub repo `0xCucurbitaceae/ruderal_`.
2. Add the environment variables above.
3. Attach `www.ruderal.ch`. It already points at Vercel, so DNS needs no change.

Note: Vercel's Hobby plan is for personal, non-commercial use. An association
site is a grey area. Cloudflare Pages' free tier permits organisation use
outright, which is why it was the original choice.

## Cloudflare Pages

1. Create a Pages project from the GitHub repo.
2. Build command `npm run build`, output directory `out`.
3. Add the environment variables above.
4. Attach `www.ruderal.ch`, then repoint DNS at GoDaddy — the record currently
   sends the domain to Vercel.

## Publishing content without a developer

Editors work at https://ruderal.sanity.studio/. Publishing there does not
rebuild the site on its own — the site is static.

To close that loop, create a deploy hook on the host and register it as a Sanity
webhook:

1. Host: create a deploy hook and copy its URL.
2. sanity.io/manage → API → Webhooks → Create webhook.
   - URL: the deploy hook
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: POST

A publish then triggers a build, and the change is live in a minute or so.
