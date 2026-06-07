import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { transform } from "esbuild";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const source = await readFile(
  path.join(repositoryRoot, "tools", "facebook-comment-collector.js"),
  "utf8"
);
const { code } = await transform(source, {
  minify: true,
  target: "es2020"
});
const bookmarklet = `javascript:${code.trim()}`;
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const installer = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Install the Facebook comment collector</title>
    <style>
      body { max-width: 42rem; margin: 10vh auto; padding: 2rem; font: 18px/1.6 system-ui, sans-serif; color: #171717; }
      a { display: inline-block; margin: 1rem 0; padding: .8rem 1rem; color: white; background: #171717; text-decoration: none; }
      code { font-size: .85em; }
    </style>
  </head>
  <body>
    <h1>Facebook comment collector</h1>
    <p>Drag this button to your Chrome bookmarks bar:</p>
    <p><a href="${escapeHtml(bookmarklet)}">Collect Facebook comments</a></p>
    <p>Then open one of Jonathan's Facebook posts, click the bookmark, and save the CSV it creates.</p>
  </body>
</html>
`;

await Promise.all([
  writeFile(
    path.join(repositoryRoot, "tools", "facebook-comment-collector.bookmarklet.txt"),
    `${bookmarklet}\n`,
    "utf8"
  ),
  writeFile(
    path.join(repositoryRoot, "tools", "facebook-comment-collector.html"),
    installer,
    "utf8"
  )
]);

console.log("Built the Facebook comment collector installer.");
