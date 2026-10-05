# GovMath

Free UK calculators with plain-English guides, live at [govmath.co.uk](https://govmath.co.uk).

Built with Next.js 16 (App Router) and React 19. The look comes from the approved GovMath design package in `public/gm/`; the calculation engines are pure, tested TypeScript modules under `src/lib/`.

## Commands

```bash
npm install
npm run dev     # local development
npm run build   # production build
npm test        # Vitest unit tests
npm run lint    # ESLint
```

## Where things live

- `src/app/` — one folder per page; each calculator has `page.tsx`, a `…Studio.tsx` (the calculator) and a `…Guide.tsx`.
- `src/lib/` — the calculation engines and their tests, plus `calculators.ts`, the list of every calculator.
- `src/components/` — the shared calculator, guide and content-page building blocks.
- `src/gm/` and `public/gm/` — the approved design: its pages, header, footer, scripts and stylesheets.

See `docs/HANDOFF.md` for how pages are built, the release checks and the figures to recheck each year.
