grammar Antlr4

entry Model:
    (persons+=Person | greetings+=Greeting)*;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

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
terminal BEGIN_ARGUMENT: LBrack; //TODO  { this.handleBeginArgument(); }

// -------------------------
// Target Language Actions
terminal BEGIN_ACTION: LBrace; //TODO -> pushMode (TargetLanguageAction);

// -------------------------
// Keywords
//
// 'options', 'tokens', and 'channels' are considered keywords
// but only when followed by '{', and considered as a single token.
// Otherwise, the symbols are tokenized as RULE_REF and allowed as
// an identifier in a labeledElement.
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
terminal LBRACE: LBrace;
terminal RBRACE: RBrace;
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
terminal ID: Id;

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
// mode Argument;
// E.g., [int x, List<String> a[]]
terminal NESTED_ARGUMENT
   : LBrack
   ;

terminal ARGUMENT_ESCAPE
   : EscAny
   ;

terminal ARGUMENT_STRING_LITERAL
   : DQuoteLiteral
   ;

terminal ARGUMENT_CHAR_LITERAL
   : SQuoteLiteral
   ;

terminal END_ARGUMENT
   : RBrack
   ;

terminal ARGUMENT_CONTENT: /./;

// TODO: This grammar and the one used in the Intellij Antlr4 plugin differ
// for "actions". This needs to be resolved at some point.
// The Intellij Antlr4 grammar is here:
// https://github.com/antlr/intellij-plugin-v4/blob/1f36fde17f7fa63cb18d7eeb9cb213815ac658fb/src/main/antlr/org/antlr/intellij/plugin/parser/ANTLRv4Lexer.g4#L587

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
terminal NESTED_ACTION: LBrace;
terminal ACTION_ESCAPE: EscAny;
terminal ACTION_STRING_LITERAL: DQuoteLiteral;
terminal ACTION_CHAR_LITERAL: SQuoteLiteral;
terminal ACTION_DOC_COMMENT: DocComment;
terminal ACTION_BLOCK_COMMENT: BlockComment;
terminal ACTION_LINE_COMMENT: LineComment;
terminal END_ACTION: RBrace;
terminal ACTION_CONTENT: .;

// -------------------------
//mode LexerCharSet;
terminal LEXER_CHAR_SET_BODY: (!/[ \]\\]/ | EscAny)+;
terminal LEXER_CHAR_SET: RBrack;

// ------------------------------------------------------------------------------
// Grammar specific Keywords, Punctuation, etc.
terminal fragment Id: NameStartChar NameChar*;



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
terminal fragment NameChar: NameStartChar
   | '0'..'9'
   | Underscore
   | '\u00B7'
   | /[\u0300-\u036F]/
   | /[\u203F-\u2040]/
   ;

terminal fragment   NameStartChar
   : 'A' .. 'Z'
   | 'a' .. 'z'
   | /[\u00C0-\u00D6]/
   | /[\u00D8-\u00F6]/
   | /[\u00F8-\u02FF]/
   | /[\u0370-\u037D]/
   | /[\u037F-\u1FFF]/
   | /[\u200C-\u200D]/
   | /[\u2070-\u218F]/
   | /[\u2C00-\u2FEF]/
   | /[\u3001-\uD7FF]/
   | /[\uF900-\uFDCF]/
   | /[\uFDF0-\uFFFD]/
   ;

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