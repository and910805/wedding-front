import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json' assert { type: 'json' }

const REPO_BASE_PATH = '/wedding-front/'
const CUSTOM_DOMAIN_FLAGS = ['true', '1', 'yes', 'on']

const resolveBasePath = (mode) => {
  const projectRoot = process.cwd()
  const env = loadEnv(mode, projectRoot, '')
  const rawFlag = env.VITE_CUSTOM_DOMAIN ?? process.env.VITE_CUSTOM_DOMAIN ?? ''
  const normalizedFlag = String(rawFlag).trim().toLowerCase()
  const hasCustomDomainFlag = CUSTOM_DOMAIN_FLAGS.includes(normalizedFlag)

  const envFiles = ['.env', '.env.production']
  const hasEnvFile = envFiles.some((file) => fs.existsSync(path.join(projectRoot, file)))
  const hasCname = fs.existsSync(path.join(projectRoot, 'public', 'CNAME'))

  const homepageBase = (() => {
    const homepage = packageJson.homepage
    if (!homepage) return REPO_BASE_PATH

    try {
      const { pathname } = new URL(homepage)
      return pathname.endsWith('/') ? pathname : `${pathname}/`
    } catch (error) {
      console.warn('⚠️  無法解析 package.json 中的 homepage，改用預設子目錄。', error)
      return REPO_BASE_PATH
    }
  })()

  const usingCustomDomain = hasCustomDomainFlag || hasCname
  const basePath = usingCustomDomain ? '/' : homepageBase

  console.log(
    `🛠️ Vite base path: ${basePath} | customDomain=${usingCustomDomain} | envFiles=${
      hasEnvFile ? 'detected' : 'not found'
    }`,
  )

  return basePath
}

// ⚙️ 這個設定讓本地開發能在內網 IP 上訪問
export default defineConfig(({ mode }) => {
  const base = resolveBasePath(mode)

  return {
    plugins: [react()],
    base, // ✅ 根據部署情境調整 base
    server: {
      host: '0.0.0.0', // ✅ 讓同網段的電腦可以連進來（例如 192.168.150.x）
      port: 5173, // 📡 預設可改
    },
  }
})
