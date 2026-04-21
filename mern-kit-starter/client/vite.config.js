import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()
console.log("listining port ", process.env.DOMAIN)
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
      },
    },
    port: 3000
  },
  plugins: [react()],
})
