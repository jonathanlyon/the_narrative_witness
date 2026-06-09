import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const excerptsDirectory = path.join(repositoryRoot, "content", "excerpts");
const writingDirectory = path.join(repositoryRoot, "writing");
const siteUrl = "https://www.thenarrativewitness.com";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const excerptFiles = (await readdir(excerptsDirectory))
  .filter((file) => file.endsWith(".json"))
  .sort();

const publishedPages = [];

for (const file of excerptFiles) {
  const excerpt = JSON.parse(
    await readFile(path.join(excerptsDirectory, file), "utf8")
  );
  if (excerpt.pagePublished === true) {
    publishedPages.push(excerpt);
  }
}

await rm(writingDirectory, { recursive: true, force: true });

for (const excerpt of publishedPages) {
  const canonicalUrl = `${siteUrl}/writing/${excerpt.id}/`;
  const socialImage = new URL(excerpt.socialImage, siteUrl).href;
  const title = excerpt.seoTitle || `${excerpt.title} | The Narrative Witness`;
  const description = excerpt.seoDescription || excerpt.caption;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: excerpt.title,
    description,
    image: [socialImage],
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: "Jonathan Lyon",
      url: "https://www.jonathanlyon.com/"
    },
    publisher: {
      "@type": "Organization",
      name: "The Narrative Witness",
      url: siteUrl
    },
    about: excerpt.tags
  };
  const pageDirectory = path.join(writingDirectory, excerpt.id);

  await mkdir(pageDirectory, { recursive: true });
  await writeFile(
    path.join(pageDirectory, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="Jonathan Lyon" />
    <meta name="theme-color" content="#1a1a1a" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="The Narrative Witness" />
    <meta property="og:locale" content="en_NZ" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:secure_url" content="${socialImage}" />
    <meta property="og:image:alt" content="${escapeHtml(excerpt.artworkAlt || excerpt.title)}" />
    <meta property="article:author" content="Jonathan Lyon" />
    ${excerpt.tags
      .map(
        (tag) =>
          `<meta property="article:tag" content="${escapeHtml(tag)}" />`
      )
      .join("\n    ")}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${socialImage}" />
    <meta name="twitter:image:alt" content="${escapeHtml(excerpt.artworkAlt || excerpt.title)}" />

    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/writing-entry.tsx"></script>
  </body>
</html>
`,
    "utf8"
  );
}

console.log(`Generated ${publishedPages.length} public writing page(s).`);
