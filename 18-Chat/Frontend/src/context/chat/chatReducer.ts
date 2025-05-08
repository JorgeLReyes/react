interface User {
  name: string;
  email: string;
  online: boolean;
  uid: string;
}

type Action =
  | "loaderUsers"
  | "activeChat"
  | "newMessage"
  | "loadMessages"
  | "cleanChat";

export interface ChatState {
  uid: string;
  chatActive?: string;
  users: User[];
  messages: {
    uid: string;
    message: string;
    from: string;
    to: string;
    createdAt: string;
  }[];
}

export interface Message {
  from: string;
  to: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
}

interface ChatPayload {
  loaderUsers?: User[];
  userId?: string;
  newMessage?: Message;
  messages?: Message[];
}

export interface ChatAction {
  type: Action;
  payload?: ChatPayload;
}

type ReducerState = {
  [key in Action]: (state: ChatState, payload: ChatPayload) => ChatState;
};

const reducerState: ReducerState = {
  loaderUsers: (state, payload) => ({
    ...state,
    users: payload.loaderUsers!,
  }),
  activeChat: (state, payload) => {
    if (state.chatActive === payload.userId) return state;
    return {
      ...state,
      chatActive: payload.userId!,
      messages: [],
    };
  },
  newMessage: (state, payload) => {
    if (
      state.chatActive === payload.newMessage?.to ||
      state.chatActive === payload.newMessage?.from
    ) {
      return {
        ...state,
        messages: [...state.messages, payload.newMessage!],
      };
    }
    return state;
  },
  loadMessages: (state, payload) => {
    return {
      ...state,
      messages: payload.messages!.reverse(),
    };
  },
  cleanChat: () => {
    return {
      uid: "",
      chatActive: undefined,
      users: [],
      messages: [],
    };
  },
};

export const chatReducer = (state: ChatState, action: ChatAction) => {
  return reducerState[action.type]?.(state, action.payload!) || state;
};
