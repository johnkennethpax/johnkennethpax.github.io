import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import './index.css';
import { awards, certifications, cvSkills, experience, education, profile, thesis } from './data/profile';

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="label border-b border-hairline pb-2 text-fg print:border-neutral-300">{children}</h2>;
}

function Row({ title, dates, org }: { title: ReactNode; dates?: string; org?: string }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-bold text-fg">{title}</h3>
        {dates && <span className="meta">{dates}</span>}
      </div>
      {org && <p className="text-sm text-ash">{org}</p>}
    </>
  );
}

function Resume() {
  const [ojt, ...roles] = experience;
  return (
    <>
      <div className="no-print sticky top-0 z-10 border-b border-hairline bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-ash hover:text-fg">
            <ArrowLeft size={16} aria-hidden="true" /> Portfolio
          </a>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-hairline px-3 py-2 text-sm text-ash transition-colors hover:border-fg hover:text-fg"
            >
              <Printer size={16} aria-hidden="true" /> Print
            </button>
            <a
              href={profile.cvPdf}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-fg bg-fg px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-fg"
            >
              <Download size={16} aria-hidden="true" /> PDF
            </a>
          </div>
        </div>
      </div>

      <main className="cv mx-auto max-w-3xl px-4 py-12 text-[15px] leading-relaxed text-ash sm:px-8 print:max-w-none print:px-0 print:py-0 print:text-[10.5pt] print:leading-snug">
        <header className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-fg">{profile.name}, SO2</h1>
          <p className="mt-2 font-mono text-xs text-smoke">
            <a className="hover:text-fg" href={`mailto:${profile.email}`}>{profile.email}</a> ·{' '}
            <a className="hover:text-fg" href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedinLabel}</a> · {profile.location}
          </p>
        </header>

        <section className="mt-8 print:mt-5">
          <Heading>Skills</Heading>
          <ul className="mt-3 space-y-1">
            {cvSkills.map((s) => (
              <li key={s.label}><span className="font-medium text-fg">{s.label}:</span> {s.items}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 print:mt-5">
          <Heading>Experience</Heading>
          <div className="mt-3 space-y-5 print:space-y-3">
            <div><Row title={`${ojt.title} (${ojt.badge})`} dates={ojt.dates} /></div>
            {roles.map((r) => (
              <div key={r.title}>
                <Row title={r.title} dates={r.dates} org={r.org} />
                <ul className="dash-list mt-2 space-y-1">
                  {r.bullets?.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 print:mt-5">
          <Heading>Projects</Heading>
          <div className="mt-3">
            <Row title={<a className="hover:underline" href="/#projects">{thesis.title}</a>} dates="In Progress" org="Undergraduate Thesis (thesis lead)" />
            <ul className="dash-list mt-2 space-y-1">
              {thesis.cvBullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </section>

        <section className="mt-8 print:mt-5">
          <Heading>Education</Heading>
          <div className="mt-3 space-y-3">
            <div>
              <Row title={education[0].title} dates={education[0].dates} org={education[0].org} />
              <ul className="dash-list mt-2 space-y-1">
                {awards.map((a) => (
                  <li key={a.title}>{a.title}, {a.org} <span className="meta">· {a.dates}</span></li>
                ))}
              </ul>
            </div>
            {education.slice(1).map((e) => (
              <div key={e.title}><Row title={e.title} dates={e.dates} org={e.org} /></div>
            ))}
          </div>
        </section>

        <section className="mt-8 print:mt-5">
          <Heading>Certifications</Heading>
          <ul className="mt-3 space-y-1">
            {certifications.map((c) => (
              <li key={c.title} className="flex flex-wrap justify-between gap-x-4">
                <span>{c.title.replace(' (Safety Officer 2)', '')}, {c.org}</span>
                <span className="meta">{c.dates}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Resume />
  </StrictMode>,
);
