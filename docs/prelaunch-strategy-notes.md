# Pre-Launch Strategy Notes

Updated: 2026-06-06

## Objective

The site should not behave like a newsletter signup page. Its primary job is to validate whether there is enough committed support to justify launching a Kickstarter campaign for the book.

Every section should answer one of four questions:

1. What is this book?
2. Why does it matter?
3. Why does early support determine whether it can launch?
4. What should the visitor do now?

## Research takeaways

The Reddit benchmark thread raised three common paths: email leads, paid VIP reservations, and direct Kickstarter followers. The strongest pattern is a staged funnel rather than choosing only one:

- collect direct emails so Jonathan owns the audience relationship;
- use Meta Pixel from the start of paid traffic so retargeting and conversion learning are possible;
- later ask the same audience to follow the official Kickstarter pre-launch page;
- consider a small paid reservation only if the terms, refund policy, and reward relationship are clear.

Kickstarter’s own pre-launch support page confirms that followers can click “Notify me on launch,” that Kickstarter sends a launch notification, and that creators cannot directly message pre-launch followers except through pre-launch updates. This supports keeping the independent email list as the primary owned audience channel.

## Current site decisions

- The hero now asks visitors to register support, not join a reader list.
- “Why Kickstarter matters” is visible on-page, not hidden in a modal.
- The form explains that an email is a support signal, not a purchase or obligation.
- The paid reservation idea is framed as “under consideration,” because it should not be offered until payment handling, refund language, tax implications, and Kickstarter relationship are settled.
- Meta Pixel support is implemented but dormant until `VITE_META_PIXEL_ID` is set.

## Suggested funnel

1. **Register support on the site**
   - Goal: owned audience, direct communication, Meta Lead event.
   - CTA language: Register Support.

2. **Follow the official Kickstarter pre-launch page**
   - Goal: public Kickstarter follower count and launch notification.
   - CTA appears after the Kickstarter URL is live.

3. **Optional founding supporter reservation**
   - Goal: stronger intent signal than email.
   - Needs a defined offer before launch.
   - Possible language: Founding Supporter, First Witness, Launch Witness, First Edition Circle.

4. **Back early when campaign launches**
   - Goal: concentrated first-wave momentum.
   - Email sequence should prepare people for why the first 48 hours matter.

## Decisions still needed

- Email platform: MailerLite, beehiiv, or Kit.
- Whether to offer a paid reservation.
- If yes, amount, refund terms, and what the reservation means.
- Whether SMS collection is appropriate. It may convert well, but could feel too commercially aggressive for this audience.
- Kickstarter campaign target, likely launch window, and reward hierarchy.
- Exact book title once separate from The Narrative Witness project name.
