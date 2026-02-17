import { PropsWithChildren, useEffect, useRef, useState } from 'react';

export function ScrollArea({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ height: 0, top: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateThumb = () => {
      const { clientHeight, scrollHeight, scrollTop } = viewport;
      if (!scrollHeight || scrollHeight <= clientHeight) {
        setThumb({ height: 0, top: 0 });
        return;
      }

      const ratio = clientHeight / scrollHeight;
      const thumbHeight = Math.max(24, clientHeight * ratio);
      const maxTop = clientHeight - thumbHeight;
      const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;
      setThumb({ height: thumbHeight, top });
    };

    updateThumb();
    viewport.addEventListener('scroll', updateThumb, { passive: true });
    window.addEventListener('resize', updateThumb);

    return () => {
      viewport.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
    };
  }, []);

  return (
    <div className={`relative min-h-0 h-full ${className}`}>
      <div ref={viewportRef} className="recbrief-scroll min-h-0 flex-1 h-full overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        <div className="pb-[max(12px,env(safe-area-inset-bottom))]">{children}</div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-4">
        {thumb.height > 0 ? (
          <div
            className="pointer-events-auto absolute right-0 w-4"
            style={{ height: `${thumb.height}px`, top: `${thumb.top}px` }}
            aria-hidden="true"
          >
            <div className="absolute right-1/2 h-full w-[2px] translate-x-1/2 rounded-full bg-neutral-500/70" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
