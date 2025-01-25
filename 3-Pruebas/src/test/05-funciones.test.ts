import { getUser, getUsuarioActivo } from "../base-pruebas/05-funciones";

describe("5-Funciones", () => {
  test("getUser should be return object", () => {
    const testUser = getUser();
    expect(testUser).toStrictEqual(
      expect.objectContaining({
        uid: expect.any(String),
        username: expect.any(String),
      })
    );
  });
  test("getUserActive should be return object", () => {
    const name = "Ingrid";
    const testUser = getUsuarioActivo(name);
    expect(testUser).toStrictEqual({
      uid: expect.any(String),
      username: name,
    });
  });
});
