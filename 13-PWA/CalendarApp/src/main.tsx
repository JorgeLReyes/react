import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProviderRouter } from "./Router/App.routes.tsx";
import { StoreProvider } from "./store/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ProviderRouter />
    </StoreProvider>
  </StrictMode>
);
