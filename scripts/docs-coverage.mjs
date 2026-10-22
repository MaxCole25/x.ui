import fs from 'node:fs'
import { inventory } from './component-api.mjs'
import { readApiDescriptions, docComponentName, descriptionKey } from './component-api-docs.mjs'

// 复用源码提取器，检查公开组件文档入口及 API 名称覆盖，不再维护第二份组件清单。
const entries = inventory()
const issues = []
for (const component of entries) {
  const slug = component.name === 'XRadioButton' ? 'radio-button' : component.slug
  const file = `docs/components/${slug}.md`
  if (!fs.existsSync(file)) { issues.push(`${component.name} 缺少 ${file}`); continue }
  const source = fs.readFileSync(file, 'utf8')
  const descriptions = readApiDescriptions(source, docComponentName(slug))
  // 旧文档也有“事件与插槽”、合并表格行及行内 API 说明。仅名称覆盖允许这些形式。
  // 多组件共用页面仍要求提取器识别组件作用域，避免把其它组件的同名 API 当作已覆盖。
  const singleComponent = entries.filter(entry => (entry.name === 'XRadioButton' ? 'radio-button' : entry.slug) === slug).length === 1
  if (!/^# .+/m.test(source)) issues.push(`${file} 缺少标题`)
  if (!/```vue|<XDocDemo\b/.test(source)) issues.push(`${file} 缺少 Vue 示例`)
  for (const kind of ['props', 'events', 'slots', 'methods']) {
    for (const item of component[kind]) {
      const escaped = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const mentioned = singleComponent && new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`).test(source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''))
      if (!descriptions.has(descriptionKey(component.name, kind, item.name)) && !mentioned) {
        issues.push(`${file} 缺少 ${component.name} ${kind}.${item.name}`)
      }
    }
  }
}
console.log(`已检查 ${entries.length} 个组件的文档、示例、Props、Events、Slots、实例方法。`)
for (const issue of issues) console.error(issue)
console.log('本检查只验证名称覆盖（含合并表格和行内说明）；源码与元数据同步另由 pnpm api:inventory:check 检查，pnpm docs:api 可更新 API 表。说明、类型、默认值、响应式与主题效果仍需审查。')
process.exitCode = issues.length ? 1 : 0
