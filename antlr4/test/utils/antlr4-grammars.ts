import { readdir, stat, readFile } from "fs/promises";
import { join } from "path";

export async function getAntlr4Grammars() {
    //name -> fileName -> fileContent
    const grammars: Record<string, Record<string, string>> = {};
    const folder = join(__dirname, '..', '..', '..', 'grammars-v4');
    for (const subFolderName of await readdir(folder)) {
        if(subFolderName.startsWith('.') || subFolderName.startsWith('_')) {
            continue;
        }
        const subFolder = join(folder, subFolderName);
        const subFolderStat = await stat(subFolder);
        if(!subFolderStat.isDirectory()) {
            continue;
        }
        const files: string[] = [];
        for (const fileName of await readdir(subFolder)) {
            const file = join(subFolder, fileName);
            const fileStat = await stat(file);
            if(file.endsWith('.g4') && fileStat.isFile()) {
                files.push(file);
            }
        }
        if(files.length) {
            const grammar = grammars[subFolderName] = {};
            for (const file of files) {
                grammar[file] = await readFile(file, 'utf-8');
            }
        }
    }
    return grammars;
}