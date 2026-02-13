import { PropsWithChildren, ReactNode } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`space-y-2 rounded-none border border-neutral-700 bg-neutral-900/70 p-3 backdrop-blur ${className}`}>{children}</section>;
}

export function CardHeader({ title, subtext, action }: { title: string; subtext?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-medium text-neutral-100">{title}</h3>
        {subtext ? <p className="text-xs text-neutral-400">{subtext}</p> : null}
      </div>
      {action}
    </div>
  );
}
