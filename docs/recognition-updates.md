# Updating Reader Recognition

Reader Recognition now has one maintainable source:

`content/reader-recognition.csv`

The website data in `src/data/readerComments.ts` is generated from that file. Do not edit the generated TypeScript file directly.

## One-time setup

1. Open `tools/facebook-comment-collector.html` in Chrome.
2. Drag the **Collect Facebook comments** button to the bookmarks bar.

## Collect comments from a Facebook post

1. Open the individual post while logged into Facebook.
2. Click the **Collect Facebook comments** bookmark.
3. Confirm or edit the writing title when asked.
4. Facebook will download a file named `facebook-comments-POST-ID.csv`.

The collector selects **All comments**, expands comments and replies, ignores duplicate page copies, and includes only comments whose permalink belongs to the open post.

If Facebook changes its page design and the collector finds nothing, manually select **All comments**, expand the thread, and run it again.

## Add them to the site

The simplest route on this Mac is to double-click:

`tools/update-recognition.command`

Choose the downloaded CSV when prompted. The updater will:

- replace each surname with a capital initial
- avoid adding a comment already in the collection
- preserve the Facebook post title and URL for possible later use
- append new comments without changing the existing order
- rebuild and check the site

The raw Facebook names remain in the downloaded file only. They are not added to the project.

The same operation can be run from the project folder:

```sh
npm run recognition:import -- ~/Downloads/facebook-comments-POST-ID.csv
```

Multiple downloaded files may be imported together.

## Review before publishing

Open `content/reader-recognition.csv` and review the new rows at the bottom.

- Set `included` to `false` to keep an entry in the archive without showing it.
- Edit `display_name` if a name needs special handling.
- Edit `comment` if you are publishing only an appropriate excerpt.
- Keep `source_title` and `source_url`; the title appears as the card's provenance label and the URL preserves the original thread for later review.

Then run:

```sh
npm run recognition:generate
npm run lint
npm run build
```

Because these comments can contain intimate personal material, each new batch should receive a human review before it is published.
