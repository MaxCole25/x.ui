# 表格 Table

`XTable` 是从 NexMod `XlTable` 迁移出来的独立数据表格组件，基于 Element Plus 表格能力封装，适合业务列表、配置表、日志表和可排序数据集。

组件同时导出兼容别名 `XlTable`、`XlTableColumn`，方便从 NexMod 旧写法迁移。

## 基础用法

```vue
<script setup lang="ts">
import { XTable, type TableColumn } from 'x.ui'

const columns: TableColumn[] = [
  { key: 'name', label: '名称', minWidth: 160, searchable: true },
  { key: 'status', label: '状态', width: 120, type: 'tag', options: [
    { label: '启用', value: true, type: 'success' },
    { label: '停用', value: false, type: 'danger' }
  ]},
  { key: 'updatedAt', label: '更新时间', minWidth: 180, type: 'date' }
]

const rows = [
  { id: 1, name: '工作台', status: true, updatedAt: '2026-04-10T09:30:00Z' },
  { id: 2, name: '成员管理', status: false, updatedAt: '2026-04-09T13:10:00Z' }
]
</script>

<template>
  <XTable title="模块列表" :columns="columns" :data="rows" row-key="id" />
</template>
```

## 自定义单元格和操作列

```vue
<XTable :columns="columns" :data="rows" show-actions @refresh="loadRows">
  <template #cell-name="{ row }">
    <strong>{{ row.name }}</strong>
  </template>

  <template #row-actions="{ row }">
    <button @click="edit(row)">编辑</button>
  </template>
</XTable>
```

## 可编辑表格和脏数据提交

开启 `editable` 后，`columns` 中 `editorType` 为 `input`、`select`、`dropdown`、`boolean`、`date`、`datetime` 的列会渲染为可编辑控件。编辑、粘贴或下拉选择后，组件会先更新内部草稿数据，并用脏数据标记记录变更；点击“提交修改”时通过 `submit-changes` 一次性抛出所有变更。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XTable, type TableColumn } from 'x.ui'

const users = [
  { id: 1, name: '林舟', team: '平台组' },
  { id: 2, name: '周宁', team: '体验组' }
]

const rows = ref([
  { id: 1, name: '工作台', priority: 'P0', ownerId: 1, enabled: true }
])

const columns: TableColumn[] = [
  { key: 'name', label: '名称', displayType: 'text', editorType: 'input', editable: true },
  {
    key: 'priority',
    label: '优先级',
    displayType: 'text',
    editorType: 'select',
    editable: true,
    options: [
      { label: 'P0', value: 'P0', type: 'danger' },
      { label: 'P1', value: 'P1', type: 'warning' }
    ]
  },
  {
    key: 'ownerId',
    label: '负责人',
    displayType: 'text',
    editorType: 'dropdown',
    editable: true,
    valueKey: 'id',
    labelKey: 'name',
    dialogTitle: '选择负责人',
    dialogColumns: [
      { key: 'name', label: '姓名' },
      { key: 'team', label: '团队' }
    ],
    dialogData: users
  },
  { key: 'enabled', label: '启用', displayType: 'boolean', editorType: 'boolean', editable: true }
]

function save(payload) {
  // payload.changes 是脏数据明细，payload.rows 是最新草稿数据
  console.log(payload)
}
</script>

<template>
  <XTable
    v-model:data="rows"
    editable
    fill-height
    :columns="columns"
    row-key="id"
    @submit-changes="save"
  />
</template>
```

表格支持单元格复制、粘贴与多单元格范围操作。单击单元格或 `el-table__cell` 单元格留白区域只会激活和选中；在单元格按下鼠标左键并拖过其它单元格，可以框选范围；右键菜单提供“复制”“粘贴”“向上插入一行”“向下插入一行”。开启 `editable` 后，可编辑单元格需要双击才进入编辑状态；可以从 Excel 或其它表格复制多行多列文本，再粘贴到当前激活单元格，组件会按可编辑列顺序写入草稿数据。复制单个值后，也可以框选多个可编辑单元格并一次性粘贴填充。

工具栏内置 `导出CSV`、`导出Excel`、`导入Excel` 按钮，可直接进行表格文件交换。

## 列设置状态

列设置弹窗支持列显隐、拖拽排序、固定到左侧或右侧、按比例分配列宽，以及直接指定 `px` 宽度。`宽度px` 优先级最高；只要任意列填写了 `列宽比例`，未填写 `宽度px` 的列都会参与剩余宽度分配，其中未填写比例的列按 `1` 份自动均分。

需要把列设置保存到后端时，可以通过组件实例方法读取当前状态，再在下次进入页面时回填：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XTable, type TableExpose, type TableColumnSetting } from 'x.ui'

const tableRef = ref<TableExpose>()

async function saveColumnState() {
  const columnSettings = tableRef.value?.getColumnSettings() ?? []
  await saveToServer(columnSettings)
}

function restoreColumnState(columnSettings: TableColumnSetting[]) {
  tableRef.value?.setColumnSettings(columnSettings)
}
</script>

<template>
  <XTable ref="tableRef" :columns="columns" :data="rows" storage-key="module-table" />
  <button @click="saveColumnState">保存列设置</button>
</template>
```

