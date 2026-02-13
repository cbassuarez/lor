import { FileText } from 'lucide-react';

export function FileChip({ label, filename, onClick }: { label: string; filename: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="min-w-[210px] rounded-none border border-neutral-700 bg-neutral-900/70 p-3 text-left backdrop-blur hover:bg-neutral-800">
      <div className="flex items-center gap-2 text-neutral-100">
        <FileText className="h-4 w-4" />
        <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 text-xs text-neutral-400">{filename}</p>
    </button>
  );
}
