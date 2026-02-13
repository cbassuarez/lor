import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  kicker?: string;
  descriptor?: string;
};

export function Section({ title, children, className = '', kicker, descriptor }: Props) {
  return (
    <section className={`space-y-3 border-t border-neutral-800 pt-4 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1">
          {kicker ? <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">{kicker}</p> : null}
          <h2 className="text-sm font-semibold text-neutral-100">{title}</h2>
        </div>
        {descriptor ? <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">{descriptor}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
