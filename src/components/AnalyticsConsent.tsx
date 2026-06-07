import React, { useEffect, useState } from "react";
import {
  AnalyticsConsent as ConsentValue,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "../lib/analytics";

export const AnalyticsConsent: React.FC = () => {
  const [consent, setConsent] = useState<ConsentValue>(() =>
    getAnalyticsConsent(),
  );
  const [preferencesOpen, setPreferencesOpen] = useState(consent === null);

  useEffect(() => {
    const handleOpenPreferences = () => setPreferencesOpen(true);
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ consent: ConsentValue }>;
      setConsent(customEvent.detail.consent);
      setPreferencesOpen(false);
    };

    window.addEventListener(
      "open-analytics-preferences",
      handleOpenPreferences,
    );
    window.addEventListener(
      "analytics-consent-changed",
      handleConsentChange,
    );

    return () => {
      window.removeEventListener(
        "open-analytics-preferences",
        handleOpenPreferences,
      );
      window.removeEventListener(
        "analytics-consent-changed",
        handleConsentChange,
      );
    };
  }, []);

  if (!preferencesOpen) return null;

  const chooseConsent = (value: Exclude<ConsentValue, null>) => {
    setAnalyticsConsent(value);
    setConsent(value);
    setPreferencesOpen(false);
  };

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-paper/20 bg-ink px-6 py-5 text-paper shadow-[0_-10px_35px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-paper/55">
            Optional analytics
          </span>
          <p className="mt-2 text-base font-light leading-relaxed text-paper/75">
            With your permission, anonymous usage data helps us understand which writing readers engage with and whether the pre-launch journey is working. Email addresses and sensitive personal information are never sent to analytics services.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => chooseConsent("denied")}
            className="border border-paper/35 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:border-paper"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => chooseConsent("granted")}
            className="bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-paper-dark"
          >
            Allow analytics
          </button>
        </div>
      </div>
    </aside>
  );
};
