import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useIntroDone } from './Intro';

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, used to stagger siblings (50ms steps). */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * Magic UI-style blur-fade: rises 8px from a slight blur the first time it scrolls into view.
 * Waits for the boot intro so cards on the first screen snap in right after the overlay wipes away.
 */
export function BlurFade({ children, className, delay = 0, as = 'div' }: BlurFadeProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const introDone = useIntroDone();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
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
