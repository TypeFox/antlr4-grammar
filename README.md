# antlr4-grammar

The goals are:

* to have a Langium grammar for Antlr4
* to convert existing Antlr4 grammars to Langium
* to have a zoo of grammars :elephant: :snake: :bear:

## Getting started

This repository uses Git submodules. So do your `git clone` with the flag `--recurse-submodules` to checkout the dependencies as well.

```
git clone https://github.com/langium/antlr4-grammar --recurse-submodules
```

## How to transpile ANTLR4 to Langium

During the migration of the ANTLR4 grammar for ANTLR4 itself, I will write down which steps were needed.

- migrate each ANTLR4 lexer rule of the pattern ˋRule: 'constant';ˋ by ...

TokenBuilder:
- migrate each mode ˋMMMˋ by ...
- migrate each ˋpushMode(MMM)ˋ by ...
- migrate each ˋpopMode(MMM)ˋ by ...
