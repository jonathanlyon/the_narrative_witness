# Email templates — The Narrative Witness

Kit (ConvertKit) HTML for the brand layout shell and three pre-sale broadcast options.

## Files

| File | Role |
|------|------|
| `tnw_email.html` | **Kit layout shell** — paste into Email Templates → Create HTML Template. Holds brand CSS, `{{ message_content }}`, unsubscribe, address. |
| `preorder-option-a-intimate.html` | **Option A** — intimate literary letter (personal, quiet) |
| `preorder-option-b-first-edition.html` | **Option B** — first-edition object sale (clearest conversion) |
| `preorder-option-c-recognition.html` | **Option C** — reader recognition / social proof |

Open any `preorder-option-*.html` in a browser for a full preview.

---

## Brand tokens (match the site)

| Token | Value | Use |
|-------|--------|-----|
| Paper | `#F4F1EE` | Email background |
| Paper dark | `#EAE7E2` | Outer page (preview only) |
| Ink | `#1A1A1A` | Headings, primary button |
| Ink light | `#333333` | Body copy |
| Ash | `#6E6A64` | Labels, meta |
| Dust | `#D1C9BE` | Rules, quote bars, link underlines |
| Type body | Georgia, Times, serif | All reading text |
| Type UI | Helvetica, Arial, sans-serif | Labels, buttons, footer |

## Live image URLs (stable — not Vite-hashed)

Use only paths under `https://www.thenarrativewitness.com/…`:

### Header (all three pre-order options)

- `…/images/email/email_header-1200.jpg` — **primary email header** (seascape + thread mark + title, ~70KB, deployed)
- `public/images/email/email_header.png` — full-resolution source (kept local; too large for git/deploy — regenerate the 1200 JPG if you replace it)

### Supporting images used in the templates

| File | Used in |
|------|---------|
| `…/images/email/jonathan-portrait.jpg` | Option A (sign-off) |
| `…/images/email/ink-wash-memory.jpg` | Option B |
| `…/images/email/support-signal-pier.jpg` | Option B |
| `…/images/email/recognition-mountain.jpg` | Option C |
| `…/images/excerpts/life-between-papers.jpg` | Option C |

### Available marks (not used as the pre-order header)

- `…/images/email/witness-thread-drawing-light.png` — white strokes (needs dark ground)
- `…/images/email/witness-thread-drawing-charcoal.png` — charcoal strokes (paper ground)
- `…/images/email/witness-thread-drawing.png` — older signature export

**Do not use** book-cover or coffee-table lifestyle shots in these pre-order emails.  
Prefer **PNG/JPEG** over WebP in email (Outlook).

---

## Kit setup

Follow Kit’s guide: [Creating a custom HTML email template](https://intercom.help/convertkit/en/articles/2810363-creating-a-custom-html-email-template). Default bases: [Default HTML templates](https://help.kit.com/en/articles/2810330-default-html-email-templates-in-kit).

### 1. Install the layout shell (once)

1. Kit → **Email Templates** → **+ New Email Template** → **Create HTML Template**
2. Paste the full contents of `tnw_email.html`
3. Name it e.g. `TNW · Brand (Classic)`
4. **Save**. Optionally set as default.

Required variables already included:

- `{{ message_content }}` — broadcast body  
- `{{ unsubscribe_url }}` — unsubscribe link  
- `{{ subscriber_preferences_url }}` — profile  
- `{{ address }}` — physical address from account settings  

### 2. Send a pre-sale broadcast

1. **Broadcasts** → New broadcast  
2. Choose the **TNW · Brand** layout  
3. Open one of the three option files in a browser to choose design + messaging  
4. Switch the editor to **HTML / source**  
5. Paste only the block between:

   `<!-- KIT PASTE: START -->`  
   and  
   `<!-- KIT PASTE: END -->`

6. Do **not** paste the footer from the option file if the layout already has one (avoids double unsubscribe)  
7. Set subject + preview text (below)  
8. Send a test to yourself (Apple Mail, Gmail, Outlook web)

### 3. Personalisation

Option A uses:

```text
{{ first_name | default: "reader" }}
```

If your Kit account uses a different field, adjust or replace with plain “reader”.

---

## The three options (messaging)

### Option A — Intimate letter

**Best for:** warm list, long-time readers, “from Jonathan” voice.

| | |
|--|--|
| **Subjects** | Pre-orders are open for *We the Unkept* · A book for my daughters — and a record for anyone unkept · The book is open for pre-order |
| **Preview** | A signed first edition, reserved before print. Paperback or hardback. |
| **Hero** | Pen-stroke drawing |
| **CTA** | Pre-order the first edition · secondary: Read from the book |

### Option B — First edition (recommended for conversion)

**Best for:** clear offer, price, formats, founding-reader perks.

| | |
|--|--|
| **Subjects** | Reserve a signed first edition of *We the Unkept* · Paperback or hardback — pre-orders are open · Founding Readers: the first edition is open |
| **Preview** | Hand-signed bookplate · named in the book (opt-in) · full refund before print. |
| **Hero** | Book cover + coffee-table photo |
| **CTA** | Pre-order · Read · Pre-order terms |

### Option C — Reader recognition

**Best for:** Facebook/Substack community, people who already replied to posts.

| | |
|--|--|
| **Subjects** | “You've put into words feelings I could never articulate” · Readers said it first — the book is now open for pre-order · For everyone who recognised themselves in the writing |
| **Preview** | The first edition of *We the Unkept* is open. Signed bookplate. Founding Witnesses. |
| **Hero** | Drawing + cover + four short reader quotes |
| **CTA** | Pre-order · Read · More recognition |

---

## Links used in all options

| Label | URL |
|-------|-----|
| Pre-order | https://www.thenarrativewitness.com/book#preorder |
| Read from the book | https://www.thenarrativewitness.com/book#read |
| Book page | https://www.thenarrativewitness.com/book |
| Recognition | https://www.thenarrativewitness.com/#recognition |
| Terms | https://www.thenarrativewitness.com/preorder-terms |

---

## Compliance & tone

- Shipping is **not** charged at checkout; copy states it is invoiced before dispatch.  
- Full refund before print is stated on Options A–C.  
- Prices are USD base; Stripe may localise at checkout (same as the site).  
- Quotes in Option C are short featured excerpts from Reader Recognition (first name + initial only).  
- No tracking pixels beyond what Kit provides; keep consent rules on the site separate.

---

## Suggested send order (if A/B testing)

1. Split test **A vs B** on a 20–30% sample (open rate + click to `#preorder`).  
2. Winner to the rest of the list.  
3. Use **C** as a follow-up 4–7 days later for non-clickers (different subject, recognition angle).

---

## Troubleshooting

See Kit: [Troubleshooting HTML email templates](https://help.kit.com/en/articles/2810454-troubleshooting-html-email-templates).

Common issues:

- Missing unsubscribe or address → template will fail validation.  
- Images broken → only use `thenarrativewitness.com` public paths, not local files.  
- Double footer → you pasted the option footer *and* used the layout shell.  
- Button styles stripped → paste in HTML mode; class `.button` lives in the layout CSS.
