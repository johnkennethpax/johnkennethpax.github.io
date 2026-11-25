import { profile } from '../data/profile';

/** Personal silhouette mark (transparent PNG source), sized to sit inline with text. */
export function BrandMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return <img src={profile.mark} width={128} height={128} alt="" aria-hidden="true" className={className} />;
}
