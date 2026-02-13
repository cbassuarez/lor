import { ReactNode } from 'react';
import { PaneKey } from '../data';
import { Header } from './Header';
import { PaneSwitch } from './PaneSwitch';

export function AppShell({
  slug,
  onOpen,
  onCopied,
  coreParagraph,
  accentHue,
  mobilePane,
  setMobilePane,
  overview,
  claims,
  kit,
}: {
  slug: string;
  onOpen: (label: string, filename: string, url: string) => void;
  onCopied: () => void;
  coreParagraph: string;
  accentHue: number;
  mobilePane: PaneKey;
  setMobilePane: (pane: PaneKey) => void;
  overview: ReactNode;
  claims: ReactNode;
  kit: ReactNode;
}) {
  return (
    <main className="recbrief-shell flex h-screen h-[100dvh] flex-col bg-neutral-950 text-neutral-100">
      <Header slug={slug} onOpen={onOpen} onCopied={onCopied} coreParagraph={coreParagraph} accentHue={accentHue} />
      <div className="flex-1 min-h-0 flex flex-col">
        <PaneSwitch value={mobilePane} onChange={setMobilePane} />
        <div className="flex-1 min-h-0 lg:grid lg:grid-cols-12 lg:gap-2 lg:p-2">
          <div className={`min-h-0 lg:col-span-3 ${mobilePane === 'overview' ? 'block' : 'hidden lg:block'}`}>{overview}</div>
          <div className={`min-h-0 lg:col-span-5 ${mobilePane === 'claims' ? 'block' : 'hidden lg:block'}`}>{claims}</div>
          <div className={`min-h-0 lg:col-span-4 ${mobilePane === 'kit' ? 'block' : 'hidden lg:block'}`}>{kit}</div>
        </div>
      </div>
    </main>
  );
}
