# Design plan

Written before building, from `docs/design.md`, and kept up to date with the choices made during the build.

## The system in brief

One material, used with restraint: the concrete breeze block of Thai tropical modern buildings. It stands for a partner who is solid but hides nothing. The hero wall is the only loud thing on the site. Everything else is type, space and two quiet surfaces.

- **Surfaces.** Canopy (deep green) for the hero and contact. Plaster (warm grey-white) for everything else. Nothing else fills a surface.
- **Colour roles.** Canopy is also the text colour on Plaster; Moss is secondary text there. Plaster is the text colour on Canopy; Celadon is secondary text there. Turmeric appears only on Canopy: link hover, focus ring, and the one Mark module in the hero. Teak appears only on Plaster: link hover and focus ring. No other colours, no gradients, no shadows, no transparency on text.
- **Type.** Archivo (wide, 115%, weight 600) for the wordmark, headings and small interface text. Newsreader (optical sizes on, weight 400) for everything people read. Sentence case. Sizes scale smoothly from phone (390px) to desktop (1440px) with `clamp()`. Body text is held to 60–68 characters a line.
- **Grid.** Twelve columns, 1240px at most, 24px gutters, side margins `clamp(20px, 5vw, 72px)`. On desktop each section puts its heading in columns 1–4 and its content in 5–11; column 12 stays empty. Phones get one column. Space separates sections: no rules, no cards, no boxes.
- **Illustration.** Six square modules drawn on a 120-unit tile with a 10-unit border and 6-unit joints. On Plaster the block face is Canopy with its openings cut out. In the hero only the openings are drawn, in Plaster: light coming through shade.
- **Motion.** One moment: on first load the hero openings brighten row by row with a slight diagonal delay (about 1.6 seconds), and the Mark turns Turmeric last. Pure CSS; reduced-motion users see the final state at once.

## Wireframes

### Phone (390px)

```
┌──────────────────────────┐
│ Verspui          Contact │  Canopy
│                          │
│ A strategic              │
│ Thai partner in          │
│ business and             │
│ real estate.             │
│                          │
│ Intro, 6–7 lines         │
│                          │
│ Write to us at hello@…   │
│                          │
│ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ │  band, 4 modules tall,
│ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ │  whole module at the left
│ ○ ✿ V ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ │  margin, bleeds off the right
│ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ │
├──────────────────────────┤
│ How we partner           │  Plaster
│ Our own capital. …       │
│ A real seat … (rows)     │
│ We never hold shares …   │
│                          │
│ What we bring            │
│ Intro, six rows          │
│                          │
│ Track record             │
│ Lead                     │
│ [▣] Pad Thai Padel       │  56px module tile, then text
│     one line, one or two │
│ [▣] Lazy Tiger Fitness … │
│                          │
│ Partners                 │
│ Surekha Verspui          │
│ Partner, bio, LinkedIn   │
│ Erik Verspui …           │
│                          │
│ Who we work with         │
│ four rows, closing line  │
├──────────────────────────┤
│ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ │  Canopy, edge strip
│ Talk to us               │
│ Text                     │
│ hello@erikverspui.com    │  section-heading size
│ Copy address             │
├──────────────────────────┤
│ Verspui                  │  Plaster footer, stacked
│ Verspui Family Office    │
│ Phuket and Bangkok, …    │
│ email, LinkedIn, Privacy │  (one item per row)
└──────────────────────────┘
```

### Desktop (1440px)

