import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Replace with your backend server's base URL
        changeOrigin: true, // Ensures correct Origin header for the backend server
        secure: false,     // Set to false if the backend uses HTTP instead of HTTPS
      },
    },
  }
})