import assert from "node:assert/strict";
import { parseCsv, stringifyCsv } from "./lib/csv.mjs";
import {
  anonymizeName,
  mergeRecognitionRows,
  normalizeComment
} from "./import-facebook-comments.mjs";

const rows = [
  {
    author_name: "Example Reader",
    comment: 'A line with a comma, a "quote", and\nanother line.'
  }
];
const csv = stringifyCsv(rows, ["author_name", "comment"]);

assert.deepEqual(parseCsv(csv), rows);
assert.equal(anonymizeName("Rosemary Perlman"), "Rosemary P.");
assert.equal(anonymizeName("Deborah Ann Johnson"), "Deborah Ann J.");
assert.equal(anonymizeName("CopperAsparagus17"), "CopperAsparagus17");
assert.equal(anonymizeName("Joanne Z."), "Joanne Z.");
assert.equal(
  normalizeComment("  The body  remembers. "),
  normalizeComment("The body remembers.")
);

const merge = mergeRecognitionRows(
  [
    {
      id: "4",
      display_name: "Existing R.",
      comment: "The body remembers.",
      included: "true"
    }
  ],
  [
    {
      author_name: "Existing Reader",
      comment: " The body  remembers. "
    },
    {
      author_name: "Rosemary Perlman",
      comment: "This is a newly collected reflection.",
      source_title: "The Standing Watch",
      source_url: "https://www.facebook.com/groups/example/posts/123"
    },
    {
      author_name: "",
      comment: "This incomplete row should be skipped."
    }
  ]
);

assert.equal(merge.additions.length, 1);
assert.equal(merge.duplicates, 1);
assert.equal(merge.skipped, 1);
assert.deepEqual(merge.additions[0], {
  id: "5",
  display_name: "Rosemary P.",
  comment: "This is a newly collected reflection.",
  source: "Facebook",
  source_title: "The Standing Watch",
  source_url: "https://www.facebook.com/groups/example/posts/123",
  date: "",
  included: "true",
  featured: "false",
  feature_title: "",
  feature_excerpt: ""
});

console.log("Recognition workflow tests passed.");
