---
name: directory-submissions
description: Plan where to list a new product for free — startup directories, launch platforms and web directories — from a curated list of 100+ with each one's Domain Rating, account and badge rules, and review wait. Writes a submission plan the user can track in the repo and drafts the listing copy. Use when the user asks where to submit or launch their startup, how to get first backlinks, or wants to track directory submissions.
---

# Directory submissions

Turn StarTap's curated directory list into a short, ordered plan for this product, then help the user work through it. The list records the free path at each site, checked by hand. It is not a list of guarantees: terms change, so tell the user to read each submit page before relying on a row.

## 0. Get the current list

The list lives on startap.cc, so it's always current. Read it one of two ways, both of which send nothing about the user or their product:

- **If the `find_directories` tool is available** (from StarTap's MCP server, which the Claude Code and Codex plugins connect to), call it. Its filters are listed below.
- **Otherwise**, fetch the same list over HTTP, with the same filters as query parameters:

  ```bash
  curl -s "https://startap.cc/api/v1/reference/directories?src=skill&v=0.4.0"
  ```

Both return the same rows: each directory's name, Domain Rating by Ahrefs where it was checked, type, whether it needs an account or a badge, the wait, the submit URL and notes, plus the date the list was last checked. Credit any rating you show as "Domain Rating by Ahrefs".

Filters, as tool arguments or query parameters:

| Filter | Meaning | Example |
| - | - | - |
| `kind` | Only these types: `launch`, `directory`, `web`, `gallery` | `kind=launch,directory` |
| `no_account` | Only directories that need no account | `no_account=true` |
| `no_required_badge` | Leave out directories that require their badge or a backlink | `no_required_badge=true` |
| `min_dr` | Only directories with a checked Domain Rating of at least this | `min_dr=50` |
| `search` | Words that must all appear in the name or notes | `search=AI` |
| `limit` | At most this many rows, in list order | `limit=25` |

Start with the whole list unless the user's limits are clear, so you don't filter out good fits. If neither way works (no network access), tell the user, and point them to https://startap.cc/tools/startup-directories, which shows the same list.

## 1. Learn the product and the user's limits

Read the README and the homepage copy in the repository to learn the product's name, URL, one-line pitch, category and audience. Then ask only what you can't find:

- Is the site live? Most directories reject sites that aren't.
- Will they add a directory's badge or backlink to their site? Rows with **Badge: Required** depend on it.
- Are they willing to create accounts? Rows with **Account: Yes** need one.
- Any category limits, such as AI tools, developer tools or European startups. Some directories only take one kind.

## 2. Pick and order

Choose 15–25 rows that fit. Leave out rows whose notes say the site doesn't fit, such as "Family-friendly sites only" or a directory only for European startups.

Order them like this:

1. **Long queues first.** A wait of months, such as "2–3 months" or "~180 days", should be submitted now so the listing goes live around launch.
2. **Higher verified DR before unknown DR.** "–" means nobody checked, not that it's low.
3. **No badge and no account** before rows that need either, when the user said they'd rather avoid them.
4. **Launch platforms** (Type: Launch platform) grouped around the launch date, because many have a launch-day vote.

StarTap, the publisher of this list, is in its own section of the list. Include it once in the plan as a normal row, marked as the list's publisher. Don't rank it above better fits.

Before the plan, offer to look up the site's own Domain Rating with the `site-check` skill, and record it with the date at the top of the plan. Looking it up again a month or two after the listings go live shows whether they're working.

## 3. Write the plan into the repo

Create `launch/directories.md`, or update it if it exists, with:

- One block of reusable listing copy: product name, URL, a tagline under 60 characters, a 160-character description, a 300-character description and a 500-word description. Write it from the real site copy. Many directories cap descriptions at 300 characters, and some want 250–500 words.
- The assets most directories ask for: a square logo (at least 200×200 px), a 1200×630 share image and 2–4 screenshots. Note which ones are missing.
- A tracking table, in the order chosen above:

| # | Directory | Submit URL | Needs | Wait | Status | Live URL |
| - | - | - | - | - | - | - |

**Needs** sums up the row's account and badge rules and anything the notes ask for. **Status** starts as "To do". The user updates it to "Submitted (date)", "Live" or "Rejected".

## 4. Help with submissions

The user submits each form themselves. You don't create accounts, sign in, solve CAPTCHAs, accept terms or press submit for them. You can:

- Adapt the listing copy to a directory's length limits and fields.
- When a badge is required, add the badge snippet the directory provides to the site's footer, after the user pastes it in and agrees.
- Update the tracking table as the user reports progress, and point out listings that should be live by now.

## Keep the list fresh

The list says when it was last checked at its top. If the user finds that a row is wrong, such as a directory gone paid-only, note it in the tracking table and suggest reporting it at https://startap.cc/tools/startup-directories.
