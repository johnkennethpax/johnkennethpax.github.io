import { motion, useReducedMotion } from 'motion/react';
import { useIntroDone } from './Intro';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'p';
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
}

/** Word-by-word blur/rise reveal, played once on initial load. */
export function TextReveal({ text, className, as = 'p', delay = 0, stagger = 0.07 }: TextRevealProps) {
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const Tag = as;
  if (reduce) return <Tag className={className}>{text}</Tag>;
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: '0.35em', filter: 'blur(8px)' }}
          animate={introDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}
