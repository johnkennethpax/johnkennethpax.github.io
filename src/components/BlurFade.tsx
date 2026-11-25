import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useIntroDone } from './Intro';
import { useIsoLayoutEffect } from '../lib/useIsoLayoutEffect';

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, used to stagger siblings (50ms steps). */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Magic UI-style blur-fade: rises 8px from a slight blur the first time it scrolls into view.
 * Pre-rendered markup is plain and visible (fast first paint, crawlable). Right after hydration, before
 * paint, elements below the fold (or under the boot intro) switch to the animated version; content
 * already on screen stays put instead of blinking.
 */
export function BlurFade({ children, className, delay = 0, as = 'div' }: BlurFadeProps) {
  const ref = useRef<HTMLElement | null>(null);
  const introDone = useIntroDone();
  const [animated, setAnimated] = useState(false);
  const [inView, setInView] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const r = el.getBoundingClientRect();
    const onScreen = r.top < window.innerHeight && r.bottom > 0;
    if (!onScreen || !introDone) setAnimated(true);
    // Only decided once, at mount.
  }, []);

  // Observe whichever element is mounted (the plain and animated versions are different nodes).
  useEffect(() => {
    const el = ref.current;
    if (!animated || !el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animated]);

  if (!animated) {
    const Plain = as;
    return (
      <Plain ref={ref as never} className={className}>
        {children}
      </Plain>
    );
  }
  const Tag = motion[as];
  return (
    <Tag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
      animate={inView && introDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
