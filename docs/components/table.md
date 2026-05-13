# 表格 Table

`XTable` 是一个从简单展示重新开始的表格组件。当前版本只负责数据渲染、基础列样式和插槽扩展；分页、搜索、列设置、编辑、拖拽、导入导出等复杂能力会在后续逐步加回。

组件主体使用 `div + CSS grid` 实现，方便后续扩展固定列、虚拟滚动和单元格编辑。

组件同时导出兼容别名 `XlTable`、`XlTableColumn`、`XlTableProps`。

## 基础用法

```vue
<script setup lang="ts">
import { XTable, type TableColumn } from 'x.ui'

const columns: TableColumn[] = [
  { key: 'name', label: '名称', minWidth: 160 },
  { key: 'status', label: '状态', width: 120 },
  { key: 'count', label: '数量', width: 100, align: 'right', formatter: (value) => `${value} 个` }
]

const rows = [
  { id: 1, name: '工作台', status: '启用', count: 12 },
  { id: 2, name: '成员管理', status: '停用', count: 5 }
]
</script>

<template>
  <XTable :columns="columns" :data="rows" row-key="id" />
</template>
```

## 自定义表顶和表底

`top` 和 `bottom` 插槽会完整接管表格上方、下方区域。`top` 插槽参数包含当前 `columns`、`data`、`columnSettings` 和列设置更新方法，适合放置列设置按钮，并在业务侧用 `XDialog` 承载具体设置表单。

```vue
<XTable :columns="columns" :data="rows">
  <template #top="{ columns, data }">
    <div class="table-header">
      <strong>模块列表</strong>
      <span>列 {{ columns.length }} / 行 {{ data.length }}</span>
      <button @click="settingsVisible = true">列设置</button>
    </div>
  </template>

  <template #bottom="{ data }">
    <div class="table-footer">
      <span class="table-footer__total">共 {{ data.length }} 条记录</span>
    </div>
  </template>
</XTable>
```

## 列设置

通过 `column-settings` 可以控制列排序、冻结、默认对齐、比例宽度和固定像素宽度。也可以在 `top` 插槽中使用 `columnSettings`、`updateColumnSetting`、`moveColumnSetting`、`reorderColumnSetting`、`resetColumnSettings` 构建自定义列设置入口，例如表顶只放一个“列设置”按钮，点击后用 `XDialog` 打开配置弹窗；弹窗内可以参考 Histoire 示例，用列名或拖拽手柄把列拖到目标列的上方或下方完成排序。

```vue
<XTable
  :columns="columns"
  :data="rows"
  :column-settings="[
    { key: 'name', order: 0, fixed: 'left', align: 'left', width: 220 },
    { key: 'status', order: 1, fixed: 'none', align: 'center', widthRatio: 25 },
    { key: 'count', order: 2, fixed: 'right', align: 'right', width: 120 }
  ]"
/>
```

`width` 优先级高于 `widthRatio`。多个 px 宽度列相加超过表格可视宽度时，表格正文会出现横向滚动条；`widthRatio` 使用百分比，按表格可视宽度分配。

## 自定义单元格和操作列

通过 `cell-[key]` 覆盖某一列的单元格内容。开启 `show-actions` 后，可以使用 `row-actions` 插槽渲染操作列。

```vue
<XTable :columns="columns" :data="rows" show-actions :actions-width="180">
  <template #cell-name="{ value }">
    <strong>{{ value }}</strong>
  </template>

  <template #row-actions="{ row }">
    <button @click="view(row)">查看</button>
  </template>
</XTable>
```

## 选择列和行拖拽排序

开启 `show-selection` 后，表格进入可选择状态。`selection-mode="row"` 时点击当前行任意位置会选中或取消选中该行，通过 `v-model:selected-row-keys` 维护当前选中的行键；同时可以用 `show-selection-column` 控制是否显示左侧选择行列，显示时选中行会自动打勾。开启 `editable` 后，普通单元格点击需要留给编辑交互，整行点击选中会失效，用户只能通过左侧选择列勾选行；双击数据单元格会进入内联编辑，内部使用 `XBaseInput`，失焦、回车或 change 后通过 `update:data` 和 `cell-change` 抛出结果。`selection-mode="cell"` 时普通点击数据单元格只会在当前单元格上显示激活框，通过 `v-model:selected-cell-keys` 维护当前激活的单元格 key；选中一个单元格后按 Tab 会让选区右移一列，当前行最后一列会跳到下一行第一列，按 Shift+Tab 会左移一列，当前行第一列会跳到上一行最后一列；按 Enter 会让选区移动到当前列下一行，当前列最后一行会跳到下一列第一行；选中一个单元格后直接输入普通字符，也会进入编辑态并用输入的字符作为新内容；按住 Ctrl 或 Command 点击时可以保留多个单元格激活态；按下并拖过其它单元格时会形成矩形框选区域，选区右下角的方形手柄可以再次拖拽调整选区大小。选择行列和单元格选择互不冲突，单元格选择模式下仍可通过左侧选择列勾选行。

开启 `row-draggable` 后，数据行左侧会显示拖拽手柄。只有从拖拽列开始拖动时才会触发行排序，避免影响后续单元格框选能力。拖拽完成时组件触发 `row-reorder`，业务侧需要用事件中的 `rows` 更新数据源顺序。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XTable, type TableRowKey, type TableRowReorderPayload } from 'x.ui'

const selectedRowKeys = ref<TableRowKey[]>([])
const rows = ref([
  { id: 1, name: '工作台' },
  { id: 2, name: '成员管理' }
])

