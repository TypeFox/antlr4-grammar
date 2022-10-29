import {
  DefaultWorkspaceManager,
  DocumentState,
  LangiumDocument,
  LangiumDocumentFactory,
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
    $type: RuleSpec,
    rule: {
      $type: LexerRuleSpec,
      fragment: false,
      name: "EOF",
      block: {
        $type: LexerAltList,
        alts: [],
      },
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
      rules: [eof],
    },
    specs: [],
  };
  streamAst(builtInDocument).forEach(linkContentToContainer);
  //streamAst(builtInDocument).forEach((a) => Object.freeze(a));

  return {
    BuiltInDocument: builtInDocument as unknown as GrammarSpec,
    EOF: eof as unknown as RuleSpec,
  };
})();

export class Antlr4WorkspaceManager extends DefaultWorkspaceManager {
  private langiumDocumentFactory: LangiumDocumentFactory;
  constructor(services: LangiumSharedServices) {
    super(services);
    this.langiumDocumentFactory = services.workspace.LangiumDocumentFactory;
  }

  protected loadAdditionalDocuments(
    _folders: WorkspaceFolder[],
    _collector: (document: LangiumDocument<GrammarSpec>) => void
  ): Promise<void> {
    const uri = URI.file("file://in-memory/builtIn.g4");
    const document = this.langiumDocumentFactory.fromModel<GrammarSpec>(BuiltInDocument, uri);
    _collector(document);
    return Promise.resolve();
  }
}
