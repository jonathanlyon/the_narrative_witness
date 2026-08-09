# Local Founder Review Site

This site is generated from the Markdown foundation pack. It has no external
runtime dependencies, sends no analytics, and makes no network request except
when the reader deliberately follows a cited source link.

## Open it

The built [`dist/index.html`](dist/index.html) can be opened directly. For the
most consistent browser behaviour, serve it locally:

```sh
npm run build
npm run verify
npm run serve
```

Then open `http://127.0.0.1:4173`.

## Content model

Markdown in `../docs/foundation/` is the editorial source of truth. The build
script embeds those files into `dist/content.js`, so search and navigation also
work when the site is opened without a server.

The generated `dist/` directory is committed intentionally. It is the portable
review artifact; edit the Markdown or `src/`, never the generated files by hand.

