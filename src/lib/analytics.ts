import type { OverridedMixpanel } from "mixpanel-browser";

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
const MIXPANEL_TOKEN =
  import.meta.env.VITE_MIXPANEL_TOKEN?.trim() ||
  "a2d4bf4421347c1afc2250024f7876bb";
const META_PIXEL_ID =
  import.meta.env.VITE_META_PIXEL_ID?.trim() || "2404031020073363";
const PRODUCTION_HOSTS = new Set([
  "thenarrativewitness.com",
  "www.thenarrativewitness.com",
]);

const pendingEvents: Array<{
  eventName: string;
  properties?: Record<string, unknown>;
}> = [];
const trackedPagePaths = new Set<string>();

let analyticsInitialized = false;
let analyticsInitialization: Promise<void> | null = null;
let metaPixelLoaded = false;
let mixpanelClient: OverridedMixpanel | null = null;

function isProductionSite() {
  return (
    typeof window !== "undefined" &&
    PRODUCTION_HOSTS.has(window.location.hostname)
  );
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
      trackMixpanel("analytics_consent_updated", {
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
      mixpanelClient?.opt_out_tracking();
      mixpanelClient?.reset();
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

  analyticsInitialization = import("mixpanel-browser")
    .then(({ default: mixpanel }) => {
      mixpanelClient = mixpanel;
      mixpanelClient.init(MIXPANEL_TOKEN, {
        autocapture: false,
        debug: false,
        ignore_dnt: false,
        persistence: "localStorage",
        track_pageview: false,
      });
      mixpanelClient.register({
        platform: "web",
        project_name: "the_narrative_witness",
      });

      analyticsInitialized = true;
      trackPageView();

      pendingEvents.splice(0).forEach(({ eventName, properties }) => {
        mixpanelClient?.track(eventName, properties);
      });
    })
    .catch(() => {
      analyticsInitialization = null;
    });

  return analyticsInitialization;
}

function trackMixpanel(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  if (!isProductionSite() || getAnalyticsConsent() === "denied") return;

  const eventProperties = {
    ...getPageProperties(),
    ...properties,
  };

  if (analyticsInitialized && mixpanelClient) {
    mixpanelClient.track(eventName, eventProperties);
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
  trackMixpanel("page_viewed", {
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

  trackMixpanel("support_registration_submitted", {
    form_source: source,
    funnel_stage: "submitted",
  });

  window.fbq?.("track", "Lead", {
    content_name: "Book support registration",
    content_category: "Kickstarter pre-launch",
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
  trackMixpanel("support_registration_confirmed", {
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
  trackMixpanel("excerpt_selected", {
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
  trackMixpanel("writing_opened", {
    writing_id: properties.writingId,
    writing_title: properties.writingTitle,
    writing_type: properties.writingType.toLowerCase(),
  });
}

export function trackSubstackVisit(source: string) {
  trackMixpanel("substack_visited", {
    link_source: source,
  });
}

export function trackNavigationClicked(properties: {
  destination: string;
  label: string;
  placement: string;
}) {
  trackMixpanel("navigation_clicked", {
    destination: properties.destination,
    link_label: properties.label,
    placement: properties.placement,
  });
}

export function trackRecognitionLoadedMore(visibleCount: number) {
  trackMixpanel("recognition_loaded_more", {
    visible_recognition_count: visibleCount,
  });
}

export function trackKickstarterIntent(source: string) {
  trackMixpanel("kickstarter_intent_clicked", {
    link_source: source,
  });

  window.fbq?.("trackCustom", "KickstarterIntent", {
    source,
  });
}
