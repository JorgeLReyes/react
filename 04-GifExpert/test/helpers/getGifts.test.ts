import { getGifs } from "../../src/helpers/getGifs";
import { describe, expect, test } from "@jest/globals";

describe("GetGifts helper", () => {
  const category = "Shinobu";

  test("should be return array of url", async () => {
    const gifts = await getGifs(category);
    expect(gifts).toContainEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
    });

    expect(gifts[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
    });
  });
});
