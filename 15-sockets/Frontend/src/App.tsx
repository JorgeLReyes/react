import { useContext } from "react";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { SocketContext } from "./context/SocketContext";
import { BandChart } from "./components/BandChart";

function App() {
  const { online } = useContext(SocketContext);

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
      <BandChart />
      <div className="row">
        <div className="col-7">
          <BandList />
        </div>
        <div className="col-5">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
