import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   devOptions: {
    //     enabled: true,
    //     type: "module",
    //     navigateFallback: "index.html",
    //     suppressWarnings: true,
    //   },
    //   strategies: "injectManifest",
    //   srcDir: "src",
    //   filename: "sw.ts",
    // }),
  ],
  preview: {
    port: 5173,
  },
  // server: {
  //   host: "0.0.0.0",
  //   allowedHosts: ["4dc7-2806-104e-3-bcc-f937-6fb-ae52-9809.ngrok-free.app"],
  // },
});
