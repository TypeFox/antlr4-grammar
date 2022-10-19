import { ILexingError, IRecognitionException } from "chevrotain";
import { readFile } from "fs/promises";
import { AstNode, LangiumDocument, LangiumServices } from "langium";
import { expect } from "vitest";
import { URI } from "vscode-uri";
import { Diagnostic } from "vscode-languageserver";

export function parseHelper<T extends AstNode = AstNode>(
  services: LangiumServices
) {
  const metaData = services.LanguageMetaData;
  const documentBuilder = services.shared.workspace.DocumentBuilder;
  async function parse(input: string) {
    const randomNumber = Math.floor(Math.random() * 10000000) + 1000000;
    const uri = URI.parse(
      `file:///${randomNumber}${metaData.fileExtensions[0]}`
    );
    const document =
      services.shared.workspace.LangiumDocumentFactory.fromString<T>(
        input,
        uri
      );
    services.shared.workspace.LangiumDocuments.addDocument(document);
    await documentBuilder.build([document], { validationChecks: 'all' });
    return document;
  }
  async function parseFile(fileName: string) {
    const input = await readFile(fileName, 'utf-8');
    return parse(input);
  }
  return {
    parse,
    parseFile,
    expectOk: function<T extends AstNode = AstNode>(document: LangiumDocument<T>) {
        expectNoLexerErrors<T>(document);
        expectNoParserErrors<T>(document);
        expectNoValidationErrors<T>(document);
    },
    expectNoLexerErrors,
    expectNoParserErrors,
    expectNoValidationErrors,
    expectOneParserError,
    expectValidationErrors
  };
}

function expectValidationErrors<T extends AstNode = AstNode>(document: LangiumDocument<T>, predicate: (error: Diagnostic) => boolean, count: number = 1) {
  const errors = (document.diagnostics ?? []).filter(predicate)
  expect(errors, convertValidationErrors(errors)).toHaveLength(count);
}

function expectOneParserError<T extends AstNode = AstNode>(document: LangiumDocument<T>, predicate: (error: IRecognitionException) => boolean) {
  const errors = document.parseResult.parserErrors.filter(predicate)
  expect(errors, convertParserErrors(errors)).toHaveLength(1);
}

function expectNoValidationErrors<T extends AstNode = AstNode>(document: LangiumDocument<T>) {
  expect(document.diagnostics ?? [], convertValidationErrors(document.diagnostics ?? [])).toHaveLength(0);
}

function expectNoParserErrors<T extends AstNode = AstNode>(document: LangiumDocument<T>) {
  expect(document.parseResult.parserErrors, convertParserErrors(document.parseResult.parserErrors)).toHaveLength(0);
}

function expectNoLexerErrors<T extends AstNode = AstNode>(document: LangiumDocument<T>) {
  expect(document.parseResult.lexerErrors, convertLexerErrors(document.parseResult.lexerErrors)).toHaveLength(0);
}

function convertLexerErrors(lexerErrors: ILexingError[]): string | undefined {
    return lexerErrors.map(e => `${e.line}) ${e.message}`).join('\r\n');
}

function convertParserErrors(parserErrors: IRecognitionException[]) {
    return parserErrors.map(e => `${e.token.startLine}|${e.context.ruleStack}) ${e.message}`).join('\r\n');
}

function convertValidationErrors(validationErrors: Diagnostic[]) {
    return validationErrors.map(e => `${e.range.start.line}}) ${e.message}`).join('\r\n');
}