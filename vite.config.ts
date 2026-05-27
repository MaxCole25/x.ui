import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  const isHistoire = process.argv.some((arg) => arg.includes('histoire'))

  return {
    plugins: [
      vue(),
      !isHistoire &&
        dts({
          entryRoot: 'src',
          include: ['src'],
          insertTypesEntry: true,
          rollupTypes: true
        })
    ],
    build: isHistoire
      ? {}
      : {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'XUi',
            fileName: (format) => (format === 'umd' ? 'x-ui.umd.cjs' : 'x-ui.js'),
            cssFileName: 'style'
          },
          rollupOptions: {
            external: (id) => id === 'vue' || id === 'echarts' || id.startsWith('echarts/'),
            output: {
              globals: {
                echarts: 'echarts',
                'echarts/core': 'echarts',
                vue: 'Vue'
              },
              exports: 'named'
            }
          },
          cssCodeSplit: false,
          sourcemap: false
        }
  }
})
