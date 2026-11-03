# Verspui website: start here

Everything Claude Code needs to build the site is in this folder. You don't need a terminal. Do steps 1 to 3 on a computer, in Chrome, not on your phone.

## What's in the folder

- `CLAUDE.md`: the standing rules Claude Code reads at the start of every session
- `docs/brief.md`: who the site is for, what it must do, and what it must never say
- `docs/design.md`: the look, specified tightly enough that it can't drift into a template
- `docs/content.md`: every word on the site. Items marked [CONFIRM] need your answer before launch
- `docs/seo-plan.md`: Google, AI assistants, the Notes articles, and the work off the site
- `docs/write-note-skill.md`: how Claude Code writes a Notes article

## Step 1: Put the folder on GitHub

1. Go to github.com/new. Name the repository `verspui-site`, choose Private, tick "Add a README file", and click Create repository.
2. On the repository page, click Add file, then Upload files.
3. Unzip `verspui-site.zip`, open the folder, select everything inside it, and drag it onto the upload area. Check that `CLAUDE.md` and the `docs` folder appear in the list.
4. Click Commit changes.

## Step 2: Build it with Claude Code

1. Open claude.ai/code. If asked, connect GitHub and give the Claude GitHub App access to `verspui-site`.
2. Choose the `verspui-site` repository. The Default environment is fine for the build.
3. Paste the kickoff prompt below and send it.
4. Let it run; it takes a while. It finishes by opening a pull request, which is a proposed change you look at before accepting it. Screenshots of the site are in its `qa/screenshots` folder.
5. If you're happy, click Merge pull request on GitHub. If not, reply in the same session with what to change.

## Step 3: Put it online, privately at first

1. On vercel.com: Add New, then Project, then import `verspui-site` (let Vercel see the repository if it asks), then Deploy. Vercel recognises the setup by itself.
2. Use the Pro plan. Vercel's free Hobby plan is for non-commercial use only.
3. You get a `vercel.app` address to review. Until you launch, the site tells search engines to ignore it.

## Step 4: Answer the [CONFIRM] items

Start a new Claude Code session on the repository and send all your answers in one message, for example: "Show my name as …. Harvard wording: …. LinkedIn links: …. Remove the line about …." It updates the files and opens a pull request. Merge it.

## Step 5: Domain, email, launch

The site uses erikverspui.com for now.

1. In GoDaddy, remove the forwarding from erikverspui.com to Erik's Signal profile.
2. In Vercel, open your project, then Settings, then Domains. Add erikverspui.com and copy the records Vercel shows into GoDaddy's DNS settings.
3. Make sure hello@erikverspui.com receives email (Google Workspace, GoDaddy email or a forwarding service all work), or tell Claude Code which address to show instead.
4. Tell Claude Code: "Set LAUNCHED to true." Merge the pull request.
5. When the Thai holding company exists, send Claude Code its registered name and registration number for the footer.

If you move to a permanent domain later: add it in Vercel, ask Claude Code to change SITE_URL, and keep erikverspui.com redirecting to the new domain for good (Vercel does this in Settings, then Domains). Start the off-site work in docs/seo-plan.md only once the domain is final, because every link you earn sticks to the domain it points at.

## Step 6: After launch (once, about 30 minutes)

1. Google Search Console: add the domain, verify it with the DNS record it gives you, and submit `/sitemap-index.xml`.
2. Bing Webmaster Tools: the same. Bing powers Microsoft Copilot.
3. In Vercel, open your project, then Analytics, and turn on Web Analytics.
4. Update both LinkedIn profiles with the standard description in `docs/seo-plan.md` and a link to the site.

## Kickoff prompt (Step 2)

```
Read CLAUDE.md, then every file in docs/. Build the Verspui website as specified there. Don't stop to ask me questions: when something is unclear, make the most reasonable choice, note it, and keep going.

Work in this order:
1. Copy docs/write-note-skill.md to .claude/skills/write-note/SKILL.md.
2. Before writing any code, write docs/design-plan.md: restate the design system from docs/design.md in your own words, draw ASCII wireframes of every section at phone and desktop width, and list anything in the spec you think won't work and what you'll do instead. Then continue.
3. Set up the project as described in CLAUDE.md, with src/config.ts holding the placeholders and LAUNCHED set to false.
4. Build the breeze-block library in src/illustrations/ and a development-only page at /dev/modules that shows every module and the full hero wall. Get the modules right before building any page.
5. Build the page section by section, in the order of docs/content.md, using the copy word for word.
6. Set up Notes as described in docs/seo-plan.md. Don't write any articles. Hide Notes everywhere while none are published.
7. Do everything under "Built into the site" in docs/seo-plan.md.
8. Check your work as described in CLAUDE.md: screenshots, review against the checklist in docs/design.md, fix, and repeat at least twice. Commit the final screenshots to qa/screenshots/.
9. Open a pull request. In the description: what you built, the choices you made where the spec left room, every [CONFIRM] item still open, and anything you couldn't do and why.
```

## Notes prompt (any time after Step 2)

For this, Claude needs to read Thai government and news sites, which the Default environment blocks. Before sending, open the environment selector under the message box, choose New environment, name it Research, set Network access to Full, and add it. Use Research for this session and for the monthly routine below; use Default for everything else.

```
Use the write-note skill to draft the five launch notes listed in docs/seo-plan.md. Keep every note as draft: true. Open a pull request that lists, for each note, its sources and every statement a Thai lawyer should check.
```

Read every note. Have a Thai lawyer check the legal ones. Then tell Claude Code which notes to publish.

## Monthly upkeep (optional)

At claude.ai/code/routines, create a monthly routine on this repository using the Research environment, with this prompt:

```
Monthly upkeep for the Verspui site:
1. Search for changes in the past 30 days to Thai rules on foreign ownership, nominee enforcement, and foreign ownership of property in Phuket.
2. If a change matters to our readers, use the write-note skill to draft a new note or update an existing one, and set its updated date. Keep it as draft: true.
3. Run the build and check links, the sitemap and the structured data.
4. Open a pull request that says what changed and why. Never publish a note; Cath decides.
```
