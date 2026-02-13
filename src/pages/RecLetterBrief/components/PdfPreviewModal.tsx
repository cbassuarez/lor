import { Download, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function PdfPreviewModal({ open, title, url, onClose }: { open: boolean; title: string; url: string; onClose: () => void }) {
  const [failed, setFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setFailed(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && rootRef.current) {
        const nodes = Array.from(rootRef.current.querySelectorAll<HTMLElement>('button,a,[tabindex]:not([tabindex="-1"])'));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3" onClick={onClose}>
      <div ref={rootRef} className="h-[92dvh] w-full max-w-5xl rounded-none border border-neutral-700 bg-neutral-950 p-3" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate font-mono text-xs uppercase tracking-wider">{title}</p>
          <button onClick={onClose} className="rounded-none border border-neutral-700 p-1 hover:bg-neutral-800"><X className="h-4 w-4" /></button>
        </div>
        <div className="mb-2 flex gap-2">
          <a href={url} target="_blank" rel="noreferrer" className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800"><ExternalLink className="mr-1 inline h-3.5 w-3.5" />Open</a>
          <a href={url} download className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800"><Download className="mr-1 inline h-3.5 w-3.5" />Download</a>
        </div>
        <div className="h-[calc(92dvh-7.5rem)] border border-neutral-700 bg-neutral-900/70">
          {failed ? (
            <div className="flex h-full items-center justify-center text-sm text-neutral-300">Preview unavailable. Open file instead.</div>
          ) : (
            <iframe title={title} src={`${url}#view=FitH`} className="h-full w-full" onError={() => setFailed(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
