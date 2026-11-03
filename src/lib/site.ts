import { EMAIL, LINKEDIN_COMPANY, LINKEDIN_ERIK, LINKEDIN_SUREKHA, SITE_URL } from '../config';

/** Use this exact text everywhere: the site, LinkedIn, directories, press bios. */
export const STANDARD_DESCRIPTION =
  'Verspui is a Thai family office in Phuket and Bangkok. Surekha Verspui, a Thai citizen, and Erik Verspui invest their own capital as the majority Thai shareholder in businesses started by founders from abroad, sit on the board, and help the business grow. Twenty private investments since 2024.';

export const HOME_TITLE = 'Verspui | Strategic Thai partner in business and real estate';
export const HOME_DESCRIPTION =
  'A Thai family office in Phuket and Bangkok. We invest our own capital as the majority Thai shareholder in businesses started by founders from abroad, and help them grow.';
export const SHARE_TITLE = 'Verspui: a strategic Thai partner in business and real estate';

/** From "What we bring". */
export const WHAT_WE_BRING = [
  'Consumer brands and products',
  'Fitness, wellness and social sport',
  'Software and AI products',
  'Running and growing a business in Thailand: people, licences, landlords and banks',
  'Real estate and development finance in Phuket',
  'Raising money, and introductions to investors',
];

export function absolute(path: string): string {
  return new URL(path, SITE_URL).href;
}

const ORG_ID = absolute('/#organization');
const SUREKHA_ID = absolute('/#surekha');
const ERIK_ID = absolute('/#erik');
const WEBSITE_ID = absolute('/#website');


export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Verspui Family Office',
    alternateName: 'Verspui',
    url: absolute('/'),
    email: EMAIL,
    logo: {
      '@type': 'ImageObject',
      url: absolute('/logo.png'),
      width: 512,
      height: 512,
    },
    description: STANDARD_DESCRIPTION,
    areaServed: { '@type': 'Country', name: 'Thailand' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phuket',
      addressCountry: 'TH',
    },
    location: [
      { '@type': 'Place', name: 'Phuket', address: { '@type': 'PostalAddress', addressLocality: 'Phuket', addressCountry: 'TH' } },
      { '@type': 'Place', name: 'Bangkok', address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' } },
    ],
    founder: [{ '@id': SUREKHA_ID }, { '@id': ERIK_ID }],
    ...(LINKEDIN_COMPANY ? { sameAs: [LINKEDIN_COMPANY] } : {}),
  };
}

export function personSchemas() {
  return [
    {
      '@type': 'Person',
      '@id': SUREKHA_ID,
      name: 'Surekha Verspui',
      alternateName: 'Cath Verspui',
      jobTitle: 'Partner',
      worksFor: { '@id': ORG_ID },
      nationality: { '@type': 'Country', name: 'Thailand' },
      knowsAbout: WHAT_WE_BRING,
      ...(LINKEDIN_SUREKHA ? { sameAs: [LINKEDIN_SUREKHA] } : {}),
    },
    {
      '@type': 'Person',
      '@id': ERIK_ID,
      name: 'Erik Verspui',
      jobTitle: 'Partner',
      worksFor: { '@id': ORG_ID },
      knowsAbout: WHAT_WE_BRING,
      sameAs: [LINKEDIN_ERIK],
    },
  ];
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absolute('/'),
    name: 'Verspui',
    description: HOME_DESCRIPTION,
    inLanguage: 'en-GB',
    publisher: { '@id': ORG_ID },
  };
}

export const ids = { ORG_ID, SUREKHA_ID, ERIK_ID, WEBSITE_ID };

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
