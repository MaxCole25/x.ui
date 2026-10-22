import fs from 'node:fs'
import path from 'node:path'

const site = 'https://maxcole25.github.io/x.ui/'
const out = 'docs/.vitepress/dist'
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.name.startsWith('.') ? [] : entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
const pages = walk('docs').filter(file => file.endsWith('.md')).sort().map(file => {
  const relative = path.relative('docs', file).replaceAll('\\', '/')
  const source = fs.readFileSync(file, 'utf8')
  const title = source.match(/^# (.+)$/m)?.[1] ?? (relative === 'index.md' ? 'Soft88 X.UI' : relative)
  const url = site + relative.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
  const examples = new Map([...source.matchAll(/import (\w+) from ['"]([^'"]+\.vue)['"]/g)]
    .map(([, name, target]) => [name, path.resolve(path.dirname(file), target)]))
  const content = source
    .replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<XDocDemo\b[^>]*>/g, '')
    .replace(/<\/(?:XDocDemo)>/g, '')
    .replace(/<(\w+)\s*\/>/g, (tag, name) => examples.has(name)
      ? '\n```vue\n' + fs.readFileSync(examples.get(name), 'utf8').trim() + '\n```\n' : tag)
    .replace(/\]\((\.{1,2}\/[^)#]+)(#[^)]*)?\)/g, (link, target, hash = '') => {
      const resolved = path.resolve(path.dirname(file), target)
      const markdownFile = target.endsWith('.md') ? resolved : resolved + '.md'
      if (!fs.existsSync(markdownFile)) return link
      const destination = path.relative('docs', markdownFile).replaceAll('\\', '/')
      return `](${site}${destination.replace(/\.md$/, '.html')}${hash})`
    }).trim()
  return { relative, title, url, content }
})
fs.mkdirSync(out, { recursive: true })
const intro = `# Soft88 X.UI

> Vue 3 + TypeScript UI Component Library。优先通过组件、Props、布局系统与统一主题构建业务界面，尽可能减少手写 CSS。

- GitHub: https://github.com/MaxCole25/x.ui
- 安装：pnpm add @x-soft88/x-ui（当前 publishConfig.access 为 restricted，需要对应包访问权限；也可源码构建后本地 link）
- 快速入门：${site}guide/getting-started.html
- AI 使用规范：${site}guide/ai-usage.html
- 统一样式：import '@x-soft88/x-ui/style.css'
- 按需使用：import { XButton } from '@x-soft88/x-ui'
- 不编造组件、Props 或能力；不确定时先查组件文档、公开类型和根入口导出。
- 主题：regular、dark、light，通过 html 的 data-theme 设置。仅在组件与主题无法满足需求时补充 CSS。
- 本文件与完整文档在每次 docs:build 时从公开 docs Markdown 和示例源码生成。

## 文档索引

`
fs.writeFileSync(`${out}/llms.txt`, intro + pages.map(page => `- [${page.title}](${page.url})`).join('\n') +
  `\n\n## 完整文档\n\n- [llms-full.txt](${site}llms-full.txt)\n`, 'utf8')
fs.writeFileSync(`${out}/llms-full.txt`, intro + '\n' + pages.map(page =>
  `---\n\n来源：${page.url}\n\n${page.content}\n`).join('\n'), 'utf8')
console.log(`已从 ${pages.length} 个公开文档生成 llms.txt 和 llms-full.txt（${fs.statSync(`${out}/llms-full.txt`).size} 字节）。`)
