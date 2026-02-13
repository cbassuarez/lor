import { ReactNode } from 'react';

type Props = { id: string; title: string; children: ReactNode; className?: string };

export function Section({ id, title, children, className = '' }: Props) {
  return (
    <section id={id} className={`scroll-mt-28 rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
