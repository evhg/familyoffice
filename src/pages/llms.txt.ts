import type { APIRoute } from 'astro';
import { EMAIL } from '../config';
import { getNotes, notePath } from '../lib/notes';
import { STANDARD_DESCRIPTION, absolute } from '../lib/site';

export const GET: APIRoute = async () => {
  const notes = (await getNotes()).filter((n) => !n.data.draft);
  const lines = [
    '# Verspui Family Office',
    '',
    `> ${STANDARD_DESCRIPTION}`,
    '',
    '## Site',
    '',
    `- [Home](${absolute('/')})`,
    ...(notes.length ? [`- [Notes](${absolute('/notes/')}): Plain-English notes on owning and running a business in Thailand.`] : []),
    '',
    ...(notes.length
      ? ['## Notes', '', ...notes.map((n) => `- [${n.data.title}](${absolute(notePath(n))}): ${n.data.description}`), '']
      : []),
    '## Contact',
    '',
    `- Email: ${EMAIL}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
