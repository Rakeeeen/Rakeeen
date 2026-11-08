# Rakeeen — portfolio

Hamed's personal portfolio: React 19, TypeScript (strict), Vite 6, Tailwind 4, GSAP for scroll
animation, Firestore for content, three languages (English, Arabic RTL, Italian). Deployed to
GitHub Pages under `/Rakeeen/`. It is being redesigned in the spirit of the Haus app (silver,
a rare purple accent, retro-futurism, one spring motion system), on the local branch `redesign`.
Never push that branch; never read `.env`.

**Read `docs/ARCHITECTURE.md` before adding or moving a file.**

## Commands

```
npm run dev         # http://localhost:3000/Rakeeen/
npm run build       # production build
npm run typecheck   # tsc --noEmit — strict, no unused locals/params; must stay at 0 errors
npm run test:run    # vitest, single run
```

Run `build`, `typecheck` and `test:run` before calling anything done, and load the pages you
touched (both themes, all three languages, a phone width).

## Rules

1. **Layers.** `app/` (shell) → `features/<name>/` (one folder per page) → `data/`, `i18n/`,
   `domain/`, `content/` → `ui/` and `styles/`. A feature never imports another feature.
2. **Imports use `@/`**, never `../`.
3. **No logic in components** that does not need state, a ref or the DOM: it is a pure function in
   `domain/` or `i18n/`, with a test.
4. **Only `data/` talks to Firebase.** Pages read content through `useSiteContent()`.
5. **Every text is localized.** Fixed interface lines live in `i18n/translations.ts`; content that
   the Dashboard edits is a `LocalizedField` and is read with `resolveField`.
6. **No `any`, no `@ts-ignore`, no dead code.** Delete what is unused instead of commenting it out.
7. **Style comes from tokens** in `styles/`, not from numbers written into a component.
8. **Icons.** Plain controls come from `ui/icons.tsx` (own SVG paths, no icon library), built from
   `ICON_STROKE_WIDTH`/`LINECAP`/`LINEJOIN`; never hardcode those numbers. Characterful drawings
   (the mascot) are generated: edit `scripts/illustrations/shapes.py`, run
   `python3 scripts/illustrations/build.py`, and render with `ui/Sketch.tsx`. Pixel art is square
   pixels (`ui/PixelGlyph`), never dots.
9. **Arabic is right-to-left.** Use logical properties (`padding-inline-start`, `margin-inline-end`)
   instead of `left`/`right`.
