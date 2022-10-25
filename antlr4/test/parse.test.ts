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

  it("parse token", async () => {
    const { document } = await parse({
      document: `
            grammar Hallo;
            start: ESC;
            fragment ESC: '\\\\\\' (["\\\\\\/bfnrt] | UNICODE);
            fragment UNICODE: 'u' HEX HEX HEX HEX;
            fragment HEX: [0-9a-fA-F];
        `,
    });
    expectOk(document);
  });
});
