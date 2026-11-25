import { skills } from '../data/profile';
import { BlurFade } from '../components/BlurFade';
import { Section } from '../components/Section';

export function Skills() {
  return (
    <Section id="skills" index="04" title="Technical Skills">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((g, i) => (
          <BlurFade key={g.label} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.04} className="card card-hover p-5">
            <h3 className="text-sm font-bold text-fg">{g.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="pill">{s}</li>
              ))}
            </ul>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