## 填充父容器

`fillHeight` 会让表格撑满父元素。父元素需要有明确高度；当内容超过表格可视区时，滚动条出现在表格内部；内容不足时，表格内部保留留白。

```vue
<div style="height: 520px">
  <XTable fill-height :columns="columns" :data="rows" />
</div>
```

没有数据时，可通过 `empty-image` 自定义空态图片：

```vue
<XTable
  :columns="columns"
  :data="[]"
  empty-text="没有匹配的数据"
  empty-image="/empty-table.svg"
/>
```

未传 `empty-image` 时，默认使用内置的 `x.ui` 空态图标。

## 服务端分页与排序

当数据量很大（例如合同查询）时，建议启用服务端分页/排序，避免一次性全量请求到前端：

```vue
<script setup lang="ts">
function handleQueryChange(payload) {
  // payload: { page, pageSize, keyword, sorter }
  // 在这里调用后端接口，并把响应数据回填给 data + total
}
</script>

<template>
  <XTable
    remote
    :total="total"
    :columns="columns"
    :data="rows"
    @query-change="handleQueryChange"
  />
</template>
```

`remote=true` 时，组件不再对前端全量数据做本地分页；分页、排序、搜索条件会通过 `query-change` 抛出，由业务侧请求后端并回填。

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表格标题 | `string` | `''` |
| data | 表格数据 | `Record<string, unknown>[]` | 必填 |
| columns | 列配置 | `TableColumn[]` | 必填 |
| rowKey | 行唯一键字段 | `string` | `'id'` |
| loading | 是否加载中 | `boolean` | `false` |
| searchable | 是否显示搜索框 | `boolean` | `true` |
| selectable | 是否显示多选列 | `boolean` | `true` |
| showIndex | 是否显示序号列 | `boolean` | `true` |
| pageSize | 默认每页条数 | `number` | `10` |
| pageSizes | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showToolbar | 是否显示顶部工具栏 | `boolean` | `true` |
| showMetrics | 是否显示统计信息 | `boolean` | `true` |
| showPagination | 是否显示分页 | `boolean` | `true` |
| showActions | 是否显示操作列 | `boolean` | `false` |
| actionsMinWidth | 操作列最小宽度 | `number \| string` | `180` |
| emptyText | 空数据文案 | `string` | `'暂无数据'` |
| emptyImage | 空数据图片地址 | `string` | `''` |
| editable | 是否启用内置编辑能力 | `boolean` | `false` |
| showDirtyActions | 是否显示提交、标记已保存、撤销修改按钮 | `boolean` | `true` |
| storageKey | 本地存储 key，用于保存搜索、分页、列显隐、排序、固定列和列宽设置 | `string` | `''` |
| draggableRows | 是否允许行拖拽排序 | `boolean` | `true` |
| draggableColumns | 是否允许列设置中拖拽排序 | `boolean` | `true` |
| fillHeight | 是否填满父容器高度 | `boolean` | `false` |
| zebraStripeColor | 斑马纹行颜色 | `string` | `'#f8fbff'` |
| showHeaderVerticalDivider | 表头是否显示竖向分隔线 | `boolean` | `true` |
| showBodyVerticalDivider | 内容区是否显示竖向分隔线 | `boolean` | `true` |
| density | 表格密度，`large` 为宽松，`default` 为标准，`small` 为紧凑，支持 `v-model:density` | `'large' \| 'default' \| 'small'` | `'default'` |
| rowHeight | 表格行高（px） | `number` | `40` |
| activeCellBorderColor | 激活单元格边框颜色 | `string` | `'var(--x-color-primary, #0e7490)'` |
| activeCellBorderWidth | 激活单元格边框宽度 | `number \| string` | `2` |
| selectedCellBackgroundColor | 框选单元格背景色 | `string` | `'rgb(191 219 254 / 72%)'` |
| selectedCellBorderColor | 框选区域外框颜色 | `string` | `'#2680eb'` |
| selectedCellInnerBorderColor | 框选区域内部单元格分隔线颜色 | `string` | `'rgb(96 165 250 / 42%)'` |
| selectionMode | 鼠标框选模式，`cell` 为单元格选择，`row` 为整行选择 | `'cell' \| 'row'` | `'cell'` |
| headerAlign | 全局列头对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| remote | 是否启用服务端分页/排序模式 | `boolean` | `false` |
| total | 服务端分页总条数（`remote=true` 时生效） | `number` | `0` |

