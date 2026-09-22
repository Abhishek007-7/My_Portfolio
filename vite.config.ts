import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base './' makes the build work on GitHub Pages under /My_Portfolio/ (or any sub-path)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
