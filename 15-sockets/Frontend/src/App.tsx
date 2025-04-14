import { io, type Socket } from "socket.io-client";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { useEffect, useState } from "react";
import { Band } from "./types";

const connectSocketServer = () => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });
  return socket;
};
function App() {
  const [socket] = useState<Socket>(() => connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState<Band[]>([]);
  // useEffect(() => {
  //   const socketInstance = io("http://localhost:3000", {
  //     transports: ["websocket"],
  //   });
  //   setSocket(socketInstance);
  // }, []);
  useEffect(() => {
    socket.on("connect", () => setOnline(true));
    socket.on("disconnect", () => setOnline(false));
    socket.on("current-bands", (bands) => setBands(bands));
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("current-bands");
    };
  }, [socket]);

  const vote = (id: string) => socket.emit("vote-band", id);

  const deleteBand = (id: string) => socket.emit("delete-band", id);

  const changeName = (data: { id: string; newName: string }) =>
    socket.emit("change-band-name", data);

  const createBand = (name: string) => socket.emit("create-band", { name });

  return (
    <div className="container w-100">
      <div className="alert">
        <p>
          Services status:
          <span className={`text-${online ? "success" : "danger"}`}>
            {online ? "Online" : "Offline"}
          </span>
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <BandList
            bands={bands}
            vote={vote}
            deleteBand={deleteBand}
            changeName={changeName}
          />
        </div>
        <div className="col-5">
          <BandAdd createBand={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
