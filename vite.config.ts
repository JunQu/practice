import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig((configEnv) => {
  const env = { ...process.env, ...loadEnv(configEnv.mode, process.cwd(), '') }
  const isReactMode = env.VITE_REACT_MODE === 'true'
  const plugins = isReactMode ? [react()] : []
  const rootPath = isReactMode ? resolve(__dirname, 'react') : ''

  return {
    plugins,
    root: rootPath,
    test: {
      globals: true,
      testTimeout: 30 * 1000,
    },
    esbuild: {
      jsxFactory: 'mecat.createElement',
    },
  }
})
