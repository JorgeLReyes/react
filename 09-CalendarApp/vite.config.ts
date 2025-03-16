import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: "0.0.0.0",
  //   allowedHosts: ["4dc7-2806-104e-3-bcc-f937-6fb-ae52-9809.ngrok-free.app"],
  // },
});
