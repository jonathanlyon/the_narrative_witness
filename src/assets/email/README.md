# Email signature (Apple Mail + multi-client)

## Files

| File | Purpose |
|------|---------|
| `signature.html` | Signature markup to copy into Apple Mail |
| `/public/images/email/witness-thread-drawing.png` | **Stable** full-width pen-stroke drawing (served at `/images/email/...`) |
| `/public/images/email/witness-thread-drawing.webp` | Lighter WebP copy (optional; PNG used in signature for Outlook) |

Do **not** point the signature at Vite-hashed paths like `/assets/witness-thread-drawing-XXXX.webp` — they break on the next deploy.

## Image treatment

The mark is **not a logo**. It is a horizontal pen stroke that opens into a line drawing of a writer. It spans the **full signature column** (520px wide).

The PNG in `public/images/email/` is **tightly cropped** and resized to **520×121**. The source art sat on a tall empty canvas; without cropping, Apple Mail “Actual Size” reserved a huge blank band under the stroke. Always re-export from the cropped file if you replace the art.

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
- **Single-column** identity + contact under the art. Apple Mail expands
  multi-column signature tables to the full compose width (visible when you
  highlight: contact cell stretches edge-to-edge). Single column avoids that.
- A `spacer-520.png` (520×1) locks width when Mail ignores table attributes.
- Prefer re-testing after any change to files in `public/images/email/`.
