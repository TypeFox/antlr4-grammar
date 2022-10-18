import {createAntlr4Services} from '../src/language-server/antlr-4-module';
import {describe, it, expect} from 'vitest';
import { parseHelper } from './utils/parseHelper';
import { join } from 'path';
import { EmptyFileSystem } from 'langium';

const { shared, Antlr4 } = createAntlr4Services(EmptyFileSystem);
const { parse, parseFile, expectOk } = parseHelper(Antlr4);

describe('parser', () => {
    describe('Hallo', () => {
        it('parse', async () => {
            const document = await parseFile(join(__dirname, 'Hallo.g4'));
            expectOk(document);
        });
    });
});