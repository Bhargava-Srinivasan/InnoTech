// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    loader: "jsx", // This tells esbuild to treat `.js` files as JSX files
  },
});
