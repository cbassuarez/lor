import { Clipboard } from 'lucide-react';

type Props = {
  text: string;
  onCopied: () => void;
  label?: string;
  className?: string;
  variant?: 'default' | 'cta';
  accentHue?: number;
};

export function CopyButton({ text, onCopied, label = 'Copy', className = '', variant = 'default', accentHue }: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      onCopied();
      return;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.focus();
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
      onCopied();
    }
  };

  const baseClasses = 'inline-flex items-center gap-1 rounded-none focus-visible:outline-none disabled:cursor-not-allowed';
  const defaultClasses =
    'border border-neutral-700 px-2 py-1 text-xs text-neutral-100 transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950';
  const ctaClasses =
    'relative border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition-[background-color,box-shadow,transform] duration-150 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_24px_rgba(255,255,255,0.22)] before:absolute before:inset-0 before:pointer-events-none before:bg-gradient-to-br before:from-white/0 before:via-white/35 before:to-white/0 before:opacity-0 before:transition-opacity hover:before:opacity-100 hover:!bg-neutral-100 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.65),0_0_38px_rgba(255,255,255,0.32)] hover:-translate-y-[1px] active:translate-y-0 active:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:ring-0';

  const accentGlow = variant === 'cta' && accentHue !== undefined ? { boxShadow: `0 0 0 1px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.22), 0 0 28px hsl(${accentHue} 90% 60% / 0.16)` } : undefined;

  return (
    <button onClick={copy} className={`${baseClasses} ${variant === 'cta' ? ctaClasses : defaultClasses} ${className}`} style={accentGlow}>
      <Clipboard className="relative z-[1] h-3.5 w-3.5" />
      <span className="relative z-[1]">{label}</span>
    </button>
  );
}
