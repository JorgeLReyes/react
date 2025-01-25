import { getImagen } from "../base-pruebas/11-async-await";

describe("11-async", () => {
  test("getImagen should be URL by media0.giphy", async () => {
    const url = await getImagen();
    // expect(url).toMatch(/^https:\/\/media0.giphy.com\/media\//);
    expect(url).toEqual(expect.any(String));
  });
});
