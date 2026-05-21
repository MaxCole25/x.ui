import type { TableSorter } from 'x.ui'

export type BaseXTableServerSortOrder = 'asc' | 'desc'

export interface BaseXTableServerSortPayload {
  sorter: TableSorter
  normalizedSorter: TableSorter | null
  sortField: string | null
  sortOrder: BaseXTableServerSortOrder | null
  query: {
    sortField?: string
    sortOrder?: BaseXTableServerSortOrder
  }
}

export function createBaseXTableServerSortPayload(sorter: TableSorter): BaseXTableServerSortPayload {
  const normalizedSorter = sorter.order === 'ascending' || sorter.order === 'descending'
    ? {
        key: sorter.key,
        order: sorter.order,
      }
    : null
  const sortField = normalizedSorter?.key ?? null
  const sortOrder = normalizedSorter?.order === 'ascending'
    ? 'asc'
    : normalizedSorter?.order === 'descending'
      ? 'desc'
      : null

  return {
    sorter,
    normalizedSorter,
    sortField,
    sortOrder,
    query: sortField && sortOrder
      ? {
          sortField,
          sortOrder,
        }
      : {},
  }
}
