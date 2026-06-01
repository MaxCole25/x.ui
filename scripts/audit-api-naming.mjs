import fs from 'node:fs'
import path from 'node:path'
import * as ts from 'typescript'

const rootDir = process.cwd()
const componentsDir = path.join(rootDir, 'src', 'components')
const reportPath = path.join(rootDir, 'docs', 'guide', 'api-naming-audit.md')
const writeReport = process.argv.includes('--write')
const jsonOutput = process.argv.includes('--json')
const checkMode = process.argv.includes('--check')
const getNumberArg = (name, fallback) => {
  const prefix = `--${name}=`
  const raw = process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)
  if (raw === undefined) return fallback
  const value = Number(raw)
  return Number.isFinite(value) ? value : fallback
}
const maxLegacyFindings = getNumberArg('max-legacy', Number.POSITIVE_INFINITY)
const maxReviewFindings = getNumberArg('max-review', 0)

const legacyAliases = new Set(['XlTableProps'])
const legacyTypeOwners = new Set(['MessageBoxProps', 'MessageProps', 'TabsProps', 'TagProps', 'TextProps'])
const acceptedBareWords = new Set([
  'BaseInputProps:type',
  'CheckboxProps:label',
  'CheckboxProps:value',
  'FormItemProps:label',
  'InputProps:type',
  'OptionProps:label',
  'OptionProps:value',
  'RadioButtonProps:label',
  'RadioButtonProps:value',
  'RadioProps:label',
  'RadioProps:value'
])

const isAcceptedBareWord = (name, occurrence) => acceptedBareWords.has(`${occurrence.owner}:${name}`)

const rules = [
  {
    id: 'bare-background',
    title: '裸 background 属性',
    level: 'legacy',
    match: (name) => name === 'background',
    recommendation: '通用色值使用 backgroundColor；输入区域使用 inputBackgroundColor；复杂背景使用带业务前缀的明确名称。'
  },
  {
    id: 'bg-color-abbr',
    title: 'BgColor 缩写',
    level: 'legacy',
    match: (name) => /BgColor/.test(name),
    recommendation: '使用完整的 BackgroundColor 后缀，例如 activeBackgroundColor。'
  },
  {
    id: 'border-radius',
    title: 'BorderRadius 圆角命名',
    level: 'legacy',
    match: (name) => name === 'borderRadius' || /BorderRadius$/.test(name),
    recommendation: '整体圆角使用 radius，局部圆角使用 partRadius，例如 topbarRadius。'
  },
  {
    id: 'append-to-body',
    title: 'appendToBody 浮层开关',
    level: 'legacy',
    match: (name) => name === 'appendToBody',
    recommendation: '新增浮层统一使用 teleported 和 teleportTo。'
  },
  {
    id: 'specific-z-index',
    title: '组件特定 z-index 命名',
    level: 'legacy',
    match: (name) => name === 'dropdownZIndex' || name === 'popperZIndex',
    recommendation: '新增浮层优先使用 zIndex，并从 overlayZIndex 读取默认值。'
  },
  {
    id: 'fill-size-switch',
    title: '填充尺寸开关',
    level: 'legacy',
    match: (name) => ['fillHeight', 'contentFillHeight', 'stretch'].includes(name),
    recommendation: '撑满父容器优先使用 fullHeight，局部内容撑满使用 contentFullHeight，页签拉伸使用 tabStretch。'
  },
  {
    id: 'bare-color',
    title: '裸 color 属性',
    level: 'legacy',
    match: (name, occurrence) => name === 'color' && occurrence.owner !== 'IconProps',
    recommendation: '图标组件外不要新增裸 color；主题色使用 accentColor，选中色使用 checkedColor，头像背景使用 avatarBackgroundColor，文字色使用 textColor。'
  },
  {
    id: 'bare-type',
    title: '裸 type 视觉/状态属性',
    level: 'legacy',
    match: (name, occurrence) => name === 'type' && legacyTypeOwners.has(occurrence.owner),
    recommendation: '视觉形态使用 variant，反馈状态使用 status；原生输入 type 可保留。'
  },
  {
    id: 'ambiguous-bare-word',
    title: '泛化裸词',
    level: 'review',
    match: (name, occurrence) =>
      ['type', 'value', 'label'].includes(name) &&
      !legacyTypeOwners.has(occurrence.owner) &&
      !isAcceptedBareWord(name, occurrence),
    recommendation: '新增时先确认上下文足够明确；不明确时加业务前缀或改用更具体名称。'
  }
]

const toPosix = (filePath) => filePath.split(path.sep).join('/')

const walk = (dir, output = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, output)
    } else if (entry.isFile() && fullPath.endsWith('.ts')) {
      output.push(fullPath)
    }
  }

  return output
}

