import fs from 'node:fs'
import ts from 'typescript'
import { parse } from 'vue/compiler-sfc'
import { walk } from './component-api.mjs'

let failures = 0
for (const file of [...walk('src'), ...walk('docs'), ...walk('scripts')].filter(file => /\.(vue|ts|mjs|md|css)$/.test(file) && !/\/(?:dist|cache)\//.test(file))) {
  const bytes = fs.readFileSync(file)
  let source
  try { source = new TextDecoder('utf-8', { fatal: true }).decode(bytes) }
  catch { console.error(`${file}: 必须使用 UTF-8 编码`); failures++; continue }
  if (!source.endsWith('\n')) { console.error(`${file}: 文件末尾缺少换行`); failures++ }
  if (/\.(ts|mjs)$/.test(file)) {
    const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
    for (const diagnostic of parsed.parseDiagnostics) { console.error(`${file}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`); failures++ }
  }
  if (file.endsWith('.vue')) for (const error of parse(source, { filename: file }).errors) { console.error(`${file}: ${String(error)}`); failures++ }
}
console.log(`源码语法、UTF-8 与文件格式检查：${failures} 个问题。`)
process.exitCode = failures ? 1 : 0
