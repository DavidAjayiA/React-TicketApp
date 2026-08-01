import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/React-TicketApp/',
  plugins: [react()],
  server: { open: true }
})




