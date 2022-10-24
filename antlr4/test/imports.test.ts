import { describe, it, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";

describe("Imports", () => {
  const { parse, expectValidationErrors, clear, expectOk } = parseHelper();

  afterEach(() => clear());

  it("should miss an imported grammar", async () => {
    const { MyELang: document } = await parse({
      MyELang: `
            grammar MyELang;
            import ELang;
            expr: INT|ID;
            INT: [0-9]+;
        `
    });
    expectValidationErrors(document, e => /missing/i.test(e.message));
  });

  it("should work by importing grammar", async () => {
    const { MyELang, ELang } = await parse({
      MyELang: `
            grammar MyELang;
            import ELang;
            expr: INT|ID;
            ID: [a-z]+;
      `,
      ELang: `
            grammar ELang;
            stat: (expr ';')+;
            expr: INT;
            WS: [\r\n\t ]+ -> skip;
            INT: [0-9]+;
      `
    });
    expectOk(MyELang);
    expectOk(ELang);
  });
});
