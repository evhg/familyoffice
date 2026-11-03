import { getCollection, type CollectionEntry } from 'astro:content';
import type { ModuleName } from '../illustrations/modules';

export type Note = CollectionEntry<'notes'>;

/**
 * Published notes, newest first. Drafts never appear in built pages, the sitemap or llms.txt.
 * In `astro dev` only, drafts are included so they can be previewed.
 */
export async function getNotes(): Promise<Note[]> {
  const all = await getCollection('notes', ({ data }) => import.meta.env.DEV || data.draft === false);
  return all.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export function noteModule(note: Note): ModuleName {
  return note.data.module.toLowerCase() as ModuleName;
}

export function notePath(note: Note): string {
  return `/notes/${note.id}/`;
}

/** Dates written as "18 October 2026". */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
