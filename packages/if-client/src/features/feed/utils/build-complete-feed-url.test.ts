import { describe, expect, test } from "vitest";
import { buildCompleteFeedURL } from "./build-complete-feed-url";

describe("buildCompleteFeedURL()", () => {
  test("should build the complete URL without specifying subdomain or resource.", () => {
    expect(buildCompleteFeedURL("https://ifro.edu.br/")).toBe(
      "https://ifro.edu.br/"
    );

    expect(buildCompleteFeedURL("https://ifro.edu.br/", null, null)).toBe(
      "https://ifro.edu.br/"
    );
  });

  test("should build the complete URL with resource and subdomain.", () => {
    expect(
      buildCompleteFeedURL(
        "https://ifro.edu.br/",
        "ji-parana/noticias",
        "portal"
      )
    ).toBe("https://portal.ifro.edu.br/ji-parana/noticias");
  });

  test("should build the complete URL with resource.", () => {
    expect(
      buildCompleteFeedURL("https://ifro.edu.br/", "ji-parana/noticias")
    ).toBe("https://ifro.edu.br/ji-parana/noticias");
  });

  test("should build the complete URL with subdomain.", () => {
    expect(buildCompleteFeedURL("https://ifro.edu.br/", null, "portal")).toBe(
      "https://portal.ifro.edu.br/"
    );
  });
});
