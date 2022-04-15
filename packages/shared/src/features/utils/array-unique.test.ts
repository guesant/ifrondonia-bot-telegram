import { describe, test, expect } from "vitest";
import { arrayUnique } from "./array-unique";

describe("arrayUnique()", () => {
  test("should work", () => {
    expect(arrayUnique([1, 2, 3, 2, 1])).toEqual([1, 2, 3]);
    expect(arrayUnique([{ name: "foo" }, { name: "foo" }])).toEqual([
      { name: "foo" },
      { name: "foo" },
    ]);
  });
});
