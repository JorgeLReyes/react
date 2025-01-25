import { retornaArreglo } from "../base-pruebas/07-deses-arr";

describe("7-Arrays", () => {
  test("retornaArreglo should be return array", () => {
    const array = retornaArreglo();
    // expect.arrayContaining([expect.any(String), expect.any(Number)])
    expect(array).toStrictEqual([expect.any(String), expect.any(Number)]);
  });
});
