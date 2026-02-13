import { useState } from 'react';
import { Toast } from './Toast';

async function fallbackCopy(text: string) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [show, setShow] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      await fallbackCopy(text);
    }
    setShow(true);
    window.setTimeout(() => setShow(false), 1500);
  };

  return (
    <span>
      <button onClick={onCopy} className="rounded border border-slate-300 bg-white px-2 py-1 text-xs hover:bg-slate-100">
        {label}
      </button>
      <Toast show={show} text="Copied" />
    </span>
  );
}
