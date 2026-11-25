import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, used to stagger siblings. */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/** Magic UI-style blur-fade: fades up from a slight blur the first time it scrolls into view. */
export function BlurFade({ children, className, delay = 0, as = 'div' }: BlurFadeProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
