import { describe, test, expect } from "vitest";
import { getFeedParents } from "./get-feed-parents";

describe("getFeedParents()", () => {
  test("should work", () => {
    expect(getFeedParents("edital.cidade.orgao.item")).toEqual([
      "edital",
      "edital.cidade",
      "edital.cidade.orgao",
      "edital.cidade.orgao.item",
    ]);
  });
});
