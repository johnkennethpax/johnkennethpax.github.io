import { createContext, useCallback, useContext, useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';

interface Shot {
  src: string;
  alt: string;
}

const LightboxContext = createContext<(shot: Shot) => void>(() => {});

/** Click-to-enlarge viewer: full-color image, closes on Esc, backdrop click or the close button. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [shot, setShot] = useState<Shot | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((s: Shot) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setShot(s);
  }, []);
  const close = useCallback(() => setShot(null), []);

  useEffect(() => {
    if (!shot) {
      returnFocus.current?.focus();
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [shot, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {shot && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={shot.alt}
            className="no-print fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <div className="mb-3 flex w-full max-w-5xl items-center justify-between gap-3">
              <a
                href={shot.src}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-mono text-xs text-ash hover:text-fg"
              >
                Open original <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close image"
                className="rounded-lg border border-hairline p-2 text-ash transition-colors hover:border-fg hover:text-fg"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <motion.img
              src={shot.src}
              alt={shot.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-auto max-w-full rounded-xl border border-hairline object-contain"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="mt-3 max-w-3xl text-center text-sm text-ash">{shot.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

interface ZoomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Larger file shown in the lightbox; defaults to src. */
  full?: string;
  alt: string;
  frameClassName?: string;
}

/** Grayscale thumbnail that turns full color on hover, zooms slightly, and opens the lightbox on click. */
export function ZoomImage({ full, alt, className = '', frameClassName = '', ...img }: ZoomImageProps) {
  const open = useContext(LightboxContext);
  return (
    <button
      type="button"
      onClick={() => open({ src: full ?? (img.src as string), alt })}
      className={`group/zoom block w-full cursor-zoom-in overflow-hidden ${frameClassName}`}
      aria-label={`Enlarge image: ${alt}`}
    >
      <img
        {...img}
        alt={alt}
        className={`zoom-img w-full grayscale transition-[filter,transform] duration-300 ease-out group-hover/zoom:scale-[1.03] group-hover/zoom:grayscale-0 group-focus-visible/zoom:grayscale-0 ${className}`}
      />
    </button>
  );
}
