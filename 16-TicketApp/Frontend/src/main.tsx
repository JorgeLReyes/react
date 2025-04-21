import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TicketRouterProvider } from "./App";
import { UIProvider } from "./context/UIContext";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <UIProvider>
        <TicketRouterProvider />
      </UIProvider>
    </SocketProvider>
  </StrictMode>
);
