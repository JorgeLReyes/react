import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TicketRouterProvider } from "./App";
import { UIProvider } from "./context/UIContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIProvider>
      <TicketRouterProvider />
    </UIProvider>
  </StrictMode>
);
