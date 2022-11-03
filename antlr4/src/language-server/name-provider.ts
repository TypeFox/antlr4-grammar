import { AstNode, CstNode, DefaultNameProvider } from "langium";
import { isModeSpec, isRuleSpec, isTokenId } from "./generated/ast";

export class Antlr4NameProvider extends DefaultNameProvider {
    getName(node: AstNode): string | undefined {
        if(isRuleSpec(node)) {
            return node.rule.name;
        }
        if(isModeSpec(node)) {
            return node.id.name;
        }
        if(isTokenId(node)) {
            return node.name;
        }
        return super.getName(node);
    }

    getNameNode(node: AstNode): CstNode | undefined {
        return super.getNameNode(node);
    }
}
