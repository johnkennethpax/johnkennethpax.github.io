import type { Entry } from '../data/profile';

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className="card card-hover p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-bold text-fg">
          {entry.title}
          {entry.badge && (
            <span className="ml-2 inline-block rounded-full border border-fg px-2 align-middle font-mono text-[10px] uppercase leading-5 tracking-widest text-fg">
              {entry.badge}
            </span>
          )}
        </h3>
        {entry.dates && <span className="meta">{entry.dates}</span>}
      </div>
      {entry.org && <p className="mt-1 text-sm text-ash">{entry.org}</p>}
      {entry.bullets && (
        <ul className="dash-list mt-4 space-y-2 text-[15px] leading-relaxed text-ash">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
