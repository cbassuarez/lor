export function Chip({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${
        muted ? 'border-slate-200 text-slate-400' : 'border-slate-300 text-slate-700'
      }`}
    >
      {label}
    </span>
  );
}
