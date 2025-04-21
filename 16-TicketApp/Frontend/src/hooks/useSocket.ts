import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath: string) => {
  const socket = useMemo(
    () => io(serverPath, { transports: ["websocket"] }),
    [serverPath]
  );

  const [online, setOnline] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setOnline(true));
    socket.on("disconnect", () => setOnline(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return {
    socket,
    online,
  };
};
