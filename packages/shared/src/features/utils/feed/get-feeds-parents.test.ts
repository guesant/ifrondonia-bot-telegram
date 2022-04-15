import { describe, test, expect } from "vitest";
import { getFeedsParents } from "./get-feeds-parents";

describe("getFeedsParents()", () => {
  test("should work", () => {
    expect(
      getFeedsParents(["edital.cidade.orgao.item", "edital.cidade.orgao2.item"])
    ).toEqual([
      "edital",
      "edital.cidade",
      "edital.cidade.orgao",
      "edital.cidade.orgao.item",
      "edital.cidade.orgao2",
      "edital.cidade.orgao2.item",
    ]);
  });
});
