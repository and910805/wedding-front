import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🧠 自動切換 base（本地/Vercel 用 '/', GitHub Pages 用 '/wedding-front/'）
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/wedding-front/' : '/',
})
