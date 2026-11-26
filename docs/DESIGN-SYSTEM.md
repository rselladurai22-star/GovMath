# SumAtlas design system (November 2026)

The site-wide look since November 2026. The owner asked for a redesign that
reaches the design quality of ET Money (etmoney.com), the Indian investing
app's website: its typography, hierarchy, density and controls. The colours,
logo and brand stay SumAtlas's own. This file records how the reference was
studied, what was taken from it, what was changed and where the code lives.

## 1. How the reference was studied

- **Pages.** The reference's 22 sitemaps list about 27,000 addresses. Most
  come from a few templates: about 18,600 stock pages in 7 templates, about
  5,600 fund-scheme pages in 4 templates, and 700 ETF pages in 3 templates.
  The crawl covered:
  - **every** hand-designed page: home, 13 product pages, all 32
    calculators, 21 FD pages, 13 insurance pages and all 285 mutual-fund
    listing pages;
  - 3 samples of each repeating template;
  - 10 help articles and 15 learn articles.

  That makes 430 pages at 1440px and 70 at 390px (one per template, plus
  every calculator and the main pages).
- **What was recorded per page** (Playwright, computed styles):
  - for every visible text element: font family, size, weight, line height,
    letter spacing and colour, weighted by text length;
  - backgrounds weighted by area, radii, shadows, borders and transitions;
  - container widths and CSS custom properties;
  - the styles of headings, buttons, inputs, sliders, tables, cards, tabs,
  FAQs, breadcrumbs, header and footer;
  - a full-page screenshot per template.

  All 74 stylesheets and 14 font files were downloaded for analysis only.
  The raw data stayed in the session's scratch folder; it is not in the repo.
- **Inaccessible:** `https://www.etmoney.com/health-insurance` at 1440px. The
  browser context closed during capture. The page's 390px view and the 12
  other insurance pages were captured. Pages that robots.txt disallows (for
  example `/credit-score` and `/earn`) were not crawled.

## 2. What the reference does (measured)

