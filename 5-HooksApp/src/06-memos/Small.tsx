import React from "react";

const Small = React.memo(({ value }: { value: number }) => {
  console.log("Small renderizado");

  return <small>{value}</small>;
});

export default Small;
