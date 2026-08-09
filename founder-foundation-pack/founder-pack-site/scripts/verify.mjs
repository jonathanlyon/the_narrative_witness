import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const pack = resolve(root, "..", "docs", "foundation");
const dist = resolve(root, "dist");
const manifest = JSON.parse(await readFile(resolve(dist, "manifest.json"), "utf8"));
const html = await readFile(resolve(dist, "index.html"), "utf8");
const css = await readFile(resolve(dist, "styles.css"), "utf8");
const app = await readFile(resolve(dist, "app.js"), "utf8");
const embedded = await readFile(resolve(dist, "content.js"), "utf8");
const failures = [];

if (manifest.documents.length !== 15) failures.push("Expected 15 foundation documents.");
if (!html.includes('id="main-content"')) failures.push("Main content landmark is missing.");
if (!html.includes('aria-label="Foundation documents"')) failures.push("Document navigation label is missing.");
if (!css.includes("prefers-reduced-motion")) failures.push("Reduced-motion treatment is missing.");
if (!css.includes("@media print")) failures.push("Print styles are missing.");
if (/<(?:script|link)[^>]+(?:src|href)=["']https?:/i.test(html)) failures.push("External runtime asset detected.");
if (!app.includes("renderMarkdown")) failures.push("Markdown renderer is missing.");

for (const item of manifest.documents) {
  const markdown = await readFile(resolve(pack, item.file), "utf8");
  const hash = createHash("sha256").update(markdown).digest("hex");
  const topLevelHeadings = markdown.match(/^#\s+.+$/gm) ?? [];
  if (hash !== item.hash) failures.push(`${item.file} differs from the generated manifest.`);
  if (markdown.trim().length < 500) failures.push(`${item.file} is unexpectedly short.`);
  if (!embedded.includes(item.hash)) failures.push(`${item.file} is not embedded in the portable site.`);
  if (topLevelHeadings.length !== 1) failures.push(`${item.file} must contain exactly one level-one heading.`);

  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+\.md(?:#[^)]+)?)\)/g)) {
    const target = match[1].split("#")[0];
    const targetPath = target.startsWith("/") ? target : resolve(pack, target);
    try {
      await access(targetPath);
    } catch {
      failures.push(`${item.file} links to missing document ${target}.`);
    }
  }
}

if (failures.length) {
  console.error("Verification failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Founder pack verification passed.");
