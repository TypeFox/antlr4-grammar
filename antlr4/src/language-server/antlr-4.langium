grammar Antlr4

entry GrammarSpec: grammarDecl=GrammarDecl prequels+=PrequelConstruct* rules=Rules specs+=ModeSpec*;
GrammarDecl: type=GrammarType name=IdentifierRef SEMI;
GrammarType: (lexer?=LEXER GRAMMAR | parser?=PARSER GRAMMAR | mixed?=GRAMMAR);

// This is the list of all constructs that can be declared before
// the set of rules that compose the grammar, and is invoked 0..n
// times by the grammarPrequel rule.
PrequelConstruct: options=OptionsSpec | grammars=DelegateGrammars | tokens=TokensSpec | channels=ChannelsSpec | action=Action_;

// ------------
// Options - things that affect analysis and/or code generation
OptionsSpec: OPTIONS (options+=Option SEMI)* RBRACE;
Option: name=IdentifierRef ASSIGN value=OptionValue;
OptionValue
   : ids+=IdentifierRef (DOT ids+=IdentifierRef)*
   | string=STRING_LITERAL
   | action=ActionBlock
   | number=INT
   ;

// ------------
// Delegates
DelegateGrammars: IMPORT grammars+=DelegateGrammar (COMMA grammars+=DelegateGrammar)* SEMI;
DelegateGrammar: alias=IdentifierRef ASSIGN name=IdentifierRef | name=IdentifierRef;

// ------------
// Tokens & Channels
TokensSpec: TOKENS list=IdList? RBRACE;
ChannelsSpec: CHANNELS list=IdList? RBRACE;
IdList: ids+=IdentifierRef (COMMA ids+=IdentifierRef)* COMMA?;

// Match stuff like @parser::members {int i;}
Action_: AT (scopeName=ActionScopeName COLONCOLON)? name=IdentifierRef block=ActionBlock;

// Scope names could collide with keywords; allow them as ids for action scopes
ActionScopeName: name=IdentifierRef | lexer?=LEXER | parser?=PARSER;
ActionBlock: BEGIN_ACTION contents+=ActionContent* RBRACE;
ActionContent returns string:
   BEGIN_ACTION
   | ESCAPE
   | DQUOTE_STRING_LITERAL
   | STRING_LITERAL
   | RBRACE
   | ANY_CONTENT
   ;
ArgActionBlock: BEGIN_ARGUMENT contents+=ArgumentContent* RBRACK;
ArgumentContent returns string:
    BEGIN_ARGUMENT
    | ESCAPE
    | DQUOTE_STRING_LITERAL
    | STRING_LITERAL
    | RBRACK
    | ANY_CONTENT
    ;
ModeSpec: MODE name=IdentifierRef SEMI rules+=LexerRuleSpec*;
Rules: rules+=RuleSpec*;
RuleSpec: rule=(ParserRuleSpec | LexerRuleSpec);

ParserRuleSpec: modifiers=RuleModifiers? name=PARSER_RULE_ID block=ArgActionBlock? return=RuleReturns? throws=ThrowsSpec? locals=LocalsSpec? prequals+=RulePrequel* COLON ruleBlock=RuleBlock SEMI exceptionGroup=ExceptionGroup;

ExceptionGroup: handlers+=ExceptionHandler* finally=FinallyClause?;
ExceptionHandler: CATCH argAction=ArgActionBlock action=ActionBlock;
FinallyClause: FINALLY action=ActionBlock;
RulePrequel: options=OptionsSpec | action=RuleAction;
RuleReturns: RETURNS argAction=ArgActionBlock;

// --------------
// Exception spec
ThrowsSpec: THROWS exceptions+=IdentifierRef (COMMA exceptions+=IdentifierRef)*;
LocalsSpec: LOCALS argAction=ArgActionBlock;

/** Match stuff like @init {int i;} */
RuleAction: AT name=IdentifierRef action=ActionBlock;
RuleModifiers: modifiers+=RuleModifier+;

