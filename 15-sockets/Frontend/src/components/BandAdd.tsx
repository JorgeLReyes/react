import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const { socket } = useContext(SocketContext);

  const createBand = (name: string) => socket.emit("create-band", { name });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget["bandName"].value;
    if (value.trim().length <= 0) return;
    createBand(value.trim());
    e.currentTarget.reset();
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="bandName"
          className="form-control"
          placeholder="Nuevo nombre de banda"
        />
        <button className="btn btn-outline-primary mt-2" type="submit">
          Agregar
        </button>
      </form>
    </>
  );
};
