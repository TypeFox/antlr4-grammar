# How to transpile ANTLR4 to Langium

During the migration of the ANTLR4 grammar for ANTLR4 itself, I will write down which steps were needed.

## Lexer

### Rules of pattern `Rule: 'keyword';`


## Parser

- migrate each ANTLR4 lexer rule of the pattern `Rule: 'constant';` by ...

TokenBuilder:
- migrate each mode `MMM` by ...
- migrate each `pushMode(MMM)` by ...
- migrate each `popMode()` by ...
