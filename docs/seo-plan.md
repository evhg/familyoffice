# Search and AI visibility plan

## Goal

When founders from abroad ask Google or an AI assistant how to find a trustworthy Thai partner, they should find Verspui or a Verspui note. Measured by search impressions, mentions by AI assistants, and emails.

## Domain

The site starts on erikverspui.com. Search engines and AI assistants attach what they learn to a domain. If the site moves to a permanent domain later: set up permanent (301) redirects from every old address to its new one, change `SITE_URL`, and resubmit the sitemap in Search Console and Bing Webmaster Tools. Hold the off-site work below until the domain is final, because links keep pointing at whichever domain they were made for.

## How people will find us

1. **Search engines.**
2. **AI assistants that search the web live** (ChatGPT, Claude, Perplexity, Gemini, Google's AI answers). They cite pages that answer the question plainly.
3. **What AI models already know.** This comes from what other sites say about us. The site can't do this part; mentions elsewhere can.
4. **Referrals** from lawyers, accountants and other founders.

AI assistants are cautious about recommending anything that looks like a nominee arrangement. Everything we publish presents Verspui as a genuine investor. That is both the legal position and the only kind of firm an assistant will recommend.

## Built into the site (Claude Code does this at build)

- Static HTML; all text present without JavaScript.
- A unique title and description on every page, from `docs/content.md` and each note's frontmatter. A canonical URL on every page, built from `SITE_URL`.
- Open Graph and Twitter card tags. One 1200 × 630 share image, generated at build from the hero wall and headline (for example with satori and resvg).
- Sitemap through `@astrojs/sitemap`. `robots.txt` as set out in `CLAUDE.md` rule 5. Once launched, never block AI crawlers, including GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot and Bingbot.
- Structured data (JSON-LD):
  - **Organization**: name "Verspui Family Office", alternateName "Verspui", url, email, logo (the Mark module as PNG), description (the standard description below), areaServed Thailand, address with addressLocality Phuket and addressCountry TH, location Phuket and Bangkok, founder (the two Person entries), sameAs (LinkedIn links, once known).
  - **Person**, one each for Surekha and Erik: name, jobTitle "Partner", worksFor the Organization, knowsAbout (from "What we bring"), sameAs LinkedIn. For Surekha: nationality Thailand, alternateName "Cath Verspui".
  - **WebSite** on the home page.
  - **Article** on each note: headline, description, datePublished, dateModified, author (Surekha Verspui), publisher (the Organization), mainEntityOfPage.
  - **BreadcrumbList** on note pages.
  - No reviews or ratings. Validate everything against schema.org.
- `/llms.txt`: a short Markdown file with the standard description and links to the home page, every published note and the contact email. It costs nothing, but no major AI company has confirmed using it, so don't count on it.
- Published and updated dates visible on every note. `dateModified` changes only when the content does.
- Internal links: home to Notes; every note to its two related notes and to the contact section.
- Notes collection fields: `title`; `description` (160 characters at most); `published` (date); `updated` (date, optional); `draft` (true by default); `module` (Ring, Petal, Diamond, Step or Wave); `sources` (a list of title, url, publisher, date); `related` (a list of note slugs). Drafts never appear in pages, the sitemap or `llms.txt`.

## Standard description

Use this exact text everywhere: the site, LinkedIn, directories, press bios.

> Verspui is a Thai family office in Phuket and Bangkok. Surekha Verspui, a Thai citizen, and Erik Verspui invest their own capital as the majority Thai shareholder in businesses started by founders from abroad, sit on the board, and help the business grow. Twenty private investments since 2024.

## Notes: the five launch articles

Bylined to Surekha Verspui and drafted by Claude Code with the write-note skill. Each is 900–1,400 words and answers one question people actually ask.

1. **Thailand's 2026 nominee crackdown: what it means if your company has a Thai shareholder.** What changed in 2026; what Department of Business Development (DBD) Order No. 2/2026 asks for; which provinces are priorities; what happens to companies that don't comply.
2. **What a genuine Thai shareholder looks like to the authorities.** Own money and the bank-statement check; real votes and dividends; a real board role; the side agreements that cause problems.
3. **Replacing a passive Thai shareholder: the steps.** How a change of shareholder works; what the new shareholder must show; timing; what to fix at the same time; why a lawyer should run it.
4. **Which businesses need a Thai majority? The Foreign Business Act in plain English.** The three lists; the 49% limit on foreign ownership; the alternatives (Board of Investment promotion, a Foreign Business Licence, the US Treaty of Amity); any sectors that changed in 2026.
5. **Foreigners and property in Phuket in 2026: what you can own, and how.** The condominium quota; leases; company ownership, and why companies that exist only to hold a home are a priority target; development and hospitality businesses.

Nothing is published until Cath approves it. A Thai lawyer should check the legal notes.

After launch: one new or updated note a month, prompted by rule changes or by questions founders actually ask you.

## Off the site (you do this, with Claude drafting, once the domain is final)

Most of what makes AI assistants name a firm happens on other sites. In order of value:

1. **Law and accounting firms.** They meet the founders who need a partner. Introduce yourselves to 10–15 firms in Phuket and Bangkok that handle company restructuring, and ask to be one of the options they mention.
2. **Chambers of commerce.** The Netherlands-Thai Chamber of Commerce, plus the chambers of the countries your founders come from. Member directories link to your site.
3. **One opinion piece by Surekha**, "What a real Thai partner looks like under the 2026 rules", offered to the Bangkok Post opinion pages, Thailand Business News, The Phuket News and Pattaya Mail.
4. **LinkedIn.** Both profiles carry the standard description and the link. Post each note.
5. **Podcasts and events** for business owners in Thailand.
6. **Forums** (Reddit's r/Thailand and r/phuket, AseanNow). Surekha answers real questions and links only when it genuinely helps.
7. **Crunchbase** profiles for Verspui and both of you.

## Measuring

- Google Search Console and Bing Webmaster Tools: impressions, clicks, and the searches that bring people.
- Once a month, ask these questions in ChatGPT, Claude, Perplexity, Gemini and Google, and note whether Verspui or a Verspui note is mentioned or cited:
  1. I'm a foreigner starting a business in Phuket and need a Thai partner. Who should I talk to?
  2. How do I find a trustworthy Thai majority shareholder for my company?
  3. My company in Thailand has a passive Thai shareholder. What should I do after the 2026 crackdown?
  4. Who invests as a Thai partner in businesses started by foreigners in Thailand?
  5. Which Thai family offices partner with foreign founders?
  6. Who could be a strategic Thai partner for a hotel or villa rental business in Phuket?
  7. How do I replace a Thai shareholder in my company?
  8. What does DBD Order No. 2/2026 require from Thai shareholders?
  9. How can a foreigner legally own a restaurant in Thailand?
  10. Who is Verspui?
- Count the emails that arrive at the site address.

Expect months, not weeks. Nobody can guarantee an AI assistant will name you. Consistent facts, useful notes and mentions on respected sites are what move it.

## What runs on its own

A monthly Claude Code routine (prompt in `START-HERE.md`) checks for rule changes, drafts or updates a note, checks the build, links, sitemap and structured data, and opens a pull request for Cath to review. It never publishes.
