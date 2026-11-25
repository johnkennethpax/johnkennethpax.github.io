import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { FileDown, Mail } from 'lucide-react';
import { profile, sections } from '../data/profile';
import { TextReveal } from './TextReveal';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { Emblem } from './Emblem';
import { ThemeToggle } from './ThemeToggle';
import { CopyEmail } from './CopyEmail';

const iconBtn =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-hairline px-3 text-sm text-ash transition-colors duration-200 hover:border-strong hover:text-fg lg:w-9 lg:px-0';
const copyBtn =
  'inline-flex h-10 items-center gap-2 rounded-lg border border-hairline px-3 text-sm text-fg transition-colors duration-200 hover:border-strong hover:bg-raised';

export function DownloadCv({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      title="Opens the print dialog; choose Save as PDF"
      className={`inline-flex h-10 items-center gap-2 rounded-lg border border-fg bg-fg px-3.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-fg ${className}`}
    >
      <FileDown size={16} aria-hidden="true" /> Download CV <span className="font-mono text-[11px] font-normal opacity-70">(PDF)</span>
    </button>
  );
}

export function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-fg opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-fg" />
      </span>
      {profile.availability}
    </span>
  );
}

export function SocialLinks() {
  return (
    <>
      <a className={iconBtn} href={profile.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
        <GithubIcon size={16} /> <span className="lg:sr-only">GitHub</span>
      </a>
      <a className={iconBtn} href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
        <LinkedinIcon size={16} /> <span className="lg:sr-only">LinkedIn</span>
      </a>
      <a className={iconBtn} href={`mailto:${profile.email}`} title={profile.email} aria-label={`Email ${profile.email}`}>
        <Mail size={16} aria-hidden="true" /> <span className="lg:sr-only">Email</span>
      </a>
    </>
  );
}

export function Sidebar({ active }: { active: string }) {
  return (
    <header className={`pt-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-center-safe lg:gap-6 lg:overflow-y-auto lg:py-12 lg:[@media(min-height:1000px)]:py-16 lg:[@media(max-height:880px)]:py-8 print:static print:block print:h-auto print:w-full print:overflow-visible print:py-0`}>
      <div>
        <div className="no-print hidden items-center justify-between gap-3 lg:flex">
          <a href="#about" className="inline-flex min-w-0 items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ash hover:text-fg">
            <Emblem className="h-7 w-7 shrink-0" /> <span className="truncate">Ken Paco <span className="text-smoke">|</span> Electrical Engineering</span>
          </a>
          <ThemeToggle />
        </div>
        <img
          src={profile.headshot}
          width={480}
          height={480}
          alt={`Portrait of ${profile.name}`}
          className={`mt-0 h-28 w-28 rounded-full border border-hairline object-cover lg:mt-7 lg:h-24 lg:w-24 lg:[@media(max-height:880px)]:mt-5 lg:[@media(max-height:880px)]:h-20 lg:[@media(max-height:880px)]:w-20 lg:max-xl:[@media(max-height:880px)]:h-16 lg:max-xl:[@media(max-height:880px)]:w-16`}
        />
        <TextReveal
          as="h1"
          text={profile.name}
          className={`mt-6 text-[2.2rem] font-black leading-[1.05] tracking-tight text-fg sm:text-5xl lg:[@media(max-height:880px)]:mt-4 lg:[@media(max-height:880px)]:text-4xl lg:max-xl:[@media(max-height:880px)]:text-3xl`}
        />
        <TextReveal
          text={profile.headline}
          delay={0.35}
          stagger={0.04}
          className="mt-4 font-mono text-[13px] text-fg"
        />
        <div className="mt-3">
          <AvailabilityBadge />
        </div>
        <p className={`mt-5 max-w-sm leading-relaxed text-ash lg:max-xl:text-sm lg:[@media(max-height:880px)]:mt-3 lg:[@media(max-height:880px)]:text-[15px] lg:max-xl:[@media(max-height:880px)]:text-sm`}>{profile.summary.join(' ')}</p>

        <div className="no-print mt-6 flex flex-wrap items-center gap-2 lg:[@media(max-height:880px)]:mt-4">
          <DownloadCv />
          <CopyEmail email={profile.email} className={copyBtn} />
          <SocialLinks />
        </div>

        <nav className={`no-print mt-8 hidden lg:block lg:[@media(min-height:1000px)]:mt-10 lg:[@media(max-height:880px)]:mt-6`} aria-label="Sections">
          <ul className="space-y-1">
            {sections.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`group flex items-center gap-4 py-1 lg:[@media(min-height:1000px)]:py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 ${
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
      <div className="flex items-center">
      <a href="#about" aria-label="Ken Paco, back to top" className="shrink-0 pl-4 pr-1">
        <Emblem className="h-7 w-7" />
      </a>
      <ul ref={listRef} className="relative flex min-w-0 flex-1 gap-1 overflow-x-auto px-2 [scrollbar-width:none]">
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
      <ThemeToggle className="mr-3" />
      </div>
    </nav>
  );
}
