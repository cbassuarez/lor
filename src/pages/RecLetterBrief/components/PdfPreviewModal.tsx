import { AlertCircle, Download, ExternalLink, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PdfPreviewModal({ open, title, url, onClose }: { open: boolean; title: string; url: string; onClose: () => void }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!open) return;
    setFailed(false);
    const timer = window.setTimeout(() => setFailed(true), 3500);
    return () => window.clearTimeout(timer);
  }, [open, url]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="h-[90vh] w-full max-w-5xl rounded-none border border-neutral-700 bg-neutral-950 p-3 text-neutral-100">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider">{title}</p>
            <p className="text-xs text-neutral-400">{url.split('/').pop()}</p>
          </div>
          <button onClick={onClose} className="rounded-none border border-neutral-700 p-1 hover:bg-neutral-800"><X className="h-4 w-4" /></button>
        </div>
        <div className="mb-2 flex gap-2">
          <a className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800" href={url} target="_blank" rel="noreferrer"><ExternalLink className="mr-1 inline h-3.5 w-3.5" />Open</a>
          <a className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800" href={url} download><Download className="mr-1 inline h-3.5 w-3.5" />Download</a>
        </div>
        <div className="h-[calc(90vh-110px)] border border-neutral-700 bg-neutral-900/70">
          {!failed ? (
            <iframe title={title} src={url} className="h-full w-full" onLoad={() => setFailed(false)} onError={() => setFailed(true)} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-neutral-300">
              <AlertCircle className="h-5 w-5" />
              <p>Preview unavailable.</p>
              <a className="underline" href={url} target="_blank" rel="noreferrer">Open file</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
