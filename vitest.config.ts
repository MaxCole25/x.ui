import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    server: {
      deps: {
        inline: ['vue-grid-layout-v3']
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    }
  }
})
