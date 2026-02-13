import { TargetId, pageOptions } from '../data';

export function TargetTabs({ value, onChange }: { value: TargetId; onChange: (value: TargetId) => void }) {
  return (
    <div className="hidden">
      {pageOptions.map((option) => (
        <button key={option.targetId} onClick={() => onChange(option.targetId)}>{option.label} {value === option.targetId ? 'active' : ''}</button>
      ))}
    </div>
  );
}
