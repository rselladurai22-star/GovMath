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

- **Headings and figures: Cabinet Grotesk**, the reference's own heading
  font, in weights 500, 700 and 800. It has been used since the owner chose
  it on 26 November 2026; Hanken Grotesk stood in before that.
  - It was downloaded unmodified from Fontshare, not from the reference's
    CDN.
  - Its licence is the ITF Free Font License 2.0, which allows commercial
    use and self-hosting through `@font-face`.
  - Don't subset or convert the files: the licence treats modified font
    files as derivative work.
- **Text: Figtree** (OFL), the closest free match to the reference's
  Proxima Nova, which is commercial. It was chosen by rendering it beside the
  real font against Mulish, Nunito Sans, Montserrat, Inter, Hanken Grotesk
  and Instrument Sans.
  - It comes from `@fontsource` 5.3.0 (Latin subset, about 11 KB a weight).
  - Switching to the real Proxima Nova would need a paid web licence or an
    Adobe Fonts plan.

The root layouts preload Figtree 400 and Cabinet Grotesk 700. Inter stays in
the font stack as a fallback.

## 4. Colour

**The first version (PR 90)** kept SumAtlas's claret and compared three
palettes:
- claret, the brand's own colour;
- Oxford navy;
- deep teal.

**The owner then chose the reference's own colour system with a new green
brand** (26 November 2026). Green in this design means a colour close to the
reference's #00B852 but not the same. It takes three roles, each checked for
contrast:

| Token | Value | Use | Contrast |
|---|---|---|---|
| brand | #057a3c | links and green text | 5.4:1 on white, 5.1:1 on the warm panel |
| brand-fill | #00a651 | slider fill, thumb ring, active bars, focus ring | 3.2:1, enough for graphics |
| brand-btn | #06813f | buttons with white text | 5.0:1 |
| brand-figure | #0a9a4c | large result figures (22px+ bold) | 3.7:1 |
| dark | #212426 | header bar (the reference's --primary-black) | white text 15.6:1 |
| footer | #222 | footer band | |
| ink | #222 | headings and values | |
| text-2 | #666 | labels and reading text (the reference's colour) | 5.7:1 |
| muted | #696969 | small print | 5.7:1 on white, 5.3:1 on the warm panel |
| line | #ddd | borders and table grids | |
| surface | #f9f8f3 | calculator panel, listing-page band | |

Two of the reference's own values are **not** copied, because they fail WCAG
AA:
- its #00B852 green for text and button fills (2.6:1 on white);
- its #9a9a9a grey for labels (2.8:1).

**Charts in results** use the reference's violet-blue #6880c8 (what you keep
or borrow) and gold #d8962a (tax or interest).
- This covers the donut, split bars and the salary and mortgage charts.
- Guide charts keep the older blue and orange: their white labels need the
  darker blue.

**Logo:** the same mark, recoloured from claret to green #00a651.
- `sumatlas-logo-dark-*.webp` has a white "Atlas" for the charcoal header
  and footer.
- `sumatlas-logo-green-*.webp` is for light backgrounds (embeds).
- The green mark and icons are `sumatlas-mark-green-512.png` and
  `sumatlas-icon-green-*.png`, plus the app icons and favicon.

## 5. Page-by-page mapping

| SumAtlas page or section | Reference page | Reference component | Reproduced | Adapted for SumAtlas |
|---|---|---|---|---|
| Header (every page) | all pages | top bar | charcoal #212426, 66px height, white 15 to 16px labels, green on hover | mega menus, search (on a dark field) and the country menu kept |
| Breadcrumb | calculators | `.breadcrumb-list` | 14/20, links in the brand colour, › separators | — |
| Calculator title and lead | SIP, EMI calculators | `section-title-md`, `section-subtitle` | centred h1 in the heading font, #666 lead | 30/36 (the reference's 28/32 was a little tight); trust line kept under it |
| Calculator box | SIP, EMI calculators | `.calci-main__container` | warm #f9f8f3 box, 1px #ddd, radius 4, 32px padding, 22px box titles | form beside the results (two columns), not inputs across the top: SumAtlas forms have 3 to 15 fields plus More options |
| Fields | SIP calculator | `.calci-label__elements`, `.form-ctrl` | label left (16px #666); value right in the heading font (18px bold) on a bottom rule; brand caret | £ and % stay inside the value box |
| Sliders | SIP, EMI calculators | `.input-slider` | 4px track, brand fill, 20px white thumb with a 2px brand ring | hover and focus halo for keyboard users |
| Dropdowns, dates | FD pages | deposit widget | white box, 1px #ddd border, radius 4 | 3+ options still use the custom dropdown (owner's rule) |
| More options | calculator sidebars | `.misc-title` panel | white panel, radius 4, heading-font title | — |
| Calculate button | FD page | "Compare & Invest" | solid brand pill | full width in the form |
| Results card | EMI calculator | result list and donut | white card, 1px #ddd; headline row (grey label, large green figure); donut in violet-blue and gold; rows with dots, dashed dividers, 18px bold values | share pills kept |
| Results in detail | FD pages | highlight cards | white cards, 1px #ddd, radius 4; heading-font figures | — |
| Related calculators | calculator pages | "Most Used Calculators" panel | white title bar over a warm list of brand links | blurb under each link; sidebar from 1200px, grid below it |
| Guide | SIP calculator | `.sec-ques-ans` | centred "All you need to know" heading; sticky left menu with a right rule and a 4px brand bar; 22px titles; numbers and kickers hidden | text 16/26 #4d4d4d (the reference's 15/19 #666 is too tight for 2,000-word guides) |
| Guide figures and examples | FD pages | highlights card | warm tiles; green heading-font figures | callouts in amber, the second colour |
| Tables | FD pages | rate tables | white, a full 1px #ddd grid, bold header row, 12px/16px padding | the current row in a green tint |
| FAQ | SIP calculator | `.section-common-faq` | centred 840px column, 28px title, one ruled row per question, heading-font questions, round + button | questions not numbered |
| Home hero (`/uk`, `/`) | home | hero | 52/58 extra-bold headline on a light band, solid pill button | last line in green with a soft underline |
| Topic, all-calculators and hub pages | tools-and-calculators | card grid | white title band; cards with radius 8 and a 0 0 4px shadow, no border; outlined pill actions; pill topic links | lift on hover; green icon tiles; the cards sit on the warm band, the title band stays white |
| Grey bands | listings | #f9f8f3 band | warm band | — |
| Articles and content pages | learn | article body | heading font for titles; 17/28 text | — |
| Footer | all pages | footer | charcoal #222, white links, grey small print | logo in its white-wordmark version |

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
- Embeds (`/embed/…`) use the same "atlas" calculator look: the embed page wraps its studio in `LookProvider`.
- **Rolling back:** remove `sumatlas-ds.css` from `THEME_AFTER`, set the
  `FlagshipPage` default back to `"indus"`, and change the two JSONs back to
  `gm-indus`. The Indus rules and Source Sans files are still in place for
  that.

## 7. Accessibility checks

- Every text token meets WCAG AA on white and on the warm surface.
- The reference's #9a9a9a labels were not copied.
- Focus is visible everywhere: a 2px green ring, a halo on slider
  thumbs, a tint ring on boxes.
- The site-wide contrast check (text under 4.5:1, or under 3:1 for large
  text) runs over every sitemap page at 1440px and 390px. Its results are in
  `docs/HANDOFF.md`.
