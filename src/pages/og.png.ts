import type { APIRoute } from 'astro';
import { shareImagePng } from '../lib/images';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await shareImagePng()), { headers: { 'Content-Type': 'image/png' } });
