<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'label', label: '名称', minWidth: 180 },
  { key: 'path', label: '路径', minWidth: 220 }
]

const rows = [
  {
    id: 'sales',
    label: '销售',
    path: '/销售',
    children: [
      { id: 'sales-quote', label: '报价表', path: '/auto-pages/bao-jia-biao' },
      { id: 'sales-customer', label: '客户表', path: '/auto-pages/ke-hu-biao' },
      { id: 'sales-contract', label: '合同表', path: '/auto-pages/he-tong-biao' },
      { id: 'sales-product', label: '物品表', path: '/auto-pages/wu-pin-biao' }
    ]
  },
  { id: 'workbench', label: '工作台', path: '/workbench' },
  {
    id: 'task-center',
    label: '任务中心',
    path: '/task-center',
    children: [
      { id: 'task-settings', label: '任务设置', path: '/task-center/settings' },
      { id: 'my-tasks', label: '我的任务', path: '/task-center/tasks' }
    ]
  },
  {
    id: 'system',
    label: '用户权限',
    path: '/system/user-permission',
    children: [
      { id: 'users', label: '用户管理', path: '/system/user-permission/users' },
      { id: 'roles', label: '角色管理', path: '/system/user-permission/roles' }
    ]
  },
  {
    id: 'dev-settings',
    label: '开发设置',
    path: '/dev-settings',
    children: [
      { id: 'menu', label: '菜单管理', path: '/menu' },
      { id: 'tables', label: '数据表管理', path: '/data-management/tables' }
    ]
  }
]

const expandedRowKeys = ref<Array<string | number>>(['sales', 'task-center', 'system', 'dev-settings'])
const selectedRowKeys = ref<Array<string | number>>([])

const basicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'label', label: '名称', minWidth: 180 },
  { key: 'path', label: '路径', minWidth: 220 }
]

const rows = [
  {
    id: 'sales',
    label: '销售',
    path: '/销售',
    children: [
      { id: 'sales-quote', label: '报价表', path: '/auto-pages/bao-jia-biao' },
      { id: 'sales-customer', label: '客户表', path: '/auto-pages/ke-hu-biao' }
    ]
  },
  { id: 'workbench', label: '工作台', path: '/workbench' }
]

const expandedRowKeys = ref<Array<string | number>>(['sales'])
const selectedRowKeys = ref<Array<string | number>>([])
<\/script>

<XTreeTable
  v-model:expanded-row-keys="expandedRowKeys"
  v-model:selected-row-keys="selectedRowKeys"
  :data="rows"
  :columns="columns"
  show-selection
  :show-header="false"
/>`

const headerCode = `\x3Cscript setup lang="ts">
const columns = [
  { key: 'label', label: '名称', minWidth: 180 },
  { key: 'path', label: '路径', minWidth: 220 }
]

const rows = [
  {
    id: 'system',
    label: '用户权限',
    path: '/system/user-permission',
    children: [
      { id: 'users', label: '用户管理', path: '/system/user-permission/users' },
      { id: 'roles', label: '角色管理', path: '/system/user-permission/roles' }
    ]
  }
]
<\/script>

<XTreeTable :data="rows" :columns="columns" default-expand-all />`
</script>

# 树表 TreeTable

`XTreeTable` 用于展示树形层级和多列字段，适合菜单、页面、权限、目录、分类等数据。首版聚焦展示、展开收起和独立行勾选。

## 无表头菜单

`show-header="false"` 可以得到接近菜单配置页的紧凑树表。父级行左侧会显示展开按钮，点击后展开或收起子级。

<XDocDemo title="无表头菜单" :code="basicCode">
  <ClientOnly>
    <XTreeTable
      v-model:expanded-row-keys="expandedRowKeys"
      v-model:selected-row-keys="selectedRowKeys"
      :data="rows"
      :columns="columns"
      show-selection
      :show-header="false"
    />
  </ClientOnly>
</XDocDemo>

## 显示表头

保留表头时，树形列仍由 `treeColumnKey` 控制。默认使用第一列作为树形列。

<XDocDemo title="显示表头" :code="headerCode">
  <ClientOnly>
    <XTreeTable :data="rows" :columns="columns" default-expand-all />
  </ClientOnly>
</XDocDemo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树表数据 | `TreeTableRowData[]` | 必填 |
| columns | 列配置 | `TreeTableColumn[]` | 必填 |
| rowKey | 行唯一键字段 | `string` | `'id'` |
| childrenKey | 子级字段 | `string` | `'children'` |
| treeColumnKey | 承载缩进和展开按钮的列，不传时使用第一列 | `string` | 第一列 key |
| labelKey | 树形列兜底文本字段 | `string` | `'label'` |
| size | 尺寸规格 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| showSelection | 是否显示选择列 | `boolean` | `false` |
| selectedRowKeys | 选中行 key，支持 `v-model:selected-row-keys` | `Array<string \| number>` | - |
| expandedRowKeys | 展开行 key，支持 `v-model:expanded-row-keys` | `Array<string \| number>` | - |
| defaultExpandedRowKeys | 非受控模式下默认展开的行 key | `Array<string \| number>` | - |
| defaultExpandAll | 非受控模式下是否默认展开全部 | `boolean` | `false` |
| emptyText | 空数据文案 | `string` | `'暂无数据'` |

## TreeTableColumn

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 数据字段名 | `string` | 必填 |
| label | 表头文本 | `string` | 必填 |
| width | 固定列宽，支持数字或 CSS 长度字符串 | `number \| string` | - |
| minWidth | 最小列宽，未设置 `width` 时参与自适应分配 | `number \| string` | - |
| align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| formatter | 单元格格式化函数 | `(value, row) => string` | - |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:selectedRowKeys | 选中行变化时触发 | `string[]` |
| selection-change | 选中行变化时触发，包含选中 key 和行数据 | `{ keys, rows }` |
| update:expandedRowKeys | 展开行变化时触发 | `string[]` |
| expand-change | 单行展开或收起时触发 | `{ row, rowKey, expanded, expandedRowKeys }` |
| row-click | 点击行时触发 | `{ row, rowKey, rowIndex, event }` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| tree-cell | 自定义树形列内容 | `{ row, rowKey, rowIndex, depth, expanded, hasChildren }` |
| cell-[key] | 自定义普通列单元格 | `{ row, value, column, rowIndex }` |

## Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| expandAll | 展开全部有子级的行 | `() => void` |
| collapseAll | 收起全部行 | `() => void` |
| toggleRow | 切换指定行展开状态 | `(rowKey) => void` |
| getExpandedRowKeys | 获取当前展开行 key | `() => string[]` |

## 手动验收建议

- 检查 `show-header="false"` 时是否呈现为无表头菜单风格。
- 点击父级展开按钮，确认子级行显示或隐藏。
- 勾选父级或子级行，确认只改变当前行勾选，不做父子联动。
- 外部修改 `expandedRowKeys` 时，确认展开状态同步变化。
- 使用较长名称和路径时，确认文本不会溢出表格。
