import { TokenType, TokenVocabulary } from "chevrotain";
import { DefaultTokenBuilder, Grammar } from "langium";
import { TerminalRule } from "langium/lib/grammar/generated/ast";

type LexerMode = 'normal'|'argument'|'targetLanguageAction';

const LexerActions: Record<string, LexerMode|null> = {
    BEGIN_ACTION: "targetLanguageAction",
    BEGIN_ARGUMENT: 'argument',
    RBRACE: null,
    RBRACK: null
};

export class Antlr4TokenBuilder extends DefaultTokenBuilder {
    buildTokens(grammar: Grammar, options?: { caseInsensitive?: boolean }): TokenVocabulary {
        const tokenTypes: TokenType[] = super.buildTokens(grammar, options) as TokenType[];
        const TARGET_LANGUAGE_ACTION = 'TARGET_LANGUAGE_ACTION__';
        const ARGUMENT = 'ARGUMENT__';

        const CommonContent = tokenTypes.filter(e => ['STRING_LITERAL', 'DQUOTE_STRING_LITERAL', 'BEGIN_ACTION', 'BEGIN_ARGUMENT', 'ESCAPE', 'LINE_COMMENT', 'BLOCK_COMMENT', 'DOC_COMMENT', 'ANY_CONTENT'].includes(e.name))
        const modes: Record<LexerMode, TokenType[]> = {
            normal: tokenTypes.filter(e => [ARGUMENT, TARGET_LANGUAGE_ACTION].every(p => !e.name.startsWith(p))),
            argument: tokenTypes.filter(e => e.name.startsWith(ARGUMENT)).concat(CommonContent),
            targetLanguageAction: tokenTypes.filter(e => e.name.startsWith(TARGET_LANGUAGE_ACTION)).concat(CommonContent),
        };
        return {
            modes,
            defaultMode: 'normal'
        };
    }

    protected buildTerminalToken(terminal: TerminalRule): TokenType {
        const tokenType = super.buildTerminalToken(terminal);
        if(tokenType.name in LexerActions) {
            const mode = LexerActions[tokenType.name];
            if(mode) {
                tokenType.PUSH_MODE = mode;
            } else {
                tokenType.POP_MODE = true;
            }
        }
        return tokenType;
    }
}