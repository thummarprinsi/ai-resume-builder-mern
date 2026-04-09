import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Aa line add karo

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

})
