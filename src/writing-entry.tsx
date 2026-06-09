import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import { WritingPage } from "./components/WritingPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <WritingPage />
      <AnalyticsConsent />
    </>
  </StrictMode>,
);
