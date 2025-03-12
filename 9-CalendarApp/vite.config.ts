import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["78e3-2806-104e-3-bcc-49d0-5c8c-b927-625d.ngrok-free.app"],
  },
});
