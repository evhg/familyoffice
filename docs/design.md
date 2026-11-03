# Design

## Concept: the breeze block

Thai tropical modern buildings of the 1960s and 70s used concrete ventilation blocks, often called breeze blocks, to build walls that are solid but let air and light through. That is the idea for Verspui: a substantial partner with nothing hidden.

Every visual on the site comes from this one material: geometric screen blocks, drawn precisely, in a few colours taken from Thai buildings and materials (canopy green, lime plaster, celadon, turmeric, teak).

This is not tourist Thailand. No temples, no beaches. Think of a quiet, well-made building in Bangkok or Phuket Old Town, in the shade of trees.

The hero screen wall is the one bold thing on the site. Everything else stays quiet.

## Colour

| Name | Hex | Use |
|---|---|---|
| Canopy | `#1F3A2E` | Dark surfaces (hero, contact); main text colour on light surfaces |
| Plaster | `#E4E4DA` | Light surfaces; text on dark surfaces; light coming through the hero wall |
| Moss | `#4C5E54` | Secondary text on Plaster |
| Celadon | `#9DB8A6` | Secondary text on Canopy; illustration |
| Turmeric | `#D7A23F` | On Canopy only: links, focus ring, the Mark module in the hero |
| Teak | `#7A4E2D` | On Plaster: link hover, focus ring; illustration accent |

Approximate contrast (check each with a contrast tool): Canopy on Plaster 9.6:1, Moss on Plaster 5.3:1, Plaster on Canopy 9.6:1, Celadon on Canopy 5.8:1, Turmeric on Canopy 5.5:1, Teak on Plaster 5.5:1.

Use no other colours: no pure black, no pure white, no gradients, no opacity tricks that create new colours on text.

## Type

- **Archivo** (variable): wordmark, headings, navigation, small interface text. Headings at width 112–118, weight 560–620. Wordmark "Verspui" at width 125, weight 600. Sentence case everywhere. Letter-spacing −0.01em from 36px up, 0 below.
- **Newsreader** (variable, optical size on): all reading text, the hero intro, Notes articles. Weight 400. Italics only for the titles of publications.
- Sizes in pixels, desktop / phone, scaled smoothly between with `clamp()`:
  - Hero headline 72 / 40
  - Section heading 36 / 28
  - Item heading 24 / 21
  - Intro text 24 / 21
  - Body 21 / 18
  - Small 16 / 16
- Line height: body 1.55, headings 1.08–1.15.
- Line length for body text: 60–68 characters. Never more than 72.
- Figures: lining; tabular where numbers line up.

If Archivo's widest cut looks mechanical in screenshots, use width 100–106 at a heavier weight instead, and note it in the pull request.

## Layout

- 12-column grid, maximum width 1240px, side margins `clamp(20px, 5vw, 72px)`, gutter 24px.
- Left-aligned, ragged right. Nothing centred except the module sheet at `/dev/modules`.
- Desktop section pattern: heading in columns 1–4, content in columns 5–11, column 12 empty. Phones: one column.
- Space between sections: `clamp(96px, 14vw, 192px)`. Space separates sections. No horizontal rules.
- Surfaces: hero and contact on Canopy, everything else on Plaster. A single row of breeze blocks marks the bottom edge of the hero and the top edge of contact, and appears nowhere else.
- No cards and no shadows. Lists are rows of text separated by space.

Hero, desktop:

```
┌────────────────────────────────────────────────────────────────────┐
│ Verspui                    Approach  Track record  Partners  Contact│
│                                                                    │
│ A strategic Thai partner             ○ ✿ ○ ✿ ○ ✿ ○ ✿               │
│ in business and real estate.         ✿ ○ ✿ ○ ✿ ○ ✿ ○   wall bleeds │
│                                      ○ ✿ ○ ✿ ○ ✿ ○ ✿   off the top,│
│ Intro (Newsreader, 2–3 lines)        ✿ ○ V ○ ✿ ○ ✿ ○   right and   │
│                                      ○ ✿ ○ ✿ ○ ✿ ○ ✿   bottom      │
│ Write to us at hello@…               ✿ ○ ✿ ○ ✿ ○ ✿ ○               │
│○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿ ○ ✿  (strip)   │
└────────────────────────────────────────────────────────────────────┘
```

Hero, phone: wordmark and a "Contact" link; headline; intro; email; then the wall as a full-width band four modules tall.

## Illustration: the breeze-block library

All illustration is built from square modules drawn in SVG on a 120 × 120 unit tile. Each module is a block face with openings. On Plaster surfaces, draw the face in Canopy with the openings cut out (`fill-rule: evenodd`) so the surface shows through. In the hero, draw only the openings, as Plaster shapes on the Canopy field: the wall reads as light coming through shade.

