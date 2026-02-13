import { PaneKey } from '../data';

const options: { key: PaneKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'claims', label: 'Claims' },
  { key: 'kit', label: 'Kit' },
];

export function PaneSwitch({ value, onChange }: { value: PaneKey; onChange: (value: PaneKey) => void }) {
  return (
    <div className="grid grid-cols-3 border-b border-neutral-700 lg:hidden">
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          className={`rounded-none border-r border-neutral-700 px-3 py-2 font-mono text-xs uppercase tracking-wider last:border-r-0 ${
            value === option.key ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
