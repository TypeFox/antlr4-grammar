import { TokenType, TokenVocabulary } from "chevrotain";
import { DefaultTokenBuilder, Grammar } from "langium";
import { TerminalRule } from "langium/lib/grammar/generated/ast";

type LexerMode = 'normal'|'argument'|'action';

const LexerActions: Record<string, LexerMode|null> = {
    COMMON__BEGIN_ARGUMENT: 'argument',
    COMMON__END_ARGUMENT: null,
    COMMON__BEGIN_ACTION: "action",
    COMMON__END_ACTION: null
};

export class Antlr4TokenBuilder extends DefaultTokenBuilder {
    buildTokens(grammar: Grammar, options?: { caseInsensitive?: boolean }): TokenVocabulary {
        const tokenTypes: TokenType[] = super.buildTokens(grammar, options) as TokenType[];
        const ACTION = 'ACTION__';
        const ARGUMENT = 'ARGUMENT__';
        const COMMON = 'COMMON__';

        const CommonContent = tokenTypes.filter(e => e.name.startsWith(COMMON))
        const modes: Record<LexerMode, TokenType[]> = {
            normal: tokenTypes.filter(e => [ARGUMENT, ACTION].every(p => !e.name.includes(p))),
            argument: tokenTypes.filter(e => e.name.includes(ARGUMENT)).concat(CommonContent),
            action: tokenTypes.filter(e => e.name.includes(ACTION)).concat(CommonContent),
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