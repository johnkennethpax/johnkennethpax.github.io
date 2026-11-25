import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ResumePage } from './ResumePage';

// Used only at build time by scripts/prerender.mjs to write static HTML into dist/.
export function renderPortfolio(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export function renderResume(): string {
  return renderToString(
    <StrictMode>
      <ResumePage />
    </StrictMode>,
  );
}
