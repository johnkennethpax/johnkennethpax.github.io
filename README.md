# johnkennethpax.github.io

Portfolio of **John Kenneth S. Paco**: BS Electrical Engineering student and DOLE Safety Officer 2, building embedded and IoT systems.

**Live:** https://johnkennethpax.github.io

## Stack

Plain static files served by GitHub Pages (no Jekyll, no framework):

- `index.html`: single-page portfolio
- `resume/index.html`: printable CV (Print / Save as PDF)
- `assets/css/site.css`: compiled Tailwind CSS
- `assets/js/main.js`: scroll reveals, scroll-spy navigation and cursor spotlight (vanilla JS, respects `prefers-reduced-motion`)
- `assets/img/`: photos and schematics

## Editing

Content lives directly in the HTML. If you add new Tailwind classes, rebuild the CSS:

```sh
npm install
npm run build:css
```

Commit the updated `assets/css/site.css` along with your HTML changes.
