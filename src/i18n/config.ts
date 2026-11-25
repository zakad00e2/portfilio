import { createInstance } from "i18next";
import { defaultLanguage, type Language } from "./locales";
import { resources } from "./resources";

export const createPortfolioI18n = (language: Language) => {
  const i18n = createInstance();
  void i18n.init({
    resources,
    lng: language,
    fallbackLng: defaultLanguage,
    initAsync: false,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  return i18n;
};
