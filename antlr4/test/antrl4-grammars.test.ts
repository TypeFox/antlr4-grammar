import { describe, it, expect, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";
import {
  GrammarSpec,
} from "../src/language-server/generated/ast";
import { getAntlr4Grammars } from "./utils/antlr4-grammars";

const { clear, parse, expectOk, getAstNode } = parseHelper<GrammarSpec>();

describe("Antlr4 grammars", async () => {
  afterEach(() => clear());

  const grammars = await getAntlr4Grammars();
  Object.keys(grammars).filter(g => g === 'json').forEach(name => {
    it(name, async () => {
      const documents = await parse(grammars[name]);
      for (const documentFilename of Object.keys(documents)) {
        const document = documents[documentFilename];
        expectOk(document);
      }
    });
  });
});
