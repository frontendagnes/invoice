import react from "@vitejs/plugin-react";

import path from "path";
import { defineConfig } from "vite";
// import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    // setupFiles: "./src/setupTests.js", // jeśli potrzebujesz
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3500
    port: 3500,
    host: true,
  },
  build: {
    outDir: "build",
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
