import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { coursework, thesis, tracks, type Track } from '../data/profile';
import { BlurFade } from '../components/BlurFade';
import { PipelineDiagram } from '../components/PipelineDiagram';
import { Section } from '../components/Section';
import { SpotlightCard } from '../components/SpotlightCard';
import { ZoomImage } from '../components/Lightbox';

const H4 = ({ children }: { children: string }) => <h4 className="label text-fg">{children}</h4>;

function ThesisCard() {
  return (
    <SpotlightCard>
      <ZoomImage
        src={thesis.cover.src}
        srcSet={thesis.cover.srcSet}
        full="/img/thesis/nodes-side-by-side.webp"
        sizes="(min-width: 1024px) 640px, 100vw"
        width={1412}
        height={1600}
        alt={thesis.cover.alt}
        frameClassName="border-b border-hairline"
        className="aspect-[16/9] object-cover"
        fetchPriority="high"
      />
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-fg px-2.5 font-mono text-[10px] uppercase leading-5 tracking-widest text-fg">
            {thesis.status}
          </span>
          <span className="meta">{thesis.role}</span>
        </div>
        <p className="label mt-5 text-fg">{thesis.systemName}</p>
        <h3 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-fg">{thesis.title}</h3>
        <p className="mt-1 text-sm text-smoke">{thesis.subtitle}</p>
        <p className="mt-4 leading-relaxed text-ash">{thesis.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key specifications">
          {thesis.callouts.map((c) => (
            <li key={c} className="callout">{c}</li>
          ))}
        </ul>

        <div className="mt-6 overflow-hidden rounded-xl border border-hairline">
          <table className="w-full border-collapse text-left font-mono text-[12px]">
            <caption className="border-b border-hairline bg-raised px-3 py-2 text-left label">Engineering metrics</caption>
            <thead className="sr-only">
              <tr><th scope="col">Parameter</th><th scope="col">Value</th><th scope="col">Basis</th></tr>
            </thead>
            <tbody>
              {thesis.metrics.map((m) => (
                <tr key={m.label} className="border-b border-hairline last:border-0">
                  <th scope="row" className="px-3 py-2 font-normal text-smoke">{m.label}</th>
                  <td className="px-3 py-2 text-fg">{m.value}</td>
                  <td className="px-3 py-2 text-right">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${m.basis === 'measured' ? 'border-fg text-fg' : m.basis === 'pending' ? 'border-dashed border-strong text-smoke' : 'border-hairline text-smoke'}`}>
                      {m.basis}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {thesis.tags.map((t) => (
            <li key={t} className="pill">{t}</li>
          ))}
        </ul>

        <div className="mt-8">
          <PipelineDiagram />
        </div>

        <div className="mt-8">
          <h4 className="label text-fg">Design decisions</h4>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {thesis.decisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-hairline bg-ink p-4">
                <dt className="text-sm font-bold text-fg">{d.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ash">{d.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <details className="group/details mt-8 border-t border-hairline pt-6">
          <summary className="group inline-flex items-center gap-2 text-sm font-bold text-fg">
            <ChevronRight size={16} aria-hidden="true" className="transition-transform duration-300 group-open/details:rotate-90" />
            Engineering details
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </summary>

          <div className="mt-6 space-y-10 text-[15px] leading-relaxed text-ash">
            <p className="meta">Team: {thesis.team}</p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div><H4>Problem</H4><p className="mt-2">{thesis.problem}</p></div>
              <div><H4>Solution</H4><p className="mt-2">{thesis.solution}</p></div>
            </div>

            <div>
              <H4>How it works</H4>
              <ol className="mt-3 space-y-2">
                {thesis.steps.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="font-mono text-fg">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <H4>Hardware</H4>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {thesis.schematics.map((sch) => (
                  <figure key={sch.src} className="overflow-hidden rounded-xl border border-hairline transition-colors hover:border-strong">
                    <ZoomImage src={sch.src} width={1169} height={827} loading="lazy" alt={sch.alt} className="bg-white" />
                    <figcaption className="px-3 py-2 meta">{sch.caption} schematic · tap to enlarge</figcaption>
                  </figure>
                ))}
              </div>
              <ul className="dash-list mt-4 space-y-2">
                {thesis.hardware.map((h) => (
                  <li key={h.label}><span className="text-fg">{h.label}:</span> {h.text}</li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <H4>Design targets</H4>
                <p className="mt-2">Not yet measured results:</p>
                <ul className="dash-list mt-2 space-y-1">
                  {thesis.targets.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div><H4>Engineering challenge</H4><p className="mt-2">{thesis.challenge}</p></div>
            </div>

            <div>
              <H4>Next steps</H4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {thesis.nextSteps.map((n) => <li key={n} className="pill">{n}</li>)}
              </ul>
            </div>

            <div>
              <H4>Build log</H4>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {thesis.gallery.map((g, i) => (
                  <ZoomImage
                    key={g.name}
                    src={`/img/thesis/${g.name}-sm.webp`}
                    full={`/img/thesis/${g.name}.webp`}
                    width={g.w}
                    height={g.h}
                    loading="lazy"
                    alt={g.alt}
                    frameClassName={`rounded-xl border border-hairline transition-colors hover:border-strong ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
                    className={`object-cover ${i === 4 ? 'aspect-[3/2] sm:aspect-[3/4]' : 'aspect-[3/4]'}`}
                  />
                ))}
              </div>
              <p className="meta mt-2">Hover to see color; click any photo or schematic to enlarge.</p>
            </div>
          </div>
        </details>
      </div>
    </SpotlightCard>
  );
}

function CourseworkCard({ item }: { item: (typeof coursework)[number] }) {
  return (
    <SpotlightCard className="h-full">
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-hairline px-2.5 font-mono text-[10px] uppercase leading-5 tracking-widest text-ash">Coursework</span>
          <span className="meta">{item.course}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-fg">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ash">{item.detail}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li key={t} className="pill">{t}</li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | Track>('all');
  const show = (t: Track) => filter === 'all' || filter === t;
  const count = (id: 'all' | Track) => (id === 'all' ? 1 + coursework.length : id === thesis.track ? 1 : coursework.length);

  return (
    <Section id="projects" index="02" title="Featured Projects">
      <div role="group" aria-label="Filter projects by track" className="no-print -mt-2 mb-6 flex flex-wrap gap-2">
        {tracks.map((t) => {
          const on = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(t.id)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                on ? 'border-accent bg-accent/10 text-accent' : 'border-hairline text-smoke hover:border-strong hover:text-fg'
              }`}
            >
              {t.label} <span className="opacity-60">{count(t.id)}</span>
            </button>
          );
        })}
      </div>
      <div className="space-y-4">
        <AnimatePresence initial={false} mode="popLayout">
          {show(thesis.track) && (
            <motion.div key="thesis" layout exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <BlurFade>
                <ThesisCard />
              </BlurFade>
            </motion.div>
          )}
          {show('power') && (
            <motion.div key="coursework" layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="grid gap-4 xl:grid-cols-2">
                {coursework.map((c, i) => (
                  <BlurFade key={c.title} delay={i * 0.05} className={i === 0 && coursework.length % 2 === 1 ? 'xl:col-span-2' : ''}>
                    <CourseworkCard item={c} />
                  </BlurFade>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
