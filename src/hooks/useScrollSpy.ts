import { useEffect, useState } from 'react';

/** Returns the id of the section currently crossing a line ~35% down the viewport. */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.35;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      // At the very bottom the last section wins, even when it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
