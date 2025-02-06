import { useRef, useState } from "react";

const FocusScreen = () => {
  const [c, setC] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // as React.MutableRefObject<HTMLInputElement | null>;

  const onClick = () => {
    // inputRef.current?.select();
    inputRef.current?.classList.add("bg");
  };

  // const ref = (element: HTMLInputElement) => {
  //   console.log("Ref montado" + Date.now());
  //   inputRef["current"] = element;
  // };

  return (
    <>
      <h1>Focus Scrren</h1>
      <hr />
      <input
        ref={inputRef}
        type="text"
        placeholder="Ingrese nombre"
        className={c ? "form-control" : ""}
      />
      <button className="btn brn-primary mt-2" onClick={onClick}>
        set bg
      </button>
      <p>{c}</p>
      <button onClick={() => setC(c ? false : true)}>+1</button>
    </>
  );
};

export default FocusScreen;
