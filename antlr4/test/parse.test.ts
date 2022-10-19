import { describe, it, afterEach } from "vitest";
import { parseHelper } from "./utils/parseHelper";

describe("parser", () => {
  const { parse, expectOk, clear } = parseHelper();

  afterEach(() => clear());
  it("parse", async () => {
    const { Hallo: document } = await parse({
      Hallo: `
            grammar Hallo;
            start: Hallo;
            Hallo: 'Hallo!';
        `,
    });
    expectOk(document);
  });
});
