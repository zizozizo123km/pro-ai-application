import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias for easy imports across the application, mapping '@' to 'src/'
      '@': path.resolve(__dirname, './src'),
    },
  },
})