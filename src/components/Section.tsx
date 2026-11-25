import type { ReactNode } from 'react';
import { BlurFade } from './BlurFade';

interface SectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pt-20 first:pt-0 lg:pt-28 lg:first:pt-0">
      <BlurFade>
        <h2 id={`${id}-title`} className="flex items-center gap-4 label">
          <span className="text-fg">{index}</span>
          <span className="h-px w-8 bg-hairline" aria-hidden="true" />
          {title}
        </h2>
      </BlurFade>
      <div className="mt-8">{children}</div>
    </section>
  );
}
