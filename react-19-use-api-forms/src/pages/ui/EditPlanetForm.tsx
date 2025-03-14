import { useState } from 'react';
import { Planet } from '../../interfaces/planet.interface';

interface Props {
  onAddPlanet: (planet: Partial<Planet>) => void;
}

export const EditPlanetForm = ({ onAddPlanet }: Props) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [distanceFromSun, setDistanceFromSun] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddPlanet({ name, type, distanceFromSun });
  };

  return (
    <form className="mb-4 flex flex-col md:flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del planeta"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo de astro"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Distancia del sol"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        value={distanceFromSun}
        onChange={(e) => setDistanceFromSun(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded flex-1 sm:flex-none"
      >
        Agregar planeta
      </button>
    </form>
  );
};
