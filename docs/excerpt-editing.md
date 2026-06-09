# Editing Writing Previews

The selected excerpts are managed through PagesCMS on the **Writing Previews** collection.

Each entry controls:

- its title, form, subtitle, reading time, and themes
- the full preview artwork and its accessible description
- the small text-free navigation thumbnail
- the excerpt text
- its order on the page
- whether it is currently shown

## Editing safely

1. Open the repository and choose the branch you intend to edit.
2. Open **Writing Previews** in PagesCMS.
3. Edit an existing entry or create a new one.
4. Keep every **Stable ID** unique and do not change it after publication.
5. Give every visible entry a unique **Display order**.
6. Turn off **Show on website** to retain a draft without publishing it.

Images uploaded through this collection are stored in `public/images/excerpts`.
Navigation thumbnails should not contain text because they are displayed at a small size.

## Verification

Before merging excerpt changes, run:

```sh
npm run excerpts:test
npm run lint
npm run build
```
