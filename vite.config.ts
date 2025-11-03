import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["ag-grid-react", "ag-grid-community", "highcharts", "highcharts-react-official"],
    esbuildOptions: {
      resolveExtensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          animations: ["framer-motion"],
          icons: ["lucide-react"],
          agGrid: ["ag-grid-community", "ag-grid-react"],
          charts: ["highcharts", "highcharts-react-official"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Generate source maps for production (optional, can be disabled for smaller builds)
    sourcemap: false,
    // Minify for production (using esbuild for faster builds, drop console in production)
    minify: "esbuild",
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 5173,
    host: true,
  },
});
