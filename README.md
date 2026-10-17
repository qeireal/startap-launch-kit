<div align="center">

![StarTap Launch Kit](assets/readme-logo.png)

# StarTap Launch Kit

</div>

Four skills that help a coding agent get a website ready to launch. Most work on the code in your repository, so the agent can fix problems instead of only reporting them. They're built from the free tools at [startap.cc/tools](https://startap.cc/tools).

## Skills

| Skill | What it does |
| - | - |
| `launch-audit` | Checks your page templates for launch SEO: title and meta description, canonical, Open Graph and X cards, JSON-LD, headings, alt text, robots.txt, sitemap, favicon, and whether AI search crawlers can read and quote the site. Reports each finding with the value it found, then fixes the gaps once you agree. |
| `site-check` | Checks the live site with StarTap's free checkers: an SEO score, AI-search (GEO) readiness, robots.txt and sitemap, and Ahrefs Domain Rating, each with a fix and a shareable report. Local and staging sites are checked with `curl` instead. |
| `directory-submissions` | Picks 15–25 free startup directories, launch platforms and web directories that fit your product from a curated list of more than 100. Each one has its Domain Rating where it was checked, its account and badge rules, and its review wait. It writes `launch/directories.md` with ready-to-paste listing copy and a tracking table. |
| `launch-checklist` | Writes `launch/checklist.md`: a dated plan for two weeks before, one week before, launch day and the week after, with items your code already proves are done ticked off. |

Ask in plain words, for example "audit my site before launch", "what's the DR of my site?", "where should I submit my startup?" or "make a launch checklist for 12 November".

## Install

### OpenCode, Pi, Cursor, Gemini CLI and other agents

One command installs the skills into every coding agent it finds on your machine:

```bash
npx skills add qeireal/startap-launch-kit
```

Add `-g` to install for all your projects instead of the current one, or `-a opencode` (or `pi`, `cursor` and so on) to pick the agent. Update later with `npx skills update`. [skills](https://github.com/vercel-labs/skills) is an open-source installer for the [Agent Skills](https://agentskills.io) format and supports more than 75 agents.

### Claude Code

Install it as a plugin, so updates arrive with the plugin. Run these inside Claude Code:

```
/plugin marketplace add qeireal/startap-launch-kit
/plugin install startap-launch-kit@startap
```

### Codex

Install it as a plugin. Run these in your terminal, then restart Codex:

```bash
codex plugin marketplace add qeireal/startap-launch-kit
codex plugin add startap-launch-kit@startap
```

Update later with `codex plugin marketplace upgrade`.

## What it runs, reads and sends

- **No scripts, hooks, MCP servers or background processes.** The plugin is Markdown instructions and reference tables only.
- **Reads** files in your repository to learn how pages are rendered and what the product is.
- **Writes** files only after you agree: fixes to your page templates, `launch/directories.md` and `launch/checklist.md`.
- **Network:** only `site-check` makes requests, and only when you ask it to check a site:
  - For a public site, the agent sends the address to the StarTap API at `https://startap.cc/api/v1/tools/` (`seo`, `geo`, `sitemap` and `dr`), with `src=skill` and the plugin version so StarTap can count skill usage. StarTap fetches the page from its servers and returns the graded result. Results are cached for a few minutes (Domain Rating for a day). Each IP address and each checked site has an hourly limit. StarTap's analytics records which check ran and whether it worked, but never your IP address or the address checked. See [StarTap's privacy policy](https://startap.cc/privacy).
  - For local, staging or private sites, or if you'd rather not share the address, the agent uses `curl` against your own site only and sends nothing to StarTap.
- **Never** creates accounts, signs in, solves CAPTCHAs, accepts terms or submits directory forms for you. You submit each listing yourself.

## Data

`skills/directory-submissions/references/directories.md` and `skills/launch-audit/references/ai-crawlers.md` are generated from the data behind [startap.cc/tools/startup-directories](https://startap.cc/tools/startup-directories) and [startap.cc/tools/geo-checker](https://startap.cc/tools/geo-checker). Directory terms change often. Each file says when it was last checked, so read each submit page before relying on a row. StarTap publishes the list and is listed in it, in its own section.

## Support

Report problems or out-of-date directories in [GitHub issues](https://github.com/qeireal/startap-launch-kit/issues).

## License

[MIT](LICENSE)
