import type { TableAlign, TableColumn, TableColumnSetting, TableFixed } from './types'
export function formatResolvedPixelSize(value: number) {
  return `${Number(value.toFixed(3))}px`
}

export function sumCssSizes(values: string[]) {
  if (values.length === 0) {
    return '0px'
  }

  return values.length === 1 ? values[0] : `calc(${values.join(' + ')})`
}

export function getFixedWeight(fixed: TableColumnSetting['fixed']) {
  if (fixed === 'left') {
    return 0
  }

  if (fixed === 'right') {
    return 2
  }

  return 1
}

export function normalizeNumber(value: number | undefined) {
  if (value === undefined || Number.isNaN(Number(value))) {
    return undefined
  }

  return Math.max(0, Number(value))
}

export function formatCssSize(value: number | string) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  const trimmed = value.trim()
  return /^-?\d+(?:\.\d+)?$/.test(trimmed) ? `${trimmed}px` : value
}

export function setCssVariable(style: Record<string, string>, key: string, value: string | undefined) {
  if (value) {
    style[key] = value
  }
}

export function alignToJustify(align: TableColumn['align']) {
  if (align === 'center') {
    return 'center'
  }

  if (align === 'right') {
    return 'flex-end'
  }

  return 'flex-start'
}

export interface ResolvedColumn {
  column: TableColumn
  setting: TableColumnSetting
  track: string
  baseTrack: string
  align: TableAlign
  fixed: TableFixed
  left: string
  right: string
}

type CssSizeResolver = (value: string) => number | undefined

interface ColumnLayoutOptions {
  resolveCssSize?: CssSizeResolver
  viewportWidth: number
  autoColumnWidths?: Record<string, number>
  rowDraggable: boolean
  rowSelectionVisible: boolean
  showActions: boolean
  actionsWidth: number | string
}
const defaultColumnMinWidth = 40

export function createResolvedColumn(column: TableColumn, setting: TableColumnSetting): ResolvedColumn {
  return {
    column,
    setting,
    track: '',
    baseTrack: '',
    align: setting.align ?? column.align ?? 'left',
    fixed: setting.fixed ?? 'none',
    left: 'auto',
    right: 'auto'
  }
}

