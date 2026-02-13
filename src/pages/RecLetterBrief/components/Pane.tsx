import { PropsWithChildren, ReactNode } from 'react';
import { PaneHeader } from './PaneHeader';

export function Pane({ title, hint, children, className = '' }: PropsWithChildren<{ title: string; hint?: ReactNode; className?: string }>) {
  return (
    <section className={`min-h-0 rounded-none border border-neutral-700 bg-neutral-900/70 backdrop-blur ${className}`}>
      <div className="min-h-0 h-full overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        <PaneHeader title={title} hint={hint} />
        <div className="space-y-6 p-3">{children}</div>
      </div>
    </section>
  );
}
