/**
 * structured-data.js — shared JSON-LD graph for alyonsdentherapy.com
 *
 * Emits four connected schema.org nodes:
 *   - Organization + ProfessionalService (A Lyons Den Therapy; Group NPI)
 *   - Person (Adam Lyons, LCSW — licensed NY + NJ, personal NPI)
 *   - Service (Psychotherapy — NY/NJ, virtual & in-person)
 *   - Service (ADHD & Executive Function Coaching)
 *
 * GUARDRAILS (PRD §8 + client update July 2026):
 *   - NO "@type": "Psychologist" — Adam is an LCSW
 *   - NO streetAddress / PostalAddress — service-area model, no public storefront
 *   - NO Connecticut until the CT license renewal is confirmed (removed 7/2026;
 *     re-add areaServed + license in the August phase-2 update)
 *   - License numbers verified by client 7/2026:
 *       NY LCSW #084681-01 · NJ LCSW #44SC06328000
 *   - sameAs = ONLY live profiles (X/Twitter removed per client, 7/2026)
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
    legalName: "A Lyons Den Therapy Group",
    url: "https://alyonsdentherapy.com/",
    telephone: "+1-646-535-1262",
    email: "adam@alyonsdentherapy.com",
    image,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NPI",
      value: "1801747142",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "New York" },
      { "@type": "AdministrativeArea", name: "New Jersey" },
    ],
    // Verified social URLs (X/Twitter removed per client update, 7/2026)
    sameAs: [
      "https://www.facebook.com/people/A-Lyons-Den-Therapy/61564147023316/",
      "https://www.instagram.com/alyonsdentmt/",
      "https://www.linkedin.com/company/alyonsdentherapy",
      "https://alyonsdentherapy.blogspot.com/",
    ],
    founder: { "@id": "https://alyonsdentherapy.com/#adam" },
  };

  const person = {
    "@type": "Person",
    "@id": "https://alyonsdentherapy.com/#adam",
    name: "Adam Lyons",
    jobTitle: "Licensed Clinical Social Worker",
    honorificSuffix: "LCSW",
    description:
      "Licensed Clinical Social Worker, psychotherapist, and ADHD specialist providing therapy and ADHD & Executive Function coaching for teens and adults.",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NPI",
      value: "1700443751",
    },
    knowsAbout: [
      "ADHD",
      "Executive Function Coaching",
      "Cognitive Behavioral Therapy",
      "Anxiety",
      "Depression",
      "Trauma",
      "Neurodivergence",
    ],
    worksFor: { "@id": "https://alyonsdentherapy.com/#organization" },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Licensed Clinical Social Worker (LCSW) — New York",
        identifier: "084681-01",
        recognizedBy: { "@type": "Organization", name: "New York State Education Department" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Licensed Clinical Social Worker (LCSW) — New Jersey",
        identifier: "44SC06328000",
        recognizedBy: { "@type": "Organization", name: "New Jersey Division of Consumer Affairs" },
      },
    ],
  };

  const therapyService = {
    "@type": "Service",
    "@id": "https://alyonsdentherapy.com/#service",
    serviceType: "Psychotherapy",
    provider: { "@id": "https://alyonsdentherapy.com/#organization" },
    areaServed: ["New York", "New Jersey"],
    audience: { "@type": "PeopleAudience", suggestedMinAge: 13 },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: canonical,
      availableLanguage: "English",
    },
  };

  const coachingService = {
    "@type": "Service",
    "@id": "https://alyonsdentherapy.com/#coaching",
    serviceType: "ADHD & Executive Function Coaching",
    name: "ADHD & Executive Function Coaching for Adults and Teens",
    provider: { "@id": "https://alyonsdentherapy.com/#organization" },
    areaServed: ["New York", "New Jersey"],
    audience: { "@type": "PeopleAudience", suggestedMinAge: 13 },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://alyonsdentherapy.com/adhd-coaching",
      availableLanguage: "English",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [org, person, therapyService, coachingService],
  };
}
