import { createContext, type ReactNode } from "react";
import { useSocket } from "../hooks/useSocket";
import { type Socket } from "socket.io-client";

interface ContextProps {
  socket: Socket;
  online: boolean;
}

const SocketContext = createContext({} as ContextProps);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { socket, online } = useSocket("http://localhost:3000");

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
