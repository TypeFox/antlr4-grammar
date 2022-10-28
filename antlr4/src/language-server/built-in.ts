import {
  DefaultWorkspaceManager,
  DocumentState,
  LangiumDocument,
  LangiumSharedServices,
  linkContentToContainer,
  streamAst,
} from "langium";
import { WorkspaceFolder } from "vscode-languageclient";
import { URI } from "vscode-uri";
import {
  GrammarDecl,
  GrammarSpec,
  GrammarType,
  LexerAltList,
  LexerRuleSpec,
  Rules,
  RuleSpec,
} from "./generated/ast";

export const { EOF, BuiltInDocument } = (function () {
  const eof = {
    $type: LexerRuleSpec,
    fragment: false,
    name: "EOF",
    block: {
      $type: LexerAltList,
      alts: [],
    },
  };
  const builtInDocument = {
    $type: GrammarSpec,
    grammarDecl: {
      $type: GrammarDecl,
      name: "BuiltIn",
      type: {
        $type: GrammarType,
        lexer: true,
        mixed: false,
        parser: false,
      },
    },
    prequels: [],
    rules: {
      $type: Rules,
      rules: [
        {
          $type: RuleSpec,
          rule: eof,
        },
      ],
    },
    specs: [],
  };
  streamAst(builtInDocument).forEach(linkContentToContainer);
  streamAst(builtInDocument).forEach((a) => Object.freeze(a));

  return {
    BuiltInDocument: builtInDocument as unknown as GrammarSpec,
    EOF: eof as unknown as LexerRuleSpec,
  };
})();

export class Antlr4WorkspaceManager extends DefaultWorkspaceManager {
  constructor(services: LangiumSharedServices) {
    super(services);
  }

  protected loadAdditionalDocuments(
    _folders: WorkspaceFolder[],
    _collector: (document: LangiumDocument<GrammarSpec>) => void
  ): Promise<void> {
    _collector({
      parseResult: {
        lexerErrors: [],
        parserErrors: [],
        value: BuiltInDocument,
      },
      references: [],
      uri: URI.file("file://in-memory/builtIn.langium"),
      state: DocumentState.Validated,
      textDocument: null!,
    });
    return Promise.resolve();
  }
}
