# namanh.dev — namOS

Nam's portfolio as a desktop operating system in the browser. One desktop, six apps, one file,
one trash. The Terminal boots and types; Finder holds the hackathon wins with photos; Work is
master-detail; grind.app shows live NeetCode progress; Content shows the TikTok channel and the
Discord; Mail is the contact card. Below 768 px it turns into a phone.

Live: https://namanh.dev

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # store + terminal command tests (Vitest)
npm run lint
npm run build && npm start
```

## Where things live

- `data/` — all content (experiences, hackathons, projects, about, content, site, legal, trash)
- `components/os/` — the shell (store, windows, menubar, dock, phone mode)
- `components/apps/` — the apps and the registry
- `docs/plans/` — design spec and implementation plan for namOS

See `CLAUDE.md` for the architecture in detail.

© Namanh Bui Vu. Photos from Nam's own hackathon posts.
