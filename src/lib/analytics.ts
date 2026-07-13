import Clarity from "@microsoft/clarity";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export type AnalyticsConsent = "granted" | "denied" | null;
export type SignupSource = "hero" | "midpage" | "final" | "writing" | "preorder";

const ANALYTICS_CONSENT_KEY = "narrative_witness_analytics_consent";
const SIGNUP_ATTRIBUTION_KEY = "narrative_witness_signup_attribution";
// Microsoft Clarity project id. Set VITE_CLARITY_PROJECT_ID in the environment
// (Vercel Production). Without it, Clarity simply never initialises — the same
// safe no-op the site had when analytics consent was withheld.
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || "";
const META_PIXEL_ID =
  import.meta.env.VITE_META_PIXEL_ID?.trim() || "2404031020073363";
const PRODUCTION_HOSTS = new Set([
  "thenarrativewitness.com",
  "www.thenarrativewitness.com",
]);
// Testing override. When VITE_ANALYTICS_FORCE="true", analytics also runs on
// non-production hosts (e.g. *.vercel.app previews) so Clarity and the funnel
// can be verified off the live domain — point the Preview build at a throwaway
// Clarity project. NEVER set this on Production; Production stays host-gated so
// preview/local traffic can't pollute real reporting.
const FORCE_ANALYTICS = import.meta.env.VITE_ANALYTICS_FORCE === "true";

const pendingEvents: Array<{
  eventName: string;
  properties?: Record<string, unknown>;
}> = [];
const trackedPagePaths = new Set<string>();

let analyticsInitialized = false;
let analyticsInitialization: Promise<void> | null = null;
let metaPixelLoaded = false;

function isProductionSite() {
  if (typeof window === "undefined") return false;
  if (FORCE_ANALYTICS) return true;
  return PRODUCTION_HOSTS.has(window.location.hostname);
}

function getPageProperties() {
  return {
    page_path: window.location.pathname,
    page_title: document.title,
    referrer_host: document.referrer
      ? new URL(document.referrer).hostname
      : "direct",
  };
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;

  const storedConsent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return storedConsent === "granted" || storedConsent === "denied"
    ? storedConsent
    : null;
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);

  if (consent === "granted") {
    void initAnalytics().then(() => {
      trackEvent("analytics_consent_updated", {
        consent_status: "granted",
      });
      if (window.location.pathname.replace(/\/+$/, "") === "/confirmed") {
        trackSupportConfirmation();
      }
    });
  } else {
    pendingEvents.length = 0;
    window.sessionStorage.removeItem(
      "narrative_witness_confirmation_tracked",
    );
    if (analyticsInitialized) {
      // Tell Clarity consent was withdrawn; it stops collecting for this user.
      Clarity.consent(false);
    }
    window.fbq?.("consent", "revoke");
  }

  window.dispatchEvent(
    new CustomEvent("analytics-consent-changed", {
      detail: { consent },
    }),
  );
}

function initMetaPixel() {
  if (!META_PIXEL_ID || metaPixelLoaded || typeof window === "undefined") return;

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[src="https://connect.facebook.net/en_US/fbevents.js"]',
  );

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      (fbq as typeof fbq & { queue: unknown[][] }).queue.push(args);
    } as typeof window.fbq & {
      queue: unknown[][];
      loaded: boolean;
      version: string;
    };

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
  }

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("consent", "grant");
  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
  metaPixelLoaded = true;
}

export function initAnalytics(): Promise<void> {
  if (
    analyticsInitialized ||
    !isProductionSite() ||
    getAnalyticsConsent() !== "granted"
  ) {
    return Promise.resolve();
  }

  if (analyticsInitialization) return analyticsInitialization;

  initMetaPixel();

  analyticsInitialization = new Promise<void>((resolve) => {
    if (CLARITY_PROJECT_ID) {
      Clarity.init(CLARITY_PROJECT_ID);
      // Consent has been explicitly granted through the site's own banner, so
      // signal it to Clarity too (keeps its cookie behaviour consent-aware).
      Clarity.consent(true);
      // Base session tags — the equivalent of the old registered super props,
      // and useful dimensions to slice Clarity recordings/funnels by.
      Clarity.setTag("platform", "web");
      Clarity.setTag("project_name", "the_narrative_witness");
    }

    analyticsInitialized = true;
    trackPageView();

    pendingEvents.splice(0).forEach(({ eventName, properties }) => {
      emitToClarity(eventName, properties);
    });

    resolve();
  });

  return analyticsInitialization;
}

/**
 * Clarity has two primitives: `event(name)` marks a custom event (usable as a
 * funnel step or smart-event trigger) and `setTag(key, value)` attaches a
 * filterable dimension to the session. We map every tracked action onto both:
 * the event name for the funnel, the properties as tags for segmentation.
 */
function emitToClarity(eventName: string, properties?: Record<string, unknown>) {
  if (!CLARITY_PROJECT_ID) return;
  Clarity.event(eventName);
  if (!properties) return;
  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined || value === null) continue;
    Clarity.setTag(key, String(value));
  }
}

