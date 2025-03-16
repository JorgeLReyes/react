import React from "react";

const ShowIncrement = React.memo(({ increment }: { increment: () => void }) => {
  console.log("Me volvi a generar");

  return (
    <button className="btn btn-primary" onClick={increment}>
      Incrementar
    </button>
  );
});

export default ShowIncrement;
