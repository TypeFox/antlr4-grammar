import { describe, it, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";

describe("tokenize", () => {
  const { parse, expectOk, clear } = parseHelper();

  afterEach(() => clear());
  it("Argument", async () => {
    const { Hallo: document } = await parse({
      Hallo: `
            grammar Hallo;
            start: Hallo { return $1; };
            Hallo: 'Hallo!';
        `,
    });
    expectOk(document);
  });
});
