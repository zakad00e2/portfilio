import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import { createPortfolioI18n } from "./i18n/config";
import { getInitialLanguage, isLanguage } from "./i18n/locales";
import "./index.css";

const root = document.getElementById("root")!;
const serverLanguage = root.dataset.language;
const prerendered = isLanguage(serverLanguage);
const i18n = createPortfolioI18n(prerendered ? serverLanguage : getInitialLanguage());
const app = (
  <I18nextProvider i18n={i18n}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </I18nextProvider>
);

if (prerendered) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
