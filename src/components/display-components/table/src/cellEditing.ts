import type { TableColumn } from './types'
export function getCellValue(row: Record<string, unknown>, column: TableColumn) {
  if (column.valueGetter) {
    return column.valueGetter(row, column)
  }

  return row[column.key]
}

export function isReadonlyColumn(column: TableColumn) {
  return Boolean(column.valueGetter || column.readonly || column.editable === false)
}

export function normalizeInputValue(value: unknown) {
  return typeof value === 'number' ? value : String(value ?? '')
}

export function normalizeEditedCellValue(value: string | number | undefined, oldValue: unknown) {
  if (typeof oldValue === 'number') {
    const next = Number(value)
    return Number.isNaN(next) ? value : next
  }

  return value
}

export function formatCellValue(row: Record<string, unknown>, column: TableColumn) {
  const value = getCellValue(row, column)
  return column.formatter ? column.formatter(value, row) : String(value ?? '')
}
