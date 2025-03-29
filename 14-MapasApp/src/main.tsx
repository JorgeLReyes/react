import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opcion de Geolocation");
  throw new Error("Tu navegador no tiene opcion de Geolocation");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
