declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    mixpanel?: MixpanelClient;
  }
}

interface MixpanelClient {
  init: (
    token: string,
    config?: {
      autocapture?: boolean;
      debug?: boolean;
      ignore_dnt?: boolean;
      persistence?: "localStorage" | "cookie";
      track_pageview?: boolean;
    },
    name?: string,
  ) => void;
  opt_out_tracking?: () => void;
  register?: (properties: Record<string, unknown>) => void;
  reset?: () => void;
  track: (eventName: string, properties?: Record<string, unknown>) => void;
}

interface MixpanelStub extends Array<unknown> {
  __SV: number;
  _i: unknown[][];
  init: MixpanelClient["init"];
  people?: unknown[];
  [key: string]: unknown;
}

export type AnalyticsConsent = "granted" | "denied" | null;
export type SignupSource = "hero" | "midpage" | "final";

const ANALYTICS_CONSENT_KEY = "narrative_witness_analytics_consent";
const MIXPANEL_CDN_URL = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
const MIXPANEL_TOKEN =
  import.meta.env.VITE_MIXPANEL_TOKEN?.trim() ||
  "a2d4bf4421347c1afc2250024f7876bb";
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim();
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
    window.mixpanel?.opt_out_tracking?.();
    window.mixpanel?.reset?.();
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

function createQueuedMethod(target: unknown[], methodName: string) {
  (target as unknown as Record<string, unknown>)[methodName] = (
    ...args: unknown[]
  ) => {
    target.push([methodName, ...args]);
  };
}

function createMixpanelStub(): MixpanelClient {
  const stub = [] as unknown as MixpanelStub;
  stub._i = [];
  stub.__SV = 1.2;
  stub.init = (token, config, name) => {
    const instance = name
      ? ((stub[name] = []) as unknown as MixpanelStub)
      : stub;

    instance.people = instance.people || [];

    [
      "disable",
      "time_event",
      "track",
      "track_pageview",
      "track_links",
      "track_forms",
      "register",
      "register_once",
      "alias",
      "unregister",
      "identify",
      "name_tag",
      "set_config",
      "reset",
      "opt_in_tracking",
      "opt_out_tracking",
      "has_opted_in_tracking",
      "has_opted_out_tracking",
      "clear_opt_in_out_tracking",
      "start_batch_senders",
    ].forEach((methodName) => createQueuedMethod(instance, methodName));

    [
      "set",
      "set_once",
      "unset",
      "increment",
      "append",
      "union",
      "track_charge",
      "clear_charges",
      "delete_user",
      "remove",
    ].forEach((methodName) =>
      createQueuedMethod(instance.people as unknown[], methodName),
    );

    stub._i.push([token, config, name]);
  };

  return stub as unknown as MixpanelClient;
}

function loadMixpanel(config: Parameters<MixpanelClient["init"]>[1]): Promise<void> {
  if (window.mixpanel?.track) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${MIXPANEL_CDN_URL}"]`,
    );

    const finishLoading = () => {
      if (window.mixpanel?.track) {
        resolve();
      } else {
        reject(new Error("Mixpanel did not initialize."));
      }
    };

    if (!window.mixpanel) {
      window.mixpanel = createMixpanelStub();
      window.mixpanel.init(MIXPANEL_TOKEN, config);
    }

    if (existingScript) {
      existingScript.addEventListener("load", finishLoading, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = MIXPANEL_CDN_URL;
    script.addEventListener("load", finishLoading, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
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

  const mixpanelConfig = {
    autocapture: false,
    debug: false,
    ignore_dnt: false,
    persistence: "localStorage" as const,
    track_pageview: false,
  };

  analyticsInitialization = loadMixpanel(mixpanelConfig)
    .then(() => {
      window.mixpanel?.register?.({
        platform: "web",
        project_name: "the_narrative_witness",
      });

      analyticsInitialized = true;
      trackPageView();

      pendingEvents.splice(0).forEach(({ eventName, properties }) => {
        window.mixpanel?.track(eventName, properties);
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

  if (analyticsInitialized && window.mixpanel?.track) {
    window.mixpanel.track(eventName, eventProperties);
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

  window.sessionStorage.setItem(sessionKey, "true");
  trackMixpanel("support_registration_confirmed", {
    funnel_stage: "confirmed",
    value_moment: true,
  });

  window.fbq?.("trackCustom", "SupportConfirmed");
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

export function trackResponsesLoadedMore(visibleCount: number) {
  trackMixpanel("responses_loaded_more", {
    visible_response_count: visibleCount,
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
