import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // ✅ No source maps in production (already correct)
    sourcemap: false,

    // ✅ Increase chunk size warning limit
    chunkSizeWarningLimit: 600,

    // ✅ Minify with esbuild (faster + smaller)
    minify: "esbuild",

    // ✅ Target modern browsers only (smaller output)
    target: "es2020",

    rollupOptions: {
      output: {
        // ✅ Better chunk naming with content hash for caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",

        manualChunks: {
          // ✅ Core React - changes rarely, cache forever
          "vendor-react": ["react", "react-dom"],

          // ✅ Router - separate so it can be cached independently
          "vendor-router": ["react-router-dom"],

          // ✅ Supabase - large, changes rarely
          "vendor-supabase": ["@supabase/supabase-js"],

          // ✅ UI components - split further than before
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-accordion",
            "@radix-ui/react-tabs",
            "@radix-ui/react-select",
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
          ],

          // ✅ Animation - only load when needed
          "vendor-motion": ["framer-motion"],

          // ✅ Icons - can be large
          "vendor-icons": ["lucide-react"],

          // ✅ Utilities
          "vendor-utils": ["clsx", "tailwind-merge", "class-variance-authority"],
        },
      },
    },
  },

  // ✅ Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@supabase/supabase-js",
      "framer-motion",
      "lucide-react",
    ],
    exclude: [],
  },
});
