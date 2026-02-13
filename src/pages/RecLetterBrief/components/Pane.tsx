import { PropsWithChildren } from 'react';

export function Pane({ title, children, className = '' }: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <section className={`min-h-0 border border-neutral-700 bg-neutral-900/70 backdrop-blur rounded-none ${className}`}>
      <div className="border-b border-neutral-700 px-3 py-2 font-mono text-xs uppercase tracking-wider">{title}</div>
      <div className="min-h-0 h-[calc(100%-2.25rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] p-3">{children}</div>
    </section>
  );
}
