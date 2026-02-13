import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { softwarePalette } from '../data';

export function SoftwarePaletteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-none border border-neutral-700 bg-neutral-950" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-2">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-300">Software Projects</p>
          <button onClick={onClose} className="rounded-none border border-neutral-700 p-1 hover:bg-neutral-800" aria-label="Close software palette">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3">
          <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">Search</label>
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            className="w-full rounded-none border border-neutral-700 bg-neutral-900 px-2 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-500"
            placeholder="Filter by title or descriptor"
          />
          <ul className="mt-3 max-h-72 overflow-y-auto border border-neutral-800">
            {items.map((item, index) => (
              <li key={item.title}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClose()}
                  className={`group flex items-start justify-between gap-3 border-b border-neutral-800 px-3 py-2 text-left last:border-b-0 hover:bg-neutral-900/60 ${
                    index === selectedIndex ? 'bg-neutral-900/60 outline outline-1 outline-neutral-600' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm text-neutral-100">{item.title}</p>
                    <p className="text-xs text-neutral-400">{item.contains}</p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
            {!items.length ? <li className="px-3 py-2 text-xs text-neutral-400">No matches.</li> : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
