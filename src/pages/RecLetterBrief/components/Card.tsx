import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">{children}</article>;
}
