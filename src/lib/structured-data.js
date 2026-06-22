/**
 * structured-data.js — shared JSON-LD graph for alyonsdentherapy.com
 *
 * Emits three connected schema.org nodes:
 *   - Organization + ProfessionalService (A Lyons Den Therapy)
 *   - Person (Adam Lyons, LCSW — hasCredential, NOT Psychologist)
 *   - Service (Psychotherapy, online, NY/NJ/CT)
 *
 * GUARDRAILS (PRD §8, story 1.4.2):
 *   - NO "@type": "Psychologist" — Adam is an LCSW
 *   - NO streetAddress / PostalAddress — service-area model, no public storefront
 *   - NO llms.txt or AI-gimmick files
 *   - sameAs = ONLY URLs verified in GetStarted.jsx:108-138
 *   - NO Psychology Today URL (none exists in the codebase)
 */

/**
 * @param {{ canonical: string, image: string }} options
 *   canonical — the page's canonical URL (e.g. "https://alyonsdentherapy.com/")
 *   image     — absolute URL of the OG/logo image
 * @returns {object} JSON-LD graph object (pass to JSON.stringify for <script>)
 */
export function siteSchema({ canonical, image }) {
  const org = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": "https://alyonsdentherapy.com/#organization",
    name: "A Lyons Den Therapy",
    url: "https://alyonsdentherapy.com/",
    telephone: "+1-646-535-1262",
    email: "adam@alyonsdentherapy.com",
    image,
    areaServed: [
      { "@type": "AdministrativeArea", name: "New York" },
      { "@type": "AdministrativeArea", name: "New Jersey" },
      { "@type": "AdministrativeArea", name: "Connecticut" },
    ],
    // Verified social URLs from GetStarted.jsx:108-138 — no invented links
    sameAs: [
      "https://www.facebook.com/people/A-Lyons-Den-Therapy/61564147023316/",
      "https://x.com/alyonsdentmt",
      "https://www.instagram.com/alyonsdentmt/",
      "https://www.linkedin.com/company/alyonsdentherapy",
    ],
    founder: { "@id": "https://alyonsdentherapy.com/#adam" },
  };

  const person = {
    "@type": "Person",
    "@id": "https://alyonsdentherapy.com/#adam",
    name: "Adam Lyons",
    jobTitle: "Licensed Clinical Social Worker",
    honorificSuffix: "LCSW",
    worksFor: { "@id": "https://alyonsdentherapy.com/#organization" },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Licensed Clinical Social Worker (LCSW)",
    },
  };

  const service = {
    "@type": "Service",
    "@id": "https://alyonsdentherapy.com/#service",
    serviceType: "Psychotherapy",
    provider: { "@id": "https://alyonsdentherapy.com/#organization" },
    areaServed: ["New York", "New Jersey", "Connecticut"],
    audience: { "@type": "PeopleAudience", suggestedMinAge: 13 },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: canonical,
      availableLanguage: "English",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [org, person, service],
  };
}
