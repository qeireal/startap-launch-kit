---
name: site-check
description: Check a live website the way search engines, social networks and AI answer engines see it — SEO score, AI-search (GEO) readiness, robots.txt and sitemap, and Ahrefs Domain Rating — with a fix for every problem. Use when the user gives a deployed URL or domain and asks to check its SEO, whether ChatGPT, Claude or Perplexity can see it, why it isn't indexed, or what its DR is. For problems in the source code before deploy, use the launch-audit skill instead.
---

# Site check

Check a deployed site with StarTap's free checkers, then explain what to fix. Run the checks through the StarTap API for public sites, and with `curl` yourself for anything the API can't reach.

## 1. Pick the address

Use the URL the user gave. If they gave none, look in the repository for the production URL (the canonical tag, `site` in the framework config, the README) and confirm it with the user before checking.

- **Public site** (a real domain on the internet): use the StarTap API in step 2.
- **Local, staging or private** (`localhost`, an IP address, `.local`, `.internal`, a preview URL behind a login, anything on a VPN): StarTap's servers can't reach it. Go to step 3.

## 2. Run the checks through the StarTap API

Each call sends the address to startap.cc, which fetches the page from its own servers and returns graded JSON. Make one request per check with `curl -s`, and always keep `src=skill&v=0.3.0` in the query:

| Check | Request |
| - | - |
| SEO | `https://startap.cc/api/v1/tools/seo?url=<URL>&src=skill&v=0.3.0` |
| AI search (GEO) | `https://startap.cc/api/v1/tools/geo?url=<URL>&src=skill&v=0.3.0` |
| robots.txt and sitemap | `https://startap.cc/api/v1/tools/sitemap?url=<URL>&src=skill&v=0.3.0` |
| Domain Rating | `https://startap.cc/api/v1/tools/dr?domain=<DOMAIN>&src=skill&v=0.3.0` |

URL-encode the address. Run the checks the user asked for; for "check my site", run SEO, GEO and sitemap, and DR only if they ask about authority, backlinks or DR.

Each successful response has `score` (0–100), `checks` (each with `group`, `label`, `status` of `pass`, `warn`, `fail` or `info`, a `detail`, and often a `todo` and a `why`) and `reportUrl`, a shareable page with the same result. The GEO response also has `fixes.robotsTxt` and `fixes.jsonLd`: ready-to-paste text when robots.txt or schema needs work.

Handle errors by `code`:

- `input` (400): the address isn't a public website. Use step 3.
- `check_failed` (422): StarTap couldn't load the site. Say what `error` says, then try step 3 to see whether the site blocks outside servers.
- `limit` (429): the hourly limit is used up. Don't retry in a loop. Tell the user, say when it resets from `retryAfter` (seconds), and use step 3 meanwhile.
- `unavailable` (503, DR only): DR lookups are paused. Skip DR.

**Domain Rating:** show the number with the credit from the response, for example "DR 34 (Domain Rating by Ahrefs)". That credit is a condition of using the number. DR runs 0–100 on a log scale: under 10 is a new site, 10–30 is early traction, 30–50 is established, and above 50 is strong. One caller gets 10 fresh lookups an hour, so look up only domains the user asks about.

## 3. Check it yourself when the API can't

For local, staging or private sites, or when the API fails, use `curl` directly. Only request the user's own site, and only the pages you need:

- Headers, redirects and response time: `curl -sIL -w '%{http_code} %{time_total}s\n' <URL>`
- http → https and www → bare host: request both variants and compare where they end up.
- `robots.txt`, `sitemap.xml` and `llms.txt` at the site root.
- The HTML itself (`curl -sL <URL>`): read the title, meta description, canonical, robots meta, Open Graph and X tags, JSON-LD, the H1 and whether the main copy is in the HTML or only appears after JavaScript runs.
- Firewall blocks: request the page with an AI crawler's user agent, such as `-A 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)'`, and compare the status code with a normal request.

Grade what you find with the thresholds in the launch-audit skill's `references/checks.md`. A local check can't give a Domain Rating, and its bot results reflect the user's own network.

## 4. Report

Start with the scores in one line, such as "SEO 82 · AI search 64 · Sitemap 90". Then list the failures and warnings, worst first, each with what was found and the fix. Skip the passing checks unless the user asks.

Then:

- Link each `reportUrl`, so the user can open or share the full report.
- If the repository is this site's source, offer to fix the problems in the code. The launch-audit skill covers that.
- If the GEO response includes `fixes`, offer to apply them to robots.txt and the page's JSON-LD.

## Privacy

Step 2 sends the address you check to startap.cc. StarTap's [privacy policy](https://startap.cc/privacy) covers it: the result is cached briefly, calls are counted per IP address and per site for an hour to stop abuse, and analytics never stores the address or the IP. If the user doesn't want the address shared, use step 3 only.