// An individual access modifier for a rule. The 'fragment' modifier
// is an internal indication for lexer rules that they do not match
// from the input but are like subroutines for other lexer rules to
// reuse for certain lexical patterns. The other modifiers are passed
// to the code generation templates and may be ignored by the template
// if they are of no use in that language.
RuleModifier: public?=PUBLIC | private?=PRIVATE | protected?=PROTECTED | fragment?=FRAGMENT;
RuleBlock: list=RuleAltList;
RuleAltList: alts+=LabeledAlt (OR alts+=LabeledAlt)*;
LabeledAlt: alt=Alternative (POUND id=IdentifierRef)?;

// --------------------
// Lexer rules
LexerRuleSpec: fragment?=FRAGMENT? name=LEXER_RULE_ID options=OptionsSpec? COLON block=LexerRuleBlock SEMI;
LexerRuleBlock: LexerAltList;
LexerAltList: alts+=LexerAlt (OR alts+=LexerAlt)*;
LexerAlt: (elements=LexerElements cmds=LexerCommands?)?;
LexerElements: elements+=LexerElement*;
LexerElement
   : lexerElement=LabeledLexerElement suffix=EbnfSuffix?
   | atom=LexerAtom suffix=EbnfSuffix?
   | block=LexerBlock suffix=EbnfSuffix?
   | action=ActionBlock question?=QUESTION?
   ;
   // but preds can be anywhere
LabeledLexerElement: name=IdentifierRef op=(ASSIGN | PLUS_ASSIGN) elements=(LexerAtom | LexerBlock);
LexerBlock: LPAREN list=LexerAltList RPAREN;
   // E.g., channel(HIDDEN), skip, more, mode(INSIDE), push(INSIDE), pop
LexerCommands: RARROW cmds+=LexerCommand (COMMA cmds+=LexerCommand)*;
LexerCommand: name=LexerCommandName LPAREN expr=LexerCommandExpr RPAREN
            | name=LexerCommandName
            ;
LexerCommandName: IdentifierRef | MODE;
LexerCommandExpr: IdentifierRef | INT;

// --------------------
// Rule Alts
AltList: alts+=Alternative (OR alts+=Alternative)*;
Alternative: (options+=ElementOptions? elements+=Element+)?;

Element
   : element=LabeledElement suffix=EbnfSuffix?
   | atom=Atom suffix=EbnfSuffix?
   | ebnf=Ebnf
   | block=ActionBlock question?=QUESTION?
   ;

LabeledElement: name=IdentifierRef op=(ASSIGN | PLUS_ASSIGN) element=(Atom | Block);

// --------------------
// EBNF and blocks
Ebnf
   : block=Block suffix=BlockSuffix?
   ;

BlockSuffix
   : EbnfSuffix
   ;

EbnfSuffix
   : op?=QUESTION question?=QUESTION?
   | op=STAR question?=QUESTION?
   | op=PLUS question?=QUESTION?
   ;

LexerAtom
   : chars=CharacterRange
   | terminal=Terminal
   | notSet=NotSet
   | DOT options=ElementOptions?
   ;

Atom
   : ruleRef=RuleRef
   | notSet=NotSet
   | DOT options=ElementOptions?
   ;

// --------------------
// Inverted element set
NotSet: NOT element=SetElement | NOT set=BlockSet;
BlockSet: LPAREN elements+=SetElement (OR elements+=SetElement)* RPAREN;
SetElement
   : token=[LexerRuleSpec:LEXER_RULE_ID] options=ElementOptions?
   | range=CharacterRange
   | STRING_LITERAL options=ElementOptions?
   ;

// -------------
// Grammar Block
Block: LPAREN (options=OptionsSpec? actions+=RuleAction* COLON)? list=AltList RPAREN;

// ----------------
// Parser rule ref
RuleRef: ruleRef=IdentifierRef actions=ArgActionBlock? options=ElementOptions?;

// ---------------
// Character Range
CharacterRange: left=STRING_LITERAL RANGE right=STRING_LITERAL;
Terminal: token=[LexerRuleSpec:LEXER_RULE_ID] options=ElementOptions? | string=STRING_LITERAL options=ElementOptions?;

// Terminals may be adorned with certain options when
// reference in the grammar: TOK<,,,>
ElementOptions: LT element+=ElementOption (COMMA element+=ElementOption)* GT;
ElementOption: ref=IdentifierRef (ASSIGN value=(IdentifierRef | STRING_LITERAL))?;
IdentifierRef
   : parserRuleRef=[ParserRuleSpec:PARSER_RULE_ID]
   | lexerRuleRef=[LexerRuleSpec:LEXER_RULE_ID]
   ;











