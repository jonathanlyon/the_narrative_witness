import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { parseCsv, stringifyCsv } from "./lib/csv.mjs";
import { generateReaderComments } from "./generate-reader-comments.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const recognitionPath = path.join(
  repositoryRoot,
  "content",
  "reader-recognition.csv"
);
const headers = [
  "id",
  "display_name",
  "comment",
  "source",
  "source_title",
  "source_url",
  "date",
  "included",
  "featured",
  "feature_title",
  "feature_excerpt"
];

export const normalizeComment = (value) =>
  String(value)
    .normalize("NFKC")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

export const anonymizeName = (value) => {
  const name = String(value).replace(/\s+/g, " ").trim();
  const parts = name.split(" ").filter(Boolean);

  if (parts.length < 2 || /^[A-Z]\.$/i.test(parts.at(-1))) {
    return name;
  }

  const surname = parts.pop().replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
  if (!surname) {
    return name;
  }

  return `${parts.join(" ")} ${surname[0].toUpperCase()}.`;
};

const firstValue = (row, keys) => {
  for (const key of keys) {
    if (row[key]?.trim()) {
      return row[key].trim();
    }
  }
  return "";
};

export function mergeRecognitionRows(existing, importedRows) {
  const knownComments = new Set(
    existing.map((row) => normalizeComment(row.comment))
  );
  let nextId =
    Math.max(
      0,
      ...existing.map((row) => Number.parseInt(row.id, 10) || 0)
    ) + 1;
  const additions = [];
  let duplicates = 0;
  let skipped = 0;

  for (const row of importedRows) {
    const comment = firstValue(row, ["comment", "text", "message"]);
    const rawName = firstValue(row, [
      "display_name",
      "author_name",
      "author",
      "name"
    ]);
    const normalized = normalizeComment(comment);

    if (!comment || !rawName) {
      skipped += 1;
      continue;
    }
    if (knownComments.has(normalized)) {
      duplicates += 1;
      continue;
    }

    knownComments.add(normalized);
    additions.push({
      id: String(nextId),
      display_name: anonymizeName(rawName),
      comment,
      source: firstValue(row, ["source"]) || "Facebook",
      source_title: firstValue(row, ["source_title", "post_title"]),
      source_url: firstValue(row, ["source_url", "post_url"]),
      date: firstValue(row, ["date"]),
      included: "true",
      featured: "false",
      feature_title: "",
      feature_excerpt: ""
    });
    nextId += 1;
  }

  return {
    rows: [...existing, ...additions],
    additions,
    duplicates,
    skipped
  };
}

async function main() {
  const files = process.argv
    .slice(2)
    .filter((argument) => !argument.startsWith("-"));

  if (!files.length) {
    throw new Error(
      "Choose one or more Facebook comment CSV files.\n" +
      "Example: npm run recognition:import -- ~/Downloads/facebook-comments-123.csv"
    );
  }

  const existing = parseCsv(await readFile(recognitionPath, "utf8"));
  const importedRows = [];

  for (const file of files) {
    importedRows.push(
      ...parseCsv(await readFile(path.resolve(file), "utf8"))
    );
  }

  const result = mergeRecognitionRows(existing, importedRows);

  if (result.additions.length) {
    await writeFile(
      recognitionPath,
      stringifyCsv(result.rows, headers),
      "utf8"
    );
  }

  const publishedCount = await generateReaderComments();
  console.log(
    [
      `Added ${result.additions.length} new Recognition entries.`,
      `Ignored ${result.duplicates} duplicate comments and ${result.skipped} incomplete rows.`,
      `${publishedCount} entries are now included on the site.`,
      "Review content/reader-recognition.csv before publishing."
    ].join("\n")
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
