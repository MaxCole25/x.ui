// 模板表达式不能完整保留作用域类型；这里记录公开的作用域契约。
export const slotContracts = {
  XFlow: { default: 'item: unknown; index: number' },
  XCollapse: { title: 'item: CollapseItem; index: number', item: 'item: CollapseItem; index: number' },
  XDescriptions: { item: 'item: DescriptionItem; index: number' },
  XTable: {
    'header-${key}': 'column: TableColumn',
    'editor-${key}': 'row: TableRowData; value: unknown; modelValue: unknown; column: TableColumn; rowIndex: number; updateModelValue: (value: unknown) => void; commit: () => void; commitValue: (value: unknown) => void; cancel: () => void',
    'cell-${key}': 'row: TableRowData; value: unknown; column: TableColumn; rowIndex: number',
    'row-actions': 'row: TableRowData; rowIndex: number',
    'summary-${key}': 'value: unknown; column: TableColumn; rows: TableRowData[]; context: TableSummaryContext'
  },
  XTree: { nodeExtra: 'node: TreeNodeData' },
  XTreeTable: { 'tree-cell': 'TreeTableRowInfo', 'cell-${key}': 'row: TreeTableRowData; value: unknown; column: TreeTableColumn; rowIndex: number' },
  XFloatButtonGroup: { item: 'item: FloatButtonGroupItem', trigger: 'expanded: boolean' },
  XTabs: { label: 'item: TabItem; active: boolean; locked: boolean', pane: 'item: TabItem', 'pane-${name}': 'item: TabItem' },
  XTools: { item: 'item: ToolsItem; disabled: boolean', icon: 'item: ToolsItem', 'dropdown-item': 'item: ToolsItem; menuItem: ToolsMenuItem' },
  XUserStatus: { menu: 'items: UserStatusMenuItem[]; fontSize: number | undefined' },
  XTableColumnSettings: { trigger: 'open: () => void; disabled: boolean; visible: boolean' }
}
