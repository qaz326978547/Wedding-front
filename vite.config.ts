import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "${resolve(__dirname, 'assets/scss/_variables')}";
          @import "${resolve(__dirname, 'assets/scss/_mixins')}";
        `,
      },
    },
  },
})
