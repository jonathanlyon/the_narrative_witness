import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const excerptsDirectory = path.join(repositoryRoot, "content", "excerpts");
const publicDirectory = path.join(repositoryRoot, "public");
const files = (await readdir(excerptsDirectory)).filter((file) =>
  file.endsWith(".json")
);

assert.ok(files.length > 0, "At least one excerpt is required.");

const ids = new Set();
const orders = new Set();

for (const file of files) {
  const sourcePath = path.join(excerptsDirectory, file);
  const excerpt = JSON.parse(await readFile(sourcePath, "utf8"));

  for (const field of ["id", "title", "type", "readTime", "body"]) {
    assert.ok(
      typeof excerpt[field] === "string" && excerpt[field].trim(),
      `${file} needs a ${field}.`
    );
  }

  assert.ok(
    ["Essay", "Reflection", "Poem"].includes(excerpt.type),
    `${file} has an unsupported type.`
  );
  assert.ok(Array.isArray(excerpt.tags) && excerpt.tags.length, `${file} needs tags.`);
  assert.ok(Number.isFinite(excerpt.order), `${file} needs a numeric order.`);
  assert.ok(!ids.has(excerpt.id), `${file} duplicates id ${excerpt.id}.`);
  assert.ok(
    !orders.has(excerpt.order),
    `${file} duplicates display order ${excerpt.order}.`
  );

  ids.add(excerpt.id);
  orders.add(excerpt.order);

  for (const field of ["artwork", "thumbnail"]) {
    assert.ok(
      typeof excerpt[field] === "string" && excerpt[field].startsWith("/"),
      `${file} needs a public ${field} path.`
    );
    await readFile(path.join(publicDirectory, excerpt[field]));
  }

  if (excerpt.pagePublished) {
    for (const field of [
      "fullBody",
      "beforeReading",
      "origin",
      "meaning",
      "seoTitle",
      "seoDescription",
      "socialImage"
    ]) {
      assert.ok(
        typeof excerpt[field] === "string" && excerpt[field].trim(),
        `${file} publishes a full page and needs ${field}.`
      );
    }

    assert.ok(
      Array.isArray(excerpt.recognitionIds) &&
        excerpt.recognitionIds.every(Number.isInteger),
      `${file} needs numeric recognition IDs.`
    );
    await readFile(path.join(publicDirectory, excerpt.socialImage));
  }
}

console.log(`Validated ${files.length} CMS-managed excerpts.`);
