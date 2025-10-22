import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚙️ 這個設定讓本地開發能在內網 IP 上訪問
export default defineConfig({
  plugins: [react()],
  base: '/wedding-front/',   // ✅ GitHub Pages 使用
  server: {
    host: '0.0.0.0',         // ✅ 讓同網段的電腦可以連進來（例如 192.168.150.x）
    port: 5173,              // 📡 預設可改
  },
})