// ======================================================
// Lexer specification
// ======================================================

// -------------------------
// Comments
hidden terminal DOC_COMMENT: DocComment;
hidden terminal BLOCK_COMMENT: BlockComment;
hidden terminal LINE_COMMENT: LineComment;

// -------------------------
// Integer

terminal INT: DecimalNumeral;

// -------------------------
// Literal string
//
// ANTLR makes no distinction between a single character literal and a
// multi-character string. All literals are single quote delimited and
// may contain unicode escape sequences of the form \uxxxx, where x
// is a valid hexadecimal number (per Unicode standard).
terminal STRING_LITERAL: SQuoteLiteral;
terminal UNTERMINATED_STRING_LITERAL: USQuoteLiteral;

// -------------------------
// Arguments
//
// Certain argument lists, such as those specifying call parameters
// to a rule invocation, or input parameters to a rule specification
// are contained within square brackets.
terminal BEGIN_ARGUMENT: LBrack;  // -> pushMode (TargetLanguageAction)

// -------------------------
// Target Language Actions
terminal BEGIN_ACTION: LBrace; // -> pushMode (TargetLanguageAction);

// -------------------------
// Keywords
//
// 'options', 'tokens', and 'channels' are considered keywords
// but only when followed by '{', and considered as a single token.
// Otherwise, the symbols are tokenized as RULE_REF and allowed as
// an Identifier in a labeledElement.
terminal OPTIONS      : 'options'  WSNLCHARS* '{'  ;
terminal TOKENS       : 'tokens'   WSNLCHARS* '{'  ;
terminal CHANNELS     : 'channels' WSNLCHARS* '{'  ;
terminal fragment WSNLCHARS : / / | '\t' | '\f' | '\n' | '\r' ;
terminal IMPORT: 'import';
terminal FRAGMENT: 'fragment';
terminal LEXER: 'lexer';
terminal PARSER: 'parser';
terminal GRAMMAR: 'grammar';
terminal PROTECTED: 'protected';
terminal PUBLIC: 'public';
terminal PRIVATE: 'private';
terminal RETURNS: 'returns';
terminal LOCALS: 'locals';
terminal THROWS: 'throws';
terminal CATCH: 'catch';
terminal FINALLY: 'finally';
terminal MODE: 'mode';

// -------------------------
// Punctuation
terminal COLON: Colon;
terminal COLONCOLON: DColon;
terminal COMMA: Comma;
terminal SEMI: Semi;
terminal LPAREN: LParen;
terminal RPAREN: RParen;
terminal RBRACE: RBrace;
terminal RBRACK: RBrack;
terminal RARROW: RArrow;
terminal LT: Lt;
terminal GT: Gt;
terminal ASSIGN: Equal;
terminal QUESTION: Question;
terminal STAR: Star;
terminal PLUS_ASSIGN: PlusAssign;
terminal PLUS: Plus;
terminal OR: Pipe;
terminal DOLLAR: Dollar;
terminal RANGE: Range;
terminal DOT: Dot;
terminal AT: At;
terminal POUND: Pound;
terminal NOT: Tilde;

// -------------------------
// Identifiers - allows unicode rule/token names
terminal LEXER_RULE_ID: LexerRuleId;
terminal PARSER_RULE_ID: ParserRuleId;

// -------------------------
// Whitespace
hidden terminal WS: Ws+;

// -------------------------
// Illegal Characters
//
// This is an illegal character trap which is always the last rule in the
// lexer specification. It matches a single character of any value and being
// the last rule in the file will match when no other rule knows what to do
// about the character. It is reported as an error but is not passed on to the
// parser. This means that the parser to deal with the gramamr file anyway
// but we will not try to analyse or code generate from a file with lexical
// errors.

// ======================================================
// Lexer modes
// -------------------------
// Arguments
//mode Argument;
// E.g., [int x, List<String> a[]]
terminal ESCAPE: EscAny;

// -------------------------
// Target Language Actions
//
// Many language targets use {} as block delimiters and so we
// must recursively match {} delimited blocks to balance the
// braces. Additionally, we must make some assumptions about
// literal string representation in the target language. We assume
// that they are delimited by ' or " and so consume these
// in their own alts so as not to inadvertantly match {}.

