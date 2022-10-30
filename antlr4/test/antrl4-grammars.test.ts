import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { parseHelper } from "./utils/parseHelper";
import { GrammarSpec } from "../src/language-server/generated/ast";
import { getAntlr4Grammars } from "./utils/antlr4-grammars";

describe("Antlr4 grammars", async () => {
  const { clear, parse, expectOk, initialize } = await parseHelper<GrammarSpec>();

  beforeAll(() => initialize());

  afterEach(() => clear());

  const grammars = await getAntlr4Grammars();
  it.each(Object.keys(grammars))('parsing "%s" grammar', async (name) => {
    const documents = await parse(grammars[name]);
    for (const documentFilename of Object.keys(documents)) {
      const document = documents[documentFilename];
      expectOk(document);
    }
  });
  
  it.skip('parsing cherrypicked grammar', async () => {
    const documents = await parse(grammars['wren']);
    for (const documentFilename of Object.keys(documents)) {
      const document = documents[documentFilename];
      expectOk(document);
    }
  });
});
