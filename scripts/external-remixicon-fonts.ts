import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { normalizePath, type Plugin } from 'vite'

const require = createRequire(import.meta.url)
const sourceStyles = normalizePath(resolve(__dirname, '../src/styles/index.css'))
const iconImport = '@import "../remixicon.css";'

export function externalRemixIconFonts(): Plugin {
  return {
    name: 'x-ui-external-remixicon-fonts',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (id !== sourceStyles) return
      if (!code.includes(iconImport)) this.error('Missing Remix Icon import in the main stylesheet')
      return { code: code.replace(iconImport, ''), map: null }
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const style = bundle['style.css']
        if (!style || style.type !== 'asset' || typeof style.source !== 'string') {
          this.error('Expected the x.ui library stylesheet at style.css')
        }

        const upstreamPath = require.resolve('remixicon/fonts/remixicon.css')
        const upstreamCss = readFileSync(upstreamPath, 'utf8')
        const fonts = new Set<string>()
        const iconCss = upstreamCss.replace(
          /url\((['"])(remixicon\.(?:eot|woff2?|ttf|svg))([^'"]*)\1\)/g,
          (_url, quote: string, file: string, suffix: string) => {
            fonts.add(file)
            return `url(${quote}./fonts/${file}${suffix}${quote})`
          },
        )
        if (!fonts.has('remixicon.woff2')) this.error('Missing the Remix Icon WOFF2 font')

        for (const file of Array.from(fonts)) {
          this.emitFile({
            type: 'asset',
            fileName: `fonts/${file}`,
            source: readFileSync(join(dirname(upstreamPath), file)),
          })
        }
        this.emitFile({ type: 'asset', fileName: 'remixicon.css', source: iconCss })

        // Library mode inlines fonts. Add the shared stylesheet after CSS bundling.
        const charset = style.source.match(/^@charset\s+[^;]+;/i)?.[0] ?? ''
        style.source = `${charset}@import "./remixicon.css";\n${style.source.slice(charset.length)}`
      },
    },
  }
}
