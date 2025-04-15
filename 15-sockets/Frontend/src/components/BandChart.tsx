import Chart, { ChartItem } from "chart.js/auto";
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { Band } from "../types";
export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const htmlGrap = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart>(undefined);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      if (chart.current) chart.current.destroy();
      createGraphic(bands);
    });

    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  const createGraphic = (bands: Band[]) => {
    chart.current = new Chart(htmlGrap.current as ChartItem, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="row">
      <div className="col">
        <canvas
          ref={htmlGrap}
          style={{
            maxHeight: "50vw",
            maxWidth: "400px",
            width: "100%",
            height: "100%",
            margin: "0 auto",
          }}
        ></canvas>
      </div>
    </div>
  );
};
