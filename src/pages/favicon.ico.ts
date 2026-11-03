import type { APIRoute } from 'astro';
import { markSvg, pngToIco, svgToPng } from '../lib/images';

export const GET: APIRoute = () =>
  new Response(new Uint8Array(pngToIco(svgToPng(markSvg(32), 32), 32)), {
    headers: { 'Content-Type': 'image/x-icon' },
  });
