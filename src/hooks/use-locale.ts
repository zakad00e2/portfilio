import { useTranslation } from "react-i18next";
import { defaultLanguage, isLanguage, languages } from "@/i18n/locales";

export const useLocale = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
  const language = isLanguage(currentLanguage) ? currentLanguage : defaultLanguage;
  const direction = languages[language].dir;

  return {
    language,
    direction,
    isRtl: direction === "rtl",
  };
};
