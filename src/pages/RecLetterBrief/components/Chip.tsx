export function Chip({ label }: { label: string }) {
  return <span className="rounded-none border border-neutral-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-300">{label}</span>;
}
