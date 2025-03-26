import { globSync } from "node:fs";
import { type StarlightUserConfig } from "@astrojs/starlight/types";
import path from "node:path";

interface Options {
    cwd?: string;
    types?: string[];
}

const Groups = {
    intf: 'Interfaces',
}

export function generateSidebar(options?: Options): StarlightUserConfig['sidebar'] {

    const pattern = options?.types ? `**/*.{${options.types.join(',')}}.abap` : '**/*.abap';

    const files = globSync(pattern, { cwd: options?.cwd }).map(file => {
        const filename = path.basename(file).replace(/\.abap$/, '');
        const { type, name } = filename.match(/(?<name>.+)\.(?<type>.+)/)?.groups ?? { type: 'unknown', name: filename };
        return { type, name, file };
    });

    const groups = files.reduce((acc, { type, name, file }) => {
        if (!acc.has(type)) {
            acc.set(type, []);
        }
        acc.get(type)?.push(name);
        return acc;
    }, new Map<string, Array<string>>());

    return Array.from(groups.entries()).map(([type, files]) => {
        return {
            label: Groups[type as keyof typeof Groups] ?? type,
            items: files.map(name => ({ label: name, link: `/abap/${type}/${name}` }))
        }
    });

}