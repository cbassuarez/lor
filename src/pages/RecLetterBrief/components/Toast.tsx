export function Toast({ show, text }: { show: boolean; text: string }) {
  if (!show) return null;
  return <span className="ml-2 text-xs text-emerald-700">{text}</span>;
}
