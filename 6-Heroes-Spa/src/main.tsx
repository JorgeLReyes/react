import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { MainRouter } from "./router/CreateAppRouter";
import AppRouter from "./router/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <MainRouter /> */}
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
