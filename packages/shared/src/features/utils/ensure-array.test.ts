import { describe, expect } from "vitest";
import { ensureArray } from "./ensure-array";

describe("ensureArray()", () => {
  expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
  expect(ensureArray({})).toEqual([{}]);
  expect(ensureArray(1)).toEqual([1]);
});
