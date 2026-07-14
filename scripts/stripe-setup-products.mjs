/**
 * Create (idempotently) the two pre-order Products + Prices in Stripe.
 *
 * Two SKUs, full payment, one Price each:
 *   - paperback  US$26.99 base
 *   - hardback   US$39.99 base ("Signed, numbered first edition")
 *
 * Each Price carries fixed "charm" prices for our core markets via
 * currency_options (NZD/AUD/GBP/CAD). At checkout we enable Adaptive Pricing,
 * so NZ/AU/UK/CA buyers see these fixed prices and everyone else gets the USD
 * base auto-converted at live FX. See api/checkout.js.
 *
 * Idempotent: products are matched by metadata.app+metadata.sku; prices by
 * lookup_key. If the amounts already match, the existing price is reused; if
 * they differ, a new price is created and the lookup_key transferred to it
 * (Stripe prices are immutable), and the old price is archived.
 *
 * Runs against whatever key is in .env.local (sk_test_ for this session).
 * On success it writes STRIPE_PRICE_PAPERBACK / STRIPE_PRICE_HARDBACK back
 * into .env.local.
 *
 * Usage:  node scripts/stripe-setup-products.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { config as loadEnv } from "dotenv";
import Stripe from "stripe";

const ENV_PATH = new URL("../.env.local", import.meta.url).pathname;
loadEnv({ path: ENV_PATH });

const APP_TAG = "the_narrative_witness";
const BASE_CURRENCY = "usd";

// Amounts in each currency's minor unit (cents/pence). USD is the base; the
// rest are explicit fixed charm prices injected as currency_options.
const CATALOGUE = [
  {
    sku: "paperback",
    lookupKey: "preorder_paperback",
    name: "We the Unkept: Paperback (first edition)",
    description:
      "Pre-order: first-edition 6×9 paperback, premium black & white interior, with a hand-signed, numbered bookplate. Paid in full; shipping invoiced separately before dispatch. Full refund any time before we go to print.",
    amounts: { usd: 2699, nzd: 4499, aud: 3999, gbp: 2199, cad: 3699 },
  },
  {
    sku: "hardback",
    lookupKey: "preorder_hardback",
    name: "We the Unkept: Hardback (hardcover first edition)",
    description:
      "Pre-order: the first edition in a hardcover binding, with a hand-signed, numbered bookplate. Paid in full; shipping invoiced separately before dispatch. Full refund any time before we go to print.",
    amounts: { usd: 3999, nzd: 6499, aud: 5999, gbp: 3299, cad: 5499 },
  },
];

function assert(condition, message) {
  if (!condition) {
    console.error(`\n✗ ${message}`);
    process.exit(1);
  }
}

const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
assert(secretKey, "STRIPE_SECRET_KEY missing from .env.local");
assert(
  secretKey.startsWith("sk_test_") || process.argv.includes("--live"),
  "Refusing to run: key is not a test key. Pass --live only when you truly mean to touch live data.",
);

const stripe = new Stripe(secretKey);
const mode = secretKey.startsWith("sk_test_") ? "TEST" : "LIVE";

function currencyOptions(amounts) {
  const options = {};
  for (const [currency, amount] of Object.entries(amounts)) {
    if (currency === BASE_CURRENCY) continue;
    options[currency] = { unit_amount: amount };
  }
  return options;
}

/** Does an existing price already match the amounts we want? */
function priceMatches(price, amounts) {
  if (price.currency !== BASE_CURRENCY) return false;
  if (price.unit_amount !== amounts[BASE_CURRENCY]) return false;
  const opts = price.currency_options || {};
  for (const [currency, amount] of Object.entries(amounts)) {
    if (currency === BASE_CURRENCY) continue;
    if (opts[currency]?.unit_amount !== amount) return false;
  }
  return true;
}

async function findProduct(sku) {
  const search = await stripe.products.search({
    query: `metadata['app']:'${APP_TAG}' AND metadata['sku']:'${sku}'`,
  });
  return search.data[0] || null;
}

async function ensureProduct(item) {
  const existing = await findProduct(item.sku);
  if (existing) {
    await stripe.products.update(existing.id, {
      name: item.name,
      description: item.description,
    });
    return existing;
  }
  return stripe.products.create({
    name: item.name,
    description: item.description,
    metadata: { app: APP_TAG, sku: item.sku },
  });
}

async function ensurePrice(product, item) {
  // Look for an existing price carrying our lookup_key.
  const byKey = await stripe.prices.list({
    lookup_keys: [item.lookupKey],
    expand: ["data.currency_options"],
    limit: 1,
  });
  const current = byKey.data[0];

  if (current && priceMatches(current, item.amounts)) {
    return { price: current, reused: true };
  }

  // Amounts changed (or first run): create a new price and move the key onto it.
  const price = await stripe.prices.create({
    product: product.id,
    currency: BASE_CURRENCY,
    unit_amount: item.amounts[BASE_CURRENCY],
    currency_options: currencyOptions(item.amounts),
    lookup_key: item.lookupKey,
    transfer_lookup_key: Boolean(current),
    metadata: { app: APP_TAG, sku: item.sku },
  });

  if (current) {
    await stripe.prices.update(current.id, { active: false });
  }
  return { price, reused: false };
}

function writeEnv(priceIds) {
  let contents = readFileSync(ENV_PATH, "utf8");
  for (const [envName, value] of Object.entries(priceIds)) {
    const line = `${envName}="${value}"`;
    const re = new RegExp(`^${envName}=.*$`, "m");
    contents = re.test(contents) ? contents.replace(re, line) : `${contents}\n${line}\n`;
  }
  writeFileSync(ENV_PATH, contents);
}

async function main() {
  console.log(`\nStripe product setup — ${mode} mode\n`);
  const priceIds = {};

  for (const item of CATALOGUE) {
    const product = await ensureProduct(item);
    const { price, reused } = await ensurePrice(product, item);
    priceIds[`STRIPE_PRICE_${item.sku.toUpperCase()}`] = price.id;

    const localized = Object.entries(item.amounts)
      .map(([c, a]) => `${c.toUpperCase()} ${(a / 100).toFixed(2)}`)
      .join(", ");
    console.log(`  ${item.sku.padEnd(9)} product ${product.id}`);
    console.log(`  ${" ".repeat(9)} price   ${price.id} ${reused ? "(reused)" : "(created)"}`);
    console.log(`  ${" ".repeat(9)} prices  ${localized}\n`);
  }

  writeEnv(priceIds);
  console.log("Wrote price ids to .env.local:");
  for (const [k, v] of Object.entries(priceIds)) console.log(`  ${k}=${v}`);
  console.log(
    "\nSet the same STRIPE_PRICE_* vars in Vercel (Preview = test ids, Production = live ids after re-running with a live key).\n",
  );
}

main().catch((error) => {
  console.error("\n✗ Stripe setup failed:", error?.message || error);
  process.exit(1);
});
