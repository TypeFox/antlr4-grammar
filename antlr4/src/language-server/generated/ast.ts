/******************************************************************************
 * This file was generated by langium-cli 0.5.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, Reference, ReferenceInfo, isAstNode, TypeMetaData } from 'langium';

export type ActionContent = ActionBlock;

export const ActionContent = 'ActionContent';

export function isActionContent(item: unknown): item is ActionContent {
    return reflection.isInstance(item, ActionContent);
}

export type ArgumentContent = ArgActionBlock;

export const ArgumentContent = 'ArgumentContent';

export function isArgumentContent(item: unknown): item is ArgumentContent {
    return reflection.isInstance(item, ArgumentContent);
}

export type BlockSuffix = EbnfSuffix;

export const BlockSuffix = 'BlockSuffix';

export function isBlockSuffix(item: unknown): item is BlockSuffix {
    return reflection.isInstance(item, BlockSuffix);
}

export type CharSetContent = string;

export type LexerRuleBlock = LexerAltList;

export const LexerRuleBlock = 'LexerRuleBlock';

export function isLexerRuleBlock(item: unknown): item is LexerRuleBlock {
    return reflection.isInstance(item, LexerRuleBlock);
}

export interface Action_ extends AstNode {
    readonly $container: PrequelConstruct;
    block: ActionBlock
    name: string
    scopeName?: ActionScopeName
}

export const Action_ = 'Action_';

export function isAction_(item: unknown): item is Action_ {
    return reflection.isInstance(item, Action_);
}

export interface ActionBlock extends AstNode {
    readonly $container: ActionBlock | Action_ | Element | ExceptionHandler | FinallyClause | LexerElement | OptionValue | RuleAction;
    contents: Array<ActionContent>
}

export const ActionBlock = 'ActionBlock';

export function isActionBlock(item: unknown): item is ActionBlock {
    return reflection.isInstance(item, ActionBlock);
}

export interface ActionScopeName extends AstNode {
    readonly $container: Action_;
    lexer: boolean
    name?: string
    parser: boolean
}

export const ActionScopeName = 'ActionScopeName';

export function isActionScopeName(item: unknown): item is ActionScopeName {
    return reflection.isInstance(item, ActionScopeName);
}

export interface Alternative extends AstNode {
    readonly $container: AltList | LabeledAlt;
    elements: Array<Element>
    options: Array<ElementOptions>
}

export const Alternative = 'Alternative';

export function isAlternative(item: unknown): item is Alternative {
    return reflection.isInstance(item, Alternative);
}

export interface AltList extends AstNode {
    readonly $container: Block;
    alts: Array<Alternative>
}

export const AltList = 'AltList';

export function isAltList(item: unknown): item is AltList {
    return reflection.isInstance(item, AltList);
}

export interface ArgActionBlock extends AstNode {
    readonly $container: ArgActionBlock | ExceptionHandler | LocalsSpec | ParserRuleSpec | RuleRef | RuleReturns;
    contents: Array<ArgumentContent>
}

export const ArgActionBlock = 'ArgActionBlock';

export function isArgActionBlock(item: unknown): item is ArgActionBlock {
    return reflection.isInstance(item, ArgActionBlock);
}

export interface Atom extends AstNode {
    readonly $container: Element | LabeledElement;
    notSet?: NotSet
    options?: ElementOptions
    ruleRef?: RuleRef
    terminal?: string
}

export const Atom = 'Atom';

export function isAtom(item: unknown): item is Atom {
    return reflection.isInstance(item, Atom);
}

export interface Block extends AstNode {
    readonly $container: Ebnf | LabeledElement;
    actions: Array<RuleAction>
    list: AltList
    options?: OptionsSpec
}

export const Block = 'Block';

export function isBlock(item: unknown): item is Block {
    return reflection.isInstance(item, Block);
}

export interface BlockSet extends AstNode {
    readonly $container: NotSet;
    elements: Array<SetElement>
}

export const BlockSet = 'BlockSet';

export function isBlockSet(item: unknown): item is BlockSet {
    return reflection.isInstance(item, BlockSet);
}

export interface ChannelsSpec extends AstNode {
    readonly $container: PrequelConstruct;
    list?: IdList
}

export const ChannelsSpec = 'ChannelsSpec';

export function isChannelsSpec(item: unknown): item is ChannelsSpec {
    return reflection.isInstance(item, ChannelsSpec);
}

export interface CharacterRange extends AstNode {
    readonly $container: SetElement;
    left: string
    right: string
}

export const CharacterRange = 'CharacterRange';

export function isCharacterRange(item: unknown): item is CharacterRange {
    return reflection.isInstance(item, CharacterRange);
}

export interface CharSet extends AstNode {
    readonly $container: LexerAtom | SetElement;
    content?: CharSetContent
}

export const CharSet = 'CharSet';

export function isCharSet(item: unknown): item is CharSet {
    return reflection.isInstance(item, CharSet);
}

export interface DelegateGrammar extends AstNode {
    readonly $container: DelegateGrammars;
    alias?: string
    name: string
}

export const DelegateGrammar = 'DelegateGrammar';

export function isDelegateGrammar(item: unknown): item is DelegateGrammar {
    return reflection.isInstance(item, DelegateGrammar);
}

export interface DelegateGrammars extends AstNode {
    readonly $container: PrequelConstruct;
    grammars: Array<DelegateGrammar>
}

export const DelegateGrammars = 'DelegateGrammars';

export function isDelegateGrammars(item: unknown): item is DelegateGrammars {
    return reflection.isInstance(item, DelegateGrammars);
}

export interface Ebnf extends AstNode {
    readonly $container: Element;
    block: Block
    suffix?: BlockSuffix
}

export const Ebnf = 'Ebnf';

export function isEbnf(item: unknown): item is Ebnf {
    return reflection.isInstance(item, Ebnf);
}

export interface EbnfSuffix extends AstNode {
    readonly $container: Ebnf | Element | LexerElement;
    op: boolean | string
    question: boolean
}

export const EbnfSuffix = 'EbnfSuffix';

export function isEbnfSuffix(item: unknown): item is EbnfSuffix {
    return reflection.isInstance(item, EbnfSuffix);
}

export interface Element extends AstNode {
    readonly $container: Alternative;
    atom?: Atom
    block?: ActionBlock
    ebnf?: Ebnf
    element?: LabeledElement
    question: boolean
    suffix?: EbnfSuffix
}

export const Element = 'Element';

export function isElement(item: unknown): item is Element {
    return reflection.isInstance(item, Element);
}

export interface ElementOption extends AstNode {
    readonly $container: ElementOptions;
    ref: IdentifierRef
    value?: IdentifierRef | string
}

export const ElementOption = 'ElementOption';

export function isElementOption(item: unknown): item is ElementOption {
    return reflection.isInstance(item, ElementOption);
}

export interface ElementOptions extends AstNode {
    readonly $container: Alternative | Atom | LexerAtom | RuleRef | SetElement;
    element: Array<ElementOption>
}

export const ElementOptions = 'ElementOptions';

export function isElementOptions(item: unknown): item is ElementOptions {
    return reflection.isInstance(item, ElementOptions);
}

export interface ExceptionGroup extends AstNode {
    readonly $container: ParserRuleSpec;
    finally?: FinallyClause
    handlers: Array<ExceptionHandler>
}

export const ExceptionGroup = 'ExceptionGroup';

export function isExceptionGroup(item: unknown): item is ExceptionGroup {
    return reflection.isInstance(item, ExceptionGroup);
}

export interface ExceptionHandler extends AstNode {
    readonly $container: ExceptionGroup;
    action: ActionBlock
    argAction: ArgActionBlock
}

export const ExceptionHandler = 'ExceptionHandler';

export function isExceptionHandler(item: unknown): item is ExceptionHandler {
    return reflection.isInstance(item, ExceptionHandler);
}

export interface FinallyClause extends AstNode {
    readonly $container: ExceptionGroup;
    action: ActionBlock
}

export const FinallyClause = 'FinallyClause';

export function isFinallyClause(item: unknown): item is FinallyClause {
    return reflection.isInstance(item, FinallyClause);
}

export interface GrammarDecl extends AstNode {
    readonly $container: GrammarSpec;
    name: string
    type: GrammarType
}

export const GrammarDecl = 'GrammarDecl';

export function isGrammarDecl(item: unknown): item is GrammarDecl {
    return reflection.isInstance(item, GrammarDecl);
}

export interface GrammarSpec extends AstNode {
    grammarDecl: GrammarDecl
    prequels: Array<PrequelConstruct>
    rules: Rules
    specs: Array<ModeSpec>
}

export const GrammarSpec = 'GrammarSpec';

export function isGrammarSpec(item: unknown): item is GrammarSpec {
    return reflection.isInstance(item, GrammarSpec);
}

export interface GrammarType extends AstNode {
    readonly $container: GrammarDecl;
    lexer: boolean
    mixed: boolean
    parser: boolean
}

export const GrammarType = 'GrammarType';

export function isGrammarType(item: unknown): item is GrammarType {
    return reflection.isInstance(item, GrammarType);
}

export interface IdentifierRef extends AstNode {
    readonly $container: ElementOption | LabeledElement | RuleRef;
    lexerRuleRef?: Reference<LexerRuleSpec>
    parserRuleRef?: Reference<ParserRuleSpec>
}

export const IdentifierRef = 'IdentifierRef';

export function isIdentifierRef(item: unknown): item is IdentifierRef {
    return reflection.isInstance(item, IdentifierRef);
}

export interface IdList extends AstNode {
    readonly $container: ChannelsSpec | TokensSpec;
    ids: Array<Reference<ModeSpec>>
}

export const IdList = 'IdList';

export function isIdList(item: unknown): item is IdList {
    return reflection.isInstance(item, IdList);
}

export interface LabeledAlt extends AstNode {
    readonly $container: RuleAltList;
    alt: Alternative
    id?: string
}

export const LabeledAlt = 'LabeledAlt';

export function isLabeledAlt(item: unknown): item is LabeledAlt {
    return reflection.isInstance(item, LabeledAlt);
}

export interface LabeledElement extends AstNode {
    readonly $container: Element;
    element: Atom | Block
    name: IdentifierRef
    op: string
}

export const LabeledElement = 'LabeledElement';

export function isLabeledElement(item: unknown): item is LabeledElement {
    return reflection.isInstance(item, LabeledElement);
}

export interface LabeledLexerElement extends AstNode {
    readonly $container: LexerElement;
    elements: LexerAtom | LexerBlock
    name: string
    op: string
}

export const LabeledLexerElement = 'LabeledLexerElement';

export function isLabeledLexerElement(item: unknown): item is LabeledLexerElement {
    return reflection.isInstance(item, LabeledLexerElement);
}

export interface LexerAlt extends AstNode {
    readonly $container: LexerAltList;
    cmds?: LexerCommands
    elements: LexerElement
}

export const LexerAlt = 'LexerAlt';

export function isLexerAlt(item: unknown): item is LexerAlt {
    return reflection.isInstance(item, LexerAlt);
}

export interface LexerAltList extends AstNode {
    readonly $container: LexerBlock | LexerRuleSpec;
    alts: Array<LexerAlt>
}

export const LexerAltList = 'LexerAltList';

export function isLexerAltList(item: unknown): item is LexerAltList {
    return reflection.isInstance(item, LexerAltList);
}

export interface LexerAtom extends AstNode {
    readonly $container: LabeledLexerElement | LexerElement;
    charset?: CharSet
    notSet?: NotSet
    options?: ElementOptions
    right?: string
    string?: string
    token?: Reference<LexerRuleSpec>
}

export const LexerAtom = 'LexerAtom';

export function isLexerAtom(item: unknown): item is LexerAtom {
    return reflection.isInstance(item, LexerAtom);
}

export interface LexerBlock extends AstNode {
    readonly $container: LabeledLexerElement | LexerElement;
    list: LexerAltList
}

export const LexerBlock = 'LexerBlock';

export function isLexerBlock(item: unknown): item is LexerBlock {
    return reflection.isInstance(item, LexerBlock);
}

export interface LexerCommand extends AstNode {
    readonly $container: LexerCommands;
    expr?: LexerCommandExpr
    name: LexerCommandName
}

export const LexerCommand = 'LexerCommand';

export function isLexerCommand(item: unknown): item is LexerCommand {
    return reflection.isInstance(item, LexerCommand);
}

export interface LexerCommandExpr extends AstNode {
    readonly $container: LexerCommand;
    name: string
}

export const LexerCommandExpr = 'LexerCommandExpr';

export function isLexerCommandExpr(item: unknown): item is LexerCommandExpr {
    return reflection.isInstance(item, LexerCommandExpr);
}

export interface LexerCommandName extends AstNode {
    readonly $container: LexerCommand;
    name: string
}

export const LexerCommandName = 'LexerCommandName';

export function isLexerCommandName(item: unknown): item is LexerCommandName {
    return reflection.isInstance(item, LexerCommandName);
}

export interface LexerCommands extends AstNode {
    readonly $container: LexerAlt;
    cmds: Array<LexerCommand>
}

export const LexerCommands = 'LexerCommands';

export function isLexerCommands(item: unknown): item is LexerCommands {
    return reflection.isInstance(item, LexerCommands);
}

export interface LexerElement extends AstNode {
    readonly $container: LexerAlt;
    action?: ActionBlock
    atom?: LexerAtom
    block?: LexerBlock
    lexerElement?: LabeledLexerElement
    question: boolean
    suffix?: EbnfSuffix
}

export const LexerElement = 'LexerElement';

export function isLexerElement(item: unknown): item is LexerElement {
    return reflection.isInstance(item, LexerElement);
}

export interface LexerRuleSpec extends AstNode {
    readonly $container: ModeSpec | RuleSpec;
    block: LexerRuleBlock
    fragment: boolean
    name: string
    options?: OptionsSpec
}

export const LexerRuleSpec = 'LexerRuleSpec';

export function isLexerRuleSpec(item: unknown): item is LexerRuleSpec {
    return reflection.isInstance(item, LexerRuleSpec);
}

export interface LocalsSpec extends AstNode {
    readonly $container: ParserRuleSpec;
    argAction: ArgActionBlock
}

export const LocalsSpec = 'LocalsSpec';

export function isLocalsSpec(item: unknown): item is LocalsSpec {
    return reflection.isInstance(item, LocalsSpec);
}

export interface ModeSpec extends AstNode {
    readonly $container: GrammarSpec;
    name: string
    rules: Array<LexerRuleSpec>
}

export const ModeSpec = 'ModeSpec';

export function isModeSpec(item: unknown): item is ModeSpec {
    return reflection.isInstance(item, ModeSpec);
}

export interface NotSet extends AstNode {
    readonly $container: Atom | LexerAtom;
    element?: SetElement
    set?: BlockSet
}

export const NotSet = 'NotSet';

export function isNotSet(item: unknown): item is NotSet {
    return reflection.isInstance(item, NotSet);
}

export interface Option extends AstNode {
    readonly $container: OptionsSpec;
    name: string
    value: OptionValue
}

export const Option = 'Option';

export function isOption(item: unknown): item is Option {
    return reflection.isInstance(item, Option);
}

export interface OptionsSpec extends AstNode {
    readonly $container: Block | LexerRuleSpec | PrequelConstruct | RulePrequel;
    options: Array<Option>
}

export const OptionsSpec = 'OptionsSpec';

export function isOptionsSpec(item: unknown): item is OptionsSpec {
    return reflection.isInstance(item, OptionsSpec);
}

export interface OptionValue extends AstNode {
    readonly $container: Option;
    action?: ActionBlock
    ids: Array<string>
    number?: string
    string?: string
}

export const OptionValue = 'OptionValue';

export function isOptionValue(item: unknown): item is OptionValue {
    return reflection.isInstance(item, OptionValue);
}

export interface ParserRuleSpec extends AstNode {
    readonly $container: RuleSpec;
    block?: ArgActionBlock
    exceptionGroup: ExceptionGroup
    locals?: LocalsSpec
    modifiers?: RuleModifiers
    name: string
    prequals: Array<RulePrequel>
    return?: RuleReturns
    ruleBlock: RuleBlock
    throws?: ThrowsSpec
}

export const ParserRuleSpec = 'ParserRuleSpec';

export function isParserRuleSpec(item: unknown): item is ParserRuleSpec {
    return reflection.isInstance(item, ParserRuleSpec);
}

export interface PrequelConstruct extends AstNode {
    readonly $container: GrammarSpec;
    action?: Action_
    channels?: ChannelsSpec
    grammars?: DelegateGrammars
    options?: OptionsSpec
    tokens?: TokensSpec
}

export const PrequelConstruct = 'PrequelConstruct';

export function isPrequelConstruct(item: unknown): item is PrequelConstruct {
    return reflection.isInstance(item, PrequelConstruct);
}

export interface RuleAction extends AstNode {
    readonly $container: Block | RulePrequel;
    action: ActionBlock
    name: string
}

export const RuleAction = 'RuleAction';

export function isRuleAction(item: unknown): item is RuleAction {
    return reflection.isInstance(item, RuleAction);
}

export interface RuleAltList extends AstNode {
    readonly $container: RuleBlock;
    alts: Array<LabeledAlt>
}

export const RuleAltList = 'RuleAltList';

export function isRuleAltList(item: unknown): item is RuleAltList {
    return reflection.isInstance(item, RuleAltList);
}

export interface RuleBlock extends AstNode {
    readonly $container: ParserRuleSpec;
    list: RuleAltList
}

export const RuleBlock = 'RuleBlock';

export function isRuleBlock(item: unknown): item is RuleBlock {
    return reflection.isInstance(item, RuleBlock);
}

export interface RuleModifier extends AstNode {
    readonly $container: RuleModifiers;
    fragment: boolean
    private: boolean
    protected: boolean
    public: boolean
}

export const RuleModifier = 'RuleModifier';

export function isRuleModifier(item: unknown): item is RuleModifier {
    return reflection.isInstance(item, RuleModifier);
}

export interface RuleModifiers extends AstNode {
    readonly $container: ParserRuleSpec;
    modifiers: Array<RuleModifier>
}

export const RuleModifiers = 'RuleModifiers';

export function isRuleModifiers(item: unknown): item is RuleModifiers {
    return reflection.isInstance(item, RuleModifiers);
}

export interface RulePrequel extends AstNode {
    readonly $container: ParserRuleSpec;
    action?: RuleAction
    options?: OptionsSpec
}

export const RulePrequel = 'RulePrequel';

export function isRulePrequel(item: unknown): item is RulePrequel {
    return reflection.isInstance(item, RulePrequel);
}

export interface RuleRef extends AstNode {
    readonly $container: Atom;
    actions?: ArgActionBlock
    options?: ElementOptions
    ruleRef: IdentifierRef
}

export const RuleRef = 'RuleRef';

export function isRuleRef(item: unknown): item is RuleRef {
    return reflection.isInstance(item, RuleRef);
}

export interface RuleReturns extends AstNode {
    readonly $container: ParserRuleSpec;
    argAction: ArgActionBlock
}

export const RuleReturns = 'RuleReturns';

export function isRuleReturns(item: unknown): item is RuleReturns {
    return reflection.isInstance(item, RuleReturns);
}

export interface Rules extends AstNode {
    readonly $container: GrammarSpec;
    rules: Array<RuleSpec>
}

export const Rules = 'Rules';

export function isRules(item: unknown): item is Rules {
    return reflection.isInstance(item, Rules);
}

export interface RuleSpec extends AstNode {
    readonly $container: Rules;
    rule: LexerRuleSpec | ParserRuleSpec
}

export const RuleSpec = 'RuleSpec';

export function isRuleSpec(item: unknown): item is RuleSpec {
    return reflection.isInstance(item, RuleSpec);
}

export interface SetElement extends AstNode {
    readonly $container: BlockSet | NotSet;
    charset?: CharSet
    options?: ElementOptions
    range?: CharacterRange
    token?: Reference<LexerRuleSpec>
}

export const SetElement = 'SetElement';

export function isSetElement(item: unknown): item is SetElement {
    return reflection.isInstance(item, SetElement);
}

export interface ThrowsSpec extends AstNode {
    readonly $container: ParserRuleSpec;
    exceptions: Array<string>
}

export const ThrowsSpec = 'ThrowsSpec';

export function isThrowsSpec(item: unknown): item is ThrowsSpec {
    return reflection.isInstance(item, ThrowsSpec);
}

export interface TokensSpec extends AstNode {
    readonly $container: PrequelConstruct;
    list?: IdList
}

export const TokensSpec = 'TokensSpec';

export function isTokensSpec(item: unknown): item is TokensSpec {
    return reflection.isInstance(item, TokensSpec);
}

export type Antlr4AstType = 'ActionBlock' | 'ActionContent' | 'ActionScopeName' | 'Action_' | 'AltList' | 'Alternative' | 'ArgActionBlock' | 'ArgumentContent' | 'Atom' | 'Block' | 'BlockSet' | 'BlockSuffix' | 'ChannelsSpec' | 'CharSet' | 'CharacterRange' | 'DelegateGrammar' | 'DelegateGrammars' | 'Ebnf' | 'EbnfSuffix' | 'Element' | 'ElementOption' | 'ElementOptions' | 'ExceptionGroup' | 'ExceptionHandler' | 'FinallyClause' | 'GrammarDecl' | 'GrammarSpec' | 'GrammarType' | 'IdList' | 'IdentifierRef' | 'LabeledAlt' | 'LabeledElement' | 'LabeledLexerElement' | 'LexerAlt' | 'LexerAltList' | 'LexerAtom' | 'LexerBlock' | 'LexerCommand' | 'LexerCommandExpr' | 'LexerCommandName' | 'LexerCommands' | 'LexerElement' | 'LexerRuleBlock' | 'LexerRuleSpec' | 'LocalsSpec' | 'ModeSpec' | 'NotSet' | 'Option' | 'OptionValue' | 'OptionsSpec' | 'ParserRuleSpec' | 'PrequelConstruct' | 'RuleAction' | 'RuleAltList' | 'RuleBlock' | 'RuleModifier' | 'RuleModifiers' | 'RulePrequel' | 'RuleRef' | 'RuleReturns' | 'RuleSpec' | 'Rules' | 'SetElement' | 'ThrowsSpec' | 'TokensSpec';

export class Antlr4AstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['ActionBlock', 'ActionContent', 'ActionScopeName', 'Action_', 'AltList', 'Alternative', 'ArgActionBlock', 'ArgumentContent', 'Atom', 'Block', 'BlockSet', 'BlockSuffix', 'ChannelsSpec', 'CharSet', 'CharacterRange', 'DelegateGrammar', 'DelegateGrammars', 'Ebnf', 'EbnfSuffix', 'Element', 'ElementOption', 'ElementOptions', 'ExceptionGroup', 'ExceptionHandler', 'FinallyClause', 'GrammarDecl', 'GrammarSpec', 'GrammarType', 'IdList', 'IdentifierRef', 'LabeledAlt', 'LabeledElement', 'LabeledLexerElement', 'LexerAlt', 'LexerAltList', 'LexerAtom', 'LexerBlock', 'LexerCommand', 'LexerCommandExpr', 'LexerCommandName', 'LexerCommands', 'LexerElement', 'LexerRuleBlock', 'LexerRuleSpec', 'LocalsSpec', 'ModeSpec', 'NotSet', 'Option', 'OptionValue', 'OptionsSpec', 'ParserRuleSpec', 'PrequelConstruct', 'RuleAction', 'RuleAltList', 'RuleBlock', 'RuleModifier', 'RuleModifiers', 'RulePrequel', 'RuleRef', 'RuleReturns', 'RuleSpec', 'Rules', 'SetElement', 'ThrowsSpec', 'TokensSpec'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case ActionBlock: {
                return this.isSubtype(ActionContent, supertype);
            }
            case ArgActionBlock: {
                return this.isSubtype(ArgumentContent, supertype);
            }
            case EbnfSuffix: {
                return this.isSubtype(BlockSuffix, supertype);
            }
            case LexerAltList: {
                return this.isSubtype(LexerRuleBlock, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'IdentifierRef:lexerRuleRef': {
                return LexerRuleSpec;
            }
            case 'IdentifierRef:parserRuleRef': {
                return ParserRuleSpec;
            }
            case 'IdList:ids': {
                return ModeSpec;
            }
            case 'LexerAtom:token': {
                return LexerRuleSpec;
            }
            case 'SetElement:token': {
                return LexerRuleSpec;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'ActionBlock': {
                return {
                    name: 'ActionBlock',
                    mandatory: [
                        { name: 'contents', type: 'array' }
                    ]
                };
            }
            case 'ActionScopeName': {
                return {
                    name: 'ActionScopeName',
                    mandatory: [
                        { name: 'lexer', type: 'boolean' },
                        { name: 'parser', type: 'boolean' }
                    ]
                };
            }
            case 'Alternative': {
                return {
                    name: 'Alternative',
                    mandatory: [
                        { name: 'elements', type: 'array' },
                        { name: 'options', type: 'array' }
                    ]
                };
            }
            case 'AltList': {
                return {
                    name: 'AltList',
                    mandatory: [
                        { name: 'alts', type: 'array' }
                    ]
                };
            }
            case 'ArgActionBlock': {
                return {
                    name: 'ArgActionBlock',
                    mandatory: [
                        { name: 'contents', type: 'array' }
                    ]
                };
            }
            case 'Block': {
                return {
                    name: 'Block',
                    mandatory: [
                        { name: 'actions', type: 'array' }
                    ]
                };
            }
            case 'BlockSet': {
                return {
                    name: 'BlockSet',
                    mandatory: [
                        { name: 'elements', type: 'array' }
                    ]
                };
            }
            case 'DelegateGrammars': {
                return {
                    name: 'DelegateGrammars',
                    mandatory: [
                        { name: 'grammars', type: 'array' }
                    ]
                };
            }
            case 'EbnfSuffix': {
                return {
                    name: 'EbnfSuffix',
                    mandatory: [
                        { name: 'question', type: 'boolean' }
                    ]
                };
            }
            case 'Element': {
                return {
                    name: 'Element',
                    mandatory: [
                        { name: 'question', type: 'boolean' }
                    ]
                };
            }
            case 'ElementOptions': {
                return {
                    name: 'ElementOptions',
                    mandatory: [
                        { name: 'element', type: 'array' }
                    ]
                };
            }
            case 'ExceptionGroup': {
                return {
                    name: 'ExceptionGroup',
                    mandatory: [
                        { name: 'handlers', type: 'array' }
                    ]
                };
            }
            case 'GrammarSpec': {
                return {
                    name: 'GrammarSpec',
                    mandatory: [
                        { name: 'prequels', type: 'array' },
                        { name: 'specs', type: 'array' }
                    ]
                };
            }
            case 'GrammarType': {
                return {
                    name: 'GrammarType',
                    mandatory: [
                        { name: 'lexer', type: 'boolean' },
                        { name: 'mixed', type: 'boolean' },
                        { name: 'parser', type: 'boolean' }
                    ]
                };
            }
            case 'IdList': {
                return {
                    name: 'IdList',
                    mandatory: [
                        { name: 'ids', type: 'array' }
                    ]
                };
            }
            case 'LexerAltList': {
                return {
                    name: 'LexerAltList',
                    mandatory: [
                        { name: 'alts', type: 'array' }
                    ]
                };
            }
            case 'LexerCommands': {
                return {
                    name: 'LexerCommands',
                    mandatory: [
                        { name: 'cmds', type: 'array' }
                    ]
                };
            }
            case 'LexerElement': {
                return {
                    name: 'LexerElement',
                    mandatory: [
                        { name: 'question', type: 'boolean' }
                    ]
                };
            }
            case 'LexerRuleSpec': {
                return {
                    name: 'LexerRuleSpec',
                    mandatory: [
                        { name: 'fragment', type: 'boolean' }
                    ]
                };
            }
            case 'ModeSpec': {
                return {
                    name: 'ModeSpec',
                    mandatory: [
                        { name: 'rules', type: 'array' }
                    ]
                };
            }
            case 'OptionsSpec': {
                return {
                    name: 'OptionsSpec',
                    mandatory: [
                        { name: 'options', type: 'array' }
                    ]
                };
            }
            case 'OptionValue': {
                return {
                    name: 'OptionValue',
                    mandatory: [
                        { name: 'ids', type: 'array' }
                    ]
                };
            }
            case 'ParserRuleSpec': {
                return {
                    name: 'ParserRuleSpec',
                    mandatory: [
                        { name: 'prequals', type: 'array' }
                    ]
                };
            }
            case 'RuleAltList': {
                return {
                    name: 'RuleAltList',
                    mandatory: [
                        { name: 'alts', type: 'array' }
                    ]
                };
            }
            case 'RuleModifier': {
                return {
                    name: 'RuleModifier',
                    mandatory: [
                        { name: 'fragment', type: 'boolean' },
                        { name: 'private', type: 'boolean' },
                        { name: 'protected', type: 'boolean' },
                        { name: 'public', type: 'boolean' }
                    ]
                };
            }
            case 'RuleModifiers': {
                return {
                    name: 'RuleModifiers',
                    mandatory: [
                        { name: 'modifiers', type: 'array' }
                    ]
                };
            }
            case 'Rules': {
                return {
                    name: 'Rules',
                    mandatory: [
                        { name: 'rules', type: 'array' }
                    ]
                };
            }
            case 'ThrowsSpec': {
                return {
                    name: 'ThrowsSpec',
                    mandatory: [
                        { name: 'exceptions', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new Antlr4AstReflection();
