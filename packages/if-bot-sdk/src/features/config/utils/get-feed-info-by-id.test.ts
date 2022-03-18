import { describe, expect, test } from "vitest";
import { getFeedInfoById } from "./get-feed-info-by-id";

describe("getFeedInfoById()", () => {
  test("should return the matched feedInfo", () => {
    expect(
      getFeedInfoById(
        {
          url: "",
          cronInterval: "",
          feeds: [
            {
              id: "articles",
              path: { subdomain: "www", resource: "articles" },
            },
          ],
          feedsToWatch: [],
        },
        "articles"
      )
    ).toEqual({
      id: "articles",
      path: { subdomain: "www", resource: "articles" },
    });
  });

  test("should return null for unmatched feedInfo", () => {
    expect(
      getFeedInfoById(
        {
          url: "",
          cronInterval: "",
          feeds: [
            {
              id: "articles",
              path: { subdomain: "www", resource: "articles" },
            },
          ],
          feedsToWatch: [],
        },
        "games"
      )
    ).toBeNull();
  });
});
