import { writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
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
          rollupTypes: true,
          afterBuild: (emittedFiles) => {
            for (const [filePath, content] of emittedFiles) {
              if (basename(filePath) === 'x-ui.d.ts') {
                writeFileSync(join(dirname(filePath), 'index.d.ts'), content, 'utf8')
              }
            }
          }
        })
    ],
    build: isHistoire
      ? {}
      : {
          lib: {
            entry: {
              'x-ui': resolve(__dirname, 'src/index.ts'),
              core: resolve(__dirname, 'src/core.ts'),
              'rich-text-editor': resolve(__dirname, 'src/rich-text-editor.ts'),
              table: resolve(__dirname, 'src/table.ts')
            },
            name: 'XUi',
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
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
