import type { APIRoute } from 'astro';
import { markSvg } from '../lib/images';

export const GET: APIRoute = () => new Response(markSvg(32), { headers: { 'Content-Type': 'image/svg+xml' } });
