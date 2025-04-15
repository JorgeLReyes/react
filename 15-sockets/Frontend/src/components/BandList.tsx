import { FocusEvent, useContext, useEffect, useState } from "react";
import { Band } from "../types";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on("current-bands", (bands) => setBands(bands));
    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  const vote = (id: string) => socket.emit("vote-band", id);

  const deleteBand = (id: string) => socket.emit("delete-band", id);

  const changeName = (data: { id: string; newName: string }) =>
    socket.emit("change-band-name", data);

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
