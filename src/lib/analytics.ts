declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const metaPixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();

let metaPixelLoaded = false;

export function initMetaPixel() {
  if (!metaPixelId || metaPixelLoaded || typeof window === "undefined") return;

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[src="https://connect.facebook.net/en_US/fbevents.js"]',
  );

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      (fbq as typeof fbq & { queue: unknown[][] }).queue.push(args);
    } as typeof window.fbq & { queue: unknown[][]; loaded: boolean; version: string };

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

  window.fbq?.("init", metaPixelId);
  window.fbq?.("track", "PageView");
  metaPixelLoaded = true;
}

export function trackSupportRegistration(source: "hero" | "midpage" | "final") {
  window.fbq?.("track", "Lead", {
    content_name: "Book support registration",
    content_category: "Kickstarter pre-launch",
    source,
  });

  window.fbq?.("trackCustom", "SupportRegistered", {
    source,
  });
}

export function trackKickstarterIntent(source: string) {
  window.fbq?.("trackCustom", "KickstarterIntent", {
    source,
  });
}