export function resolveColumnTracks(columns: ResolvedColumn[], layout: ColumnLayoutOptions) {
  const utilityColumnsWidth = getUtilityColumnsWidth(layout)
  const dataViewportWidth = Math.max(0, layout.viewportWidth - utilityColumnsWidth)
  const columnTrackSizes = columns.map((column) => getColumnTrackSize(column.column, column.setting, dataViewportWidth, layout.resolveCssSize))
  const baseColumnWidths = columnTrackSizes.map((track) => getColumnTrackPixelWidth(track))
  const shouldUseBaseTracks = layout.viewportWidth > 0 && baseColumnWidths.every((width) => width !== undefined)
  const baseDataColumnsWidth = baseColumnWidths.reduce<number>((sum, width) => sum + (width ?? 0), 0)
  const remaining = shouldUseBaseTracks ? layout.viewportWidth - utilityColumnsWidth - baseDataColumnsWidth : 0
  const fillColumnIndex = remaining > 0 ? getLastFillableColumnIndex(columns) : -1

  if (shouldUseBaseTracks) {
    const automaticIndexes = columnTrackSizes.flatMap((track, index) => track.kind === 'flexible' ? [index] : [])
    const explicitWidth = baseColumnWidths.reduce<number>((sum, width, index) => sum + (columnTrackSizes[index].kind === 'flexible' ? 0 : width ?? 0), 0)
    const availableWidth = Math.max(0, dataViewportWidth - explicitWidth)
    const naturalWidths = automaticIndexes.map((index) => Math.max(
      getColumnMinWidth(columns[index].column, layout.resolveCssSize),
      layout.autoColumnWidths?.[columns[index].column.key] ?? baseColumnWidths[index] ?? 0
    ))
    const minimumWidths = automaticIndexes.map((index) => getColumnMinWidth(columns[index].column, layout.resolveCssSize))
    const proportionalWidths = distributeProportionalWidths(naturalWidths, minimumWidths, availableWidth)
    const automaticWidths = new Map(automaticIndexes.map((index, position) => [index, proportionalWidths[position]]))
    const allProportional = columns.length > 0 && columnTrackSizes.every((track) => track.kind === 'ratio') &&
      Math.abs(columns.reduce((sum, column) => sum + (column.setting.widthRatio ?? 0), 0) - 100) < 0.001
    const ratioWidths = allProportional ? distributeProportionalWidths(
      columns.map((column) => column.setting.widthRatio ?? 0),
      columns.map((column) => getColumnMinWidth(column.column, layout.resolveCssSize)),
      dataViewportWidth
    ) : undefined
    columns.forEach((column, index) => {
      const baseWidth = baseColumnWidths[index] ?? getColumnMinWidth(column.column, layout.resolveCssSize)
      const resolvedWidth = ratioWidths?.[index] ?? automaticWidths.get(index) ?? (automaticIndexes.length === 0 && index === fillColumnIndex ? baseWidth + remaining : baseWidth)
      if (ratioWidths || automaticWidths.has(index)) {
        column.baseTrack = formatResolvedPixelSize(resolvedWidth)
        column.track = column.baseTrack
        return
      }
      column.baseTrack = formatResolvedPixelSize(baseWidth)
      column.track = formatResolvedPixelSize(resolvedWidth)
    })
    return
  }

  const fixedTotal = columnTrackSizes.reduce(
    (sum, track) => (track.kind === 'flexible' ? sum : sum + (track.pixelSize ?? 0)),
    0
  )
  const flexibleColumns = columnTrackSizes.filter((track) => track.kind === 'flexible')
  const flexibleMinTotal = flexibleColumns.reduce((sum, track) => sum + track.minWidth, 0)
  const flexibleRemaining = Math.max(layout.viewportWidth - utilityColumnsWidth - fixedTotal - flexibleMinTotal, 0)
  const extraPerFlexibleColumn = flexibleColumns.length > 0 ? flexibleRemaining / flexibleColumns.length : 0

  columns.forEach((column, index) => {
    const track = columnTrackSizes[index]
    column.track = track.kind === 'flexible' ? formatResolvedPixelSize(track.minWidth + extraPerFlexibleColumn) : track.track
    column.baseTrack = column.track
  })
}

function distributeProportionalWidths(weights: number[], minimumWidths: number[], availableWidth: number) {
  const widths = [...minimumWidths]
  let pending = weights.map((_, index) => index)
  let remaining = Math.max(availableWidth, minimumWidths.reduce((sum, width) => sum + width, 0))
  while (pending.length > 0) {
    const totalWeight = pending.reduce((sum, index) => sum + weights[index], 0)
    const constrained = pending.filter((index) => remaining * weights[index] / totalWeight < minimumWidths[index])
    if (constrained.length === 0) {
      pending.forEach((index) => { widths[index] = remaining * weights[index] / totalWeight })
      break
    }
    constrained.forEach((index) => { remaining -= minimumWidths[index] })
    pending = pending.filter((index) => !constrained.includes(index))
  }
  return widths
}

function getColumnTrackPixelWidth(track: ReturnType<typeof getColumnTrackSize>) {
  return track.kind === 'flexible' ? track.minWidth : track.pixelSize
}

function getLastFillableColumnIndex(columns: ResolvedColumn[]) {
  const unfixedColumnIndex = findLastColumnIndex(columns, (column) => column.fixed === 'none')
  return unfixedColumnIndex >= 0 ? unfixedColumnIndex : columns.length - 1
}

function findLastColumnIndex<T>(items: T[], predicate: (item: T) => boolean) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (predicate(items[index])) {
      return index
    }
  }

  return -1
}

