import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// ⚙️ 這個設定讓本地開發能在內網 IP 上訪問
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const usingCustomDomain = env.VITE_CUSTOM_DOMAIN === 'true'

  const basePath = usingCustomDomain ? './' : '/wedding-front/'

  console.log(`🛠️ Vite build base set to: ${basePath}`)

  return {
    plugins: [react()],
    base: basePath, // ✅ 根據部署情境調整 base
    server: {
      host: '0.0.0.0',         // ✅ 讓同網段的電腦可以連進來（例如 192.168.150.x）
      port: 5173,              // 📡 預設可改
    },
  }
})
