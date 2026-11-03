import type { APIRoute } from 'astro';
import { LAUNCHED, SITE_URL } from '../config';

// Once launched, every crawler is welcome, AI crawlers included. They are named so that
// nobody adds a block for them by mistake later.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bingbot',
];

export const GET: APIRoute = () => {
  const body = LAUNCHED
    ? [
        ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('/sitemap-index.xml', SITE_URL).href}`,
        '',
      ].join('\n')
    : ['User-agent: *', 'Disallow: /', ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
