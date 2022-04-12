import { describe, expect, test } from "vitest";
import { tryParseJSON } from "./try-parse-json";

describe("tryParseJSON()", () => {
  test("should parse a valid JSON string", () => {
    expect(tryParseJSON('{ "foo": "bar" }')).toEqual({ foo: "bar" });
  });
  
  test("should parse a invalid JSON string", () => {
    expect(tryParseJSON("{ Not A Valid JSON String {}}")).toEqual(
      "{ Not A Valid JSON String {}}"
    );
  });
});
