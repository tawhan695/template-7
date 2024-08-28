import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import removeConsole from 'vite-plugin-remove-console';
// import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|svg|avif)$/i,
    }),
    removeConsole(),
    VueI18nPlugin({
      runtimeOnly: false, // if the interpolation or pluralization is not working in production
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'), // provide a path to the folder where you'll store translation data (see below)
    }),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   manifest: {
    //     "name": "TAWIN65",
    //     "theme_color": "#000000",
    //     "background_color": "#000000",
    //     "lang": "th",
    //     "start_url": "/",
    //     "icons": [
    //       {
    //         "src": "icon-96x96.png",
    //         "sizes": "96x96",
    //         "type": "image/png"
    //       },
    //       {
    //         "src": "icon-152x152.png",
    //         "sizes": "152x152",
    //         "type": "image/png",
    //         "purpose": "any maskable"
    //       },
    //       {
    //         "src": "icon-512x512.png",
    //         "sizes": "512x512",
    //         "type": "image/png",
    //       }
    //     ]
    //   }
    // })
  ],
  server: {
    watch: {
      usePolling: true
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': fileURLToPath(new URL('node_modules/bootstrap', import.meta.url)),
    }
  },
})