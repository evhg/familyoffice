# Verspui website

The website of Verspui, a Thai family office in Phuket and Bangkok. Built with Astro as a static site and hosted on Vercel.

- `CLAUDE.md` and `docs/`: the brief, design, copy and search plan the site is built from
- `src/config.ts`: every site-wide setting (address, email, LinkedIn links, `LAUNCHED`)
- `src/illustrations/`: the breeze-block module library
- `src/content/notes/`: Notes articles in Markdown (`draft: true` until approved)
- `qa/`: screenshot and line-length scripts, and the latest screenshots

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

The module sheet is at `/dev/modules/` while `npm run dev` is running. It is never built for production.
