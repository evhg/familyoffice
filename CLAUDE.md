# Verspui website

A one-page profile and portfolio site for Verspui, a Thai family office. Surekha Verspui (a Thai citizen, known as Cath, but always "Surekha" on the site) and Erik Verspui (Dutch) become the majority Thai shareholder, and an active partner, in businesses started by founders from abroad. The site has one job: make those founders trust us enough to send an email.

## Read before any work

- `docs/brief.md`: audience, structure, copy rules
- `docs/design.md`: the design system. Follow it exactly
- `docs/content.md`: all copy. Use it word for word
- `docs/seo-plan.md`: technical SEO, structured data, Notes
- `START-HERE.md` is for Cath. Ignore it

If a frontend-design skill is available, use it. Where it disagrees with `docs/design.md`, `docs/design.md` wins.

## Stack

- Astro (latest stable), static output, TypeScript strict
- Plain CSS with custom properties in `src/styles/tokens.css`. No Tailwind, no component libraries, no UI kits, no icon sets
- Fonts self-hosted from Fontsource: Archivo variable (import the CSS file that includes the width axis) and Newsreader variable (with the optical size axis). No Google Fonts links
- No front-end framework. The only JavaScript is the copy-email button. The hero animation is pure CSS
- Notes: an Astro content collection in `src/content/notes`, written in Markdown
- Hosting: Vercel, static. Vercel Web Analytics through its Astro component, loaded only when `LAUNCHED` is true
- Every setting lives in `src/config.ts`: `SITE_URL` (`https://erikverspui.com` for now; it may move to a permanent domain later, so never hard-code it anywhere else), `EMAIL` (`hello@erikverspui.com`, to be confirmed), `LINKEDIN_SUREKHA` (to be confirmed), `LINKEDIN_ERIK` (`https://www.linkedin.com/in/erikverspui/`), `LAUNCHED` (false)

## Rules

1. Copy comes from `docs/content.md`, word for word. Never invent facts, numbers, names, clients, quotes or testimonials. Render any `[CONFIRM: …]` text as is, styled so it stands out in previews, and list it in your pull request.
2. Never write any of these anywhere on the site, including alt text, page titles and meta tags: "cheap", "free equity", "at no cost", "you keep control", "full control", "hold shares for you", "on your behalf", "nominee service", "Thai nominee", "loophole", "workaround", "get around", "guaranteed". One exception: the sentence "We never hold shares on anyone's behalf." from `docs/content.md`. Notes may discuss nominee law factually.
3. Plain English. Never use: unlock, leverage, seamless, world-class, cutting-edge, synergy, empower, journey, elevate, bespoke, game-changer, best-in-class, solutions. Spell out abbreviations on first use. British spelling.
4. Design follows `docs/design.md`, including its banned list. When unsure, do less.
5. While `LAUNCHED` is false, every page carries `<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows everything. When it is true, allow every crawler (AI crawlers included) and add the sitemap line.
6. Quality floor: Lighthouse 95 or higher in every category on mobile; WCAG 2.2 AA; every page works without JavaScript; no horizontal scrolling at 320px wide; visible keyboard focus; `prefers-reduced-motion` respected.

## Check your work on every task

1. `npm run build` and `npx astro check` finish without errors.
2. Take screenshots with Puppeteer at 390, 834 and 1440 pixels wide, of the first screen and of the full page. Puppeteer downloads Chrome from storage.googleapis.com, which the default network allows; install any missing system libraries with apt. If it still fails, say so in the pull request. Never skip this silently.
3. Review every screenshot against the checklist at the end of `docs/design.md`. Fix what fails and take new screenshots.
4. Run Lighthouse against the built site if you can, and report the scores.

## Git

Work on a branch and commit in small steps. Finish with a pull request that says what changed, the choices you made, which `[CONFIRM]` items are still open, and anything you couldn't do and why.
