import { ILexingError, IRecognitionException } from "chevrotain";
import { readFile } from "fs/promises";
import { AstNode, EmptyFileSystem, LangiumDocument, LangiumServices } from "langium";
import { expect } from "vitest";
import { URI } from "vscode-uri";
import { Diagnostic } from "vscode-languageserver";
import { createAntlr4Services } from "../../src/language-server/antlr-4-module";
import { GrammarSpec } from "../../src/language-server/generated/ast";

export type InputFiles<K extends string> = Record<K, string>; //Filename without Extension -> content of that file
export type OutputFiles<T extends AstNode, K extends string> = Record<K, LangiumDocument<T>>; //Filename without Extension -> content of that file

export function parseHelper<T extends AstNode = AstNode>() {
  const { Antlr4: services } = createAntlr4Services(EmptyFileSystem);
  let activeUris: URI[] = [];
  const metaData = services.LanguageMetaData;
  const documentBuilder = services.shared.workspace.DocumentBuilder;
  async function parse<K extends string>(inputs: InputFiles<K>): Promise<OutputFiles<T, K>> {
    const documents: LangiumDocument<T>[] = [];
    const hash: any = {};
    for (const fileName in inputs) {
      if (Object.prototype.hasOwnProperty.call(inputs, fileName)) {
        const uri = URI.parse(
          `file:///${fileName}${metaData.fileExtensions[0]}`
        );
        activeUris.push(uri);
        const content = inputs[fileName];
        const document = services.shared.workspace.LangiumDocumentFactory.fromString<T>(content, uri);
        services.shared.workspace.LangiumDocuments.addDocument(document);
        documents.push(document);
        hash[fileName] = document;
      }
    }
    await documentBuilder.build(documents, { validationChecks: 'all' });
    return hash as OutputFiles<T, K>;
  }
  async function clear() {
    await documentBuilder.update([], activeUris);
    activeUris = [];
  }
  function getAstNode(document: LangiumDocument<GrammarSpec>, path: string) {
    return services.workspace.AstNodeLocator.getAstNode(document, path);
  }
  return {
    clear,
    getAstNode,
    parse,
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
    return parserErrors.map(e => `${e.token.startLine}:${e.token.startColumn}|${e.context.ruleStack}) ${e.message}`).join('\r\n');
}

function convertValidationErrors(validationErrors: Diagnostic[]) {
    return validationErrors.map(e => `${e.range.start.line}}) ${e.message}`).join('\r\n');
}