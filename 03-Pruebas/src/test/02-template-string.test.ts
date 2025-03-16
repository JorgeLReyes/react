import { getSaludo } from "../base-pruebas/02-template-string";

describe("Pruebas carpeta 3", () => {
  it("test", () => {
    const value = "Ingrid";
    const message = getSaludo(value);

    expect(message).toBe("Hola " + value);
  });
});
