import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ 
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      manifest: {
        "theme_color":"#14b8a6",
        "background_color":"#b643a9",
        "icons":[
          {"purpose":"maskable",
        "sizes":"512x512",
        "src":"/icon512_maskable.png",
        "type":"image/png"
        },
        {"purpose":"any",
        "sizes":"512x512",
        "src":"/icon512_rounded.png",
        "type":"image/png"}],
        "orientation":"any",
        "display":"standalone",
        "dir":"auto",
        "lang":"fr",
        "name":"Ping Robin",
        "short_name":"Ping Robin"}
      
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