Geometry is exact (circles, arcs, straight lines), with a solid border 10 units wide around each module and a 6-unit joint between modules. No hand-drawn wobble.

Modules:

1. **Ring**: one circular opening, diameter 84, centred.
2. **Petal**: openings defined by quarter-circle arcs of radius 60 from each corner, the classic four-petal block.
3. **Diamond**: a square opening rotated 45°, its points touching the middle of each inner edge, leaving four triangular openings in the corners.
4. **Step**: three nested square openings stepping inwards, like a stack of frames.
5. **Wave**: two half-circle openings back to back and offset, forming an S.
6. **Mark**: an opening in the shape of a wide V, on the same grid. This is the Verspui mark.

Where they appear:

- **Hero wall**: Ring and Petal in a checkerboard, about 8 columns by 7 rows on desktop, bleeding off the top, right and bottom edges, never cut at its left edge. Exactly one Mark, in row 4, column 3, with its opening in Turmeric.
- **Edge strips**: one row of modules at the bottom of the hero and the top of contact.
- **Track record**: each entry gets a different module as a 56px tile beside its name.
- **Notes**: each note gets the module named in its frontmatter as a small tile.
- **Favicon and share image**: the Mark module.
- **Partners (optional)**: a Ring tile for Surekha and a Petal tile for Erik. Keep only if the screenshots look better with them.

All illustrations are decorative: `aria-hidden="true"`, no alt text.

## Motion

One moment only. On first load, the hero openings light up in a slow sequence (row by row, with a slight diagonal delay, about 1.6 seconds in total), ending with the Mark turning Turmeric. Pure CSS. With `prefers-reduced-motion`, show the final state immediately.

Nothing else moves: no scroll reveals, no parallax, no hover effects beyond link colour and underline, no smooth-scroll library.

## Components

- **Header**: wordmark on the left. Section links on the right on desktop; on phones, only the wordmark and a "Contact" link. Not sticky.
- **Links**: underlined, 1px thick, offset 0.18em. On hover the colour changes (Teak on Plaster, Turmeric on Canopy). No arrows.
- **Email in contact**: the address at section-heading size as a mailto link, followed by a small "Copy address" text button with an underline (not a pill) that reads "Copied" for two seconds.
- **Track record entry**: module tile, company name (Archivo, item-heading size), one line about the company, one or two lines on what we did. No logos.
- **Partner**: name (item heading), the word "Partner", bio paragraph, and a link labelled "Surekha on LinkedIn" or "Erik on LinkedIn".
- **Notes listing**: title, date, one-line summary.
- **Note page**: title; byline; published and updated dates; body; sources; disclaimer; link back to Notes.
- **Footer** (on Plaster): wordmark, "Verspui Family Office", "Phuket and Bangkok, Thailand", email, LinkedIn links, Privacy, © year. Laid out in columns, with no separators between items.

## Banned: these make a site look template-made

- Cream backgrounds near `#F4F1EA`; terracotta or clay accents near `#D97757`
- All-caps labels; small labels above headings; labels written as "WORD — fragment"
- Text joined with middle dots ("A · B · C")
- Arrows (→, ↗) on links or buttons; "Learn more", "Get started", "Book a call"
- Monospace fonts
- Big number with a small label as a stat block
- Cards, rounded content boxes, drop shadows, gradients, glass effects, blurred blobs, glows, grain or noise textures
- Icon sets (Lucide, Heroicons, Font Awesome), emoji, stock photos, AI-generated images, drawings of people or hands
- Numbered markers (01, 02, 03): nothing on this site is a sequence
- One word in a headline set in italic, bold or another colour
- Centred body text
- Sections that fade or slide in on scroll; parallax; marquees; custom cursors; scroll hijacking
- Logo walls, "Trusted by", "As seen in"
- Thai clichés: elephants, Buddha images, temples, the Garuda emblem, flags, tuk-tuks, palm trees, beaches, lotus flowers, spirit houses, fake-Thai lettering
- Hamburger menus (there's nothing to hide)

## Screenshot checklist

At phone, tablet and desktop width:

1. In three seconds, can a stranger tell who we are, what we do and how to reach us?
2. Is anything from the banned list on screen?
3. Do the modules sit on the grid with even joints, and is no module cut at the left edge of the wall?
4. Is body text 60–68 characters wide, and every text contrast at least 4.5:1?
5. Is there any sideways scrolling at 320px? Are tap targets at least 44px tall?
6. Is the hero wall the only bold thing on the page?
7. Remove one element. Is the page better? If yes, leave it out.
