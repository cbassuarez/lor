import { fileDefs } from '../data';
import { toInternalUrl } from '../utils/url';
import { FileChip } from './FileChip';

export function FileChipRow({
  slug,
  onOpen,
  onOpenPalette,
}: {
  slug: string;
  onOpen: (label: string, filename: string, url: string) => void;
  onOpenPalette: () => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto lg:flex-wrap">
      {fileDefs.map((file) => {
        if (file.type === 'palette') {
          return <FileChip key={file.key} label={file.label} type="palette" onClick={onOpenPalette} />;
        }

        const relPath = `rec/${slug}/assets/${file.filename}`;
        const url = toInternalUrl(relPath);
        return <FileChip key={file.key} label={file.label} filename={file.filename} onClick={() => onOpen(file.label, file.filename, url)} />;
      })}
    </div>
  );
}
