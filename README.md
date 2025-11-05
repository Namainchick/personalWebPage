# Namanh Bui Vu – PortfolioThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Eine minimalistische, deutschsprachige Portfolio-Website im Stil von [gazijarin.com](https://gazijarin.com) – clean, starke Typografie, dezente Micro-Interactions.## Getting Started



## 🚀 Tech StackFirst, run the development server:



- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)```bash

- **Sprache:** TypeScriptnpm run dev

- **Styling:** Tailwind CSS# or

- **Fonts:** Inter, JetBrains Mono (Google Fonts)yarn dev

- **Deployment:** Vercel (Hobby)# or

pnpm dev

## 📁 Projektstruktur# or

bun dev

``````

portfolio-namanh/

├── app/                    # Next.js App RouterOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

│   ├── layout.tsx          # Root Layout (Nav, Footer, Fonts)

│   ├── page.tsx            # Startseite (Hero, Teaser)You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

│   ├── erfahrungen/        # Erfahrungen-Seite

│   ├── projekte/           # Projekte-SeiteThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

│   ├── kontakt/            # Kontakt-Seite

│   ├── impressum/          # Impressum-Platzhalter## Learn More

│   ├── datenschutz/        # Datenschutz-Platzhalter

│   ├── robots.ts           # robots.txtTo learn more about Next.js, take a look at the following resources:

│   ├── sitemap.ts          # sitemap.xml

│   └── globals.css         # Globale Styles (Dark Theme, Animationen)- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

├── components/             # Wiederverwendbare Komponenten- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

│   ├── Nav.tsx

│   ├── Footer.tsxYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

│   ├── Button.tsx

│   ├── Card.tsx## Deploy on Vercel

│   └── SectionHeading.tsx

├── data/                   # Dummy-DatenThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

│   ├── experiences.ts

│   └── projects.tsCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

└── public/                 # Statische Assets
    ├── og.svg              # OG-Bild (SVG)
    └── og.png              # OG-Bild (PNG Fallback)
```

## 🛠️ Setup & Development

### 1. Repository klonen & Dependencies installieren

```bash
cd portfolio-namanh
npm install
```

### 2. Development Server starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### 3. Build für Produktion

```bash
npm run build
npm start
```

### 4. Linting

```bash
npm run lint
```

## 🚢 Deployment auf Vercel

### Option 1: GitHub Integration (empfohlen)

1. Repository auf GitHub pushen:
   ```bash
   git remote add origin https://github.com/USERNAME/portfolio-namanh.git
   git branch -M main
   git push -u origin main
   ```

2. Auf [vercel.com](https://vercel.com) einloggen

3. **New Project** → Repository auswählen

4. **Import** → Vercel erkennt automatisch Next.js

5. **Deploy** → Fertig! 🎉

Bei jedem Push auf `main` wird automatisch neu deployed.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## ✅ TODO: Inhalte anpassen

Die Website ist produktionsreif, aber einige Platzhalter müssen noch angepasst werden:

### 📝 Texte & Daten

- [ ] `data/experiences.ts` → Eigene Erfahrungen eintragen
- [ ] `data/projects.ts` → Eigene Projekte eintragen
- [ ] `app/kontakt/page.tsx` → E-Mail, LinkedIn, GitHub URLs anpassen
- [ ] `app/impressum/page.tsx` → Rechtliche Pflichtangaben ergänzen
- [ ] `app/datenschutz/page.tsx` → Datenschutzerklärung vervollständigen

### 🔗 URLs & Meta

- [ ] `app/layout.tsx` → `metadataBase` URL anpassen (nach Deployment)
- [ ] `app/robots.ts` → Sitemap-URL anpassen
- [ ] `app/sitemap.ts` → Base-URL anpassen
- [ ] `app/page.tsx` → E-Mail-Adresse im Hero-CTA anpassen

### 🎨 Assets

- [ ] OG-Bild ersetzen: `public/og.png` (1200x630px)
- [ ] Optional: Projekt-Bilder in `public/projects/` hinzufügen

## 🎨 Design-Features

### Dark-Only Theme
- Hintergrund: `#0A0A0A`
- Text: `#FAFAFA`
- Akzent: `#4F46E5` (Indigo)

### Kreativ-Details
- **Hairline-Gradient:** Vertikale Linie links (fixiert, ab Desktop)
- **Animierte Link-Underlines:** Transform-Effekt bei Hover
- **Hover-Effekte:** Karten heben leicht ab (scale + shadow)
- **Easter-Egg:** Hover auf "Namanh" in der Nav → Monospace + Cursor-Caret

### Accessibility
- Semantisches HTML (`header`, `nav`, `main`, `section`, `article`, `footer`)
- ARIA-Labels für dekorative Elemente
- Sichtbare Fokus-Ringe (`:focus-visible`)
- `prefers-reduced-motion` wird respektiert

## 📦 Scripts

```json
{
  "dev": "next dev --turbopack",      // Development mit Turbopack
  "build": "next build",               // Production Build
  "start": "next start",               // Production Server
  "lint": "next lint"                  // ESLint
}
```

## 🌐 Seiten-Übersicht

| Route           | Beschreibung                              |
|-----------------|-------------------------------------------|
| `/`             | Hero, Teaser (Erfahrungen, Projekte, CTA) |
| `/erfahrungen`  | Stack von Job-Karten                      |
| `/projekte`     | Projekt-Grid (2-spaltig)                  |
| `/kontakt`      | E-Mail, LinkedIn, GitHub                  |
| `/impressum`    | Rechtliche Pflichtangaben (Platzhalter)   |
| `/datenschutz`  | Datenschutzerklärung (Platzhalter)        |

## 📝 Lizenz

All rights reserved © Namanh Bui Vu

---

**Built with ❤️ using Next.js, TypeScript & Tailwind CSS**
