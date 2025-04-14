import { FocusEvent } from "react";
import { Band } from "../types";

interface Props {
  bands: Band[];
  vote: (id: string) => void;
  deleteBand: (id: string) => void;
  changeName: (data: { id: string; newName: string }) => void;
}
export const BandList = ({ bands, vote, deleteBand, changeName }: Props) => {
  const handleClick = (event: FocusEvent<HTMLInputElement>, id: string) =>
    changeName({ id, newName: event.currentTarget.value });

  const createRows = (band: Band) => {
    return (
      <tr key={band.name}>
        <td>
          <button className="btn btn-primary" onClick={() => vote(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            onBlur={(event) => handleClick(event, band.id)}
            defaultValue={band.name}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteBand(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h3>Bandas actuales</h3>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{bands.map((band) => createRows(band))}</tbody>
      </table>
    </>
  );
};
