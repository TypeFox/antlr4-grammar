import { startLanguageServer } from 'langium';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { createAntlr4Services } from './antlr-4-module';

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the shared services and language-specific services
const { shared } = createAntlr4Services({ connection });

// Start the language server with the shared services
startLanguageServer(shared);