export function applyFixedOffsets(columns: ResolvedColumn[], layout: ColumnLayoutOptions) {
  let leftTracks: string[] = []
  if (layout.rowDraggable) {
    leftTracks.push('44px')
  }
  if (layout.rowSelectionVisible) {
    leftTracks.push('44px')
  }

  for (const column of columns) {
    if (column.fixed !== 'left') {
      continue
    }

    column.left = sumCssSizes(leftTracks)
    leftTracks = [...leftTracks, column.track]
  }

  let rightTracks: string[] = []
  if (layout.showActions) {
    const size = formatCssSize(layout.actionsWidth)
    const width = resolvePixelSize(size, layout.resolveCssSize)
    rightTracks.push(width === undefined ? size : formatResolvedPixelSize(width))
  }

  for (const column of [...columns].reverse()) {
    if (column.fixed !== 'right') {
      continue
    }

    column.right = sumCssSizes(rightTracks)
    rightTracks = [column.track, ...rightTracks]
  }
}

function getColumnTrackSize(column: TableColumn, setting: TableColumnSetting, viewportWidth: number, resolveCssSize?: CssSizeResolver) {
  if (setting.width !== undefined) {
    const pixelSize = Math.max(getColumnMinWidth(column, resolveCssSize), setting.width)

    return {
      kind: 'fixed' as const,
      pixelSize,
      track: formatResolvedPixelSize(pixelSize)
    }
  }

  if (setting.widthRatio !== undefined) {
    const minWidth = getColumnMinWidth(column, resolveCssSize)
    const ratioWidth = viewportWidth > 0 ? (viewportWidth * setting.widthRatio) / 100 : 0
    const pixelSize = Math.max(minWidth, ratioWidth)

    return {
      kind: 'ratio' as const,
      pixelSize,
      track: formatResolvedPixelSize(pixelSize)
    }
  }

  if (column.width !== undefined) {
    const rawTrack = formatCssSize(column.width)
    const pixelSize = resolvePixelSize(rawTrack, resolveCssSize)
    const track = pixelSize === undefined ? rawTrack : formatResolvedPixelSize(Math.max(getColumnMinWidth(column, resolveCssSize), pixelSize))

    return {
      kind: 'fixed' as const,
      pixelSize: parseCssPixelSize(track),
      track
    }
  }

  return {
    kind: 'flexible' as const,
    minWidth: getColumnMinWidth(column, resolveCssSize)
  }
}

function getUtilityColumnsWidth(layout: ColumnLayoutOptions) {
  let width = 0
  if (layout.rowDraggable) {
    width += 44
  }
  if (layout.rowSelectionVisible) {
    width += 44
  }
  if (layout.showActions) {
    width += resolvePixelSize(formatCssSize(layout.actionsWidth), layout.resolveCssSize) ?? 0
  }

  return width
}

export function getColumnMinWidth(column: TableColumn, resolveCssSize?: CssSizeResolver) {
  if (column.minWidth === undefined) {
    return defaultColumnMinWidth
  }

  return resolvePixelSize(formatCssSize(column.minWidth), resolveCssSize) ?? defaultColumnMinWidth
}

export function getResolvedColumnWidth(column: ResolvedColumn, resolveCssSize?: CssSizeResolver) {
  return parseCssPixelSize(column.baseTrack) ?? parseCssPixelSize(column.track) ?? getColumnMinWidth(column.column, resolveCssSize)
}

export function parseCssPixelSize(value: string) {
  const trimmed = value.trim()
  if (!trimmed.endsWith('px')) {
    return undefined
  }

  const size = Number(trimmed.slice(0, -2))
  return Number.isFinite(size) ? size : undefined
}


function resolvePixelSize(value: string, resolveCssSize?: CssSizeResolver) {
  return parseCssPixelSize(value) ?? resolveCssSize?.(value)
}
