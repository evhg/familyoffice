---
name: write-note
description: Research and draft a Notes article for the Verspui website about owning, restructuring or running a business in Thailand (Foreign Business Act, Thai shareholders, nominee enforcement, Phuket property). Use when asked to write, update or refresh a note.
---

# Writing a Verspui note

## The reader

A founder from abroad who runs a business in Thailand or is about to start one. Smart, busy, worried about staying legal, often reading on a phone. Not a lawyer.

## Shape

- Each note answers one question. Give the direct answer in the first two sentences, then explain in the order the reader needs it, then say what to do next.
- Headings are plain statements or questions.
- 900–1,400 words.

## Sources

- Primary sources first: Department of Business Development (DBD) announcements and orders, the Royal Gazette, Thai government press releases, the Board of Investment, the Land Department, the text of the Foreign Business Act.
- Then established news outlets: Bangkok Post, The Nation, Thai PBS World, Thairath English, Reuters.
- Never rely on forums, AI-generated summaries or law-firm marketing as the only source for a fact.
- Every number, date or legal reference needs an entry in the `sources` frontmatter. If you can't source a fact, leave it out.
- Check that sources are current, and write "as of [month year]" where rules may change.

## Style

- Plain English, short sentences, active voice, British spelling. Spell out abbreviations on first use, for example "Department of Business Development (DBD)".
- No hype, no scare tactics, no "ultimate guide".
- Follow the voice and banned phrases in `CLAUDE.md` and `docs/brief.md`.

## Never

- Advice on a reader's specific situation. Write "founders in this position usually…" and "check with a Thai lawyer", never "you should…".
- Ways to avoid or get around the law.
- Claims about Verspui's results, clients or deals beyond what `docs/content.md` says.

## File

Markdown at `src/content/notes/[slug].md`. Slug: short, lowercase, hyphenated, taken from the question. Frontmatter fields: `title`, `description`, `published`, `updated`, `draft: true`, `module`, `sources`, `related`.

End every note with the disclaimer and the closing line from the "Notes pages" section of `docs/content.md`.

## Before you finish

- Reread it as a sceptical founder. Fix anything vague, unsourced or salesy.
- In the pull request, list every sentence a Thai lawyer should check.
- Leave `draft: true`. Cath decides what gets published.
