import ts from 'typescript'

// 只补充已对照实现核实的契约，不按属性名推测默认值或单位。
const notes = {
  XButton: {
    fontSize: '未设置时继承父级字号，独立使用时为 14px',
    height: '未设置时为 32px，与字号独立',
    padding: '未设置时为 0 8px',
    radius: '未设置时为 6px'
  },
  XBaseInput: {
    fontSize: '未设置时继承 Form 字号，独立使用时为 14px',
    height: '默认 32px；autoHeight 为 true 时撑满父容器高度',
    radius: '未设置时使用 --x-form-radius，未提供该变量时为 6px'
  },
  XSwitch: {
    fontSize: '未设置时继承 Form 字号，独立使用时为 14px',
    height: 'height 优先于 buttonSize；两者未设置时轨道高度为 24px',
    radius: '未设置时使用 999px 胶囊圆角'
  },
  XTooltip: { modelValue: '未设置时由组件内部管理显示状态' }
}

export const defaultNoteFor = (component, prop) => notes[component]?.[prop] ?? ''

export function propUnits(sourceFile, checker, component) {
  const units = new Map()
  const add = (name, unit) => {
    if (!units.has(name)) units.set(name, new Set())
    units.get(name).add(unit)
  }
  // 跟随本文件 computed/ref/局部变量，避免 mergedSize 等间接引用丢失单位。
  const referencedProps = expression => {
    const names = new Set(), seen = new Set()
    const visit = node => {
      if (!node) return
      if (ts.isPropertyAccessExpression(node) && node.expression.getText() === 'props') {
        names.add(node.name.text)
        return
      }
      // 条件只决定分支，不决定结果的单位；乘除运算可能将行数/比例转换为长度。
      if (ts.isConditionalExpression(node)) {
        visit(node.whenTrue)
        visit(node.whenFalse)
        return
      }
      if (ts.isBinaryExpression(node)) {
        if ([ts.SyntaxKind.AsteriskToken, ts.SyntaxKind.SlashToken, ts.SyntaxKind.PercentToken,
          ts.SyntaxKind.GreaterThanToken, ts.SyntaxKind.LessThanToken, ts.SyntaxKind.EqualsEqualsEqualsToken,
          ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.GreaterThanEqualsToken,
          ts.SyntaxKind.LessThanEqualsToken].includes(node.operatorToken.kind)) return
        if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) { visit(node.right); return }
      }
      if (ts.isCallExpression(node)) {
        if (!['computed', 'ref', 'unref', 'getComponentMetrics', 'Math.min', 'Math.max', 'Math.ceil', 'Math.floor', 'Math.round'].includes(node.expression.getText())) return
        for (const argument of node.arguments) visit(argument)
        return
      }
      if (ts.isIdentifier(node)) {
        const symbol = checker.getSymbolAtLocation(node)
        const declaration = symbol?.valueDeclaration
        if (declaration && ts.isVariableDeclaration(declaration) && declaration.initializer && declaration.getSourceFile() === sourceFile && !seen.has(symbol)) {
          seen.add(symbol)
          visit(declaration.initializer)
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(expression)
    return names
  }
  const mark = (expression, unit) => { for (const name of referencedProps(expression)) add(name, unit) }
  const visit = node => {
    if (ts.isCallExpression(node)) {
      const name = node.expression.getText()
      if (['toCssSize', 'createFontStyle', 'getComponentMetrics'].includes(name)) mark(node.arguments[0], 'px')
      if (name === 'createElementStyleVars' && node.arguments[0]?.getText() === 'props') {
        add('radius', 'px')
        add('borderWidth', 'px')
      }
      if (['setTimeout', 'window.setTimeout', 'setInterval', 'window.setInterval'].includes(name)) mark(node.arguments[1], 'ms')
    }
    if (ts.isTemplateExpression(node)) {
      for (const span of node.templateSpans) if (span.literal.text.startsWith('px')) mark(span.expression, 'px')
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  // Button 的布局通过 resolveSizeStyle 转换，来源为 _utils/size.ts 的固定布局。
  if (component === 'XButton') for (const name of ['height', 'padding', 'radius']) add(name, 'px')
  return (name, type) => {
    // 仓库 fontSize 公开契约明确规定 number/px，见 docs/guide/typography.md。
    if (name === 'fontSize') return 'px'
    if (component === 'XText' && name === 'lineHeight') return '数字为行高倍数；字符串使用 CSS 单位'
    // ScrollingText.vue: distance(px) / speed = duration(s)。
    if (component === 'XScrollingText' && name === 'speed') return 'px/s'
    const found = units.get(name)
    if (!found || found.size !== 1) return '—'
    const unit = [...found][0]
    const parts = type.isUnion() ? type.types : [type]
    if (!parts.some(part => part.flags & ts.TypeFlags.NumberLike)) return '—'
    return unit === 'px' && parts.some(part => part.flags & ts.TypeFlags.StringLike) ? '数字为 px；字符串使用 CSS 单位' : unit
  }
}

// 控件依据检查器解析后的类型选择，不能从类型别名或接口定义中的引号猜枚举。
export function controlFor(type, checker, location) {
  const resolved = checker.getNonNullableType(type)
  const parts = resolved.isUnion() ? resolved.types : [resolved]
  let controlType = 'json', options = []
  if (resolved.getCallSignatures().length) controlType = 'callback'
  else if (checker.isArrayType(resolved) || checker.isTupleType(resolved)) controlType = 'json'
  else if (parts.every(part => part.flags & ts.TypeFlags.BooleanLike)) controlType = 'boolean'
  else if (parts.every(part => part.flags & ts.TypeFlags.NumberLike)) controlType = 'number'
  else if (parts.every(part => part.flags & ts.TypeFlags.StringLike)) {
    controlType = 'string'
    if (parts.every(part => part.flags & ts.TypeFlags.StringLiteral)) options = parts.map(part => part.value)
  } else if (parts.every(part => part.flags & (ts.TypeFlags.StringLike | ts.TypeFlags.NumberLike))) controlType = 'number|string'
  else if (parts.every(part => (part.flags & ts.TypeFlags.Object) && !checker.isArrayType(part) && !checker.isTupleType(part)) && resolved.getProperties().some(symbol => checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(symbol, location)).getCallSignatures().length)) controlType = 'callback'
  return { controlType, options }
}
