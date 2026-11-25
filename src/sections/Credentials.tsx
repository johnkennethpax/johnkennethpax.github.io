import type { Entry } from '../data/profile';
import { awards, certifications } from '../data/profile';
import { BlurFade } from '../components/BlurFade';
import { Section } from '../components/Section';

function List({ title, items }: { title: string; items: Entry[] }) {
  return (
    <div className="card card-hover h-full p-6">
      <h3 className="label">{title}</h3>
      <ul className="mt-5 space-y-5">
        {items.map((c) => (
          <li key={c.title}>
            <p className="font-medium leading-snug text-fg">{c.title}</p>
            <p className="meta mt-1">{[c.org, c.dates].filter(Boolean).join(' · ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Credentials() {
  return (
    <Section id="credentials" index="05" title="Certifications & Awards">
      <div className="grid gap-4 xl:grid-cols-2">
        <BlurFade><List title="Certifications" items={certifications} /></BlurFade>
        <BlurFade delay={0.08}><List title="Awards" items={awards} /></BlurFade>
      </div>
    </Section>
  );
}
