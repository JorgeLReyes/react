import { useEffect, useState } from "react";

const Message = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouse = ({ x, y }: { x: number; y: number }) => {
      setCoords({ x, y });
    };
    addEventListener("mousemove", mouse);
    return () => {
      removeEventListener("mousemove", mouse);
      console.log("Unmounted");
    };
  }, []);

  return (
    <>
      <h3>Usuario ya existe</h3>
      {JSON.stringify(coords)}
    </>
  );
};

export default Message;
