import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { ResumePage } from './ResumePage';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <ResumePage />
  </StrictMode>
);
// Production HTML is pre-rendered (scripts/prerender.mjs); the dev server serves an empty root.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