const allSourceFiles = walk(path.join(rootDir, 'src'))
const componentTypeFiles = allSourceFiles.filter((filePath) => {
  const rel = toPosix(path.relative(rootDir, filePath))
  return rel.startsWith('src/components/') && rel.endsWith('/src/types.ts')
})

const program = ts.createProgram(allSourceFiles, {
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
  strict: false,
  target: ts.ScriptTarget.ESNext,
  types: []
})
const checker = program.getTypeChecker()

const isExported = (node) => node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false

const getLine = (node) => {
  const sourceFile = node.getSourceFile()
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1
}

const parseOwnerMeta = (relPath, interfaceName) => {
  const parts = relPath.split('/')
  const componentsIndex = parts.indexOf('components')

  return {
    category: parts[componentsIndex + 1] ?? '',
    component: parts[componentsIndex + 2] ?? '',
    interfaceName,
    publicName: `X${interfaceName.replace(/Props$/, '')}`
  }
}

const collectPropInterfaces = () => {
  const records = []
  const typeFileSet = new Set(componentTypeFiles.map((filePath) => path.resolve(filePath)))

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile || !typeFileSet.has(path.resolve(sourceFile.fileName))) {
      continue
    }

    const relPath = toPosix(path.relative(rootDir, sourceFile.fileName))

    const visit = (node) => {
      const name = node.name?.text
      const exportedProps =
        isExported(node) &&
        name &&
        name.endsWith('Props') &&
        !legacyAliases.has(name) &&
        (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node))

      if (exportedProps) {
        const symbol = checker.getSymbolAtLocation(node.name)
        const type = symbol ? checker.getDeclaredTypeOfSymbol(symbol) : checker.getTypeAtLocation(node)
        const properties = checker.getPropertiesOfType(type).map((property) => {
          const declaration = property.valueDeclaration ?? property.declarations?.[0]
          const declaredIn = declaration ? toPosix(path.relative(rootDir, declaration.getSourceFile().fileName)) : ''

          return {
            name: property.getName(),
            declaredIn,
            line: declaration ? getLine(declaration) : null
          }
        })

        records.push({
          ...parseOwnerMeta(relPath, name),
          relPath,
          line: getLine(node),
          properties
        })
      }

      ts.forEachChild(node, visit)
    }

    visit(sourceFile)
  }

  return records.sort((a, b) => a.relPath.localeCompare(b.relPath) || a.interfaceName.localeCompare(b.interfaceName))
}

const propInterfaces = collectPropInterfaces()
const propOccurrences = propInterfaces.flatMap((owner) =>
  owner.properties.map((property) => ({
    ...property,
    owner: owner.interfaceName,
    publicName: owner.publicName,
    component: owner.component,
    category: owner.category,
    ownerPath: owner.relPath,
    ownerLine: owner.line
  }))
)

const uniquePropNames = new Set(propOccurrences.map((property) => property.name))
const directPropNames = new Set(
  propOccurrences.filter((property) => property.declaredIn === property.ownerPath).map((property) => property.name)
)

const findings = []
for (const occurrence of propOccurrences) {
  for (const rule of rules) {
    if (rule.match(occurrence.name, occurrence)) {
      findings.push({
        ...occurrence,
        ruleId: rule.id,
        ruleTitle: rule.title,
        level: rule.level,
        recommendation: rule.recommendation
      })
    }
  }
}

const groupBy = (items, getKey) => {
  const groups = new Map()
  for (const item of items) {
    const key = getKey(item)
    const list = groups.get(key) ?? []
    list.push(item)
    groups.set(key, list)
  }

  return groups
}

const uniqueSorted = (items) => [...new Set(items)].sort((a, b) => a.localeCompare(b))

const truncateList = (items, max = 8) => {
  if (items.length <= max) return items.join('、')
  return `${items.slice(0, max).join('、')} 等 ${items.length} 个`
}

const summarizeFindingsByRule = () => {
  const groups = groupBy(findings, (finding) => finding.ruleId)

  return rules.map((rule) => {
    const ruleFindings = groups.get(rule.id) ?? []
    const propNames = uniqueSorted(ruleFindings.map((finding) => finding.name))
    const owners = uniqueSorted(ruleFindings.map((finding) => finding.owner))

    return {
      id: rule.id,
      title: rule.title,
      level: rule.level,
      propNameCount: propNames.length,
      occurrenceCount: ruleFindings.length,
      ownerCount: owners.length,
      recommendation: rule.recommendation
    }
  })
}

