const inicialState = [
  {
    id: 1,
    todo: "Recolectar piedra del alma",
    done: false,
  },
];

export const todoReducer = (
  state = inicialState,
  action?: { type: string; payload: (typeof inicialState)[0] }
) => {
  if (action && action.type === "ADD_TODO") {
    return [...state, action.payload];
  }
  return state;
};

let todos = todoReducer(inicialState);

const addTodoAction = {
  type: "ADD_TODO",
  payload: {
    id: 2,
    todo: "Recolectar piedra del poder",
    done: false,
  },
};

todos = todoReducer(todos as typeof inicialState, addTodoAction);

console.log(todos);
