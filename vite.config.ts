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
        manualChunks: (id) => {
          // Node modules chunk
          if (id.includes("node_modules")) {
            // React core
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            // Router
            if (id.includes("react-router")) {
              return "vendor-router";
            }
            // AG Grid (large library)
            if (id.includes("ag-grid")) {
              return "vendor-ag-grid";
            }
            // Highcharts (large library)
            if (id.includes("highcharts")) {
              return "vendor-charts";
            }
            // Animation libraries
            if (id.includes("framer-motion")) {
              return "vendor-animations";
            }
            // I18n libraries
            if (id.includes("i18next") || id.includes("react-i18next")) {
              return "vendor-i18n";
            }
            // Icons (lucide-react)
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            // Other vendor libraries
            return "vendor-other";
          }
        },
        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Target modern browsers for smaller output
    target: ["es2015", "edge88", "firefox78", "chrome87", "safari14"],
    // Increase chunk size warning limit (but still warn)
    chunkSizeWarningLimit: 1000,
    // Disable source maps for smaller builds and faster build time
    sourcemap: false,
    // Minify with esbuild (faster than terser)
    minify: "esbuild",
    // Report compressed size
    reportCompressedSize: true,
    // Optimize CSS
    cssCodeSplit: true,
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
