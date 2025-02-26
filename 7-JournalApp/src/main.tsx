import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProviderStore } from "./store/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderStore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProviderStore>
  </StrictMode>
);
