import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cmsApiPlugin } from './cms-plugin.js'

export default defineConfig({
  plugins: [react(), cmsApiPlugin()],
})
