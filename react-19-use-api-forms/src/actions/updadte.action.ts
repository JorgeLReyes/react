import { planetsApi } from "../api/planetsApi";
import type { Planet } from "../interfaces/planet.interface";

const sleep = async () => new Promise((r) => setTimeout(r, 200));

export const updatePlanetAction = async (planet: Planet) => {
  try {
    await sleep();
    throw new Error("Error al actualizar el planeta");
    const response = await planetsApi.patch<Planet>(`/${planet.id}`, planet);

    console.log("Planeta actualizado");

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el planeta");
  }
};
