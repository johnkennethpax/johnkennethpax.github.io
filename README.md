# johnkennethpax.github.io

Portfolio of **John Kenneth S. Paco**: BS Electrical Engineering student and DOLE Safety Officer 2, building embedded and IoT systems.

**Live:** https://johnkennethpax.github.io

## Stack

Vite + React + TypeScript + Tailwind CSS, with `motion` for animations and `lucide-react` icons.
Deployed to GitHub Pages by GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`.

## Editing content

All text lives in [`src/data/profile.ts`](src/data/profile.ts). The portfolio (`/`) and the CV page (`/resume/`) both render from it.

```sh
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # type-check, build, then pre-render both pages to static HTML in dist/
```

`npm run build` renders the React app to HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`), so the
deployed pages contain real content for crawlers and slow connections; the browser then hydrates it.

After changing CV content, regenerate the downloadable PDF (needs Playwright with Chromium) and commit it:

```sh
npm run build && npm run cv:pdf   # writes public/John-Kenneth-Paco-CV.pdf
```

## Structure

- `src/sections/`: About, Projects, Experience, Skills, Credentials
- `src/components/`: sidebar and nav, spotlight card, blur-fade and text reveals, pipeline diagram
- `public/img/`: photos and schematics; `public/404.html`: not-found page
- `public/og-image.png`, `robots.txt`, `sitemap.xml`: sharing and SEO; JSON-LD `Person` data lives in `index.html`
