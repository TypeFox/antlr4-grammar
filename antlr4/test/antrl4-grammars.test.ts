import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { parseHelper } from "./utils/parseHelper";
import {
  GrammarSpec,
} from "../src/language-server/generated/ast";
import { getAntlr4Grammars } from "./utils/antlr4-grammars";


describe("Antlr4 grammars", async () => {
  const { clear, parse, expectOk, initialize } = await parseHelper<GrammarSpec>();

  beforeAll(() => initialize());

  afterEach(() => clear());

  const grammars = await getAntlr4Grammars();
  Object.keys(grammars).filter(g => g === 'json5').forEach(name => {
    it(name, async () => {
      const documents = await parse(grammars[name]);
      for (const documentFilename of Object.keys(documents)) {
        const document = documents[documentFilename];
        expectOk(document);
      }
    });
  });
});
