import {createAntlr4Services} from '../src/language-server/antlr-4-module';
import {describe, it, expect} from 'vitest';
import { parseHelper } from './utils/parseHelper';
import { join } from 'path';
import { EmptyFileSystem, LangiumDocument } from 'langium';
import { GrammarSpec, ParserRuleSpec } from '../src/language-server/generated/ast';

const { shared, Antlr4 } = createAntlr4Services(EmptyFileSystem);
const { parse, parseFile, expectOk } = parseHelper<GrammarSpec>(Antlr4);
function getAstNode(document: LangiumDocument<GrammarSpec>, path: string) {
    return Antlr4.workspace.AstNodeLocator.getAstNode(document, path);
}

describe('Scoping', () => {
    it('should resolve lexer rule', async () => {
        const document = await parse(`
            grammar Hallo;
            start: Hallo;
            Hallo: 'Hallo!';
        `);
        expectOk(document);
        const actual = getAstNode(document, '/rules/rules@0/rule/ruleBlock/list/alts@0/alt/elements@0/atom/ruleRef/ruleRef/lexerRuleRef/ref');
        const expected = getAstNode(document, '/rules/rules@1');
        expect(actual).toBe(expected);
    });

    it('should resolve parser rule', async () => {
        const document = await parse(`
            grammar Hallo;
            start: hallo;
            hallo: BEGIN hallo END | ;
            BEGIN: 'begin';
            END: 'end';
        `);
        expectOk(document);
        const actual = getAstNode(document, '/rules/rules@0/rule/ruleBlock/list/alts@0/alt/elements@0/atom/ruleRef/ruleRef/parserRuleRef/ref');
        const expected = getAstNode(document, '/rules/rules@1');
        expect(actual).toBe(expected);
    });
});