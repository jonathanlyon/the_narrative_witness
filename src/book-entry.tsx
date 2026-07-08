import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BookPage } from "./pages/book/BookPage.tsx";
import { AnalyticsConsent } from "./components/AnalyticsConsent.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <BookPage />
      <AnalyticsConsent />
    </>
  </StrictMode>
);
