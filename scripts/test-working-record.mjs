import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const routeDirectory = path.join(repositoryRoot, "public", "working-record");

const [html, css, javascript] = await Promise.all([
  readFile(path.join(routeDirectory, "index.html"), "utf8"),
  readFile(path.join(routeDirectory, "styles.css"), "utf8"),
  readFile(path.join(routeDirectory, "app.js"), "utf8")
]);

const viewNames = [
  "overview",
  "roadmap",
  "ideas",
  "decisions",
  "daily",
  "measures",
  "team"
];

for (const view of viewNames) {
  assert.match(html, new RegExp(`data-view="${view}"`), `Missing ${view} navigation.`);
  assert.match(
    html,
    new RegExp(`data-view-panel="${view}"`),
    `Missing ${view} workspace panel.`
  );
}

for (const control of [
  "new-idea-button",
  "idea-search",
  "idea-filter",
  "decision-list",
  "export-record",
  "reset-record"
]) {
  assert.match(html, new RegExp(`id="${control}"`), `Missing ${control} control.`);
}

assert.match(html, /browser-local data/i, "The local-data boundary must be visible.");
assert.match(html, /no writer material/i, "The privacy boundary must be visible.");
assert.match(javascript, /const roadmap = \[/, "Roadmap seed data is missing.");
assert.match(javascript, /localStorage/, "Local review persistence is missing.");
assert.match(javascript, /addEventListener\("submit"/, "Idea-pad submission is not wired.");
assert.match(css, /@media \(max-width: 680px\)/, "Mobile layout rules are missing.");
assert.match(css, /prefers-reduced-motion/, "Reduced-motion support is missing.");

console.log("Validated The Working Record route, controls, boundaries, and responsive contract.");
