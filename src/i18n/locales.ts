export const languageStorageKey = "zakaria-portfolio-language";

export const languages = {
  en: {
    code: "en",
    label: "EN",
    nativeName: "EN",
    dir: "ltr",
    locale: "en_US",
  },
  ar: {
    code: "ar",
    label: "Arabic",
    nativeName: "ع",
    dir: "rtl",
    locale: "ar_AR",
  },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "en";
export const languageCodes = Object.keys(languages) as Language[];

export const sections = ["about", "experience", "projects"] as const;
export type SectionSlug = (typeof sections)[number];
export const defaultSection: SectionSlug = "about";

export const isLanguage = (value: string | undefined): value is Language =>
  Boolean(value && value in languages);

export const isSectionSlug = (value: string | undefined): value is SectionSlug =>
  Boolean(value && sections.includes(value as SectionSlug));

const getPathSegments = (pathname: string) =>
  pathname
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean);

export const getLanguageFromPath = (pathname: string): Language | null => {
  const [language] = getPathSegments(pathname);
  return isLanguage(language) ? language : null;
};

export const getSectionFromPath = (pathname: string): SectionSlug | null => {
  const [, section] = getPathSegments(pathname);
  return isSectionSlug(section) ? section : null;
};

export const getCurrentSection = (pathname: string): SectionSlug =>
  getSectionFromPath(pathname) ?? defaultSection;

export const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  try {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    return isLanguage(storedLanguage ?? undefined) ? storedLanguage : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
};

export const setStoredLanguage = (language: Language) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // Storage can be disabled in private browsing contexts.
  }
};

export const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  return getLanguageFromPath(window.location.pathname) ?? getStoredLanguage();
};

export const buildLocalizedPath = (language: Language, section?: SectionSlug | null) =>
  section ? `/${language}/${section}` : `/${language}`;
