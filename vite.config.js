import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Jatin-portfolio/',
  plugins: [react()],
  build: {
    minify: false, // Disabling minification fixes the @splinetool/runtime missing property buildTimeline bug
  }
})
