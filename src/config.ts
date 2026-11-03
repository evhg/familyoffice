// Every site-wide setting lives here. Never hard-code these anywhere else.

/** The live address of the site. Change this if the site moves to a permanent domain. */
export const SITE_URL = 'https://erikverspui.com';

/** The address shown everywhere on the site. [CONFIRM: check that mail sent here arrives.] */
export const EMAIL = 'hello@erikverspui.com';

/** Surekha's LinkedIn. Uses her current profile for now; change it once the profile name is updated. */
export const LINKEDIN_SUREKHA = 'https://www.linkedin.com/in/cathtunti/';

export const LINKEDIN_ERIK = 'https://www.linkedin.com/in/erikverspui/';

/** A LinkedIn company page for Verspui, if one is made. Used as the Organization's sameAs in structured data. */
export const LINKEDIN_COMPANY = '';

/**
 * false: every page is noindex, robots.txt disallows everything, analytics are off,
 * and [CONFIRM] markers show in previews.
 * true: open to all crawlers, sitemap listed in robots.txt, Vercel Web Analytics on.
 */
export const LAUNCHED = false;

/**
 * The Thai holding company, for the footer. Leave null until it is registered,
 * then fill in, for example: { name: 'Verspui Holding Co., Ltd.', number: '0835500000000' }.
 */
export const COMPANY: { name: string; number: string } | null = null;

export const YEAR = new Date().getFullYear();
