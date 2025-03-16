import { useReducer } from "react";

interface State {
  count: number;
  previous: number;
  changes: number;
}

type ActionTypes = "INCREMENT" | "PREV_STATE" | "RESET";

type ReducerState = { [key in ActionTypes]: () => State };

type Action = { type: ActionTypes; payload?: { value: number } };

const initialState: State = {
  count: 0,
  previous: 0,
  changes: 0,
};

const reducer = (state: State, action: Action) => {
  const reducerState: ReducerState = {
    INCREMENT: () => ({
      count: state.count + action.payload!.value,
      previous: state.count,
      changes: state.changes + 1,
    }),
    PREV_STATE: () => ({
      count: state.previous,
      previous: state.previous,
      changes: state.changes + 1,
    }),
    RESET: () => initialState,
  };

  return reducerState[action.type]?.() || state;
};

const actionsCreator: { [key: string]: (value?: number) => Action } = {
  increment: (value?: number) => ({
    type: "INCREMENT",
    payload: { value: value! },
  }),
  prevState: () => ({ type: "PREV_STATE" }),
  reset: () => ({ type: "RESET" }),
};

export const CounterReducer = () => {
  const [{ count, changes, previous }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleClick = (value: number) =>
    dispatch(actionsCreator.increment(value));

  const handlePrevState = () => dispatch(actionsCreator.prevState());

  const handleReset = () => dispatch(actionsCreator.reset());

  return (
    <>
      <h1>Counter reducer: {count}</h1>
      <h2>Counter prev: {previous}</h2>
      <h2>Changes: {changes}</h2>
      <button onClick={() => handleClick(3)}>+3</button>
      <button onClick={handlePrevState}>State prev</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};
