import { describe, it, expect, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";
import {
  GrammarSpec,
} from "../src/language-server/generated/ast";

const { clear, parse, expectOk, getAstNode } = parseHelper<GrammarSpec>();

describe("Scoping", () => {
  afterEach(() => clear());

  it("should resolve lexer rule", async () => {
    const { Hallo: document } = await parse({
      Hallo: `
            grammar Hallo;
            start: Hallo;
            Hallo: 'Hallo!';
        `,
    });
    expectOk(document);
    const actual = getAstNode(
      document,
      "/rules/rules@0/rule/ruleBlock/list/alts@0/alt/elements@0/atom/ruleRef/ruleRef/lexerRuleRef/ref"
    );
    const expected = getAstNode(document, "/rules/rules@1");
    expect(actual).toBe(expected);
  });

  it("should resolve parser rule", async () => {
    const { Hallo: document } = await parse({
      Hallo: `
            grammar Hallo;
            start: hallo;
            hallo: BEGIN hallo END | ;
            BEGIN: 'begin';
            END: 'end';
        `,
    });
    expectOk(document);
    const actual = getAstNode(
      document,
      "/rules/rules@0/rule/ruleBlock/list/alts@0/alt/elements@0/atom/ruleRef/ruleRef/parserRuleRef/ref"
    );
    const expected = getAstNode(document, "/rules/rules@1");
    expect(actual).toBe(expected);
  });
});
