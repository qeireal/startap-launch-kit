---
name: launch-checklist
description: Write a dated launch plan for a product into the repo — what to do two weeks before, one week before, on launch day and the week after — and tick off what the code already proves is done. Use when the user picks a launch date, asks how to launch a startup or side project, or wants a Product Hunt-style launch checklist.
---

# Launch checklist

Write `launch/checklist.md` in the repository. It's a launch plan with real dates, and items the code already settles are ticked off.

## 1. Get the launch date

Ask for the launch day if the user hasn't given one. If they don't have one yet, suggest a Tuesday to Thursday at least two weeks out, and use that as a placeholder.

Work out the dates for each phase: two weeks before, one week before, launch day and the week after.

## 2. Write the checklist

Use the phases and items below. Write each phase heading with its date, such as "Two weeks before (from 3 November)". Keep items as GitHub task-list lines (`- [ ]`).

### Two weeks before

- Write a one-sentence pitch: who it's for and what it does.
- Make the landing page say what the product does above the fold, with one clear call to action.
- Give every key page a title tag and meta description.
- Make a 1200×630 share image and add Open Graph tags.
- Run the `launch-audit` skill and fix every failure.
- Add robots.txt and a sitemap, then submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Install analytics and check that signups or purchases are tracked.
- Add a favicon, a 404 page, a privacy policy and terms.
- Test the whole flow on a phone: sign-up, emails, payments.
- Submit to directories with long free queues now, so they go live around launch. The `directory-submissions` skill plans this.

### One week before

- Pick the launch day and the 3–5 places to launch.
- Prepare a square and a wide logo, 3–5 screenshots, and a 30–60 second demo video or GIF.
- Write the launch post, a short version for X or Threads, a LinkedIn version and a first comment explaining why you built it.
- Tag every launch link with UTM parameters, so you can tell which post worked.
- Tell the waitlist, friends and early users the date, and ask for honest feedback on the day.
- Write answers to the questions you expect: pricing, privacy, how it differs from alternatives.

### Launch day

- Post on the main launch platform early in its day.
- Share on X, LinkedIn and the communities you belong to, following each one's self-promotion rules.
- Email the list with one clear link.
- Reply to every comment and message within the hour.
- Watch analytics and error logs, and fix anything that blocks signups straight away.

### The week after

- Thank everyone publicly and share what happened, numbers included.
- Ask happy users for a quote and add the best ones to the landing page.
- Compare channels by signups, not visits, using the UTM data.
- Follow up with every signup who didn't get started, and ask what stopped them.
- Plan the next moment: a feature launch, an update post, or a relaunch in a few months.

## 3. Tick off what the code proves

Look through the repository and tick (`- [x]`) only the items you can confirm, adding a short note after each one saying where you saw it. Examples: `robots.txt` exists in the public folder, an analytics snippet in the layout, `/privacy` and `/terms` routes, a custom 404 page, `og:image` set in the layout. Leave everything else unticked. Never tick an item because it's probably done.

## 4. Offer the next step

Say how many items are done, list the three that matter most right now given the date, and offer to start on one of them. For SEO items, that's the `launch-audit` skill. For directory items, it's the `directory-submissions` skill. For UTM links, build them in the checklist or point to https://startap.cc/tools/utm-builder.

If `launch/checklist.md` already exists, update it in place and keep the user's ticks and notes.
