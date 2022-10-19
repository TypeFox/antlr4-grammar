import {createAntlr4Services} from '../src/language-server/antlr-4-module';
import {describe, it, expect} from 'vitest';
import { parseHelper } from './utils/parseHelper';
import { join } from 'path';
import { EmptyFileSystem } from 'langium';

const { shared, Antlr4 } = createAntlr4Services(EmptyFileSystem);
const { parse, parseFile, expectOk } = parseHelper(Antlr4);

describe('parser', () => {
    it('parse', async () => {
        const document = await parse(`
            grammar Hallo;
            start: Hallo;
            Hallo: 'Hallo!';
        `);
        expectOk(document);
    });
});