import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), visualizer()],
  envPrefix: 'REACT_',
  build: {
    outDir: 'build',
    manifest: true,
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react-router-dom') ||
              id.includes('@remix-run') ||
              id.includes('react-router')
            ) {
              return 'vendor_@react-router'
            }
            if (id.includes('axios')) return 'vendor_axios'
            if (id.includes('react-hook-form')) return 'vendor_react-hook-form'
            if (id.includes('@cyntler/react-doc-viewer')) return 'vendor_@cyntler/react-doc-viewer'
            if (id.includes('react-redux')) return 'vendor_react_redux'
            if (id.includes('@reduxjs/toolkit')) return 'vendor_reduxjs/toolkit'
            if (id.includes('dayjs')) return 'vendor_dayjs'
            if (id.includes('keycloak-js')) return 'vendor_keycloak'
            if (id.includes('react-toastify')) return 'vendor_react-toastify'
            if (id.includes('vite')) return 'vendor_vite'
          }
        },
      },
    },
  },
  base: '/lead',
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
})