```
┌───────────────────────────────────────────────────────────────────────┐
│ Verspui                           Approach Track record Partners Contact│ Canopy
│                                  ─ ─ ─ ─ ─ ─ ─ ─ ─ (top row cut)       │
│ A strategic                      ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿                    │
│ Thai partner in                  ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○   wall: columns 7+, │
│ business and                     ✿ ○ V ○ ✿ ○ ✿ ○ ✿   bleeds off top,   │
│ real estate.                     ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○   right and into    │
│                                  ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿   the strip         │
│ Intro (columns 1–6)              ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○                    │
│ Write to us at hello@…           ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿                    │
│○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○  strip   │
├───────────────────────────────────────────────────────────────────────┤
│ How we partner        │ Our own capital. We invest …          │       │ Plaster
│ (columns 1–4)         │ (columns 5–11, 60–68 characters)      │ (12)  │
│                       │                                       │       │
│ What we bring         │ Intro, six rows                       │       │
│ Track record          │ Lead; [▣] entries                     │       │
│ Partners              │ Surekha, then Erik, stacked           │       │
│ Who we work with      │ four rows, closing line               │       │
│ Notes (hidden)        │ latest three, All notes               │       │
├───────────────────────────────────────────────────────────────────────┤
│○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○  strip   │ Canopy
│ Talk to us            │ Text                                  │       │
│                       │ hello@erikverspui.com   Copy address  │       │
├───────────────────────────────────────────────────────────────────────┤
│ Verspui               │ email            │ Privacy                    │ Plaster
│ Verspui Family Office │ Surekha on LI    │ © 2026 Verspui             │
│ Phuket and Bangkok    │ Erik on LI       │                            │
└───────────────────────────────────────────────────────────────────────┘
```

Tablet (834px) uses the phone layout with the full header navigation; the two-column section pattern starts at 960px.

Notes listing and note pages use the same heading/content split on Plaster, with the module tile named in each note's frontmatter.

## Where the spec doesn't quite work, and what I did instead

1. **Petal geometry.** Quarter-circle arcs of radius 60 from the tile corners either run through the 10-unit border or leave hair-thin slivers at the edge midpoints. I used the same construction fitted to the 100-unit face: each petal is the lens between two quarter-circle arcs centred on the middles of neighbouring edges, running from the centre to a corner, with the arcs pulled in by half a web (radius 46) so the petals stay clear of each other and of the border. It reads as the classic four-petal flower.
2. **Diamond.** If the diamond and the four corner triangles are all openings, nothing would hold them apart. The diamond's outline is an 8-unit solid web; the diamond inside it and the four corner triangles are the openings.
3. **Step.** Three nested square openings: two square rings and a centre square, separated by 8-unit webs.
4. **Hero headline.** At 72px in a wide cut, the headline cannot sit on two lines next to an eight-column wall. It runs to four lines in columns 1–6; the wall fills columns 7–12 and bleeds off the right.
5. **Wall and strip.** The hero wall and its bottom edge strip are one drawing on one grid, so the strip simply continues the wall's last row to the left under the text. The wall's left edge sits exactly on column 7, so no module there is cut; the strip runs off both sides of the screen. The contact strip uses the same grid. On desktop the hero stage is always 8.6 modules tall (the strip, seven rows, and a row cut 40% by the top edge, so the Mark is in row 4), and the module pitch is chosen per band of screen widths (about 88–108px) so the right edge of the screen always cuts through the middle of a module rather than a joint.
6. **The Mark on phones.** The phone band is four modules tall and its bottom row doubles as the edge strip, so the Mark sits in row 3, column 3 rather than row 4.
7. **Navigation links.** Header links are not underlined until hover (or when they mark the current page), so the header stays quiet. Every other link is underlined as specified.
8. **Contact email on narrow screens.** At section-heading size the address is wider than a small phone, so its size is the smaller of the section-heading size and (screen width − both margins) ÷ 12.4, which keeps it on one line down to 320px. Letter-spacing −0.01em applies only from 1440px, where section headings reach 36px.
11. **Tap targets.** Links that stand alone on a short line (the hero email, the 404 link, the privacy email, note sources) get 13px of inline padding, which makes the tap area 44px tall without moving the text.
12. **Motion timing.** Openings in the visible rows light up row by row with a 20ms diagonal step, finishing at 1.1s; the Mark turns Turmeric from 1.1s to 1.6s. Rows clipped above the top edge light with the first visible row.
9. **Notes while none are published.** The Notes link, home section, listing page, sitemap entries and `llms.txt` entries all disappear. The listing page is not built at all.
10. **[CONFIRM] markers** render only while `LAUNCHED` is false, styled with a dashed Teak outline so they stand out in previews.
