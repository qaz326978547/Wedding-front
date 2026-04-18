import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Cormorant+Garamond': [300, 400, 500, 600, 700],
      'DM+Sans': [300, 400, 500],
    },
    display: 'swap',
    preload: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 全域注入 SCSS 變數與 Mixin（僅定義，不輸出 CSS）
          additionalData: `
            @import "${resolve('assets/scss/_variables')}";
            @import "${resolve('assets/scss/_mixins')}";
          `,
        },
      },
    },
  },

  nitro: {
    preset: 'zeabur',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api',
    },
  },

  components: {
    dirs: [
      { path: '~/components/sections', prefix: '' },
      { path: '~/components/common', prefix: '' },
    ],
  },

  compatibilityDate: '2026-04-18',
})