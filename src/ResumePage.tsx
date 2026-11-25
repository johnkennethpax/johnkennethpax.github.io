import { ArrowLeft, Download, Printer } from 'lucide-react';
import { profile } from './data/profile';
import { CvDocument } from './components/CvDocument';
import { ThemeToggle } from './components/ThemeToggle';

export function ResumePage() {
  return (
    <>
      <div className="no-print sticky top-0 z-10 border-b border-hairline bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-ash hover:text-fg">
            <ArrowLeft size={16} aria-hidden="true" /> Portfolio
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-hairline px-3 py-2 text-sm text-ash transition-colors hover:border-strong hover:text-fg"
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

      <CvDocument />
    </>
  );
}