## TableColumn

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 数据字段名 | `string` |
| label | 列标题 | `string` |
| width | 固定宽度 | `number \| string` |
| minWidth | 最小宽度 | `number \| string` |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` |
| headerAlign | 当前列表头对齐方式（优先级高于全局 `headerAlign`） | `'left' \| 'center' \| 'right'` |
| fixed | 固定列 | `true \| 'left' \| 'right'` |
| sortable | 是否排序 | `boolean \| 'custom'` |
| searchable | 是否参与关键字搜索 | `boolean` |
| type | 兼容类型（历史字段，建议迁移到 `displayType/editorType`） | `TableColumnType` |
| displayType | 显示类型 | `'text' \| 'tag' \| 'boolean' \| 'date'` |
| editorType | 编辑类型 | `'none' \| 'input' \| 'select' \| 'dropdown' \| 'boolean' \| 'date' \| 'datetime'` |
| editable | 当前列是否可编辑 | `boolean` |
| placeholder | 输入类控件占位文案 | `string` |
| formatter | 自定义格式化 | `(value, row) => string` |
| options | `tag` 类型映射配置 | `TableColumnOption[]` |
| valueKey | `dropdown` 取值字段 | `string` |
| labelKey | `dropdown` 显示字段 | `string` |
| dialogTitle | `dropdown` 下拉面板标题配置（兼容字段） | `string` |
| dialogColumns | `dropdown` 下拉表格列配置 | `TableColumn[]` |
| dialogData | `dropdown` 下拉表格数据 | `Record<string, unknown>[]` |

## Methods

通过模板引用访问组件实例：

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| getColumnSettings | 获取当前列显隐、排序、固定列、列宽比例和 px 宽度设置，适合保存到后端 | `() => TableColumnSetting[]` |
| setColumnSettings | 回填列设置状态 | `(settings: TableColumnSetting[]) => void` |
| resetColumnSettings | 重置列显隐、排序、固定列和列宽设置 | `() => void` |
| getStoredState | 获取当前完整表格状态，包含搜索、分页、密度、列设置和行顺序 | `() => TableStoredState` |
| setStoredState | 回填完整表格状态 | `(state: Partial<TableStoredState>) => void` |

`TableColumnSetting` 字段：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 列字段名 | `string` |
| visible | 是否显示 | `boolean` |
| order | 当前列顺序，从 `0` 开始 | `number` |
| fixed | 固定列方向，未设置表示不固定 | `true \| 'left' \| 'right'` |
| widthRatio | 列宽比例，空值时忽略 | `number` |
| width | 固定宽度 px，空值时忽略；优先级高于 `widthRatio` | `number` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| refresh | 点击刷新按钮 | `()` |
| selection-change | 多选变化 | `(rows) => void` |
| row-order-change | 行拖拽排序变化 | `(rowKeys) => void` |
| column-order-change | 列拖拽排序变化 | `(columnKeys) => void` |
| cell-change | 单元格编辑变化 | `(change) => void` |
| dirty-change | 脏数据变化 | `(changes) => void` |
| submit-changes | 点击统一提交修改 | `({ changes, rows }) => void` |
| update:data | 草稿数据变化，支持 `v-model:data` | `(rows) => void` |
| update:density | 表格密度变化，支持 `v-model:density` | `(value) => void` |
| query-change | 远程分页/排序/搜索参数变化 | `({ page, pageSize, keyword, sorter }) => void` |
| import-success | Excel 导入并映射完成 | `(rows) => void` |
| row-dblclick | 双击非可编辑单元格区域时触发 | `({ row, rowKey, event }) => void` |

同时保留兼容事件名：`selectionChange`、`rowOrderChange`、`columnOrderChange`、`rowDblclick`。

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| toolbar-left-extra | 标题和统计信息右侧扩展 | - |
| toolbar-right-prefix | 工具栏右侧最前方扩展 | - |
| toolbar-extra | 搜索框前扩展操作 | - |
| cell-[key] | 指定列单元格自定义渲染 | `{ row, value }` |
| row-actions | 操作列内容 | `{ row }` |

## 手动验收建议

- 输入关键字，确认当前表格数据被过滤且分页回到第一页。
- 打开列设置，确认列显隐、拖拽排序、固定列、列宽比例和宽度 px 设置生效。
- 拖拽行排序，确认触发 `row-order-change`。
- 勾选多选列，确认选择统计和 `selection-change` 生效。
- 检查 `tag`、`boolean`、`date`、自定义单元格和操作列显示是否正确。
- 开启 `editable`，分别检查输入框、下拉框、开关、日期、日期时间和 `dropdown` 选择列。
- 确认可编辑单元格单击只选中、双击才进入编辑；双击非可编辑单元格会触发 `row-dblclick`。
- 检查激活单元格边框泛光、编辑控件无外框样式是否符合预期。
- 检查 `zebraStripeColor`、列头对齐、行高、竖向分隔线开关是否生效。
- 导入 `.xlsx` 后确认字段映射正确，再导出 CSV/Excel 校验内容。
- 开启 `remote`，确认分页/排序/搜索时触发 `query-change`，由后端返回全量分页正确排序结果。
- 从 Excel 复制多行多列文本粘贴到表格，确认脏数据数量和 `submit-changes` 正确。
- 按住鼠标左键框选多个单元格，确认选区背景不受斑马纹影响，外框和内部边框颜色有区分。
- 拖拽选区右下角手柄，确认可以扩大或缩小当前选区。
- 将 `selectionMode` 切换为 `row`，确认单击或拖拽会按整行选择。
- 右键检查复制、粘贴、向上插入一行、向下插入一行功能。
- 在固定高度父容器中开启 `fillHeight`，确认表格内部滚动和空态图片正常。

