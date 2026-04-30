import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, getInitialLanguage } from "./locales";
import { resources } from "./resources";

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
