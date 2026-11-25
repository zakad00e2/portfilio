import type { Language } from "@/i18n/locales";
import { resources } from "@/i18n/resources";
import { getCanonicalUrl, personProfiles, siteOrigin } from "./site-seo";

export const buildStructuredData = (language: Language) => {
  const { seo, hero, services, projects } = resources[language].translation;
  const canonical = getCanonicalUrl(language);
  const personId = `${siteOrigin}/#person`;
  const websiteId = `${siteOrigin}/#website`;
  const serviceId = `${canonical}#services`;
  const projectListId = `${canonical}#projects`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "ProfilePage"],
        "@id": `${canonical}#profile`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: language,
        author: { "@id": personId },
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
        mentions: { "@id": projectListId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteOrigin}/`,
        name: seo.siteName,
        inLanguage: "ar",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: seo.author,
        jobTitle: hero.title,
        sameAs: Object.values(personProfiles),
        hasOfferCatalog: { "@id": serviceId },
      },
      {
        "@type": "OfferCatalog",
        "@id": serviceId,
        name: services.sectionTitle,
        itemListElement: services.items.map(({ title, description }) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: title, description },
        })),
      },
      {
        "@type": "ItemList",
        "@id": projectListId,
        name: projects.sectionTitle,
        itemListElement: projects.items.map(({ title, id }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: title,
          url: `${canonical}#project-${id}`,
        })),
      },
    ],
  };
};