| Area | Reference value |
|---|---|
| Text font | Proxima Nova: regular, semibold and bold (commercial, Mark Simonson) |
| Heading font | Cabinet Grotesk: bold and extrabold (Indian Type Foundry) |
| Text sizes by use | 14px (most), 16px, 18px, 15px, 12px, 22px |
| Body text | 15/19 to 16/22, colour #666 |
| Headings and values | #222 |
| Muted text | #9a9a9a. It fails WCAG AA on white, so it is not used here |
| Calculator page title | 28/32, heading font, centred, over a 16/20 #666 subtitle |
| Calculator box | #f9f8f3, 1px #ddd border, radius 4, padding 32px |
| Calculator box title | 22/26, heading font |
| Fields | label 16px #666 on the left; value on the right in the heading font, 18/22 bold, over a 1px #ddd bottom rule |
| Sliders | 4px track (#ddd, radius 10) with a fill; 20px white thumb with a 2px brand ring and a 0 0 4px rgba(0,0,0,.18) shadow |
| Results | white inner card, 1px #ddd border, radius 4; rows of label (16px) and value (22px bold), the first value in the brand colour; donut or stacked bars with dashed row dividers (EMI calculator) |
| Content | "All you need to know about …": a sticky 320px question menu (18/22 semibold, 1px #ddd right border, a 4px brand bar on the active item) beside answers (20/24 titles, 15/19 text) |
| FAQ | centred 810px column, 28/32 title, one row per question, question in the heading font at 16px |
| Listing pages | white title band (h1 28/34); cards are white, radius 8, shadow 0 0 4px rgba(0,0,0,.18), no border; 22px title, 16px #666 text, outlined pill button (radius 30, 14px/600) |
| Tables | FD rate tables: white with a 1px #ddd grid, bold header row, 12px to 16px cell padding |
| Header | 66px bar, 16px nav labels |
| Footer | charcoal #212426 |
| Motion | 0.2s colour and opacity transitions; 0.5s on accordion arrows |
| Containers | 1100px (calculator pages), 1250px (listings) |

## 3. Fonts

The reference's font files are commercial (Proxima Nova) or were served from
its own CDN, so none were used. Each candidate open-licence font was rendered
beside the real one at the same size and text, and the closest pair chosen:

- **Text: Figtree** (OFL). Nearly the same width, x-height and letter shapes
  as Proxima Nova at 16px. The others tried: Mulish, Nunito Sans,
  Montserrat (too wide), Inter, Hanken Grotesk and Instrument Sans.
- **Headings and figures: Hanken Grotesk** (OFL), weights 600, 700 and 800.
  Its grotesk character is closest to Cabinet Grotesk's. The others tried:
  Schibsted Grotesk (too heavy), Familjen Grotesk, Bricolage Grotesque,
  Instrument Sans and Figtree.

Both are self-hosted from `@fontsource` 5.3.0 (Latin, 11 to 14 KB a weight,
smaller than Inter's 24 KB). The root layouts preload Figtree 400 and Hanken
Grotesk 700. Inter stays in the font stack as a fallback. This replaces the
handoff's "the font is Inter" rule at the owner's request.

## 4. Colour: three palettes compared

| Palette | Primary | Accent | Verdict |
|---|---|---|---|
| **A. Claret** (chosen) | #8c1d40 (9.5:1 on white) | amber #a8631a | The brand's own colour, used in the logo and favicon and already known to returning visitors. It reads as established and serious, like a UK institution, and nothing like the reference's green. |
| B. Oxford navy | #1b3a6b | gold #b8860b | Authoritative, but generic for UK finance (banks, GOV.UK-like), and it would clash with the claret logo. |
| C. Deep teal | #0f5c63 | coral #d0573a | Modern, but too close to the reference's green family, and it would also need a new logo. |

Neutrals follow the reference's warm system:

| Token | Value | Use |
|---|---|---|
| ink | #222 | headings and values |
| text | #4d4d4d | reading text, darker than the reference's #666 (8.4:1) |
| text-2 | #666 | labels |
| muted | #757575 | small print, the lightest text allowed (4.6:1) |
| line | #ddd | borders |
| line-soft | #ebe8e0 | dividers |
| surface | #f9f8f3 | warm panels |

Data colours keep the existing chart order: blue, orange, aqua, violet,
yellow.

## 5. Page-by-page mapping

| SumAtlas page or section | Reference page | Reference component | Reproduced | Adapted for SumAtlas |
|---|---|---|---|---|
| Header (every page) | all pages | top bar | 66px height, 15 to 16px medium labels, flat with a hairline | white, not charcoal, so the claret logo stays legible; mega menus and search kept |
| Breadcrumb | calculators | `.breadcrumb-list` | 14/20, links in the brand colour, › separators | — |
| Calculator title and lead | SIP, EMI calculators | `section-title-md`, `section-subtitle` | centred h1 in the heading font, #666 lead | 30/36 (the reference's 28/32 was a little tight); trust line kept under it |
| Calculator box | SIP, EMI calculators | `.calci-main__container` | warm #f9f8f3 box, 1px #ddd, radius 4, 32px padding, 22px box titles | form beside the results (two columns), not inputs across the top: SumAtlas forms have 3 to 15 fields plus More options |
| Fields | SIP calculator | `.calci-label__elements`, `.form-ctrl` | label left (16px #666); value right in the heading font (18px bold) on a bottom rule; brand caret | £ and % stay inside the value box |
| Sliders | SIP, EMI calculators | `.input-slider` | 4px track, brand fill, 20px white thumb with a 2px brand ring | hover and focus halo for keyboard users |
| Dropdowns, dates | FD pages | deposit widget | white box, 1px #ddd border, radius 4 | 3+ options still use the custom dropdown (owner's rule) |
| More options | calculator sidebars | `.misc-title` panel | white panel, radius 4, heading-font title | — |
| Calculate button | FD page | "Compare & Invest" | solid brand pill | full width in the form |
| Results card | EMI calculator | result list and donut | white card, 1px #ddd; headline row; donut; rows with dots, dashed dividers, 18px bold values | headline figure in a claret-tint band; share pills kept |
| Results in detail | FD pages | highlight cards | white cards, 1px #ddd, radius 4; heading-font figures | — |
| Related calculators | calculator pages | "Most Used Calculators" panel | white title bar over a warm list of brand links | blurb under each link; sidebar from 1200px, grid below it |
| Guide | SIP calculator | `.sec-ques-ans` | centred "All you need to know" heading; sticky left menu with a right rule and a 4px brand bar; 22px titles; numbers and kickers hidden | text 16/26 #4d4d4d (the reference's 15/19 #666 is too tight for 2,000-word guides) |
| Guide figures and examples | FD pages | highlights card | warm tiles; claret heading-font figures | callouts in amber, the second colour |
| Tables | FD pages | rate tables | white, warm header row, 1px rules, 12px/16px padding, sentence-case headers | rules on rows only (lighter); the current row in a claret tint |
| FAQ | SIP calculator | `.section-common-faq` | centred 840px column, 28px title, one ruled row per question, heading-font questions, round + button | questions not numbered |
| Home hero (`/uk`, `/`) | home | hero | 52/58 extra-bold headline on a light band, solid pill button | last line in claret with a soft underline |
| Topic, all-calculators and hub pages | tools-and-calculators | card grid | white title band; cards with radius 8 and a 0 0 4px shadow, no border; outlined pill actions; pill topic links | lift on hover; claret icon tiles |
| Grey bands | listings | #f9f8f3 band | warm band | — |
| Articles and content pages | learn | article body | heading font for titles; 17/28 text | — |
| Footer | all pages | footer | flat band with a hairline | warm, not charcoal: the logo's dark wordmark and white Σ would vanish on charcoal |

## 6. Where it lives

- `public/gm/sumatlas-ds.css`: tokens (`--sa-*`), fonts and every component
  rule. It is loaded last on every page (`THEME_AFTER` in
  `src/gm/GmShell.tsx`), after `govmath-theme.css`. Rules are scoped to
  `.gm-claret` (the page wrapper) and `.gm-neutral` (main), so they win
  over the older theme at equal weight by coming later. Use the tokens for
  any new component.
- The calculator look: `FlagshipPage` defaults to `look="atlas"`. `Studio`
  gives the section the class `gm-atlas` and keeps the answer band, donut
  (`Ring`) and legend markup. The salary and mortgage package pages carry
  `gm-atlas` on `section.calculator` in their JSON; `packageDonut.ts` draws
  their donut. Rules aimed at the calculator page use
  `.gm-neutral:has(.calculator.gm-atlas)`, so React pages and package pages
  look the same.
- Embeds keep the "modern" look, but take the new fonts and tokens.
- **Rolling back:** remove `sumatlas-ds.css` from `THEME_AFTER`, set the
  `FlagshipPage` default back to `"indus"`, and change the two JSONs back to
  `gm-indus`. The Indus rules and Source Sans files are still in place for
  that.

## 7. Accessibility checks

- Every text token meets WCAG AA on white and on the warm surface.
- The reference's #9a9a9a labels were not copied.
- Focus is visible everywhere: a 2px claret-pink ring, a halo on slider
  thumbs, a tint ring on boxes.
- The site-wide contrast check (text under 4.5:1, or under 3:1 for large
  text) runs over every sitemap page at 1440px and 390px. Its results are in
  `docs/HANDOFF.md`.
