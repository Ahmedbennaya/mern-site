import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],                    // Include Vite React plugin
  server: {
    port: 3000,                          // Dev server port
    open: true,                          // Auto open browser on server start
    proxy: {
      '/api': {                          // Proxy API requests
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 600,          // Adjust chunk size limit to avoid warnings
    rollupOptions: {
      output: {
        manualChunks(id) {               // Separate dependencies into chunks
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
