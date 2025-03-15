import { useActionState } from "react";
import { Planet } from "../../interfaces/planet.interface";
import { createPlanetAction } from "../../actions/createPlanet";
import SubmitButton from "./SubmitButton";

interface Props {
  onAddPlanet: (planet: Planet) => void;
}

export const EditPlanetForm = ({ onAddPlanet }: Props) => {
  // const [state, formAction, isPending] = useActionState(
  const [, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const planet = await createPlanetAction(prevState, queryData);
      onAddPlanet(planet!);
    },
    null
  );

  return (
    <form className="mb-4 flex flex-col md:flex-row" action={formAction}>
      {isPending ? "Pending" : "NotPending"}
      <input
        type="text"
        placeholder="Nombre del planeta"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="name"
        required
      />
      <input
        type="text"
        placeholder="Tipo de astro"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="type"
        required
      />
      <input
        type="text"
        placeholder="Distancia del sol"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="distanceFromSun"
        required
      />
      <SubmitButton />
      {/* <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded flex-1 sm:flex-none disable:bg-gray-500"
        disabled={isPending}
      >
        Agregar planeta
      </button> */}
    </form>
  );
};
