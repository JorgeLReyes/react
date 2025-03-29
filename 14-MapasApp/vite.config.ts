import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    // allowedHosts: ["5de2-2806-104e-3-1275-8da6-574-7b87-8f2c.ngrok-free.app"],
  },
});
