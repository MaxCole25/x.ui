import type { TableColumn } from './types'
import { getCellValue } from './cellEditing'
export function getNumericSummaryValues(rows: Record<string, unknown>[], column: TableColumn) {
  return rows
    .map((row) => normalizeSummaryNumber(getCellValue(row, column)))
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
}

export function normalizeSummaryNumber(value: unknown) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const next = Number(value)
    return Number.isFinite(next) ? next : null
  }

  return null
}
