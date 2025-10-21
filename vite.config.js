import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ base 一定要對應你的 repo 名稱
export default defineConfig({
  plugins: [react()],
  base: '/wedding-front/',
})
