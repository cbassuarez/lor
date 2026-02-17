import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy, RenderTask } from 'pdfjs-dist/types/src/display/api';
import { useEffect, useMemo, useRef, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

type PdfCanvasViewerProps = {
  url: string;
  className?: string;
  accentHue?: number;
  onError?: () => void;
};

export function PdfCanvasViewer({ url, className, accentHue = 220, onError }: PdfCanvasViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const renderTasksRef = useRef<Map<number, RenderTask>>(new Map());
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadingTask = pdfjs.getDocument(url);

    setLoading(true);
    setError(null);
    setPdfDoc(null);
    setNumPages(0);

    loadingTask.promise
      .then((doc) => {
        if (cancelled) {
          doc.destroy();
          return;
        }
        setPdfDoc(doc);
        setNumPages(doc.numPages);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Unable to load PDF preview.');
        onError?.();
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      renderTasksRef.current.forEach((task) => task.cancel());
      renderTasksRef.current.clear();
      loadingTask.destroy();
      setPdfDoc((previous) => {
        previous?.destroy();
        return null;
      });
    };
  }, [onError, url]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(node);
    setContainerWidth(node.clientWidth);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pdfDoc || !numPages || !containerWidth) return;

    const root = containerRef.current;
    if (!root) return;

    let cancelled = false;
    const observers: IntersectionObserver[] = [];

    const renderPage = async (pageNumber: number, wrapper: HTMLDivElement) => {
      if (wrapper.dataset.rendered === 'true') return;
      wrapper.dataset.rendered = 'rendering';

      const canvas = wrapper.querySelector('canvas');
      if (!canvas) return;

      try {
        const page: PDFPageProxy = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.max((containerWidth - 24) / baseViewport.width, 0.1);
        const viewport = page.getViewport({ scale });
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const renderTask = page.render({ canvasContext: context, viewport });
        renderTasksRef.current.set(pageNumber, renderTask);
        await renderTask.promise;

        wrapper.dataset.rendered = 'true';
      } catch {
        wrapper.dataset.rendered = 'error';
        setError('Unable to render PDF preview.');
        onError?.();
      } finally {
        renderTasksRef.current.delete(pageNumber);
      }
    };

    for (let i = 1; i <= numPages; i += 1) {
      const wrapper = pageRefs.current[i - 1];
      if (!wrapper) continue;
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const target = entry.target as HTMLDivElement;
            void renderPage(i, target);
            currentObserver.unobserve(target);
          }
        },
        { root, rootMargin: '250px 0px' },
      );
      observer.observe(wrapper);
      observers.push(observer);
    }

    return () => {
      cancelled = true;
      observers.forEach((observer) => observer.disconnect());
      renderTasksRef.current.forEach((task) => task.cancel());
      renderTasksRef.current.clear();
    };
  }, [containerWidth, numPages, onError, pdfDoc]);

  const placeholders = useMemo(() => Array.from({ length: numPages }, (_, index) => index + 1), [numPages]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-neutral-300" role="status">
        {error}
      </div>
    );
  }

  if (loading) {
    return <div className="flex h-full items-center justify-center text-sm text-neutral-300">Loading preview…</div>;
  }

  return (
    <div ref={containerRef} className={`recbrief-scroll h-full overflow-y-auto [-webkit-overflow-scrolling:touch] ${className ?? ''}`}>
      <div className="space-y-3 p-3" style={{ borderColor: `hsl(${accentHue} 20% 40%)` }}>
        {placeholders.map((pageNumber, index) => (
          <div
            key={pageNumber}
            ref={(node) => {
              pageRefs.current[index] = node;
            }}
            className="flex min-h-[240px] items-center justify-center border border-neutral-800 bg-neutral-950"
          >
            <canvas className="max-w-full" aria-label={`PDF page ${pageNumber}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