function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (!isProductionSite() || getAnalyticsConsent() === "denied") return;

  const eventProperties = {
    ...getPageProperties(),
    ...properties,
  };

  if (analyticsInitialized) {
    emitToClarity(eventName, eventProperties);
    return;
  }

  pendingEvents.push({ eventName, properties: eventProperties });

  if (getAnalyticsConsent() === "granted") {
    void initAnalytics();
  }
}

export function trackPageView() {
  if (!isProductionSite() || getAnalyticsConsent() !== "granted") return;

  const pagePath = window.location.pathname;
  if (trackedPagePaths.has(pagePath)) return;

  trackedPagePaths.add(pagePath);
  trackEvent("page_viewed", {
    entry_path: pagePath,
  });
}

export function trackSupportRegistration(source: SignupSource) {
  if (isProductionSite() && getAnalyticsConsent() === "granted") {
    window.localStorage.setItem(
      SIGNUP_ATTRIBUTION_KEY,
      JSON.stringify({
        formSource: source,
        submittedAt: new Date().toISOString(),
      }),
    );
  }

  trackEvent("support_registration_submitted", {
    form_source: source,
    funnel_stage: "submitted",
  });

  window.fbq?.("track", "Lead", {
    content_name: "Book support registration",
    content_category: "Pre-order",
    source,
  });

  window.fbq?.("trackCustom", "SupportRegistered", {
    source,
  });
}

export function trackSupportConfirmation() {
  const sessionKey = "narrative_witness_confirmation_tracked";
  if (window.sessionStorage.getItem(sessionKey)) return;

  let formSource = "unknown";
  let hoursToConfirm: number | undefined;
  const storedAttribution = window.localStorage.getItem(
    SIGNUP_ATTRIBUTION_KEY,
  );

  if (storedAttribution) {
    try {
      const attribution = JSON.parse(storedAttribution) as {
        formSource?: string;
        submittedAt?: string;
      };

      formSource = attribution.formSource || formSource;
      if (attribution.submittedAt) {
        const submittedAt = new Date(attribution.submittedAt).getTime();
        if (!Number.isNaN(submittedAt)) {
          hoursToConfirm = Number(
            ((Date.now() - submittedAt) / (1000 * 60 * 60)).toFixed(2),
          );
        }
      }
    } catch {
      window.localStorage.removeItem(SIGNUP_ATTRIBUTION_KEY);
    }
  }

  window.sessionStorage.setItem(sessionKey, "true");
  trackEvent("support_registration_confirmed", {
    form_source: formSource,
    funnel_stage: "confirmed",
    ...(hoursToConfirm === undefined
      ? {}
      : { hours_to_confirm: hoursToConfirm }),
    value_moment: true,
  });

  window.fbq?.("trackCustom", "SupportConfirmed", {
    source: formSource,
  });

  if (getAnalyticsConsent() === "granted") {
    window.localStorage.removeItem(SIGNUP_ATTRIBUTION_KEY);
  }
}

export function trackExcerptSelected(properties: {
  excerptId: string;
  excerptIndex: number;
  excerptTitle: string;
  excerptType: string;
}) {
  trackEvent("excerpt_selected", {
    excerpt_id: properties.excerptId,
    excerpt_index: properties.excerptIndex,
    excerpt_title: properties.excerptTitle,
    excerpt_type: properties.excerptType.toLowerCase(),
  });
}

export function trackWritingOpened(properties: {
  writingId: string;
  writingTitle: string;
  writingType: string;
}) {
  trackEvent("writing_opened", {
    writing_id: properties.writingId,
    writing_title: properties.writingTitle,
    writing_type: properties.writingType.toLowerCase(),
  });
}

export function trackSubstackVisit(source: string) {
  trackEvent("substack_visited", {
    link_source: source,
  });
}

export function trackNavigationClicked(properties: {
  destination: string;
  label: string;
  placement: string;
}) {
  trackEvent("navigation_clicked", {
    destination: properties.destination,
    link_label: properties.label,
    placement: properties.placement,
  });
}

export function trackRecognitionLoadedMore(visibleCount: number) {
  trackEvent("recognition_loaded_more", {
    visible_recognition_count: visibleCount,
  });
}

/* --------------------------- pre-order funnel --------------------------- */
// Three named steps that let Clarity build the /book -> checkout -> success
// funnel from custom events. Stripe still owns all financial reporting; these
// are only for the on-site conversion funnel and session-replay segmentation.

export function trackPreorderTierSelected(sku: string) {
  trackEvent("preorder_tier_selected", {
    funnel_stage: "tier_selected",
    sku,
  });
}

export function trackCheckoutStarted(sku: string) {
  trackEvent("checkout_started", {
    funnel_stage: "checkout_started",
    sku,
  });

  window.fbq?.("track", "InitiateCheckout", {
    content_name: "Book pre-order",
    content_ids: [sku],
  });
}

export function trackPreorderConfirmed(sku?: string) {
  const sessionKey = "narrative_witness_preorder_confirmed_tracked";
  if (window.sessionStorage.getItem(sessionKey)) return;
  window.sessionStorage.setItem(sessionKey, "true");

  trackEvent("preorder_confirmed", {
    funnel_stage: "confirmed",
    value_moment: true,
    ...(sku ? { sku } : {}),
  });

  window.fbq?.("track", "Purchase", {
    content_name: "Book pre-order",
    ...(sku ? { content_ids: [sku] } : {}),
  });
}
