import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PreorderTermsPage } from "./pages/PreorderTerms.tsx";
import { AnalyticsConsent } from "./components/AnalyticsConsent.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <PreorderTermsPage />
      <AnalyticsConsent />
    </>
  </StrictMode>
);
