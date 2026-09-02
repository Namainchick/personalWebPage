# namOS — Portfolio as a Desktop OS

Date: 2026-09-02 · Status: approved by Nam (chat, 2026-09-02) · Replaces the Greenhouse theme (June 2026)

## Goal

Rebuild namanh.dev as a lean desktop operating system. The site opens on a desktop with one
Terminal window already typing; six apps live in a dock; every project, job and hackathon gets
a natural place inside an app window. Personality comes from the content and the OS metaphor,
not from decoration. Constraint from Nam: keep it lean, nobody should get lost.

Reference direction: moodboard option 01 (ryOS / daedalOS spirit), voice from option 04
(hot-take terminal copy), live numbers from option 03 (grind.app, menubar widget).

## Information architecture

One desktop, six apps, one file, one trash.

| App        | Route(s)                              | Content                                                                                  |
|------------|---------------------------------------|------------------------------------------------------------------------------------------|
| Terminal   | `/about`                              | whoami, hot-take, `ls`, 6 commands, easter eggs. Opens by default on `/`.                |
| Work       | `/work`, `/work/[id]`                 | Master-detail: Arbio, Position One, Flohh, TUHH TA, then Education (TUHH, NUS).           |
| Finder     | `/hackathons`, `/hackathons/[id]`, `/projects`, `/projects/[id]` | Two folders. Hackathons = 6 wins with photos. Projects = builds.  |
| grind.app  | `/grind`                              | Live NeetCode 150 progress (existing `lib/coding.ts`).                                    |
| Content    | `/content`                            | 3 latest TikToks (oEmbed thumbnails), channel numbers with measurement date, Discord.    |
| Mail       | `/contact`                            | Email, LinkedIn, GitHub, TikTok.                                                          |
| CV.pdf     | desktop icon → `/Namanh_Bui_Vu_CV.pdf`| Current CV, opens in new tab.                                                            |
| Trash      | desktop icon                          | "Greenhouse (Jun 2026)", "Bento (Feb 2026)" screenshots. Easter egg.                     |
| namOS menu | `/impressum`, `/datenschutz`          | Legal pages open in a plain text window.                                                 |

Old routes redirect: `/erfahrungen(/:id)` → `/work(/:id)`, `/projekte(/:id)` → `/projects(/:id)`,
`/competitions` → `/hackathons`, `/coding` → `/grind`, `/kontakt` → `/contact`.

Removed: separate About prose page, separate detail routes as full pages, Competitions section,
server-side i18n (cookie, translations, LanguageSwitcher). UI language stays English; the
terminal quotes one German hot-take on purpose.

## Desktop behaviour

- **Load:** desktop paints immediately (wallpaper, menubar, dock, icons). Terminal window is
  open and starts typing after 300 ms. No boot screen, no preloader.
- **Windows:** draggable by title bar (pointer events, desktop only), close, maximize toggle.
  No resize. Cascaded default positions per app. Max 3 open windows; opening a 4th closes the
  oldest unfocused one. Focus = highest z-index + accent ring on the dock dot.
- **URL sync:** the focused window is the route. Dock click → `router.push`. Deep link → that
  window is open and focused on first render (server-side, from pathname). Other open windows
  persist across navigation because the shell lives in the root layout.
- **Menubar:** left "namOS" menu (About namOS, Impressum, Datenschutz), centre app name,
  right live widget `90/150 · Berlin 17:52` (grind count from server, clock from client).
- **Mobile (< 768 px):** same component tree, CSS "phone mode". No window chrome: the
  focused app is a full-screen sheet with a back arrow, the dock becomes a home-screen grid
  when nothing is open, menubar becomes a status bar.
- **Motion:** window open scale .96→1 + fade 180 ms, close reverse, dock hover lift.
  `prefers-reduced-motion` disables typing and transitions; full text is rendered at rest.
- **Keyboard:** Esc closes focused window, Tab order dock → windows, focus ring visible.

## Visual system

- **Wallpaper:** Nam's Shanghai night photo (Bund, Pudong skyline), 2400 px JPEG plus a
  portrait crop for phone mode. Fallback colour `#0B1020` before the image loads.
- **Palette:** window surface `#F4F3EF` at 92 % with backdrop blur; ink `#17181C`; muted
  `#6E7079`; hairline `#D8D7D0`. Terminal `#0E1116` / text `#D9E1D4` / prompt `#7FD1A6` /
  highlight `#F2A65A`. Accent `#FF5C2A` (the Pico trophy orange): focus, active dock dot,
  links, key numbers. Chrome (menubar, dock) `rgba(12,14,22,.55)` with blur, text white 90 %.
- **Type:** Bricolage Grotesque (window titles, big numbers, app headers), Hanken Grotesk
  (UI and body, kept from Greenhouse), IBM Plex Mono (terminal, labels, dates, kept).
  Newsreader is dropped.
