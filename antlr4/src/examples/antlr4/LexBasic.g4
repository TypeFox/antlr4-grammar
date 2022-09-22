/** 
 * A generally reusable set of fragments for import in to Lexer grammars.
 *
 *	Modified 2015.06.16 gbr - 
 *	-- generalized for inclusion into the ANTLRv4 grammar distribution
 * 
 */
lexer grammar LexBasic;
// ======================================================
// Lexer fragments
//
// -----------------------------------
// Whitespace & Comments

fragment Ws
   : Hws
   | Vws
   ;

fragment Hws
   : [ \t]
   ;

fragment Vws
   : [\r\n\f]
   ;

fragment BlockComment
   : '/*' .*? ('*/' | EOF)
   ;

fragment DocComment
   : '/**' .*? ('*/' | EOF)
   ;

fragment LineComment
   : '//' ~ [\r\n]*
   ;
   // -----------------------------------
   // Escapes
   // Any kind of escaped character that we can embed within ANTLR literal strings.

fragment EscSeq
   : Esc ([btnfr"'\\] | UnicodeEsc | . | EOF)
   ;

fragment EscAny
   : Esc .
   ;

fragment UnicodeEsc
   : 'u' (HexDigit (HexDigit (HexDigit HexDigit?)?)?)?
   ;
   // -----------------------------------
   // Numerals

fragment DecimalNumeral
   : '0'
   | [1-9] DecDigit*
   ;
   // -----------------------------------
   // Digits

fragment HexDigit
   : [0-9a-fA-F]
   ;

fragment DecDigit
   : [0-9]
   ;
   // -----------------------------------
   // Literals

fragment BoolLiteral
   : 'true'
   | 'false'
   ;

fragment CharLiteral
   : SQuote (EscSeq | ~ ['\r\n\\]) SQuote
   ;

fragment SQuoteLiteral
   : SQuote (EscSeq | ~ ['\r\n\\])* SQuote
   ;

fragment DQuoteLiteral
   : DQuote (EscSeq | ~ ["\r\n\\])* DQuote
   ;

fragment USQuoteLiteral
   : SQuote (EscSeq | ~ ['\r\n\\])*
   ;
   // -----------------------------------
   // Character ranges

fragment NameChar
   : NameStartChar
   | '0' .. '9'
   | Underscore
   | '\u00B7'
   | '\u0300' .. '\u036F'
   | '\u203F' .. '\u2040'
   ;

fragment NameStartChar
   : 'A' .. 'Z'
   | 'a' .. 'z'
   | '\u00C0' .. '\u00D6'
   | '\u00D8' .. '\u00F6'
   | '\u00F8' .. '\u02FF'
   | '\u0370' .. '\u037D'
   | '\u037F' .. '\u1FFF'
   | '\u200C' .. '\u200D'
   | '\u2070' .. '\u218F'
   | '\u2C00' .. '\u2FEF'
   | '\u3001' .. '\uD7FF'
   | '\uF900' .. '\uFDCF'
   | '\uFDF0' .. '\uFFFD'
   ;
   // ignores | ['\u10000-'\uEFFFF] ;
   // -----------------------------------
   // Types

fragment Int
   : 'int'
   ;
   // -----------------------------------
   // Symbols

fragment Esc
   : '\\'
   ;

fragment Colon
   : ':'
   ;

fragment DColon
   : '::'
   ;

fragment SQuote
   : '\''
   ;

fragment DQuote
   : '"'
   ;

fragment LParen
   : '('
   ;

fragment RParen
   : ')'
   ;

fragment LBrace
   : '{'
   ;

fragment RBrace
   : '}'
   ;

fragment LBrack
   : '['
   ;

fragment RBrack
   : ']'
   ;

fragment RArrow
   : '->'
   ;

fragment Lt
   : '<'
   ;

fragment Gt
   : '>'
   ;

fragment Equal
   : '='
   ;

fragment Question
   : '?'
   ;

fragment Star
   : '*'
   ;

fragment Plus
   : '+'
   ;

fragment PlusAssign
   : '+='
   ;

fragment Underscore
   : '_'
   ;

fragment Pipe
   : '|'
   ;

fragment Dollar
   : '$'
   ;

fragment Comma
   : ','
   ;

fragment Semi
   : ';'
   ;

fragment Dot
   : '.'
   ;

fragment Range
   : '..'
   ;

fragment At
   : '@'
   ;

fragment Pound
   : '#'
   ;

fragment Tilde
   : '~'
   ;
   
