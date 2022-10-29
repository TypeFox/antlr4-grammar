import {
  AstNode,
  BuildOptions,
  DefaultDocumentBuilder,
  DocumentState,
  LangiumDocument,
  LangiumSharedServices,
  linkContentToContainer,
} from "langium";
import { CancellationToken } from "vscode-languageclient";
import { URI } from "vscode-uri";
import {
  GrammarSpec,
  ModeSpec,
  RuleSpec,
} from "./generated/ast";
import toposort from "toposort";
import {
  Diagnostic,
  DiagnosticSeverity,
  Position,
  Range,
} from "vscode-languageserver";
import { EOF } from "./built-in";

export type GrammarType = "lexer" | "parser" | "mixed";

interface GrammarImport {
  alias?: string;
  name: string;
  astNode: AstNode;
}

interface Grammar {
  name: string;
  uri: URI;
  type: GrammarType;
  imports: GrammarImport[];
  rules: Map<string, RuleSpec>;
  modes: Map<string, ModeSpec>;
  spec: GrammarSpec;
  document: LangiumDocument;
}

function toMap<T, K>(list: T[], mapper: (item: T) => K): Map<K, T> {
  const map = new Map<K, T>();
  list.forEach((t) => map.set(mapper(t), t));
  return map;
}

export class Antlr4DocumentBuilder extends DefaultDocumentBuilder {
  constructor(services: LangiumSharedServices) {
    super(services);
  }

  protected async buildDocuments(
    documents: LangiumDocument<GrammarSpec>[],
    options: BuildOptions,
    cancelToken: CancellationToken
  ): Promise<void> {
    if (await this.embedImportedGrammars(documents, options, cancelToken)) {
      await super.buildDocuments(documents, options, cancelToken);
    }
  }

  protected async embedImportedGrammars(
    documents: LangiumDocument<GrammarSpec>[],
    options: BuildOptions,
    cancelToken: CancellationToken
  ): Promise<boolean> {
    const diagnostics: Map<LangiumDocument, Diagnostic[]> = new Map<
      LangiumDocument,
      Diagnostic[]
    >();
    const map = new Map<string, Grammar>();
    const edges: [Grammar, Grammar][] = [];
    for (const document of documents) {
      const spec = document.parseResult.value;
      const decl = document.parseResult.value.grammarDecl;
      const name = decl.name;
      const uri = document.uri;
      const rules = toMap(
        document.parseResult.value.rules.rules,
        (r) => r.rule.name
      );
      const modes = toMap(document.parseResult.value.specs, (r) => r.name);
      const type: GrammarType = decl.type.lexer
        ? "lexer"
        : decl.type.parser
        ? "parser"
        : "mixed";
      const imports = document.parseResult.value.prequels
        .filter((p) => p.grammars)
        .flatMap((p) => p.grammars!.grammars)
        .map((p) => ({ name: p.name, alias: p.alias, astNode: p as AstNode }));
      const optionGrammars = spec.prequels
        .flatMap((p) => p.options)
        .filter((os) => os != null)
        .flatMap((os) => os!.options)
        .filter((o) => o.name === "tokenVocab");
      for (const node of optionGrammars) {
        imports.push({
          name: node.value.ids[0],
          astNode: node,
          alias: undefined,
        });
      }

      map.set(name, {
        imports,
        name,
        type,
        uri,
        rules,
        modes,
        spec,
        document,
      });
    }
    const firsts: Grammar[] = [];
    for (const [key, target] of map) {
      if (target.imports.length === 0) {
        firsts.push(target);
      } else
        for (const imp of target.imports) {
          const source = map.get(imp.name);
          if (!source) {
            report(
              target.document,
              DiagnosticSeverity.Error,
              `Grammar ${imp.name} is missing within '${key}'!`,
              imp.astNode
            );
            continue;
          }
          edges.push([source, target]);
        }
    }

    const order = firsts.concat(toposort<Grammar>(edges).filter(g => g.imports.length > 0));
    for (const target of order) {
      for (const imp of target.imports) {
        const source = map.get(imp.name)!;
        for (const [name, rule] of source.rules) {
          if (!target.rules.has(name)) {
            const copy = { ...rule };
            target.spec.rules.rules.push(copy);
            linkContentToContainer(target.spec.rules);
          }
        }
        for (const [name, mode] of source.modes) {
          if (!target.modes.has(name)) {
            const copy = { ...mode };
            target.spec.specs.push(copy);
            linkContentToContainer(target.spec);
          }
        }
      }
    }

    for (const target of order) {
      const copy = { ...EOF };
      target.spec.rules.rules.push(copy);
      linkContentToContainer(target.spec.rules);
    }

    if (diagnostics.size !== 0) {
      for (const [document, list] of diagnostics) {
        document.diagnostics = list;
      }
      await this.notifyBuildPhase(
        documents,
        DocumentState.Validated,
        cancelToken
      );
      return false;
    }
    return true;

    function report(
      document: LangiumDocument,
      severity: DiagnosticSeverity,
      message: string,
      where: AstNode
    ): void {
      if (!diagnostics.has(document)) {
        diagnostics.set(document, []);
      }
      diagnostics.get(document)?.push({
        message,
        severity,
        range: Range.create(
          Position.create(
            where.$cstNode?.range.start.line ?? 0,
            where.$cstNode?.range.start.character ?? 0
          ),
          Position.create(
            where.$cstNode?.range.end.line ?? 0,
            where.$cstNode?.range.end.character ?? 0
          )
        ),
      });
    }
  }
}
