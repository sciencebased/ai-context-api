import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { mockApiPlugin } from "./vite-plugins/mock-api";

const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), mockApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
