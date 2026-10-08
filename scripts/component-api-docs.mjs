export const descriptionKey = (component, kind, name) => JSON.stringify([component, kind, name])
export const docComponentName = slug => 'X' + slug.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')

/** 接口说明只在对应组件与接口类别内复用，保留人工组件 Props 表的优先级。 */
export function readApiDescriptions(source, defaultComponent) {
  const result = new Map()
  const kinds = { 属性: 'props', Props: 'props', 事件: 'events', Events: 'events', 插槽: 'slots', Slots: 'slots', 实例方法: 'methods', 方法: 'methods', Methods: 'methods' }
  let kind, sectionKind, component = defaultComponent, manual = false
  for (const line of source.split(/\r?\n/)) {
    const section = line.match(/^## (.+)/)
    if (section) {
      sectionKind = kinds[section[1].trim()]
      kind = sectionKind
      component = defaultComponent
      manual = false
      continue
    }
    const heading = line.match(/^### (.+)/)
    if (heading) {
      const ownProps = heading[1].match(/^(X?\w+)\s+(Props|属性)\s*$/)
      const scoped = heading[1].match(/^(X\w+)\s+·/)
      if (ownProps) {
        component = ownProps[1].startsWith('X') ? ownProps[1] : 'X' + ownProps[1]
        kind = 'props'
        manual = true
      } else if (scoped && sectionKind) {
        component = scoped[1]
        kind = sectionKind
        manual = false
      } else if (manual) {
        kind = sectionKind
        component = defaultComponent
        manual = false
      }
      continue
    }
    if (!kind || !line.startsWith('|')) continue
    const cells = line.split(/(?<!\\)\|/).slice(1, -1).map(cell => cell.trim())
    const name = cells[0]?.replaceAll('`', '')
    if (!name || /^-+$/.test(name) || !cells[1]) continue
    const key = descriptionKey(component, kind, name)
    if (!result.has(key)) result.set(key, cells[1])
  }
  return result
}
