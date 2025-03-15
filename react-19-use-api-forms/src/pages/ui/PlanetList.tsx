import { useOptimistic, useTransition } from "react";
import { Planet } from "../../interfaces/planet.interface";
import { updatePlanetAction } from "../../actions/updadte.action";

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticPlanets, setOptimisticPlanets] = useOptimistic(
    planets,
    (currentValue, newPlanet: Planet) => {
      const updatePlanet = currentValue.map((planet) =>
        planet.id === newPlanet.id ? newPlanet : planet
      );

      return updatePlanet;
    }
  );

  const handleUpdatePlanet = async (planet: Planet) => {
    startTransition(async () => {
      const data = {
        ...planet,
        name: planet.name.toUpperCase(),
      };
      try {
        setOptimisticPlanets(data);
        await updatePlanetAction(data);
      } catch (error) {
        console.log(error);
        setOptimisticPlanets(planet);
      }
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <button
            className="bg-blue-500 text-white p-2 rounded w-full disabled:bg-gray-500"
            onClick={() => handleUpdatePlanet(planet)}
            disabled={isPending}
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
