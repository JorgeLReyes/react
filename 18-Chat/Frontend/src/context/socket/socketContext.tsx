import { createContext, useContext, useEffect, type ReactNode } from "react";
import { type Socket } from "socket.io-client";
import { useSocket } from "../../hooks/useSocket";
import { AuthContext } from "../auth/authContext";
import { ChatContext } from "../chat/chatContext";
import { scrollToBottomAnimated } from "../../helpers/scroll";

interface ContextProps {
  socket: Socket | undefined;
  online: boolean;
}

const SocketContext = createContext({} as ContextProps);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:3000"
  );
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (user.logged) connectSocket();
    else disconnectSocket();
  }, [user.logged]);

  useEffect(() => {
    socket?.on("list-users", (users) => {
      dispatch({ type: "loaderUsers", payload: { loaderUsers: users } });
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("personal-message", (message) => {
      dispatch({
        type: "newMessage",
        payload: {
          newMessage: message,
        },
      });
      scrollToBottomAnimated("scroll");
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
      children={children}
    />
  );
};

export { SocketContext };
