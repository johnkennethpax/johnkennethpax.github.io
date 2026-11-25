import { MotionConfig } from 'motion/react';
import { profile, sections } from './data/profile';
import { useScrollSpy } from './hooks/useScrollSpy';
import { MobileNav, Sidebar } from './components/Sidebar';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Credentials } from './sections/Credentials';

const ids = sections.map((s) => s.id);

export default function App() {
  const active = useScrollSpy(ids);
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <MobileNav active={active} />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8 lg:flex lg:gap-12 lg:px-12 xl:gap-20">
        <Sidebar active={active} />
        <main id="content" className="pb-24 pt-16 lg:w-[58%] lg:py-20">
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Credentials />
          <footer className="mt-28 border-t border-hairline pt-8 text-sm text-smoke">
            <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
            <p className="mt-1">Built with Vite, React, TypeScript and Tailwind CSS.</p>
          </footer>
        </main>
      </div>
    </MotionConfig>
  );
}
