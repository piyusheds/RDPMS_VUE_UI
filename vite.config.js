import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Use path.resolve for correct alias
    },
  },

  build: {
    outDir: 'dist',  // Ensure the output folder is set to 'dist'
    logLevel: 'info',  // Enable detailed logs for the build process

    // If you're using large chunks or want to optimize
    chunkSizeWarningLimit: 1500,  // Increase the chunk size warning limit (default: 500 KB)

    // Rollup-specific configurations to optimize the build process
    rollupOptions: {
      external: [
        '/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
        '/lib/owlcarousel/assets/owl.carousel.min.css',
      ],

      // Manual chunking for better optimization (large vendor files, etc.)
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle node_modules into a single vendor chunk
          }
        },
      },
    },
  },

  server: {
    // Ensure assets are served from the correct public path during local development
    fs: {
      strict: false,  // Allow to access outside of the project folder (if needed)
    },
  },
});
