import {
    createDefaultModule, createDefaultSharedModule, DefaultSharedModuleContext, inject,
    LangiumServices, LangiumSharedServices, Module, PartialLangiumServices
} from 'langium';
import { Antlr4GeneratedModule, Antlr4GeneratedSharedModule } from './generated/module';
import { Antlr4ValidationRegistry, Antlr4Validator } from './antlr-4-validator';
import { Antlr4TokenBuilder } from './tokenBuilder';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type Antlr4AddedServices = {
    validation: {
        Antlr4Validator: Antlr4Validator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type Antlr4Services = LangiumServices & Antlr4AddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const Antlr4Module: Module<Antlr4Services, PartialLangiumServices & Antlr4AddedServices> = {
    parser: {
        TokenBuilder: () => new Antlr4TokenBuilder()
    },
    validation: {
        ValidationRegistry: (services) => new Antlr4ValidationRegistry(services),
        Antlr4Validator: () => new Antlr4Validator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createAntlr4Services(context?: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    Antlr4: Antlr4Services
} {
    const shared = inject(
        createDefaultSharedModule(context),
        Antlr4GeneratedSharedModule
    );
    const Antlr4 = inject(
        createDefaultModule({ shared }),
        Antlr4GeneratedModule,
        Antlr4Module
    );
    shared.ServiceRegistry.register(Antlr4);
    return { shared, Antlr4 };
}
