import { Clipboard } from 'lucide-react';

type Props = { text: string; onCopied: () => void; label?: string; className?: string };

export function CopyButton({ text, onCopied, label = 'Copy', className = '' }: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      onCopied();
      return;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.focus();
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      onCopied();
    }
  };

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1 rounded-none border border-neutral-700 px-2 py-1 text-xs text-neutral-100 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${className}`}
    >
      <Clipboard className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
