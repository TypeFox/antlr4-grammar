import { describe, it, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";

describe("tokenize", () => {
  const { parse, expectOk, clear } = parseHelper();

  afterEach(() => clear());
  it("Nested argument", async () => {
    const { document } = await parse({
      document: `
            grammar Hallo;
            start returns [String start]: Hallo;
            Hallo: 'Hallo!';
        `,
    });
    expectOk(document);
  });

  it("Nested action", async () => {
    const { document } = await parse({
      document: `
            grammar Hallo;
            start: Hallo { return $1; if(true) { deep: {}} };
            Hallo: 'Hallo!';
        `,
    });
    expectOk(document);
  });
});
