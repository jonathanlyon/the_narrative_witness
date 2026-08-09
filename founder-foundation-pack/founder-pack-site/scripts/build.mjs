import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const packRoot = resolve(siteRoot, "..", "docs", "foundation");
const sourceRoot = resolve(siteRoot, "src");
const outputRoot = resolve(siteRoot, "dist");

const documentFiles = [
  "00-executive-brief.md",
  "01-repository-audit.md",
  "02-vision-and-principles.md",
  "03-audience-hypotheses.md",
  "04-landscape-and-business-models.md",
  "05-problem-and-proposition.md",
  "06-studio-mvp.md",
  "07-im-sensing-contract.md",
  "08-technical-strategy.md",
  "09-staged-development-plan.md",
  "10-task-map.md",
  "11-question-and-decision-register.md",
  "12-cost-and-operations.md",
  "13-agent-and-documentation-model.md",
  "source-register.md"
];

const documents = [];
for (const file of documentFiles) {
  const markdown = await readFile(resolve(packRoot, file), "utf8");
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.replace(/[*_`]/g, "") ?? file;
  const hash = createHash("sha256").update(markdown).digest("hex");
  documents.push({ file, slug: file.replace(/\.md$/, ""), title, markdown, hash });
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
  const body = await readFile(resolve(sourceRoot, file), "utf8");
  await writeFile(resolve(outputRoot, file), body);
}

const payload = `window.FOUNDATION_DOCS = ${JSON.stringify(documents)};\n`;
await writeFile(resolve(outputRoot, "content.js"), payload);
await writeFile(
  resolve(outputRoot, "manifest.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), documents: documents.map(({ file, title, hash }) => ({ file, title, hash })) }, null, 2) + "\n"
);

console.log(`Built founder pack with ${documents.length} documents.`);

