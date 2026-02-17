import { Download, ExternalLink, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { PdfCanvasViewer } from './PdfCanvasViewer';

export function PdfPreviewModal({ open, title, url, onClose }: { open: boolean; title: string; url: string; onClose: () => void }) {
  const [failed, setFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery('(max-width: 1023px)');
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');
  const isMobile = isSmallScreen || isCoarsePointer;

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
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close PDF preview" onClick={onClose} />
      <div className="relative mx-auto flex h-full w-full flex-col border border-neutral-700 bg-neutral-950 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] lg:my-8 lg:h-auto lg:max-h-[calc(var(--rec-vh,1vh)*100-4rem)] lg:w-[min(1100px,calc(100vw-2rem))]" style={{ height: 'calc(var(--rec-vh, 1vh) * 100)' }}>
        <div ref={rootRef} className="flex h-full min-h-0 flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-50">
            <p className="min-w-0 truncate font-mono text-xs uppercase tracking-wider">{title}</p>
            <div className="flex items-center gap-1">
              <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-none border border-neutral-700 px-2 py-2 text-xs hover:bg-neutral-800">
                <ExternalLink className="mr-1 inline h-3.5 w-3.5" />Open
              </a>
              <a href={url} download className="rounded-none border border-neutral-700 px-2 py-2 text-xs hover:bg-neutral-800">
                <Download className="mr-1 inline h-3.5 w-3.5" />Download
              </a>
              <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-none border border-neutral-700 hover:bg-neutral-800/60" aria-label="Close preview">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 border border-neutral-700 bg-neutral-900/70">
            {failed ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-sm text-neutral-200">
                <p>Preview unavailable on this device.</p>
                <div className="flex gap-2">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-none border border-neutral-200 bg-neutral-100 px-3 py-2 text-xs text-neutral-950 hover:bg-white">
                    Open in new tab
                  </a>
                  <a href={url} download className="rounded-none border border-neutral-700 px-3 py-2 text-xs hover:bg-neutral-800">
                    Download
                  </a>
                </div>
              </div>
            ) : isMobile ? (
              <PdfCanvasViewer url={url} onError={() => setFailed(true)} />
            ) : (
              <iframe title={title} src={`${url}#view=FitH`} className="h-full w-full" onError={() => setFailed(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
