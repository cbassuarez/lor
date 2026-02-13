import { targetOptions, TargetKey } from '../data';

export function TargetTabs({ target, onChange }: { target: TargetKey; onChange: (t: TargetKey) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {targetOptions.map((option) => (
        <button
          key={option.key}
          className={`rounded-full px-3 py-1 text-sm ${target === option.key ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-300'}`}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
