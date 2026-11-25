import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const KEY = 'kp-theme';

/**
 * Segmented LIGHT | DARK switch. The <head> script picks the initial theme (saved choice, else the OS
 * preference) before first paint. The pressed look comes from CSS on [data-theme], so the pre-rendered
 * HTML is correct before React hydrates; aria-pressed syncs right after.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    // Follow OS changes until the visitor makes an explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(KEY);
      } catch {
        /* ignore */
      }
      if (!saved) apply(mq.matches ? 'dark' : 'light', setTheme);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const choose = (t: Theme) => {
    apply(t, setTheme);
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
          data-theme-option={t}
          className="theme-option rounded-full px-2.5 py-1 uppercase text-smoke transition-colors duration-200 hover:text-fg"
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function apply(t: Theme, set: (t: Theme) => void) {
  document.documentElement.dataset.theme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#050505' : '#ffffff');
  set(t);
}
