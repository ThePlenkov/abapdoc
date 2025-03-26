
import { Registry, MemoryFile, type IObject } from '@abaplint/core'
import { readFileSync } from 'node:fs';

export function parse(filepath: string): IObject | undefined {
    const reg = new Registry();
    const content = readFileSync(filepath, 'utf8');
    reg.addFile(new MemoryFile(filepath, content));
    reg.parse();
    return reg.getFirstObject();
}
