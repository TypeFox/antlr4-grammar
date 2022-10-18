import { ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { Antlr4AstType, GrammarSpec } from './generated/ast';
import type { Antlr4Services } from './antlr-4-module';

/**
 * Registry for validation checks.
 */
export class Antlr4ValidationRegistry extends ValidationRegistry {
    constructor(services: Antlr4Services) {
        super(services);
        const validator = services.validation.Antlr4Validator;
        const checks: ValidationChecks<Antlr4AstType> = {
            GrammarSpec: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class Antlr4Validator {

    checkPersonStartsWithCapital(grammar: GrammarSpec, accept: ValidationAcceptor): void {
    }

}
