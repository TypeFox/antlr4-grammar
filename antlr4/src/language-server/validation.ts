import { ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { Antlr4AstType, GrammarSpec, RuleSpec } from './generated/ast';
import type { Antlr4Services } from './antlr-4-module';
/**
 * Registry for validation checks.
 */
export class Antlr4ValidationRegistry extends ValidationRegistry {
    constructor(services: Antlr4Services) {
        super(services);
        const validator = services.validation.Antlr4Validator;
        const checks: ValidationChecks<Antlr4AstType> = {
            GrammarSpec: validator.duplicatedRules
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class Antlr4Validator {

    duplicatedRules(grammar: GrammarSpec, accept: ValidationAcceptor): void {
        const groups: Record<string, RuleSpec[]> = {};
        grammar.rules.rules.forEach(r => {
            groups[r.rule.name] ??= [];
            groups[r.rule.name].push(r);
        });
        for (const name in groups) {
            if (Object.prototype.hasOwnProperty.call(groups, name)) {
                const rules = groups[name];
                if(rules.length > 1) {
                    rules.forEach(r => accept('error', 'Duplicated rule name', {node: r }));                    
                }
            }
        }
    }

}
