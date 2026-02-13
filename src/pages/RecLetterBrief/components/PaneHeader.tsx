import { ReactNode } from 'react';

const alphaByTitle: Record<string, number> = {
  Overview: 0.14,
  Claims: 0.2,
  'Letter kit': 0.28,
};

export function PaneHeader({ title, hint, accentHue }: { title: string; hint?: ReactNode; accentHue: number }) {
  const alpha = alphaByTitle[title] ?? 0.14;
  const glow = title === 'Claims' || title === 'Letter kit';

  return (
    <div className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/85 px-3 py-2 backdrop-blur">
      <div className="flex flex-col gap-1">
        <p
          className="inline-flex items-center gap-2 rounded-none px-2 py-1 text-xs font-mono uppercase tracking-wider text-white"
          style={{
            backgroundColor: `hsl(${accentHue} 90% 60% / ${alpha})`,
            border: `1px solid hsl(${accentHue} 90% 70% / 0.25)`,
            boxShadow: glow ? `0 0 18px hsl(${accentHue} 90% 60% / ${(alpha * 0.8).toFixed(3)})` : undefined,
          }}
        >
          {title}
        </p>
        {hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
      </div>
    </div>
  );
}