// mode TargetLanguageAction;
terminal DQUOTE_STRING_LITERAL: DQuoteLiteral;
terminal ANY_CONTENT: /[^ ]/;

// ------------------------------------------------------------------------------
// Grammar specific Keywords, Punctuation, etc.
terminal fragment ParserRuleId: UpperNameStartChar NameChar*;
terminal fragment LexerRuleId: LowerNameStartChar NameChar*;

// ======================================================
// Lexer fragments
//
// -----------------------------------
// Whitespace & Comments

terminal fragment Ws: Hws | Vws;
terminal fragment Hws: /[ \t]/;
terminal fragment Vws: /[\r\n\f]/;

terminal fragment BlockComment: /\/\*[\s\S]*?\*\//;
terminal fragment DocComment: /\/\*\*[\s\S]*?\*\//;
terminal fragment LineComment: /\/\/[^\n\r]*/;

// -----------------------------------
// Escapes
// Any kind of escaped character that we can embed within ANTLR literal strings.
terminal fragment EscSeq: Esc (/[btnfr"'\\]/ | UnicodeEsc | . );
terminal fragment EscAny: Esc .;
terminal fragment UnicodeEsc: 'u' (HexDigit (HexDigit (HexDigit HexDigit?)?)?)?;

// -----------------------------------
// Numerals
terminal fragment DecimalNumeral: '0' | /[1-9]/ DecDigit*;

// -----------------------------------
// Digits
terminal fragment HexDigit: /[0-9a-fA-F]/;
terminal fragment DecDigit: /[0-9]/;

// -----------------------------------
// Literals
terminal fragment BoolLiteral: /true|false/;
terminal fragment CharLiteral: SQuote (EscSeq | /[^'\r\n\\]/) SQuote;
terminal fragment SQuoteLiteral: SQuote (EscSeq | /[^'\r\n\\]/)* SQuote;
terminal fragment DQuoteLiteral: DQuote (EscSeq | /[^"\r\n\\]/)* DQuote;
terminal fragment USQuoteLiteral: SQuote (EscSeq | /[^'\r\n\\]/)*;

// -----------------------------------
// Character ranges
terminal fragment NameChar
   : LowerNameStartChar
   | UpperNameStartChar
   | /[0-9]/
   | Underscore
//   | '\u00B7'
//   | /[\u0300-\u036F]/
//   | /[\u203F-\u2040]/
   ;

terminal fragment LowerNameStartChar
   : /[a-z]/
   ;
terminal fragment UpperNameStartChar
   : /[A-Z]/
   ;
//   | /[\u00C0-\u00D6]/
//   | /[\u00D8-\u00F6]/
//   | /[\u00F8-\u02FF]/
//   | /[\u0370-\u037D]/
//   | /[\u037F-\u1FFF]/
//   | /[\u200C-\u200D]/
//   | /[\u2070-\u218F]/
//   | /[\u2C00-\u2FEF]/
//   | /[\u3001-\uD7FF]/
//   | /[\uF900-\uFDCF]/
//   | /[\uFDF0-\uFFFD]/
// ignores | ['\u10000-'\uEFFFF] ;

// -----------------------------------
// Types
terminal fragment Int: 'int';

// -----------------------------------
// Symbols
terminal fragment Esc: '\\';
terminal fragment Colon: ':';
terminal fragment DColon: '::';
terminal fragment SQuote: /'/;
terminal fragment DQuote: '"';
terminal fragment LParen: '(';
terminal fragment RParen: ')';
terminal fragment LBrace: '{';
terminal fragment RBrace: '}';
terminal fragment LBrack: '[';
terminal fragment RBrack: ']';
terminal fragment RArrow: '->';
terminal fragment Lt: '<';
terminal fragment Gt: '>';
terminal fragment Equal: '=';
terminal fragment Question: '?';
terminal fragment Star: '*';
terminal fragment Plus: '+';
terminal fragment PlusAssign: '+=';
terminal fragment Underscore: '_';
terminal fragment Pipe: '|';
terminal fragment Dollar: '$';
terminal fragment Comma: ',';
terminal fragment Semi: ';';
terminal fragment Dot: '.';
terminal fragment Range: '..';
terminal fragment At: '@';
terminal fragment Pound: '#';
terminal fragment Tilde: '~';   