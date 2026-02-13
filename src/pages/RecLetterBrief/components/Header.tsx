import { CopyButton } from './CopyButton';
import { FileChipRow } from './FileChipRow';

export function Header({
  selectedPath,
  assetBase,
  onOpen,
  onCopied,
  coreParagraph,
}: {
  selectedPath: string;
  assetBase: string;
  onOpen: (label: string, filename: string, url: string) => void;
  onCopied: () => void;
  coreParagraph: string;
}) {
  return (
    <header className="shrink-0 border-b border-neutral-700 bg-neutral-950">
      <div className="flex flex-col gap-2 px-3 py-2 lg:px-4">
        <div className="grid items-center gap-2 lg:grid-cols-[1fr_auto_1fr]">
          <h1 className="text-sm font-medium lg:text-base">Letter of Recommendation Brief — Sebastian Suarez-Solis</h1>
          <p className="hidden text-center font-mono text-xs uppercase tracking-wider text-neutral-400 lg:block">Private • 2026</p>
          <div className="flex items-center justify-start gap-2 lg:justify-end">
            <CopyButton text={coreParagraph} onCopied={onCopied} label="Copy core paragraph" />
            <button onClick={() => window.print()} className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800">Print</button>
          </div>
        </div>
        <FileChipRow assetBase={assetBase} onOpen={onOpen} />
      </div>
    </header>
  );
}
