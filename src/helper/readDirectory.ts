import { readdirSync } from 'fs';
import { join } from 'path';
export default function readDirectory(currentFolder: string): string[] {
    const items = readdirSync(currentFolder, { withFileTypes: true })
        .flatMap((file) => file.isDirectory()
            ? readDirectory(join(currentFolder, file.name))
            : join(currentFolder, file.name));
    return items;
}