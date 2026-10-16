<div align="center">

![StarTap Launch Kit](assets/readme-logo.png)

# StarTap Launch Kit

</div>

Three skills that help a coding agent get a website ready to launch. They work on the code in your repository, so the agent can fix problems instead of only reporting them. They're built from the free tools at [startap.cc/tools](https://startap.cc/tools).

## Skills

| Skill | What it does |
| - | - |
| `launch-audit` | Checks your page templates for launch SEO: title and meta description, canonical, Open Graph and X cards, JSON-LD, headings, alt text, robots.txt, sitemap, favicon, and whether AI search crawlers can read and quote the site. Reports each finding with the value it found, then fixes the gaps once you agree. |
| `directory-submissions` | Picks 15–25 free startup directories, launch platforms and web directories that fit your product from a curated list of more than 100. Each one has its Domain Rating where it was checked, its account and badge rules, and its review wait. It writes `launch/directories.md` with ready-to-paste listing copy and a tracking table. |
| `launch-checklist` | Writes `launch/checklist.md`: a dated plan for two weeks before, one week before, launch day and the week after, with items your code already proves are done ticked off. |

Ask in plain words, for example "audit my site before launch", "where should I submit my startup?" or "make a launch checklist for 12 November".

## Install

The skills follow the open [Agent Skills](https://agentskills.io) format, so they work in any agent that reads `SKILL.md` files.

### Claude Code

Run these inside Claude Code:

```
/plugin marketplace add qeireal/startap-launch-kit
/plugin install startap-launch-kit@startap
```

### Codex

Run these in your terminal, then restart Codex:

```bash
codex plugin marketplace add qeireal/startap-launch-kit
codex plugin add startap-launch-kit@startap
```

Update later with `codex plugin marketplace upgrade`.

### OpenCode

OpenCode loads skills from `~/.config/opencode/skills/` for every project, or `.opencode/skills/` for one project. Copy the three skill folders there:

```bash
git clone --depth 1 https://github.com/qeireal/startap-launch-kit.git /tmp/startap-launch-kit
mkdir -p ~/.config/opencode/skills
cp -R /tmp/startap-launch-kit/skills/* ~/.config/opencode/skills/
```

Restart OpenCode. To update, run the same commands again.

### Pi

Install it as a Pi package straight from GitHub:

```bash
pi install git:github.com/qeireal/startap-launch-kit
```

Pi finds the skills through the `pi` field in `package.json`. Update with `pi update`.

### Any other agent

Most agents that support skills also read `~/.agents/skills/`. Copy the skill folders there:

```bash
git clone --depth 1 https://github.com/qeireal/startap-launch-kit.git /tmp/startap-launch-kit
mkdir -p ~/.agents/skills
cp -R /tmp/startap-launch-kit/skills/* ~/.agents/skills/
```

## What it runs, reads and sends

- **No scripts, hooks, MCP servers or background processes.** The plugin is Markdown instructions and reference tables only.
- **Reads** files in your repository to learn how pages are rendered and what the product is.
- **Writes** files only after you agree: fixes to your page templates, `launch/directories.md` and `launch/checklist.md`.
- **Network:** the plugin sends nothing anywhere. The agent fetches your own site's URL only if you ask it to. The skills link to free tools on startap.cc that you can open yourself. Those tools fetch the URL you enter, and [StarTap's privacy policy](https://startap.cc/privacy) covers them.
- **Never** creates accounts, signs in, solves CAPTCHAs, accepts terms or submits directory forms for you. You submit each listing yourself.

## Data

`skills/directory-submissions/references/directories.md` and `skills/launch-audit/references/ai-crawlers.md` are generated from the data behind [startap.cc/tools/startup-directories](https://startap.cc/tools/startup-directories) and [startap.cc/tools/geo-checker](https://startap.cc/tools/geo-checker). Directory terms change often. Each file says when it was last checked, so read each submit page before relying on a row. StarTap publishes the list and is listed in it, in its own section.

## Support

Report problems or out-of-date directories in [GitHub issues](https://github.com/qeireal/startap-launch-kit/issues).

## License

[MIT](LICENSE)
