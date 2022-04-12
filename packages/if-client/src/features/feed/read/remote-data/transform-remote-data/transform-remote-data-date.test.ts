import { transformRemoteDataDate } from "./transform-remote-data-date";
import { describe, test, expect } from "vitest";

describe("transformRemoteDataDate()", () => {
  test("should transform a valid remote data date", () => {
    expect(transformRemoteDataDate("Thu, 17 Mar 2022 19:35:35 -0400")).toEqual(
      1647560135000
    );

    expect(transformRemoteDataDate("Fri, 11 Mar 2022 15:33:29 -0400")).toEqual(
      1647027209000
    );
    expect(transformRemoteDataDate("Fri, 15 Oct 2021 14:11:14 -0400")).toEqual(
      1634321474000
    );
  });
});
