# Architecture

The portfolio is a small single-page app. Content comes from Firestore (edited in the separate
Dashboard); the interface text is fixed in three languages.

## Folders

```
src/
  main.tsx            entry: mounts <App/>, registers the service worker
  app/                the shell: providers, routes, layout (Navbar, Footer), guards
  features/           one folder per page; each owns its components, hooks and styles
    home/  projects/  project-detail/  about/  workflow/  workflow-admin/  contact/  status/
  data/               everything that talks to Firebase, plus the contexts built on it
  i18n/               language detection and translation (pure), the interface texts, the provider
  domain/             types of the content, and pure logic (with tests)
  content/            the default content shown until Firestore answers
  ui/                 pieces shared by several pages (Button, icons, hand-drawn Sketch, PixelGlyph, cursor)
  scripts/illustrations/  Python that draws the hand-drawn icons into ui/sketchIcons.data.ts
  styles/             tokens.css (palette, fonts, spring), base.css, button.css, textures/; global.css pulls them in
```

Dependencies point downwards only: `app → features → data/i18n/domain/content → ui/styles`.
A feature never imports another feature; what two pages share moves to `ui/`, `domain/` or `i18n/`.

## Data flow

1. `LangProvider` picks the language (saved choice → browser → English) and sets `lang`/`dir` on
   `<html>`.
2. `SiteContentProvider` starts with `content/siteDefaults.ts` and replaces it with the Firestore
   document `content/main` once it has been read (one request, no live listener: what the Dashboard
   saves shows on the next visit). Saved config is merged over the defaults, so a field added later
   never breaks an old document.
3. `SettingsProvider` holds the visitor's theme and cursor choice: their own saved choice, then the
   defaults saved with the content, then the system's theme.
4. `recordVisit()` (`data/analytics.ts`) counts a visit per session and a visitor per device.

## Routing and loading

`Home` loads with the site. Every other page is a lazy route, so it is fetched the first time it
is opened. `/admin/workflow` (the editor of the workflow's phases) is registered only while running
`npm run dev`: the public build has no editor, and no code for one. `NotFound` sits outside the layout; `Offline` replaces everything while the browser has
no connection (`app/OnlineGuard.tsx`).

## Spacing

One rhythm for every page (`styles/tokens.css`): `--page-gutter` for the sides, `--page-top` and
`--page-bottom` around the content, `--header-gap` under a page's title and `--section-gap` between its
sections. A page takes them from the shared `.page` class; it does not set its own.

## Fonts

General Sans and Geist Mono are linked from `index.html`. Thmanyah Sans (Arabic) is served from
`public/fonts/thmanyah/` (woff2, subset to Arabic, Latin and punctuation), one file per weight, fetched
only when the weight is used.

## Film screens

`ui/FilmScreen` draws the two pages that say something went wrong (404 and offline) as a frame of old
film: sprocket holes, strips of small print, the site's grain stepping about, scratches, and a split,
flickering title while something is wrong.

## Motion

One spring for everything (`--spring` in `styles/tokens.css`, the same physics as Haus). CSS runs it:
`.rise` for entrances (one `--step` apart), `.spring-group` for things in a row that push each other (nav items, tags, buttons), `.push-group` for
cards in a grid (`ui/usePushNeighbours` marks the pressed card and the ones beside it),
`data-pressed` (held at least 140 ms by `ui/usePressHold`) for presses, and the arrow of the custom
cursor. There is no JavaScript animation library; colour and opacity use plain easing.

The hand-drawn icons' line boil is not an animation per icon: `ui/boilClock.ts` is one timer that sets
`data-boil` on `<html>` while an icon is mounted, and `motion.css` shows the matching redraw of every
icon (the first one when there is no clock: reduced motion, a hidden tab). The page's surface is two
layers behind everything (`body::before`, fixed, the paper and its patches; `body::after`, the grain,
scrolling with the page) and `.text-silver` has its own layer, so scrolling and the icons' redraws
never repaint them. The home strip moves its shapes by `transform` only.

## Tests

Pure logic runs under vitest in plain node (`src/**/*.test.ts`). Anything that needs the DOM is
checked in the browser.
