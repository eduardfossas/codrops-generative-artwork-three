import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: "./",
  define: {
    __BASE_PATH__:
      command === "build"
        ? JSON.stringify("/Tutorials/GenerativeArtworkThreejs")
        : JSON.stringify(""),
  },
  plugins: [react()],
}));
