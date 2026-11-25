import { useRef, type ReactNode, type PointerEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Aceternity/Magic UI-style spotlight card in monochrome: a soft white radial light and a
 * 1px border beam follow the pointer. Position is written to CSS variables, so moving the
 * pointer never re-renders React.
 */
export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - r.left}px`);
      el.style.setProperty('--my', `${clientY - r.top}px`);
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight-card card card-hover relative overflow-hidden ${className}`}
    >
      <div className="spot-light" aria-hidden="true" />
      <div className="spot-border" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}
