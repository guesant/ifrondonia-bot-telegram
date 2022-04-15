import { describe, test, expect } from "vitest";
import { ensureArray } from "./ensure-array";

describe("ensureArray()", () => {
  test("should work", () => {
    expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
    expect(ensureArray({})).toEqual([{}]);
    expect(ensureArray(1)).toEqual([1]);
  });
});
