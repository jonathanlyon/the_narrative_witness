import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThankYouPage } from "./pages/ThankYou.tsx";
import { AnalyticsConsent } from "./components/AnalyticsConsent.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <ThankYouPage />
      <AnalyticsConsent />
    </>
  </StrictMode>
);
