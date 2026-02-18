import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import workerSrc from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export function normalizePdfJsUrl(input: string): string {
  const base = new URL(import.meta.env.BASE_URL, window.location.origin);
  const normalized = new URL(input, base);
  normalized.hash = '';
  return normalized.toString();
}

export { pdfjs };
