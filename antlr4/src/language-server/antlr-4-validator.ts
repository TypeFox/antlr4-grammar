import { ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { Antlr4AstType, Person } from './generated/ast';
import type { Antlr4Services } from './antlr-4-module';

/**
 * Registry for validation checks.
 */
export class Antlr4ValidationRegistry extends ValidationRegistry {
    constructor(services: Antlr4Services) {
        super(services);
        const validator = services.validation.Antlr4Validator;
        const checks: ValidationChecks<Antlr4AstType> = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class Antlr4Validator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
