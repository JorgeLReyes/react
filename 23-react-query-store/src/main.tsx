import React from "react";
import ReactDOM from "react-dom/client";

import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";

import "./index.css";
import { TanStackProvider } from "./plugins/TanStackProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TanStackProvider>
      <HeroUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
        </main>
      </HeroUIProvider>
    </TanStackProvider>
  </React.StrictMode>
);
