# Email signature (Apple Mail + multi-client)

## Files

| File | Purpose |
|------|---------|
| `signature.html` | Signature markup to copy into Apple Mail |
| `/public/images/email/witness-thread-drawing.png` | **Stable** full-width pen-stroke drawing (served at `/images/email/...`) |
| `/public/images/email/witness-thread-drawing.webp` | Lighter WebP copy (optional; PNG used in signature for Outlook) |

Do **not** point the signature at Vite-hashed paths like `/assets/witness-thread-drawing-XXXX.webp` — they break on the next deploy.

## Image treatment

The mark is **not a logo**. It is a horizontal pen stroke that opens into a line drawing of a writer. It is set to **100% of the signature column** (`max-width: 520px`) so the stroke reads at full column width on desktop and scales down fluidly on mobile.

## Install in Apple Mail

1. Deploy the site so this URL loads in a browser:
   `https://www.thenarrativewitness.com/images/email/witness-thread-drawing.png`
2. Open `signature.html` in **Safari** (not a code editor).
3. Select the signature block → **Copy**.
4. **Mail → Settings → Signatures** → select or create a signature → paste.
5. If Mail rewrites fonts, uncheck **Always match my default message font**.
6. Send a test to yourself (Apple Mail, Gmail app, Outlook web).

## Design notes

- Nested tables + inline styles only (no external CSS, no JS, no webfonts).
- Two-column identity/contact under the full-width art (no `white-space: nowrap`).
- On very narrow clients the art still spans the column; text may sit tight side-by-side rather than reflow via media queries (Gmail often strips those).
- Prefer re-testing after any change to the PNG in `public/images/email/`.
