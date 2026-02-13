import { ArrowUpRight, FileText } from 'lucide-react';

type FileChipProps =
  | { label: string; filename: string; onClick: () => void; type?: 'pdf' }
  | { label: string; url: string; type: 'external' };

export function FileChip(props: FileChipProps) {
  if (props.type === 'external') {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group min-w-[220px] shrink-0 rounded-none border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-left backdrop-blur hover:bg-neutral-800"
      >
        <div className="flex items-center gap-2 text-neutral-100">
          <FileText className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-wider">{props.label}</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-1 text-[11px] text-neutral-400">External link</p>
      </a>
    );
  }

  return (
    <button onClick={props.onClick} className="min-w-[220px] shrink-0 rounded-none border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-left backdrop-blur hover:bg-neutral-800">
      <div className="flex items-center gap-2 text-neutral-100">
        <FileText className="h-4 w-4" />
        <span className="font-mono text-xs uppercase tracking-wider">{props.label}</span>
      </div>
      <p className="mt-1 text-[11px] text-neutral-400">{props.filename}</p>
    </button>
  );
}
