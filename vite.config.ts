import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

// User site (johnkennethpax.github.io) is served from the domain root, so base stays '/'.
// The client build emits both pages; the SSR build (src/entry-server.tsx) is only used to pre-render them.
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          input: {
            main: resolve(import.meta.dirname, 'index.html'),
            resume: resolve(import.meta.dirname, 'resume/index.html'),
          },
        },
      },
}));