- **Radii:** window 14 px, dock 20 px, controls 8 px. Traffic-light buttons in the title bar.
- **Images:** every hackathon has a real photo (LinkedIn posts, 1280–2048 px). The
  "Rush Hour" movie-poster parody and the 3D-printed Arbio "Track Winner" token are the two
  most characterful and get the largest thumbnails.

## Architecture

```
app/layout.tsx            server: fonts, metadata, fetch grind + tiktok oEmbed, render <Desktop data=…>{children}</Desktop>
app/page.tsx              null (desktop with Terminal)
app/about/page.tsx …      each route page: metadata + <OpenApp app="…" item?="…" />
components/os/
  Desktop.tsx             client shell: wallpaper, Menubar, WindowLayer, Dock, DesktopIcons, phone mode
  store.tsx               context + reducer: windows[], focused, open/close/focus/setItem, max-3 rule
  Window.tsx              chrome, drag, maximize, focus
  Menubar.tsx  Dock.tsx  DesktopIcon.tsx  OpenApp.tsx  useClock.ts  usePhoneMode.ts
components/apps/
  Terminal.tsx  WorkApp.tsx  FinderApp.tsx  GrindApp.tsx  ContentApp.tsx  MailApp.tsx  TextApp.tsx  TrashApp.tsx
  registry.ts             app id → { title, icon, component, defaultRect }
data/
  experiences.ts (updated)  hackathons.ts (new)  projects.ts (builds only)  about.ts (terminal copy)
  content.ts (tiktok ids, numbers + dates, discord)  site.ts (socials, email)  trash.ts
lib/coding.ts             kept
lib/tiktok.ts             oEmbed fetch with revalidate 86400, graceful fallback
public/img/               wallpaper/, hackathons/, avatar.jpg, trash/
```

Data flow: layout (server) → `Desktop` props (`grind`, `tiktok`) → context → apps. Static data
is imported directly by app components. Pages carry no visual output; SEO content comes from
the server-rendered window of the deep-linked app.

Error handling: grind fetch failure → tile shows "couldn't reach GitHub, try later" (existing
copy). TikTok oEmbed failure → cards without thumbnail. Unknown `/work/[id]` → `notFound()`.

## Content changes (source: CV 2026-09, LinkedIn posts, Knowledge vault)

- Arbio: "Software Engineer (Product Engineering)", May 2026–present, Berlin. Bullets from CV:
  lock-outs 50+/month → under 10, 434 locks across 1,000+ apartments, 1,500+ tests shipped
  shadow-first; 8-stage AI extraction pipeline, 166 hand-checked data points removed per
  property, F1 0.42 → 0.81.
- Position One: "AI Engineer (promoted from intern)", Sep 2025–Apr 2026. Flohh and TUHH TA as
  on CV. Education: TUHH B.Sc. CS Oct 2024–2028; NUS exchange Jan–May 2027.
- Hackathons (wins only, Nam's call): AdventureX Hangzhou (1st Pico XR Track, 800
  participants, Jul 2026) · Megathon Amsterdam (HorseGPT, TAG × Base44 Track, €1,000 +
  priority accelerator, 21 Jun 2026) · AI Beavers × Mollie Founder Hackathon (RushHour, 1st
  overall, 150+ builders, 5 Jun 2026) · Cursor AI Hackathon Hamburg (Dip, Best use of Google
  DeepMind Gemini API, $10,000 credits, 400+, 31 Jan 2026) · {Tech: Europe} Berlin (Airbn,
  Arbio Track winner, 3rd overall, Jan 2026) · SF × Hamburg AI Sprint (Mindflayer, 1st
  overall, $2,000, 110 builders, Dec 2025).
- Content: @namb.tech shows views only (461k total, top video 246k, measured 2026-08-31), not
  followers. 50k+ followers / 20M+ views belong to the sold-accounts story, told in the
  Terminal/About, clearly separated. Discord: "FAANG/MANGO+ für Deutsche", 300+ members.
- Location: Berlin (until end of 2026) · Hamburg · Singapore from Jan 2027. Age removed.
- Technical: `metadataBase` → https://namanh.dev, fresh CV PDF, new OG image (desktop shot).

## Testing

- `npm run lint`, `npm run build` must pass.
- Store reducer unit tests (Vitest): open/focus/close, max-3 eviction, deep-link initial state.
- Manual smoke via headless Chrome screenshots: `/`, `/work/arbio`, `/hackathons`, `/grind`,
  phone width 390 px. Check: terminal visible at rest, no horizontal scroll, dock reachable.
- Redirects verified with `curl -I` after `npm start`.

## Out of scope

Window resize, spotlight search, sound, multi-language, Bento screenshot if the Feb 2026
commit does not build.
