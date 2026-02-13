import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const slugs = ['2026-a7c91f', '2026-f13d0c2b'];
const files = [
  'Suarez-Solis_Sebastian_CV.pdf',
  'Suarez-Solis_Sebastian_Submission_Packet.pdf',
  'Suarez-Solis_Sebastian_Teaching_Portfolio.pdf',
  'Suarez-Solis_Sebastian_Works_List.pdf',
  'Software_OnePager.pdf',
  'Writing_Samples.pdf',
  'Music_Reel.pdf',
  'Teaching_Snapshot.pdf',
];

function pdf(content) {
  const objs = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
    `4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
  ];
  let out = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objs) {
    offsets.push(out.length);
    out += obj;
  }
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) out += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return out;
}

for (const slug of slugs) {
  const base = join('public', 'rec', slug, 'assets');
  mkdirSync(base, { recursive: true });
  for (const file of files) {
    const fullPath = join(base, file);
    if (!existsSync(fullPath)) {
      const text = `BT\n/F1 18 Tf\n72 740 Td\n(Placeholder PDF: ${file}) Tj\n0 -26 Td\n/F1 12 Tf\n(Replace with final file in public/rec/${slug}/assets) Tj\nET`;
      writeFileSync(fullPath, pdf(text));
    }
  }
  const readmePath = join('public', 'rec', slug, 'README.txt');
  if (!existsSync(readmePath)) {
    writeFileSync(readmePath, 'Replace placeholder PDFs in /assets with real files; keep filenames stable.\n');
  }
}
