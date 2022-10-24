import { ScopeProvider, AstReflection, NameProvider, AstNodeDescriptionProvider, IndexManager, LangiumServices, ReferenceInfo, Scope, Stream, AstNodeDescription, getDocument, AstNode, stream, ScopeOptions, StreamScope, interruptAndCheck, LangiumDocument, MultiMap, PrecomputedScopes, ScopeComputation, streamAst, getContainerOfType } from "langium";
import { GrammarImport } from "langium/lib/grammar/generated/ast";
import { CancellationToken } from "vscode-languageserver";
import { GrammarSpec, isGrammarSpec, isLexerRuleSpec, isParserRuleSpec } from "./generated/ast";

export class Antlr4ScopeProvider implements ScopeProvider {
    protected readonly reflection: AstReflection;
    protected readonly nameProvider: NameProvider;
    protected readonly descriptions: AstNodeDescriptionProvider;
    protected readonly indexManager: IndexManager;

    constructor(services: LangiumServices) {
        this.reflection = services.shared.AstReflection;
        this.nameProvider = services.references.NameProvider;
        this.descriptions = services.workspace.AstNodeDescriptionProvider;
        this.indexManager = services.shared.workspace.IndexManager;
    }

    getScope(context: ReferenceInfo): Scope {
        const scopes: Array<Stream<AstNodeDescription>> = [];
        const referenceType = this.reflection.getReferenceType(context);
        const thisDocument = getDocument<GrammarSpec>(context.container);

        //streamAllContents(thisDocument.parseResult.value).filter(isGrammarImport).map(this.importGrammar)
        const xxx = [...this.indexManager.allElements(GrammarSpec)];

        const precomputed = thisDocument.precomputedScopes;
        if (precomputed) {
            const spec = getContainerOfType(context.container, isGrammarSpec)!;
            let currentNode: AstNode | undefined = spec.rules;
            do {
                const allDescriptions = precomputed.get(currentNode);
                if (allDescriptions.length > 0) {
                    scopes.push(stream(allDescriptions));
                }
                currentNode = currentNode.$container;
            } while (currentNode);
        }

        let result: Scope = this.getGlobalScope(referenceType);
        for (let i = scopes.length - 1; i >= 0; i--) {
            result = this.createScope(scopes[i], result);
        }
        return result;
    }

    private importGrammar(grammarImport: GrammarImport) {

    }

    /**
     * Create a scope for the given collection of AST node descriptions.
     */
    protected createScope(elements: Iterable<AstNodeDescription>, outerScope?: Scope, options?: ScopeOptions): Scope {
        return new StreamScope(stream(elements), outerScope, options);
    }

    /**
     * Create a scope for the given collection of AST nodes, which need to be transformed into respective
     * descriptions first. This is done using the `NameProvider` and `AstNodeDescriptionProvider` services.
     */
    protected createScopeForNodes(elements: Iterable<AstNode>, outerScope?: Scope, options?: ScopeOptions): Scope {
        const s = stream(elements).map(e => {
            const name = this.nameProvider.getName(e);
            if (name) {
                return this.descriptions.createDescription(e, name);
            }
            return undefined;
        }).nonNullable();
        return new StreamScope(s, outerScope, options);
    }

    /**
     * Create a global scope filtered for the given reference type.
     */
    protected getGlobalScope(referenceType: string): Scope {
        return new StreamScope(this.indexManager.allElements(referenceType));
    }
}


export class Antlr4ScopeComputation implements ScopeComputation {

    protected readonly nameProvider: NameProvider;
    protected readonly descriptions: AstNodeDescriptionProvider;

    constructor(services: LangiumServices) {
        this.nameProvider = services.references.NameProvider;
        this.descriptions = services.workspace.AstNodeDescriptionProvider;
    }

    async computeExports(document: LangiumDocument, cancelToken = CancellationToken.None): Promise<AstNodeDescription[]> {
        const exports: AstNodeDescription[] = [];
        streamAst(document.parseResult.value).filter(isGrammarSpec).forEach(rs => this.exportNode(rs, exports, document))
        return exports;
    }
    protected exportNode(node: AstNode, exports: AstNodeDescription[], document: LangiumDocument): void {
        const name = this.nameProvider.getName(node);
        if (name) {
            exports.push(this.descriptions.createDescription(node, name, document));
        }
    }

    async computeLocalScopes(document: LangiumDocument, cancelToken = CancellationToken.None): Promise<PrecomputedScopes> {
        const rootNode = document.parseResult.value;
        const scopes = new MultiMap<AstNode, AstNodeDescription>();

        // Here we navigate the full AST - local scopes shall be available in the whole document
        for (const node of streamAst(rootNode)) {
            await interruptAndCheck(cancelToken);
            if(isGrammarSpec(node)) {
                for (const rule of node.rules.rules) {
                    let description: AstNodeDescription|null = null;
                    if(isLexerRuleSpec(rule.rule)) {
                        description = this.descriptions.createDescription(rule, rule.rule.name, document)
                    } else if(isParserRuleSpec(rule.rule)) {
                        description = this.descriptions.createDescription(rule, rule.rule.name, document)
                    }
                    if(description) {
                        scopes.add(node, description);
                    }
                }
            }
        }
        return scopes;
    }

    /**
     * @deprecated This method has been renamed to `computeLocalScopes`.
     */
    computeScope(): never {
        throw new Error('Deprecated: This method has been renamed to `computeLocalScopes`.');
    }

}
