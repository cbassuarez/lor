import { FileChipRow } from './FileChipRow';

export function TopChrome({
  assetBase,
  selectedPath,
  onOpen,
}: {
  assetBase: string;
  selectedPath: string;
  onOpen: (label: string, filename: string, url: string) => void;
}) {
  return (
    <header className="space-y-2 border-b border-neutral-700 pb-3">
      <FileChipRow assetBase={assetBase} onOpen={onOpen} />
      <div className="flex justify-end gap-2">
        <button onClick={() => window.print()} className="rounded-none border border-neutral-700 px-2 py-1 font-mono text-xs uppercase tracking-wider hover:bg-neutral-800">Print</button>
        <label className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-300">
          Page
          <select
            value={selectedPath}
            onChange={(e) => {
              localStorage.setItem('rec:lastPath', e.target.value);
              window.location.assign(e.target.value);
            }}
            className="rounded-none border border-neutral-700 bg-neutral-900 px-2 py-1 text-neutral-100"
          >
            <option value="/rec/2026-a7c91f/">UT Permian Basin (AP / Percussion Director)</option>
            <option value="/rec/2026-f13d0c2b/">Composition + Music Tech</option>
          </select>
        </label>
      </div>
    </header>
  );
}
