import type { APIRoute } from 'astro';
import { markSvg, svgToPng } from '../lib/images';

export const GET: APIRoute = () =>
  new Response(new Uint8Array(svgToPng(markSvg(180), 180)), { headers: { 'Content-Type': 'image/png' } });
