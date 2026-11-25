import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const KEY = 'kp-theme';

function current(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Segmented LIGHT | DARK switch. Persists to localStorage; the <head> script applies it before first paint. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(current);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
  }, [theme]);

  const choose = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* storage blocked: theme still applies for this page view */
    }
  };

  return (
    <div role="group" aria-label="Color theme" className={`no-print inline-flex shrink-0 rounded-full border border-hairline p-0.5 font-mono text-[10px] tracking-[0.16em] ${className}`}>
      {(['light', 'dark'] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => choose(t)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors duration-200 ${
            theme === t ? 'bg-fg text-ink' : 'text-smoke hover:text-fg'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
