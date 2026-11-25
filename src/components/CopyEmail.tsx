import { Copy } from 'lucide-react';
import { useToast } from './Toast';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers or contexts without the async clipboard API.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function CopyEmail({ email, className = '' }: { email: string; className?: string }) {
  const toast = useToast();
  return (
    <button
      type="button"
      className={className}
      onClick={async () => toast((await copyText(email)) ? 'Email copied' : 'Copy failed. Email: ' + email)}
      aria-label={`Copy email address ${email}`}
      title="Copy email"
    >
      <Copy size={16} aria-hidden="true" /> <span className="lg:sr-only">Copy email</span>
    </button>
  );
}
