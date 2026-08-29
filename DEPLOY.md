# Deploying

The site builds to static files, so it runs on any static host.

## Build settings

| | |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 22 |

## Environment variables

**None.** The three public values live in `.env.production`, which is committed
on purpose — none of them are secrets, and keeping them in the repo means a host
can build the site with no configuration at all.

There is no read token, and there should not be one. The content once appeared
unreadable without one, but the cause was not permissions: Sanity hides any
document whose id contains a dot from unauthenticated reads. The ids were
`event.communities-and-nature`; they are now `event-communities-and-nature`, so
the public dataset really is publicly readable. Reintroducing a dotted id would
make those documents vanish from the built site.

Point a local checkout at a different project or dataset with `.env.local`; see
`.env.example`.

## Vercel

1. Import the GitHub repo `0xCucurbitaceae/ruderal_`.
2. Attach `www.ruderal.ch`.

Vercel's Hobby plan is for personal, non-commercial use. An association site is
a grey area; Cloudflare Pages' free tier permits organisation use outright.

## Cloudflare Pages

1. Create a Pages project from the GitHub repo, build `npm run build`, output `out`.
2. Attach `www.ruderal.ch` and repoint DNS at GoDaddy — the record currently
   sends the domain to Vercel.

## Publishing content without a developer

Editors work at https://ruderal.sanity.studio/. Publishing there does not
rebuild the site on its own, because the site is static.

To close that loop, create a deploy hook on the host and register it as a Sanity
webhook:

1. Host: create a deploy hook and copy its URL.
2. sanity.io/manage → API → Webhooks → Create webhook.
   - URL: the deploy hook
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - HTTP method: POST

A publish then triggers a build and the change is live in a minute or so.

## Document ids

Give new documents dot-free ids. The Studio generates these correctly on its
own; it only matters for scripted imports.
