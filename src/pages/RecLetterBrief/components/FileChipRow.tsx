import { fileDefs } from '../data';
import { FileChip } from './FileChip';

export function FileChipRow({ assetBase, onOpen }: { assetBase: string; onOpen: (label: string, filename: string, url: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {fileDefs.map((file) => {
        const url = `${assetBase}/${file.filename}`;
        return <FileChip key={file.key} label={file.label} filename={file.filename} onClick={() => onOpen(file.label, file.filename, url)} />;
      })}
    </div>
  );
}
