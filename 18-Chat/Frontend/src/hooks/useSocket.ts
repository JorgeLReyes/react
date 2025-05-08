import { useCallback, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<Socket>();
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const socketTemp = io(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      withCredentials: true,
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
    socket?.on("disconnect", () => setOnline(false));

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
    };
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
