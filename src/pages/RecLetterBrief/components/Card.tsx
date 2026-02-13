import { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`rounded-none border border-neutral-700 bg-neutral-900/70 p-3 backdrop-blur ${className}`}>{children}</section>;
}