function handleRowReorder(payload: TableRowReorderPayload) {
  rows.value = payload.rows
}
</script>

<template>
  <XTable
    v-model:selected-row-keys="selectedRowKeys"
    :columns="columns"
    :data="rows"
    show-selection
    selection-mode="row"
    row-draggable
    @row-reorder="handleRowReorder"
  />
</template>
```

## 撑满父元素

父容器有明确高度时，可以开启 `fill-height`，让表格高度撑满父元素，表头、表底保持固定，数据区域在内部滚动。

```vue
<div style="height: 520px">
  <XTable :columns="columns" :data="rows" fill-height />
</div>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | `Record<string, unknown>[]` | 必填 |
| columns | 列配置 | `TableColumn[]` | 必填 |
| columnSettings | 列设置，支持排序、冻结、对齐和宽度 | `TableColumnSetting[]` | - |
| selectedRowKeys | 选中行的 key，支持 `v-model:selected-row-keys` | `TableRowKey[]` | - |
| selectedCellKeys | 选中单元格的 key，支持 `v-model:selected-cell-keys` | `string[]` | - |
| selectionMode | 选择模式，行选或单元格选择 | `'row' \| 'cell'` | `'row'` |
| rowKey | 行唯一键字段 | `string` | `'id'` |
| emptyText | 空数据文案 | `string` | `'暂无数据'` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| showActions | 是否显示操作列 | `boolean` | `false` |
| showSelection | 表格是否可选 | `boolean` | `false` |
| showSelectionColumn | 是否显示左侧选择行列，可和单元格选择同时使用 | `boolean` | `true` |
| editable | 表格是否可编辑，开启后行选模式下点击普通单元格不再选中行 | `boolean` | `false` |
| rowDraggable | 是否开启行拖拽排序 | `boolean` | `false` |
| actionsWidth | 操作列宽度 | `number \| string` | `160` |
| fillHeight | 是否撑满父元素高度 | `boolean` | `false` |

## TableColumn

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 数据字段名 | `string` | 必填 |
| label | 表头文本 | `string` | 必填 |
| width | 固定列宽，数字会转为 px | `number \| string` | - |
| minWidth | 最小列宽，未设置 `width` 时参与自适应分配 | `number \| string` | - |
| align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| formatter | 单元格格式化函数 | `(value, row) => string` | - |

## TableColumnSetting

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应列字段名 | `string` | 必填 |
| order | 列排序序号，从小到大排列 | `number` | 列原始顺序 |
| fixed | 列冻结方向 | `'left' \| 'none' \| 'right'` | `'none'` |
| align | 单元格默认内容对齐方式 | `'left' \| 'center' \| 'right'` | 当前列 `align` 或 `'left'` |
| widthRatio | 列宽比例，按表格可视宽度百分比分配 | `number` | - |
| width | 固定列宽 px，优先级高于 `widthRatio` | `number` | - |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:columnSettings | 列设置变化时触发 | `TableColumnSetting[]` |
| column-settings-change | 列设置变化时触发 | `TableColumnSetting[]` |
| update:selectedRowKeys | 选中行变化时触发 | `string[]` |
| selection-change | 选中行变化时触发，包含选中 key 和行数据 | `{ keys, rows }` |
| update:selectedCellKeys | 选中单元格变化时触发 | `string[]` |
| cell-selection-change | 选中单元格变化时触发，包含选中 key 和单元格数据 | `{ keys, cells }` |
| update:data | 单元格编辑提交后触发，支持 `v-model:data` | `Record<string, unknown>[]` |
| cell-change | 单元格编辑提交后触发，包含当前行、全量行、列和值变化 | `TableCellChangePayload` |
| row-reorder | 行拖拽排序完成时触发，业务侧应使用 `rows` 更新数据源 | `TableRowReorderPayload` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| top | 自定义表顶区域，可用于列设置 | `{ columns, data, columnSettings, selectedRowKeys, selectedCellKeys, updateColumnSetting, moveColumnSetting, reorderColumnSetting, resetColumnSettings }` |
| bottom | 自定义表底区域 | `{ columns, data, columnSettings, selectedRowKeys, selectedCellKeys, updateColumnSetting, moveColumnSetting, reorderColumnSetting, resetColumnSettings }` |
| cell-[key] | 自定义指定列单元格 | `{ row, value, column, rowIndex }` |
| row-actions | 自定义操作列内容，需要 `showActions` | `{ row, rowIndex }` |

## 手动验收建议

- 检查基础表头、数据行和空态是否正常显示。
- 检查 `width`、`minWidth`、`align` 和 `formatter` 是否生效。
- 检查 `top`、`bottom`、`cell-[key]`、`row-actions` 插槽是否能正常渲染。
- 开启 `show-selection` 后，检查行选、单元格点击选择、Tab / Shift+Tab 横向移动选区、Ctrl/Command 多选、拖拽框选、手柄调整选区、选择行列勾选和已选数量是否正确；再开启 `editable`，确认普通单元格点击不会切换行选，只能通过选择列勾选行，双击单元格或选中单元格后直接输入字符都可以进入编辑并提交新值。
- 开启 `row-draggable` 后，从拖拽列拖拽数据行，检查拖拽高亮和排序结果是否正确；从普通单元格开始拖动不应触发行排序。
- 点击表顶“列设置”按钮，在 `XDialog` 弹窗中检查列名拖拽排序、左/右冻结、对齐、比例宽度和 px 宽度是否生效。
- 在窄容器中检查横向滚动和文本截断效果。
- 开启 `fill-height` 后，检查父容器高度变化时表格是否撑满，数据区域是否在内部滚动。
