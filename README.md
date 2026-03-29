# Zahid Sher Sial — Portfolio

React + Vite + Tailwind CSS portfolio site.

## Stack

- **React 18** — UI components
- **Vite 5** — blazing-fast build tool
- **Tailwind CSS 3** — utility-first styling
- **Vercel** — deployment target

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel will auto-detect Vite. Accept defaults.

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the repo
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

## Project Structure

```
src/
  components/
    Nav.jsx          — Navigation with mobile menu & theme toggle
    Hero.jsx         — Hero section
    Sections.jsx     — TrustedBy, Stats, About
    CaseStudies.jsx  — 3 sticky case study cards
    Projects.jsx     — Filtered project grid (Webflow/React/WP/Gov)
    ContactFooter.jsx — Services, Contact, Footer
  data/
    projects.js      — All project data
  App.jsx            — Root component, theme & scroll logic
  main.jsx           — Entry point
  index.css          — Global CSS + Tailwind + CSS variables
public/
  logo.webp
  favicon.ico
  apple-touch-icon.png
  android-chrome-*.png
  favicon-*.png
```

## Customisation

- **Colors / Theme** — edit CSS variables in `src/index.css` (`:root` and `body.light-theme`)
- **Projects** — edit `src/data/projects.js`
- **Contact links** — update email/WhatsApp in `Nav.jsx`, `ContactFooter.jsx`
