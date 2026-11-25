import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { profile, sections } from './data/profile';
import { useScrollSpy } from './hooks/useScrollSpy';
import { MobileNav, Sidebar } from './components/Sidebar';
import { Emblem } from './components/Emblem';
import { LightboxProvider } from './components/Lightbox';
import { IntroProvider, useIntro } from './components/Intro';
import { CvDocument } from './components/CvDocument';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Credentials } from './sections/Credentials';

const ids = sections.map((s) => s.id);

function ReplayBoot() {
  const { replay, canPlay } = useIntro();
  if (!canPlay) return null;
  return (
    <button type="button" onClick={replay} className="no-print font-mono text-[11px] text-smoke transition-colors hover:text-fg">
      [Replay Boot]
    </button>
  );
}

function Portfolio() {
  const active = useScrollSpy(ids);

  // The page renders after the browser's own jump to #section, so honor the hash once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <>
      <a
        href="#about"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      {/* Screen: the portfolio. Print (Ctrl+P or Download CV): the CV document on white paper. */}
      <div className="print:hidden">
        <MobileNav active={active} />
        <div className="mx-auto max-w-screen-xl px-4 sm:px-8 lg:flex lg:gap-12 lg:px-12 xl:gap-20">
          <Sidebar active={active} />
          <main id="content" className="pb-24 pt-16 lg:w-[58%] lg:py-20">
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Credentials />
            <footer className="mt-28 flex items-start gap-3 border-t border-hairline pt-8 text-sm text-smoke">
              <Emblem className="h-7 w-7 shrink-0" />
              <div className="flex-1">
                <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
                <p className="mt-1">Built with Vite, React, TypeScript and Tailwind CSS.</p>
              </div>
              <ReplayBoot />
            </footer>
          </main>
        </div>
      </div>
      <div className="hidden print:block">
        <CvDocument />
      </div>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <LightboxProvider>
          <Portfolio />
        </LightboxProvider>
      </IntroProvider>
    </MotionConfig>
  );
}
