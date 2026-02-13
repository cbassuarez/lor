import { useEffect, useState } from 'react';
import { CopyButton } from './CopyButton';
import { FileChipRow } from './FileChipRow';
import { SoftwarePaletteModal } from './SoftwarePaletteModal';

export function Header({
  slug,
  onOpen,
  onCopied,
  coreParagraph,
}: {
  slug: string;
  onOpen: (label: string, filename: string, url: string) => void;
  onCopied: () => void;
  coreParagraph: string;
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <header className="shrink-0 border-b border-neutral-700 bg-neutral-950">
        <div className="flex flex-col gap-2 px-3 py-2 lg:px-4">
          <div className="grid items-center gap-2 lg:grid-cols-[1fr_auto_1fr]">
          <h1 className="text-sm font-medium lg:text-base">Letter of Recommendation Brief — Sebastian Suarez-Solis</h1>
          <p className="hidden text-center font-mono text-xs uppercase tracking-wider text-neutral-400 lg:block">Private • 2026</p>
          <div className="flex items-center justify-start gap-2 lg:justify-end">
            <CopyButton
              text={coreParagraph}
              onCopied={onCopied}
              label="Copy core paragraph"
              className="border-white/80 bg-white px-4 py-2 text-sm font-semibold text-neutral-950 !hover:bg-neutral-100 shadow-[0_0_14px_rgba(255,255,255,0.14)] hover:shadow-[0_0_18px_rgba(255,255,255,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:ring-0"
            />
            <button onClick={() => window.print()} className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800">Print</button>
          </div>
          </div>
          <FileChipRow slug={slug} onOpen={onOpen} onOpenPalette={() => setPaletteOpen(true)} />
        </div>
      </header>
      <SoftwarePaletteModal open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
