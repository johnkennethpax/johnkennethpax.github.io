import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Download, Mail } from 'lucide-react';
import { profile, sections } from '../data/profile';
import { TextReveal } from './TextReveal';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const iconBtn =
  'inline-flex items-center gap-2 rounded-lg border border-hairline px-3 py-2 text-sm text-ash transition-colors duration-200 hover:border-fg hover:text-fg';

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      <a className={iconBtn} href={profile.github} target="_blank" rel="noopener noreferrer">
        <GithubIcon size={16} /> GitHub
      </a>
      <a className={iconBtn} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
        <LinkedinIcon size={16} /> LinkedIn
      </a>
      <a className={iconBtn} href={`mailto:${profile.email}`}>
        <Mail size={16} aria-hidden="true" /> Email
      </a>
      <a
        className="inline-flex items-center gap-2 rounded-lg border border-fg bg-fg px-3 py-2 text-sm font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-fg"
        href={profile.cvPdf}
        download
      >
        <Download size={16} aria-hidden="true" /> Download CV
      </a>
    </div>
  );
}

export function Sidebar({ active }: { active: string }) {
  return (
    <header className="pt-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-20">
      <div>
        <img
          src={profile.headshot}
          width={320}
          height={320}
          alt={`Portrait of ${profile.name}`}
          className="img-mono h-14 w-14 rounded-full border border-hairline object-cover"
        />
        <TextReveal
          as="h1"
          text={profile.name}
          className="mt-6 text-[2.2rem] font-black leading-[1.05] tracking-tight text-fg sm:text-5xl"
        />
        <TextReveal
          text={profile.headline}
          delay={0.35}
          stagger={0.04}
          className="mt-4 font-mono text-[13px] text-fg"
        />
        <p className="mt-5 max-w-sm leading-relaxed text-ash">{profile.summary.join(' ')}</p>

        <nav className="no-print mt-14 hidden lg:block" aria-label="Sections">
          <ul className="space-y-1">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`group flex items-center gap-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 ${
                      on ? 'text-fg' : 'text-smoke hover:text-fg'
                    }`}
                  >
                    <span className="relative h-px w-12 bg-hairline transition-colors duration-300 group-hover:bg-smoke">
                      {on && (
                        <motion.span
                          layoutId="spy-indicator"
                          className="absolute inset-0 bg-fg"
                          transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                        />
                      )}
                    </span>
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="no-print mt-8 lg:mt-0">
        <SocialLinks />
      </div>
    </header>
  );
}

export function MobileNav({ active }: { active: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  // Keep the active link visible in the horizontally scrolling bar.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('a[aria-current]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [active]);
  return (
    <nav
      className="no-print sticky top-0 z-40 border-b border-hairline bg-ink/85 backdrop-blur-md lg:hidden"
      aria-label="Sections"
    >
      <ul ref={listRef} className="relative flex gap-1 overflow-x-auto px-4 [scrollbar-width:none]">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
                className={`relative block px-3 py-3 font-mono text-[11px] uppercase tracking-[0.18em] ${on ? 'text-fg' : 'text-smoke'}`}
              >
                {s.label}
                {on && (
                  <motion.span
                    layoutId="mspy-indicator"
                    className="absolute inset-x-3 bottom-0 h-px bg-fg"
                    transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
