import { PropsWithChildren, ReactNode } from 'react';
import { PaneHeader } from './PaneHeader';
import { ScrollArea } from './ScrollArea';

export function Pane({ title, hint, accentHue, children, className = '' }: PropsWithChildren<{ title: string; hint?: ReactNode; accentHue: number; className?: string }>) {
  return (
    <section className={`min-h-0 rounded-none border border-neutral-700 bg-neutral-900/70 backdrop-blur ${className}`}>
      <ScrollArea accentHue={accentHue} contentClassName="space-y-6 p-3">
        <PaneHeader title={title} hint={hint} accentHue={accentHue} />
        {children}
      </ScrollArea>
    </section>
  );
}
