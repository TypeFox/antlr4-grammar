grammar Antlr4

entry Model:
    (persons+=Person | greetings+=Greeting)*;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;


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