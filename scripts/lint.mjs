import fs from 'node:fs'
import ts from 'typescript'
import { parse } from 'vue/compiler-sfc'
import { walk } from './component-api.mjs'

// 与 .editorconfig 对齐：Markdown 保留尾空格；字符串、模板文本不按普通代码空白判断。
const extensions = /\.(vue|ts|mjs|md|css|json|ya?ml)$/
const files = [...['src', 'docs', 'scripts', 'tests', '.github'].flatMap(walk), ...fs.readdirSync('.').filter(file => fs.statSync(file).isFile())]
  .filter(file => (extensions.test(file) || file === '.editorconfig') && !/\/(?:dist|cache)\//.test(file) && !file.startsWith('.tmp-'))
const issues = new Map()
function report(rule, file) {
  const items = issues.get(rule) ?? []
  items.push(file)
  issues.set(rule, items)
}
function scriptRanges(file, source, offset = 0) {
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  for (const diagnostic of parsed.parseDiagnostics) report(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'), file)
  const ranges = []
  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || [ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail].includes(node.kind)) ranges.push([offset + node.getStart(parsed), offset + node.end])
    ts.forEachChild(node, visit)
  }
  visit(parsed)
  return ranges
}
for (const file of files) {
  let source
  try { source = new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(file)) }
  catch { report('必须使用 UTF-8 编码', file); continue }
  if (!source.endsWith('\n')) report('文件末尾缺少换行', file)
  if (source.includes('\r')) report('应使用 LF 换行', file)
  let ranges = []
  if (/\.(ts|mjs)$/.test(file)) ranges = scriptRanges(file, source)
  if (file.endsWith('.vue')) {
    const { descriptor, errors } = parse(source, { filename: file })
    for (const error of errors) report(String(error), file)
    for (const script of [descriptor.script, descriptor.scriptSetup].filter(Boolean)) ranges.push(...scriptRanges(file + '.ts', script.content, script.loc.start.offset))
    const template = descriptor.template
    function visit(node) {
      if (node.type === 2) ranges.push([node.loc.start.offset, node.loc.end.offset])
      for (const child of node.children ?? []) visit(child)
    }
    if (template?.ast) visit(template.ast)
  }
  if (!file.endsWith('.md')) {
    for (const match of source.matchAll(/[\t ]+(?=\r?$)/gm)) {
      if (!ranges.some(([start, end]) => match.index >= start && match.index < end)) { report('行末包含多余空格', file); break }
    }
  }
  if (file.endsWith('.json')) try { JSON.parse(source.replace(/^\uFEFF/, '')) } catch (error) { report(error.message, file) }
}
let failures = 0
for (const [rule, paths] of issues) {
  failures += paths.length
  console.error(rule + '：' + paths.length + ' 个文件；示例：' + paths.slice(0, 5).join('、'))
}
console.log('格式与语法检查范围：src、docs、scripts、tests、.github 及根目录配置（Vue/TS/MJS/MD/CSS/JSON/YAML）。')
console.log('UTF-8、LF、末尾换行、尾空格及 TS/Vue/JSON 语法：' + failures + ' 个问题。Markdown 尾空格和字符串/模板文本保留。')
process.exitCode = failures ? 1 : 0
