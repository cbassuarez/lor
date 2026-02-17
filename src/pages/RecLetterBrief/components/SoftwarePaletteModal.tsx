import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { softwarePalette } from '../data';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function SoftwarePaletteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 1023px)') || useMediaQuery('(pointer: coarse)');

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return softwarePalette.items;
    return softwarePalette.items.filter(
      (item) => item.title.toLowerCase().includes(normalized) || item.contains.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSelectedIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (items.length ? (prev + 1) % items.length : 0));
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (items.length ? (prev - 1 + items.length) % items.length : 0));
        return;
      }
      if (event.key === 'Enter' && items[selectedIndex]) {
        event.preventDefault();
        window.open(items[selectedIndex].url, '_blank', 'noopener,noreferrer');
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [items, onClose, open, selectedIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close software palette" />
      <div className={`relative mx-auto flex flex-col border border-neutral-700 bg-neutral-950 ${isMobile ? 'h-[calc(var(--rec-vh,1vh)*100)] w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]' : 'mt-16 w-full max-w-2xl'}`} onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-300">Software Projects</p>
            <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-none border border-neutral-700 hover:bg-neutral-800" aria-label="Close software palette">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="mt-2 mb-1 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">Search</label>
          <input
            autoFocus
            inputMode="search"
            autoCapitalize="none"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            className="w-full rounded-none border border-neutral-700 bg-neutral-900 px-3 py-2.5 text-sm text-neutral-100 outline-none focus:border-neutral-500"
            placeholder="Filter by title or descriptor"
          />
        </div>

        <ul className="recbrief-scroll flex-1 min-h-0 overflow-y-auto border-t border-neutral-800">
          {items.map((item, index) => (
            <li key={item.title}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onClose()}
                className={`group flex min-h-[52px] items-center justify-between gap-3 border-b border-neutral-800 px-3 py-2 text-left hover:bg-neutral-900/60 ${
                  index === selectedIndex ? 'bg-neutral-900/60 outline outline-1 outline-neutral-600' : ''
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-neutral-100">{item.title}</p>
                  <p className="line-clamp-2 text-xs text-neutral-400">{item.contains}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
          {!items.length ? <li className="px-3 py-3 text-xs text-neutral-400">No matches.</li> : null}
        </ul>
      </div>
    </div>
  );
}
