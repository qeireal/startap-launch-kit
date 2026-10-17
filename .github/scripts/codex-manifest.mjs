// Builds .codex-plugin/plugin.json, the manifest OpenAI's plugin directory and Codex read, from
// .claude-plugin/plugin.json, so the plugin has one manifest to edit. Shared fields are copied;
// the listing fields only OpenAI uses live under "metadata.openai", which Claude Code ignores.
// The MCP servers in .mcp.json (Claude's format) become .codex-plugin/mcp.json in the format
// OpenAI and Codex read, so both point at the same servers.
//
//   node .github/scripts/codex-manifest.mjs           write the file
//   node .github/scripts/codex-manifest.mjs --check   fail if it's missing or out of date
//   node .github/scripts/codex-manifest.mjs --dry-run only check the fields against OpenAI's limits
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const claude = JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"), "utf8"));
const openai = claude.metadata?.openai ?? {};
const claudeMcp = existsSync(join(root, ".mcp.json")) ? JSON.parse(readFileSync(join(root, ".mcp.json"), "utf8")).mcpServers ?? {} : {};
const TYPES = { http: "streamable-http", sse: "sse" };
const servers = Object.fromEntries(
  Object.entries(claudeMcp).map(([name, s]) => [name, { type: TYPES[s.type] ?? s.type, url: s.url, ...(s.headers ? { headers: s.headers } : {}) }]),
);
// No "$schema" key: OpenAI's portal rejects it in the Codex layout ("Extra inputs are not permitted").
const codexMcp = Object.keys(servers).length ? { mcpServers: servers } : null;

const manifest = {
  name: claude.name,
  version: claude.version,
  description: claude.description,
  author: claude.author,
  homepage: claude.homepage,
  repository: claude.repository,
  license: claude.license,
  keywords: claude.keywords,
  skills: "./skills/",
  ...(codexMcp ? { mcpServers: "./.codex-plugin/mcp.json" } : {}),
  interface: {
    displayName: claude.displayName ?? claude.name,
    shortDescription: openai.shortDescription,
    longDescription: openai.longDescription ?? claude.description,
    developerName: openai.developerName ?? claude.author?.name,
    category: openai.category,
    capabilities: openai.capabilities ?? [],
    websiteURL: openai.websiteURL ?? claude.homepage,
    supportURL: claude.supportUrl,
    privacyPolicyURL: claude.privacyPolicyUrl,
    termsOfServiceURL: claude.termsOfServiceUrl,
    defaultPrompt: openai.defaultPrompt,
    brandColor: openai.brandColor,
    logo: claude.icon,
    composerIcon: openai.composerIcon ?? claude.icon,
  },
};

// OpenAI's published limits, checked here so a bad value fails before upload.
const problems = [];
const need = (ok, message) => ok || problems.push(message);
const { interface: ui } = manifest;
need(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name) && manifest.name.length <= 64, "name: lowercase letters, numbers and single hyphens, at most 64 characters");
need(/^\d+\.\d+\.\d+$/.test(manifest.version ?? ""), "version: an explicit semantic version like 1.2.3");
need(manifest.description && manifest.description.length <= 4000, "description: required, at most 4000 characters");
need(manifest.author?.name && manifest.author.name.length <= 120, "author.name: required, at most 120 characters");
need(ui.displayName && ui.displayName.length <= 30, "interface.displayName: required, at most 30 characters");
need(ui.shortDescription && ui.shortDescription.length <= 30, "metadata.openai.shortDescription: required, at most 30 characters");
need(ui.longDescription.length <= 4000, "metadata.openai.longDescription: at most 4000 characters");
need(ui.developerName && ui.developerName.length <= 80, "metadata.openai.developerName: required, at most 80 characters");
// From https://developers.openai.com/plugins/deploy/submission-errors (plugin_category_unknown). Exact spelling and case.
const CATEGORIES = ["Productivity", "Creativity", "Developer Tools", "Business & Operations", "Data & Analytics", "Communication", "Education & Research", "Security", "Finance", "Healthcare", "Travel", "Entertainment", "Other"];
need(CATEGORIES.includes(ui.category), `metadata.openai.category: one of ${CATEGORIES.join(", ")}`);
need(ui.capabilities.length <= 20 && ui.capabilities.every((c) => c.length <= 120), "metadata.openai.capabilities: at most 20, each at most 120 characters");
for (const key of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
  need(!ui[key] || (/^https:\/\//.test(ui[key]) && ui[key].length <= 1024), `interface.${key}: an https:// URL, at most 1024 characters`);
}
need(!ui.defaultPrompt || (ui.defaultPrompt.length <= 3 && new Set(ui.defaultPrompt).size === ui.defaultPrompt.length && ui.defaultPrompt.every((p) => p.length <= 128)), "metadata.openai.defaultPrompt: up to 3 unique prompts, each at most 128 characters");
need(!ui.brandColor || /^#[0-9A-Fa-f]{6}$/.test(ui.brandColor), "metadata.openai.brandColor: #RRGGBB");
for (const key of ["logo", "composerIcon"]) {
  need(ui[key]?.startsWith("./") && existsSync(join(root, ui[key])), `interface.${key}: a ./ path to a file in the plugin (from "icon")`);
}

for (const [name, s] of Object.entries(servers)) {
  need(Object.values(TYPES).includes(s.type) && /^https:\/\//.test(s.url ?? ""), `.mcp.json server "${name}": a remote http or sse server with an https:// url (local servers can't be submitted)`);
  need(!s.headers, `.mcp.json server "${name}": no headers (OpenAI rejects them in public submissions)`);
}

if (problems.length) {
  console.error(`Can't build .codex-plugin/plugin.json:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

if (process.argv.includes("--dry-run")) {
  console.log(`Codex manifest for ${manifest.name} ${manifest.version} is valid.`);
  process.exit(0);
}

const files = [[join(root, ".codex-plugin/plugin.json"), `${JSON.stringify(manifest, null, 2)}\n`]];
if (codexMcp) files.push([join(root, ".codex-plugin/mcp.json"), `${JSON.stringify(codexMcp, null, 2)}\n`]);
if (process.argv.includes("--check")) {
  const stale = files.filter(([path, text]) => !existsSync(path) || readFileSync(path, "utf8") !== text);
  if (stale.length) {
    console.error(".codex-plugin is out of date. Run: node .github/scripts/codex-manifest.mjs");
    process.exit(1);
  }
  console.log(".codex-plugin is up to date.");
} else {
  mkdirSync(join(root, ".codex-plugin"), { recursive: true });
  for (const [path, text] of files) writeFileSync(path, text);
  console.log(`Wrote .codex-plugin for ${manifest.name} ${manifest.version}${codexMcp ? ", with its MCP servers" : ""}.`);
}
