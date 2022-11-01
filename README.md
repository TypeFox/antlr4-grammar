# antlr4-grammar

The goals are:

* to have a Langium grammar for Antlr4
* to convert existing Antlr4 grammars to Langium
* to have a zoo of grammars :elephant: :snake: :bear:

## Current progress (including branches)

- [x] migrate lexer, including modes
- [x] migrate parser, including ambiguity resolution
- [ ] implement scoping correctly, instead of hacking the document builder
- [ ] scanning all `pom.xml` within the `antlr4-grammars` repo (246/~300)
- [ ] covering 100% of all `antlr4-grammars` (215/246)... so that the Langium grammar for ANTLR4 accepts ANTLR4 inputs
- [ ] transpile 100% of grammars to recognize all examples in each grammar's `examples` folder
- [ ] add validators as needed

## Getting started

This repository uses Git submodules. So do your `git clone` with the flag `--recurse-submodules` to checkout the dependencies as well.

```
git clone https://github.com/langium/antlr4-grammar --recurse-submodules
```

## How to transpile ANTLR4 to Langium

During the migration of the ANTLR4 grammar for ANTLR4 itself, I will write down which steps were needed.

- migrate each ANTLR4 lexer rule of the pattern `Rule: 'constant';` by ...

TokenBuilder:
- migrate each mode `MMM` by ...
- migrate each `pushMode(MMM)` by ...
- migrate each `popMode()` by ...
