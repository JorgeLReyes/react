import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PropsHook {
  value: number;
  maxValue?: number;
}

const useCounter = <T extends HTMLElement>({
  value,
  maxValue = 10,
}: PropsHook) => {
  const [counter, setCounter] = useState(value);
  const elementToAnimated = useRef<T>(null);
  const timeline = useRef(gsap.timeline());
  const handleClick = () => {
    setCounter((prevCounter) => Math.min(prevCounter + 1, maxValue));
  };

  useLayoutEffect(() => {
    // console.log("%cConsole estilisado", "color:red");
    timeline.current
      .to(elementToAnimated.current, {
        y: -10,
        duration: 0.5,
        ease: "elastic.out",
      })
      .to(elementToAnimated.current, { y: 0, duration: 1, ease: "bounce.out" })
      .pause();
  }, []);

  useEffect(() => {
    if (counter >= maxValue) {
      timeline.current.play(0);
    }
  }, [counter, maxValue]);

  return { counter, handleClick, elementToAnimated };
};

export const CounterEffect = () => {
  const { counter, handleClick, elementToAnimated } =
    useCounter<HTMLHeadingElement>({ value: 1 });

  return (
    <>
      <h1>Counter effect</h1>
      <h2 ref={elementToAnimated}>{counter}</h2>
      <button onClick={handleClick}>+1</button>
    </>
  );
};
