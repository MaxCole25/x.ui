<script setup lang="ts">
import Example1 from '../examples/tree-table/Example1.vue'
import Example1Source from '../examples/tree-table/Example1.vue?raw'
import Example2 from '../examples/tree-table/Example2.vue'
import Example2Source from '../examples/tree-table/Example2.vue?raw'
</script>
# 树表 TreeTable

`XTreeTable` 用于展示树形层级和多列字段，适合菜单、页面、权限、目录、分类等数据。首版聚焦展示、展开收起和独立行勾选。

## 使用示例

### 无表头菜单

`show-header="false"` 可以得到接近菜单配置页的紧凑树表。父级行左侧会显示展开按钮，点击后展开或收起子级。

<XDocDemo title="无表头菜单" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 显示表头

保留表头时，树形列仍由 `treeColumnKey` 控制。默认使用第一列作为树形列。

<XDocDemo title="显示表头" :code="Example2Source">
  <Example2 />
</XDocDemo>

### TreeTableColumn

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 数据字段名 | `string` | 必填 |
| label | 表头文本 | `string` | 必填 |
| width | 固定列宽，支持数字或 CSS 长度字符串 | `number \| string` | - |
| minWidth | 最小列宽，未设置 `width` 时参与自适应分配 | `number \| string` | - |
| align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| formatter | 单元格格式化函数 | `(value, row) => string` | - |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `data` | 树表数据 | `Row[]` | `—` | — |
| `rowKey` | 行唯一键字段 | `string` | `'id'` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `labelKey` | 树形列兜底文本字段 | `string` | `'label'` | — |
| `emptyText` | 空数据文案 | `string` | `'暂无数据'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showHeader` | 是否显示表头 | `boolean` | `true` | — |
| `showSelection` | 是否显示选择列 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `columns` | 列配置 | `TreeTableColumn<Row>[]` | `—` | — |
| `childrenKey` | 子级字段 | `string` | `'children'` | — |
| `treeColumnKey` | 承载缩进和展开按钮的列，不传时使用第一列 | `string` | `undefined` | — |
| `selectedRowKeys` | 选中行 key，支持 `v-model:selected-row-keys` | `TreeTableRowKey[]` | `undefined` | — |
| `expandedRowKeys` | 展开行 key，支持 `v-model:expanded-row-keys` | `TreeTableRowKey[]` | `undefined` | — |
| `defaultExpandedRowKeys` | 非受控模式下默认展开的行 key | `TreeTableRowKey[]` | `undefined` | — |
| `defaultExpandAll` | 非受控模式下是否默认展开全部 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:selectedRowKeys` | 选中行变化时触发 | `[value: string[]]` |
| `update:expandedRowKeys` | 展开行变化时触发 | `[value: string[]]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `selection-change` | 选中行变化时触发，包含选中 key 和行数据 | `[value: TreeTableSelectionChangePayload]` |
| `expand-change` | 单行展开或收起时触发 | `[value: TreeTableExpandChangePayload]` |
| `row-click` | 点击行时触发 | `[value: TreeTableRowClickPayload]` |

## 插槽

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `tree-cell` | 自定义树形列内容 | `TreeTableRowInfo` |
| `cell-${key}` | cell-${key} 插槽 | `row: TreeTableRowData; value: unknown; column: TreeTableColumn; rowIndex: number` |

## 实例方法

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `expandAll` | 展开全部有子级的行 | `() => void` |
| `collapseAll` | 收起全部行 | `() => void` |
| `toggleRow` | 切换指定行展开状态 | `(rowKey: TreeTableRowKey) => void` |
| `getExpandedRowKeys` | 获取当前展开行 key | `() => string[]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TreeTableAlign

```ts
export type TreeTableAlign = 'left' | 'center' | 'right'
```

### TreeTableRowKey

```ts
export type TreeTableRowKey = string | number
```

### TreeTableColumn

```ts
export interface TreeTableColumn<Row extends TreeTableRowData = TreeTableRowData> {
  key: string
  label: string
  width?: number | string
  minWidth?: number | string
  align?: TreeTableAlign
  formatter?: (value: unknown, row: Row) => string
}
```

### TreeTableRowData

```ts
export interface TreeTableRowData {
  id: TreeTableRowKey
  label?: string
  children?: TreeTableRowData[]
  [key: string]: unknown
}
```

### TreeTableRowInfo

```ts
export interface TreeTableRowInfo<Row extends TreeTableRowData = TreeTableRowData> {
  row: Row
  rowKey: string
  rowIndex: number
  depth: number
  expanded: boolean
  hasChildren: boolean
}
```

### TreeTableSelectionChangePayload

```ts
export interface TreeTableSelectionChangePayload<Row extends TreeTableRowData = TreeTableRowData> {
  keys: string[]
  rows: Row[]
}
```

### TreeTableExpandChangePayload

```ts
export interface TreeTableExpandChangePayload<Row extends TreeTableRowData = TreeTableRowData> {
  row: Row
  rowKey: string
  expanded: boolean
  expandedRowKeys: string[]
}
```

### TreeTableRowClickPayload

```ts
export interface TreeTableRowClickPayload<Row extends TreeTableRowData = TreeTableRowData> {
  row: Row
  rowKey: string
  rowIndex: number
  event: MouseEvent
}
```

### TreeTableProps

```ts
export interface TreeTableProps<Row extends TreeTableRowData = TreeTableRowData> {
  data: Row[]
  columns: TreeTableColumn<Row>[]
  rowKey?: string
  childrenKey?: string
  treeColumnKey?: string
  labelKey?: string
  fontSize?: number
  showHeader?: boolean
  showSelection?: boolean
  selectedRowKeys?: TreeTableRowKey[]
  expandedRowKeys?: TreeTableRowKey[]
  defaultExpandedRowKeys?: TreeTableRowKey[]
  defaultExpandAll?: boolean
  emptyText?: string
}
```

### TreeTableSlots

```ts
export interface TreeTableSlots<Row extends TreeTableRowData = TreeTableRowData> {
  'tree-cell'?: (props: TreeTableRowInfo<Row>) => unknown
  [key: `cell-${string}`]: ((props: { row: Row; value: unknown; column: TreeTableColumn<Row>; rowIndex: number }) => unknown) | undefined
}
```

### TreeTableExpose

```ts
export interface TreeTableExpose {
  expandAll: () => void
  collapseAll: () => void
  toggleRow: (rowKey: TreeTableRowKey) => void
  getExpandedRowKeys: () => string[]
}
```

## 验收说明

- 检查 `show-header="false"` 时是否呈现为无表头菜单风格。
- 点击父级展开按钮，确认子级行显示或隐藏。
- 勾选父级或子级行，确认只改变当前行勾选，不做父子联动。
- 外部修改 `expandedRowKeys` 时，确认展开状态同步变化。
- 使用较长名称和路径时，确认文本不会溢出表格。
