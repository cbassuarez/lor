import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

type ScrollAreaProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  accentHue?: number;
}>;

const MIN_THUMB_HEIGHT = 24;

export function ScrollArea({ className = '', contentClassName = '', accentHue, children }: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number>();
  const dragOffsetRef = useRef(0);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [metrics, setMetrics] = useState({ clientHeight: 1, scrollHeight: 1, scrollTop: 0 });

  const refreshMetrics = () => {
    const el = viewportRef.current;
    if (!el) return;
    setMetrics({ clientHeight: el.clientHeight, scrollHeight: el.scrollHeight, scrollTop: el.scrollTop });
  };

  useEffect(() => {
    const el = viewportRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        refreshMetrics();
        setActive(true);
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => setActive(false), 700);
      });
    };

    const observer = new ResizeObserver(() => refreshMetrics());
    observer.observe(el);
    observer.observe(content);

    refreshMetrics();
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  const overflow = metrics.scrollHeight > metrics.clientHeight + 1;
  const thumbHeight = useMemo(() => {
    if (!overflow) return 0;
    return Math.max(MIN_THUMB_HEIGHT, metrics.clientHeight * (metrics.clientHeight / metrics.scrollHeight));
  }, [overflow, metrics.clientHeight, metrics.scrollHeight]);

  const maxThumbTop = Math.max(metrics.clientHeight - thumbHeight, 0);
  const maxScrollTop = Math.max(metrics.scrollHeight - metrics.clientHeight, 0);
  const thumbTop = maxScrollTop ? (metrics.scrollTop / maxScrollTop) * maxThumbTop : 0;

  const thumbOpacity = !overflow ? 0 : metrics.scrollTop <= 0 || metrics.scrollTop >= maxScrollTop ? 0.6 : 1;

  useEffect(() => {
    if (!dragging) return;

    const onPointerMove = (event: PointerEvent) => {
      const el = viewportRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nextThumbTop = clamp(event.clientY - rect.top - dragOffsetRef.current, 0, maxThumbTop);
      const ratio = maxThumbTop === 0 ? 0 : nextThumbTop / maxThumbTop;
      el.scrollTop = ratio * maxScrollTop;
    };

    const onPointerUp = () => setDragging(false);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [dragging, maxScrollTop, maxThumbTop]);

  const showIndicator = overflow && (dragging || hovered || active);

  return (
    <div className={`relative min-h-0 ${className}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div ref={viewportRef} className="recbrief-scroll min-h-0 h-full overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
        <div ref={contentRef} className={contentClassName}>
          {children}
        </div>
      </div>

      <div
        className={`pointer-events-auto absolute bottom-2 right-1 top-2 w-[2px] rounded-full bg-neutral-800/60 transition-opacity duration-150 ${showIndicator ? 'opacity-100' : 'opacity-0'}`}
        onPointerDown={(event) => {
          if (!overflow || !viewportRef.current) return;
          const rect = viewportRef.current.getBoundingClientRect();
          const clickY = event.clientY - rect.top;
          const nextThumbTop = clamp(clickY - thumbHeight / 2, 0, maxThumbTop);
          const ratio = maxThumbTop === 0 ? 0 : nextThumbTop / maxThumbTop;
          viewportRef.current.scrollTop = ratio * maxScrollTop;
        }}
      >
        <div
          className="pointer-events-auto absolute left-0 w-[2px] cursor-grab rounded-full bg-neutral-200/70 active:cursor-grabbing"
          style={{
            height: `${thumbHeight}px`,
            transform: `translateY(${thumbTop}px)`,
            opacity: thumbOpacity,
            boxShadow: accentHue !== undefined ? `0 0 20px hsl(${accentHue} 90% 60% / 0.22)` : undefined,
          }}
          onPointerDown={(event) => {
            if (!overflow) return;
            event.preventDefault();
            dragOffsetRef.current = event.clientY - event.currentTarget.getBoundingClientRect().top;
            setDragging(true);
          }}
        />
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
