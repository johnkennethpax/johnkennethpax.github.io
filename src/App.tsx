import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { profile, sections } from './data/profile';
import { useScrollSpy } from './hooks/useScrollSpy';
import { MobileNav, Sidebar } from './components/Sidebar';
import { BrandMark } from './components/BrandMark';
import { LightboxProvider } from './components/Lightbox';
import { ToastProvider } from './components/Toast';
import { IntroProvider } from './components/Intro';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Credentials } from './sections/Credentials';

const ids = sections.map((s) => s.id);

export default function App() {
  const active = useScrollSpy(ids);

  // The page renders after the browser's own jump to #section, so honor the hash once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, []);

  // Ctrl+P: expand collapsed details so the printout includes the full project write-up.
  useEffect(() => {
    const opened: HTMLDetailsElement[] = [];
    const before = () => document.querySelectorAll('details:not([open])').forEach((d) => {
      (d as HTMLDetailsElement).open = true;
      opened.push(d as HTMLDetailsElement);
    });
    const after = () => opened.splice(0).forEach((d) => (d.open = false));
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
      <ToastProvider>
      <LightboxProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <MobileNav active={active} />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8 lg:flex lg:gap-12 lg:px-12 xl:gap-20 print:block print:max-w-none print:px-0">
        <Sidebar active={active} />
        <main id="content" className="pb-24 pt-16 lg:w-[58%] lg:py-20 print:w-full print:pt-8 print:pb-0">
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Credentials />
          <footer className="mt-28 flex items-start gap-3 border-t border-hairline pt-8 text-sm text-smoke print:mt-10">
            <BrandMark className="h-7 w-auto shrink-0" />
            <div>
            <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
            <p className="mt-1">Built with Vite, React, TypeScript and Tailwind CSS.</p>
            </div>
          </footer>
        </main>
      </div>
      </LightboxProvider>
      </ToastProvider>
      </IntroProvider>
    </MotionConfig>
  );
}
