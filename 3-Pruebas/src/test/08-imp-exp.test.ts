import { getHeroeById, getHeroesByOwner } from "../base-pruebas/08-imp-exp";

describe("08-Implementation export", () => {
  test("getUserById should be return a hero", () => {
    const hero = getHeroeById(1);
    expect(hero).toStrictEqual({
      id: expect.any(Number),
      name: expect.any(String),
      owner: expect.any(String),
    });
  });
  test("getUserById should be return length 3 for DC", () => {
    const heroes = getHeroesByOwner("DC");
    expect(heroes.length).toBe(3);
    heroes.forEach((hero) =>
      expect(hero).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        owner: "DC",
      })
    );
  });
  test("getHeroesByOwner should be return length 2 for DC", () => {
    const hero = getHeroesByOwner("Marvel");
    expect(hero).toHaveLength(2);
  });
});
