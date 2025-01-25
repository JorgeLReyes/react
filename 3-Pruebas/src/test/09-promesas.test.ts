import { getHeroeByIdAsync } from "../base-pruebas/09-promesas";

describe("9-Promesas", () => {
  test("promise should be a return hero", (done) => {
    getHeroeByIdAsync(1).then((hero) => {
      expect(hero).toStrictEqual({
        id: expect.any(Number),
        name: expect.any(String),
        owner: expect.any(String),
      });
      done();
    });
  });
  test("async/await should be a return hero", async () => {
    const hero = await getHeroeByIdAsync(1);
    expect(hero).toStrictEqual({
      id: expect.any(Number),
      name: expect.any(String),
      owner: expect.any(String),
    });
  });
  test("async/await should be a return undefiend", async () => {
    try {
      await getHeroeByIdAsync(1000);
    } catch (e) {
      expect(e).toBe("No se pudo encontrar el héroe");
      expect(false).toBeFalsy();
    }
  });
});
