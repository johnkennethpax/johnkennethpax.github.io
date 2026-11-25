import { about, education } from '../data/profile';
import { BlurFade } from '../components/BlurFade';
import { EntryCard } from '../components/EntryCard';
import { Section } from '../components/Section';

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <BlurFade>
        <p className="text-lg leading-relaxed text-ash">{about.text}</p>
      </BlurFade>
      <dl className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {about.facts.map((f, i) => (
          <BlurFade key={f.label} delay={i * 0.05} className="card card-hover p-4">
            <dt className="meta">{f.label}</dt>
            <dd className="mt-1 font-mono text-sm text-fg">{f.value}</dd>
          </BlurFade>
        ))}
      </dl>

      <h3 className="label mt-12">Education</h3>
      <ul className="mt-4 space-y-3">
        {education.map((e, i) => (
          <BlurFade as="li" key={e.title} delay={i * 0.05}>
            <EntryCard entry={e} />
          </BlurFade>
        ))}
      </ul>
    </Section>
  );
}
