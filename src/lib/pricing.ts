/**
 * Display-only localized pricing for the pre-order cards.
 *
 * The buyer's real charge is set by Stripe (the Price objects created by
 * scripts/stripe-setup-products.mjs, with Adaptive Pricing at checkout). This
 * module only decides what price to SHOW on /book so the on-page number agrees
 * with what Stripe will present, avoiding a "US$26.99 then NZ$44.99" surprise.
 *
 * For our four committed markets (NZ/AU/UK/CA) plus the USD home currency we
 * show the exact fixed charm price. Everyone else sees the USD base with a note
 * that it converts at checkout (we don't hold a fixed price for them, so we
 * don't claim one).
 *
 * IMPORTANT: these labels MUST mirror the currency_options amounts in
 * scripts/stripe-setup-products.mjs. If a price changes there, change it here.
 */

import { useEffect, useState } from "react";

export type SkuId = "paperback" | "hardback";

interface CurrencyPrices {
  paperback: string;
  hardback: string;
}

const LABELS: Record<string, CurrencyPrices> = {
  NZD: { paperback: "NZ$44.99", hardback: "NZ$64.99" },
  AUD: { paperback: "AU$39.99", hardback: "AU$59.99" },
  GBP: { paperback: "£21.99", hardback: "£32.99" },
  CAD: { paperback: "CA$36.99", hardback: "CA$54.99" },
  USD: { paperback: "US$26.99", hardback: "US$39.99" },
};

// Stripe uses "GB" for the United Kingdom.
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  NZ: "NZD",
  AU: "AUD",
  GB: "GBP",
  CA: "CAD",
  US: "USD",
};

export interface ResolvedPricing {
  currency: string;
  labels: CurrencyPrices;
  /**
   * True when the shown price (USD base) is not the buyer's real currency, so
   * we tell them it converts at checkout. False for our fixed-price markets,
   * where the shown price is exactly what they pay.
   */
  showConversionNote: boolean;
}

export function resolveLocalPrices(country: string | null): ResolvedPricing {
  const currency = country ? COUNTRY_TO_CURRENCY[country.toUpperCase()] : undefined;
  if (currency && LABELS[currency]) {
    return { currency, labels: LABELS[currency], showConversionNote: false };
  }
  return { currency: "USD", labels: LABELS.USD, showConversionNote: true };
}

/** The small line under the price that sets currency expectations. */
export function currencyNote(pricing: ResolvedPricing): string {
  return pricing.showConversionNote
    ? "Shown in USD; converted to your local currency at checkout."
    : `Charged in ${pricing.currency}. This is the price you pay.`;
}

// One shared geo lookup for the whole page — every component that needs pricing
// reuses this single in-flight request.
let countryPromise: Promise<string | null> | null = null;
function fetchCountry(): Promise<string | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!countryPromise) {
    countryPromise = fetch("/api/geo")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => (data && typeof data.country === "string" ? data.country : null))
      .catch(() => null);
  }
  return countryPromise;
}

export interface PricingState extends ResolvedPricing {
  /**
   * False until geo has resolved. Consumers should keep the price hidden (but
   * hold its space) while false, so the number appears once, already correct,
   * with no USD-to-local flash. The resolved labels default to USD, so they can
   * still be rendered invisibly to reserve the right width/height.
   */
  ready: boolean;
}

/**
 * Resolves the visitor's local pricing. Reports `ready: false` until geo
 * resolves, then the correct local price with `ready: true`. If /api/geo is
 * unavailable it settles on USD (still `ready: true`).
 */
export function usePricing(): PricingState {
  const [state, setState] = useState<{ country: string | null; ready: boolean }>({
    country: null,
    ready: false,
  });

  useEffect(() => {
    let alive = true;
    fetchCountry().then((resolved) => {
      if (alive) setState({ country: resolved, ready: true });
    });
    return () => {
      alive = false;
    };
  }, []);

  return { ...resolveLocalPrices(state.country), ready: state.ready };
}
