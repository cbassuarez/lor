const chipVariants = {
  mono: 'bg-neutral-900/60 border border-neutral-700 text-neutral-300',
  teaching: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200',
  research: 'bg-violet-500/10 border border-violet-500/20 text-violet-200',
  software: 'bg-sky-500/10 border border-sky-500/20 text-sky-200',
  performance: 'bg-amber-500/10 border border-amber-500/20 text-amber-200',
  service: 'bg-rose-500/10 border border-rose-500/20 text-rose-200',
} as const;

export function Chip({ label, variant = 'mono' }: { label: string; variant?: keyof typeof chipVariants }) {
  return <span className={`rounded-none px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${chipVariants[variant]}`}>{label}</span>;
}
