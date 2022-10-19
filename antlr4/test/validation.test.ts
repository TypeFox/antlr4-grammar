import {createAntlr4Services} from '../src/language-server/antlr-4-module';
import {describe, it, expect} from 'vitest';
import { parseHelper } from './utils/parseHelper';
import { join } from 'path';
import { EmptyFileSystem } from 'langium';

const { shared, Antlr4 } = createAntlr4Services(EmptyFileSystem);
const { parse, expectNoLexerErrors, expectValidationErrors, expectNoParserErrors } = parseHelper(Antlr4);

describe('Validation', () => {
    it('should detect duplicated rule names', async () => {
        const document = await parse(`
            grammar Hallo;
            start: Hallo;
            start: Hallo;
            Hallo: 'Hallo!';
        `);
        expectNoLexerErrors(document);
        expectNoParserErrors(document);
        expectValidationErrors(document, e => /duplicated/i.test(e.message), 2);
    });
});