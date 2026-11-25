// Pre-renders the React pages into dist/ so the HTML carries real content before any JavaScript runs
// (faster first paint on slow connections, readable by crawlers). The browser then hydrates it.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const ssrDir = fileURLToPath(new URL('../dist-ssr/', import.meta.url));
const { renderPortfolio, renderResume } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href);

for (const [file, render] of [
  ['index.html', renderPortfolio],
  ['resume/index.html', renderResume],
]) {
  const path = `${dist}${file}`;
  const html = await readFile(path, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`No empty root in ${file}`);
  await writeFile(path, html.replace(marker, `<div id="root">${render()}</div>`));
  console.log(`prerendered ${file}`);
}
await rm(ssrDir, { recursive: true, force: true });
