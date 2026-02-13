import { ReactNode } from 'react';

export function PaneHeader({ title, hint }: { title: string; hint?: ReactNode }) {
  return (
    <div className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/85 px-3 py-2 backdrop-blur">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">{title}</p>
        {hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
      </div>
    </div>
  );
}
