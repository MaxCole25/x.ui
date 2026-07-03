import type { XSize } from '../../../_utils/size'

export type TreeTableAlign = 'left' | 'center' | 'right'
export type TreeTableRowKey = string | number

export interface TreeTableColumn<Row extends TreeTableRowData = TreeTableRowData> {
  key: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: TreeTableAlign
  formatter?: (value: unknown, row: Row) => string
}

export interface TreeTableRowData {
  id: TreeTableRowKey
  label?: string
  children?: TreeTableRowData[]
  [key: string]: unknown
}

export interface TreeTableRowInfo<Row extends TreeTableRowData = TreeTableRowData> {
  row: Row
  rowKey: string
  rowIndex: number
  depth: number
  expanded: boolean
  hasChildren: boolean
}

export interface TreeTableSelectionChangePayload<Row extends TreeTableRowData = TreeTableRowData> {
  keys: string[]
  rows: Row[]
}

export interface TreeTableExpandChangePayload<Row extends TreeTableRowData = TreeTableRowData> {
  row: Row
  rowKey: string
  expanded: boolean
  expandedRowKeys: string[]
}

export interface TreeTableRowClickPayload<Row extends TreeTableRowData = TreeTableRowData> {
  row: Row
  rowKey: string
  rowIndex: number
  event: MouseEvent
}

export interface TreeTableProps<Row extends TreeTableRowData = TreeTableRowData> {
  data: Row[]
  columns: TreeTableColumn<Row>[]
  rowKey?: string
  childrenKey?: string
  treeColumnKey?: string
  labelKey?: string
  size?: XSize
  showHeader?: boolean
  showSelection?: boolean
  selectedRowKeys?: TreeTableRowKey[]
  expandedRowKeys?: TreeTableRowKey[]
  defaultExpandedRowKeys?: TreeTableRowKey[]
  defaultExpandAll?: boolean
  emptyText?: string
}

export interface TreeTableSlots<Row extends TreeTableRowData = TreeTableRowData> {
  'tree-cell'?: (props: TreeTableRowInfo<Row>) => unknown
  [key: `cell-${string}`]: ((props: { row: Row; value: unknown; column: TreeTableColumn<Row>; rowIndex: number }) => unknown) | undefined
}

export interface TreeTableExpose {
  expandAll: () => void
  collapseAll: () => void
  toggleRow: (rowKey: TreeTableRowKey) => void
  getExpandedRowKeys: () => string[]
}
