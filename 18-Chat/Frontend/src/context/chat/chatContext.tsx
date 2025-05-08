import { createContext, PropsWithChildren, useReducer } from "react";
import { ChatAction, chatReducer, ChatState } from "./chatReducer";

interface ChatContextProps {
  chatState: ChatState;
  dispatch: (action: ChatAction) => void;
}

const initialState: ChatState = {
  uid: "",
  chatActive: undefined,
  users: [],
  messages: [],
};

const ChatContext = createContext({} as ChatContextProps);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  // const

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
      children={children}
    />
  );
};

export { ChatContext };
