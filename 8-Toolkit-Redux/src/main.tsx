import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProviderStore } from "./store/store.tsx";
import TodoApp from "./TodoApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderStore>
      <TodoApp />
    </ProviderStore>
  </StrictMode>
);
