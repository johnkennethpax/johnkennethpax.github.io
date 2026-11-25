/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './resume/index.html', './404.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0a0f1c', 900: '#0a0f1c', 850: '#0d1424', 800: '#111a2e' },
        line: 'rgba(148, 163, 184, 0.14)',
        fg: { DEFAULT: '#e6edf7', muted: '#94a3b8', dim: '#64748b' },
        cyan: { DEFAULT: '#22d3ee', soft: 'rgba(34, 211, 238, 0.12)' },
        amber: { DEFAULT: '#fbbf24', soft: 'rgba(251, 191, 36, 0.12)' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
