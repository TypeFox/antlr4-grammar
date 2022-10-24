import { TokenType, TokenVocabulary } from "chevrotain";
import { DefaultTokenBuilder, getAllReachableRules, Grammar, stream } from "langium";
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
        const reachableRules = stream(getAllReachableRules(grammar, false));
        const terminalTokens: TokenType[] = this.buildTerminalTokens(reachableRules);
        const tokens: TokenType[] = this.buildKeywordTokens(reachableRules, terminalTokens, options);
        const tokenTypes: TokenType[] = tokens.concat(terminalTokens)
        const ACTION = 'ACTION__';
        const ARGUMENT = 'ARGUMENT__';
        const COMMON = 'COMMON__';
        const ANY = 'COMMON__ANY';

        const CommonContentRaw = tokenTypes.filter(e => e.name.startsWith(COMMON));
        const CommonContent = CommonContentRaw.filter(e => e.name !== ANY).concat(CommonContentRaw.filter(e => e.name === ANY));
        const modes: Record<LexerMode, TokenType[]> = {
            normal: tokenTypes.filter(e => [ARGUMENT, ACTION, COMMON].every(p => !e.name.startsWith(p))).concat(CommonContent),
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