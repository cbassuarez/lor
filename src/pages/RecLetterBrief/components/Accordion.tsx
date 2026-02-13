import { ReactNode, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const animation = useMemo(
    () =>
      reduced
        ? {}
        : {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: 'auto' },
            exit: { opacity: 0, height: 0 },
          },
    [reduced],
  );

  return (
    <div className="rounded-lg border border-slate-200">
      <button className="flex w-full items-center justify-between p-3 text-left" onClick={() => setOpen((v) => !v)}>
        <span className="font-medium">{title}</span>
        <span className="text-xs text-slate-500">{open ? 'Hide' : 'Show'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="overflow-hidden border-t border-slate-200 p-3 print:block" {...animation}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden print:block print:p-3">{children}</div>
    </div>
  );
}
