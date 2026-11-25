import { experience } from '../data/profile';
import { BlurFade } from '../components/BlurFade';
import { EntryCard } from '../components/EntryCard';
import { Section } from '../components/Section';

export function Experience() {
  return (
    <Section id="experience" index="03" title="Experience & Leadership">
      <ol className="space-y-4">
        {experience.map((e, i) => (
          <BlurFade as="li" key={e.title} delay={i * 0.05}>
            <EntryCard entry={e} />
          </BlurFade>
        ))}
      </ol>
    </Section>
  );
}