const summarizePropsByRule = () => {
  const propGroups = groupBy(findings, (finding) => `${finding.ruleId}::${finding.name}`)

  return [...propGroups.entries()]
    .map(([key, group]) => {
      const [ruleId, propName] = key.split('::')
      const rule = rules.find((item) => item.id === ruleId)
      const owners = uniqueSorted(group.map((finding) => finding.owner))
      const declarationRefs = uniqueSorted(
        group
          .filter((finding) => finding.declaredIn)
          .map((finding) => `${finding.declaredIn}${finding.line ? `:${finding.line}` : ''}`)
      )

      return {
        ruleId,
        ruleTitle: rule?.title ?? ruleId,
        level: rule?.level ?? 'review',
        propName,
        occurrenceCount: group.length,
        owners,
        declarationRefs
      }
    })
    .sort(
      (a, b) =>
        a.ruleTitle.localeCompare(b.ruleTitle) ||
        b.occurrenceCount - a.occurrenceCount ||
        a.propName.localeCompare(b.propName)
    )
}

const stats = {
  propInterfaceCount: propInterfaces.length,
  effectivePropSlots: propOccurrences.length,
  uniquePropNameCount: uniquePropNames.size,
  directPropNameCount: directPropNames.size,
  findingCount: findings.length,
  legacyFindingCount: findings.filter((finding) => finding.level === 'legacy').length,
  reviewFindingCount: findings.filter((finding) => finding.level === 'review').length
}

const generatedAt = new Date().toISOString().slice(0, 10)
const ruleSummaries = summarizeFindingsByRule()
const propSummaries = summarizePropsByRule()

const markdownTable = (headers, rows) => {
  const escapeCell = (value) => String(value).replace(/\|/g, '\\|')
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`)
  ].join('\n')
}

const buildMarkdownReport = () => {
  const summaryRows = [
    ['公开组件 Props 接口', stats.propInterfaceCount],
    ['有效 Props 出现次数', stats.effectivePropSlots],
    ['唯一 Props 名称', stats.uniquePropNameCount],
    ['直接声明唯一字段', stats.directPropNameCount],
    ['命中审计规则次数', stats.findingCount],
    ['legacy 命中次数', stats.legacyFindingCount],
    ['review 命中次数', stats.reviewFindingCount]
  ]

  const ruleRows = ruleSummaries.map((rule) => [
    rule.title,
    rule.level,
    rule.propNameCount,
    rule.occurrenceCount,
    rule.ownerCount,
    rule.recommendation
  ])

  const propRows = propSummaries.map((prop) => [
    prop.ruleTitle,
    prop.level,
    `\`${prop.propName}\``,
    prop.occurrenceCount,
    truncateList(prop.owners),
    truncateList(prop.declarationRefs, 4)
  ])

  return `# 公开属性命名审计

本报告由 \`pnpm api:naming:audit:write\` 生成，用于记录当前公开组件 Props 的命名治理状态。报告只统计 \`src/components/**/src/types.ts\` 中导出的组件 \`*Props\`，并排除 \`XlTableProps\` 兼容别名，避免重复计算 \`TableProps\`。

pre-1.0 阶段不保留旧命名兼容，\`legacy\` 和 \`review\` 命中数都必须保持为 0。新增组件和新增公开属性应优先遵守 [公开接口命名规范](/guide/api-naming)。

生成日期：${generatedAt}

## 汇总

${markdownTable(['项', '数量'], summaryRows)}

## 规则命中

${markdownTable(['规则', '级别', '属性名数', '出现次数', '接口数', '建议'], ruleRows)}

## 属性明细

${markdownTable(['规则', '级别', '属性', '出现次数', '接口', '声明位置'], propRows)}
`
}

const report = {
  stats,
  ruleSummaries,
  propSummaries
}

if (writeReport) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true })
  fs.writeFileSync(reportPath, buildMarkdownReport(), 'utf8')
}

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2))
} else {
  console.log(
    [
      `公开组件 Props 接口: ${stats.propInterfaceCount}`,
      `唯一 Props 名称: ${stats.uniquePropNameCount}`,
      `命中审计规则次数: ${stats.findingCount}`,
      `legacy: ${stats.legacyFindingCount}`,
      `review: ${stats.reviewFindingCount}`
    ].join('\n')
  )

  if (writeReport) {
    console.log(`报告已写入: ${toPosix(path.relative(rootDir, reportPath))}`)
  }
}

if (checkMode) {
  const failures = []
  if (stats.legacyFindingCount > maxLegacyFindings) {
    failures.push(`legacy 命中次数 ${stats.legacyFindingCount} 超过上限 ${maxLegacyFindings}`)
  }
  if (stats.reviewFindingCount > maxReviewFindings) {
    failures.push(`review 命中次数 ${stats.reviewFindingCount} 超过上限 ${maxReviewFindings}`)
  }

  if (failures.length) {
    console.error(`公开属性命名审计未通过：${failures.join('；')}`)
    process.exitCode = 1
  }
}
