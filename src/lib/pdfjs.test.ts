import { describe, expect, it } from 'vitest';
import { normalizePdfJsUrl } from './pdfjs';

describe('normalizePdfJsUrl', () => {
  it('resolves internal paths against BASE_URL and strips hash', () => {
    const output = normalizePdfJsUrl('rec/2026-a7c91f/assets/Teaching_Philosophy.pdf#view=FitH');
    expect(output.startsWith(`${window.location.origin}${import.meta.env.BASE_URL}`)).toBe(true);
    expect(output.includes('#')).toBe(false);
  });

  it('strips hash from external absolute URLs', () => {
    expect(normalizePdfJsUrl('https://example.com/file.pdf#page=2')).toBe('https://example.com/file.pdf');
  });
});
