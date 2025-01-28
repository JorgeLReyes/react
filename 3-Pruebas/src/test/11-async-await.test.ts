import { getImagen } from "../base-pruebas/11-async-await";

describe("11-async", () => {
  test("getImagen should be URL by media1.giphy", async () => {
    const url = await getImagen();
    expect(url).toMatch(/^https:\/\/media[0-9].giphy.com\/media\//);
    expect(url).toEqual(expect.any(String));
  });
});
