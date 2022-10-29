import { describe, it, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";

describe("Validation", () => {
  const {
    clear,
    parse,
    expectNoLexerErrors,
    expectValidationErrors,
    expectNoParserErrors,
  } = parseHelper();

  afterEach(() => clear());

  it("should detect duplicated rule names", async () => {
    const { Hallo: document } = await parse({
      Hallo: `
            grammar Hallo;
            start: Hallo;
            start: Hallo;
            Hallo: 'Hallo!';
        `,
    });
    expectNoLexerErrors(document);
    expectNoParserErrors(document);
    expectValidationErrors(document, (e) => /duplicated/i.test(e.message), 2);
  });

  it("should detect reserved rule names", async () => {
    const { Hallo: document } = await parse({
      Hallo: `
            grammar Hallo;
            start: Error; //Error is reserved word
            Error: 'Hallo!';
        `,
    });
    expectNoLexerErrors(document);
    expectNoParserErrors(document);
    expectValidationErrors(document, (e) => /reserved/i.test(e.message));
  });
});
