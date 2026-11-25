import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Emblem } from './Emblem';

const KEY = 'kp-boot-shown';
const LINES = [
  'SYS_INIT // JOHN KENNETH S. PACO (BSEE)',
  'SAFETY_CRED // DOLE_SO2 [VERIFIED]',
  'TELEMETRY // RP2040_TINYML_LORA [OK]',
];

const IntroContext = createContext({ done: true, replay: () => {}, canPlay: false });
/** True once the boot intro has finished (or was skipped). Entrance animations wait for it. */
export const useIntroDone = () => useContext(IntroContext).done;
export const useIntro = () => useContext(IntroContext);

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function shouldPlay(): boolean {
  if (typeof window === 'undefined') return false;
  if (reducedMotion()) return false;
  try {
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return false;
  }
}

/**
 * Firmware-style boot screen (~1.1s): emblem plus three POST lines, then the overlay wipes upward.
 * Plays once per browser session, skips on click or Escape, and never runs with reduced motion.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(shouldPlay);
  const [wiping, setWiping] = useState(false);
  const [done, setDone] = useState(!playing);

  const finish = useCallback((instant: boolean) => {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable: intro simply plays again next load */
    }
    if (instant) {
      setPlaying(false);
      setDone(true);
    } else {
      setWiping(true);
    }
  }, []);

  const replay = useCallback(() => {
    if (reducedMotion()) return;
    window.scrollTo({ top: 0 });
    setWiping(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => finish(false), 850);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish(true);
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [playing, finish]);

  return (
    <IntroContext.Provider value={{ done, replay, canPlay: !reducedMotion() }}>
      {children}
      <AnimatePresence>
        {playing && (
          <motion.div
            key="boot"
            role="status"
            aria-label="Loading portfolio"
            onClick={() => finish(true)}
            className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ink px-6 print:hidden"
            initial={{ y: 0 }}
            animate={wiping ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.26, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (wiping) {
                setPlaying(false);
                setDone(true);
              }
            }}
          >
            <div className="w-full max-w-md">
              <Emblem className="h-16 w-16" />
              <ul className="mt-6 space-y-1.5 font-mono text-[11px] leading-5 text-fg sm:text-xs">
                {LINES.map((line, i) => (
                  <motion.li
                    key={line}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.08, delay: 0.1 + i * 0.17 }}
                  >
                    <span className="text-smoke">&gt; </span>
                    {line}
                  </motion.li>
                ))}
              </ul>
              <motion.span
                aria-hidden="true"
                className="mt-2 inline-block h-3.5 w-2 bg-fg"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">Click or press Esc to skip</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
