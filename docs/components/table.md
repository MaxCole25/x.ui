<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])

const columnSettings = ref([])

const selectedCellKeys = ref([])

const selectedRowKeys = ref([])

const tableBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable :columns="columns" :data="rows" row-key="id" />`

const tableSlotsCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable
      :columns="columns"
      :data="rows"
      show-column-settings
      :column-settings-dialog="false"
    />`

const tableThemeCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<div data-theme="dark" style="padding: 12px; background: #020617; border-radius: 6px">
      <XTable :columns="columns" :data="rows" show-pagination :page-size="2" />
    </div>`

const tableBrandCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable
      :columns="columns"
      :data="rows"
      panel-background-color="#111827"
      header-background-color="#172033"
      header-text-color="#dbeafe"
      body-background-color="#0b1220"
      body-stripe-background-color="#10192c"
      body-text-color="#e5e7eb"
      border-color="#334155"
      viewport-border-color="#64748b"
      header-divider-color="#38bdf8"
      row-border-color="#1d4ed8"
      column-border-color="#7c3aed"
    />`

const tablePaginationCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable
      :columns="columns"
      :data="rows"
      show-pagination
      :page-size="2"
      :page-sizes="[2, 4, 8]"
    />`

const tableServerPaginationCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable
      :columns="columns"
      :data="rows"
      :total="40"
      show-pagination
      pagination-mode="server"
      :page-size="10"
    />`

const tableColumnSettingsCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])

const columnSettings = ref([])
<\/script>

<XTable
      :columns="columns"
      :data="rows"
      show-column-settings
      :column-settings="columnSettings"
      :column-settings-dialog="false"
    />`

const tableCellCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable :columns="columns" :data="rows" show-actions actions-fixed :actions-width="120" />`

const tableSelectionCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectedCellKeys = ref([])

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable
      v-model:selected-cell-keys="selectedCellKeys"
      :columns="columns"
      :data="rows"
      show-selection
      selection-mode="cell"
      selected-cell-background-color="rgba(59, 130, 246, 0.22)"
      selected-cell-border-color="#60a5fa"
    />`

const tableRowDragCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectedRowKeys = ref([])

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable
      v-model:selected-row-keys="selectedRowKeys"
      :columns="columns"
      :data="rows"
      show-selection
      selection-mode="row"
      row-draggable
    />`

const tableEditableCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])

const selectedRowKeys = ref([])

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]
<\/script>

<XTable
      v-model:data="rows"
      v-model:selected-row-keys="selectedRowKeys"
      :columns="columns"
      editable
      show-dirty-actions
      show-selection
      show-append-row-button
      show-delete-selected-rows-button
    />`

const tableFullHeightCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<div style="height: 360px">
      <XTable :columns="columns" :data="rows" full-height />
    </div>`

const tableSizeCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const columns = [
  { key: 'name', label: '名称' },
  { key: 'status', label: '状态' },
  { key: 'owner', label: '负责人' }
]

const rows = ref([
  { id: 1, name: '需求评审', status: '进行中', owner: '林一' },
  { id: 2, name: '视觉验收', status: '待处理', owner: '陈二' },
  { id: 3, name: '发布准备', status: '已完成', owner: '周三' }
])
<\/script>

<XTable :columns="columns" :data="rows" size="sm" :row-height="40" />`
</script>

# 表格 Table

`XTable` 是一个从简单展示重新开始的表格组件。当前版本负责数据渲染、基础列样式、插槽扩展、分页、列设置、选择、编辑、复制粘贴、拖拽排序和 Excel 导入导出。

组件主体使用 `div + CSS grid` 实现，方便后续扩展固定列、虚拟滚动和单元格编辑。

组件同时导出兼容别名 `XlTable`、`XlTableColumn`、`XlTableProps`。

## 基础用法

<XDocDemo title="基础用法" :code="tableBasicCode">
  <ClientOnly>
    <XTable :columns="columns" :data="rows" row-key="id" />
  </ClientOnly>
</XDocDemo>

## 自定义表顶和表底

`top` 和 `bottom` 插槽会扩展表格上方、下方区域。`top` 插槽参数包含当前 `columns`、`data`、`visibleData`、`columnSettings`、`pagination` 和列设置、分页更新方法。开启 `show-column-settings` 后，表顶会内置一个列设置图标按钮，默认点击后打开统一列设置弹窗，同时继续触发 `column-settings-click` 事件；需要业务侧完全自定义时可设置 `column-settings-dialog="false"` 后自行承载弹窗。开启内置分页后，`bottom` 插槽内容会和分页器一起显示。

<XDocDemo title="自定义表顶和表底" :code="tableSlotsCode">
  <ClientOnly>
    <XTable
      :columns="columns"
      :data="rows"
      show-column-settings
      :column-settings-dialog="false"
    />
  </ClientOnly>
</XDocDemo>

## 主题与外观变量

`XTable` 默认跟随 x.ui 全局主题 token。业务项目只要引入 `x.ui/style.css`，并在根节点或上层容器设置 `data-theme="dark"`、`:root.dark` 或 `.dark`，表格的表头、表体、汇总行、分页、列设置按钮、右键菜单、hover、选中行和单元格选区都会自动切换到暗色默认值，不需要给每个表格手动传 `header-background-color`、`body-background-color` 等外观属性。

<XDocDemo title="跟随暗色主题" :code="tableThemeCode">
  <ClientOnly>
    <div data-theme="dark" style="padding: 12px; background: #020617; border-radius: 6px">
      <XTable :columns="columns" :data="rows" show-pagination :page-size="2" />
    </div>
  </ClientOnly>
</XDocDemo>

需要品牌定制时，可以在主题节点、页面容器或单个表格上覆盖 `--x-table-*` CSS 变量；如果同时传入外观 props，props 会写入表格根节点的 CSS 变量，优先级高于全局 CSS 变量。

```css
.brand-table {
  --x-table-header-background: #10213a;
  --x-table-body-background: #07111f;
  --x-table-body-text-color: #e5eefb;
  --x-table-border-color: rgba(148, 163, 184, 0.24);
  --x-table-row-hover-overlay: rgba(59, 130, 246, 0.18);
}
```

常用 XTable CSS 变量如下：

| 变量 | 说明 |
| --- | --- |
| `--x-table-text-color` | 表格整体文字色兜底 |
| `--x-table-panel-background` | 表格根容器背景，显式传入 `panelBackgroundColor` 时也作为表顶和表底的背景兜底 |
| `--x-table-top-background` | 表顶区域背景，默认透明 |
| `--x-table-bottom-background` | 表底区域背景，默认透明 |
| `--x-table-header-background` | 表头背景 |
| `--x-table-header-text-color` | 表头文字色 |
| `--x-table-body-background` | 表体和空状态背景 |
| `--x-table-body-stripe-background` | 偶数行斑马纹叠加背景 |
| `--x-table-body-text-color` | 表体文字色 |
| `--x-table-summary-background` | 汇总行背景 |
| `--x-table-summary-text-color` | 汇总行文字色 |
| `--x-table-row-hover-overlay` | 数据行 hover 叠加层 |
| `--x-table-row-selected-background` | 行选中背景 |
| `--x-table-row-drag-background` | 行拖拽目标背景 |
| `--x-table-drag-indicator-color` | 拖拽插入线颜色 |
| `--x-table-sort-icon-color` | 排序图标默认颜色 |
| `--x-table-border-color` | 表格所有边线的统一兜底 |
| `--x-table-viewport-border-color` | 表格 viewport 外框颜色 |
| `--x-table-header-divider-color` | 表头底部分隔线颜色 |
| `--x-table-row-border-color` | 数据行横向分隔线颜色 |
| `--x-table-column-border-color` | 单元格竖向分隔线颜色 |
| `--x-table-horizontal-border-color` | 横向边线颜色兜底 |
| `--x-table-vertical-border-color` | 竖向边线颜色兜底 |
| `--x-table-control-bg` | 分页按钮、列设置按钮、右键菜单背景 |
| `--x-table-control-text-color` | 分页按钮、列设置按钮、右键菜单文字色 |
| `--x-table-control-border-color` | 分页按钮、列设置按钮、右键菜单边框色 |
| `--x-table-control-hover-bg` | 控件 hover 背景 |
| `--x-table-control-hover-text-color` | 控件 hover 文字色 |
| `--x-table-control-hover-border-color` | 控件 hover 边框色 |
| `--x-table-control-disabled-bg` | 控件禁用背景 |
| `--x-table-control-disabled-text-color` | 控件禁用文字色 |
| `--x-table-pagination-text-color` | 分页普通文字色 |
| `--x-table-pagination-current-text-color` | 当前页文字色 |
| `--x-table-cell-selected-background` | 单元格框选背景 |
| `--x-table-cell-selected-text-color` | 单元格框选文字色 |
| `--x-table-cell-selected-border-color` | 单元格框选外边框和手柄颜色 |
| `--x-table-cell-selected-inner-border-color` | 相邻选中单元格之间的内线色 |

如果需要精确控制每一类边线，可以使用更明确的边框属性。`border-color` 会写入 `--x-table-border-color`，作为所有表格边线的统一兜底；`horizontal-border-color` 和 `vertical-border-color` 继续保留为横线、竖线的兼容入口；更细的外框、表头底线、行线、列线属性优先级更高。

<XDocDemo title="品牌定制" :code="tableBrandCode">
  <ClientOnly>
    <XTable
      :columns="columns"
      :data="rows"
      panel-background-color="#111827"
      header-background-color="#172033"
      header-text-color="#dbeafe"
      body-background-color="#0b1220"
      body-stripe-background-color="#10192c"
      body-text-color="#e5e7eb"
      border-color="#334155"
      viewport-border-color="#64748b"
      header-divider-color="#38bdf8"
      row-border-color="#1d4ed8"
      column-border-color="#7c3aed"
    />
  </ClientOnly>
</XDocDemo>

## 分页

开启 `show-pagination` 后，表底会显示内置分页器。默认 `pagination-mode="client"`，组件会根据 `current-page` 和 `page-size` 从传入的 `data` 中切出当前页；如果表格需要全量展示，保持 `show-pagination` 为 `false` 即可隐藏分页元素并显示全部数据。

<XDocDemo title="分页" :code="tablePaginationCode">
  <ClientOnly>
    <XTable
      :columns="columns"
      :data="rows"
      show-pagination
      :page-size="2"
      :page-sizes="[2, 4, 8]"
    />
  </ClientOnly>
</XDocDemo>

分页控件、每页条数下拉框和列设置图标按钮会读取 XTable 专属 CSS 变量，并跟随 x.ui 全局 light / dark 主题默认值。业务侧需要细调时，可以在表格容器或上层主题节点覆盖这些变量：

```css
.dark-table {
  --x-table-control-bg: #0b1726;
  --x-table-control-text-color: #eef4fb;
  --x-table-control-border-color: #203247;
  --x-table-control-hover-bg: rgba(59, 130, 246, 0.16);
  --x-table-control-hover-text-color: #3b82f6;
  --x-table-control-hover-border-color: #3b82f6;
  --x-table-control-disabled-bg: #111f31;
  --x-table-control-disabled-text-color: #60738d;
  --x-table-pagination-text-color: #8da0b8;
  --x-table-pagination-current-text-color: #eef4fb;
}
```

服务器分页时使用 `pagination-mode="server"`。组件不会切分 `data`，只把当前页、每页条数、总数和页数通过事件抛出，业务侧收到事件后请求服务器并替换 `data`。

<XDocDemo title="服务器分页写法" :code="tableServerPaginationCode">
  <ClientOnly>
    <XTable
      :columns="columns"
      :data="rows"
      :total="40"
      show-pagination
      pagination-mode="server"
      :page-size="10"
    />
  </ClientOnly>
</XDocDemo>

## 列设置

通过 `column-settings` 可以控制列排序、隐藏、冻结、默认对齐、比例宽度和固定像素宽度。开启 `show-column-settings` 后，表格会在表顶内置列设置图标按钮，并默认打开内置列设置弹窗。内置弹窗支持显示/隐藏列、拖拽排序、置顶、置底、左/右冻结、左/中/右对齐、比例宽度、px 宽度和恢复默认。

如果页面已经通过 `column-settings-click` 事件实现了自定义弹窗，默认 `column-settings-dialog="auto"` 会保持旧行为：点击按钮只触发事件，不打开内置弹窗。需要强制使用内置弹窗时设置 `:column-settings-dialog="true"`；需要完全关闭内置弹窗时设置 `:column-settings-dialog="false"`。也可以继续在 `top` 插槽中使用 `columnSettings`、`updateColumnSetting`、`moveColumnSetting`、`reorderColumnSetting`、`resetColumnSettings` 构建自定义设置面板。

<XDocDemo title="列设置" :code="tableColumnSettingsCode">
  <ClientOnly>
    <XTable
      :columns="columns"
      :data="rows"
      show-column-settings
      :column-settings="columnSettings"
      :column-settings-dialog="false"
    />
  </ClientOnly>
</XDocDemo>

`width` 优先级高于 `widthRatio`。多个 px 宽度列相加超过表格可视宽度时，表格正文会出现横向滚动条；`widthRatio` 使用百分比，按表格可视宽度分配。

## 自定义单元格和操作列

通过 `cell-[key]` 覆盖某一列的单元格内容。开启 `show-actions` 后，可以使用 `row-actions` 插槽渲染操作列。需要操作列始终停靠在右侧时，设置 `actions-fixed`；操作列不会出现在内置列设置里。

操作列宽度通过 `actionsWidth` 控制，支持数字或 CSS 长度字符串。模板中推荐使用 `:actions-width="180"` 传入数字；如果使用字符串形式，建议写完整单位，例如 `actions-width="180px"`、`actions-width="12rem"` 或 `actions-width="30%"`。组件会兼容 `actions-width="180"` 这类纯数字字符串，并按 `180px` 处理。

<XDocDemo title="自定义单元格和操作列" :code="tableCellCode">
  <ClientOnly>
    <XTable :columns="columns" :data="rows" show-actions actions-fixed :actions-width="120" />
  </ClientOnly>
</XDocDemo>

## 选择列和行拖拽排序

开启 `show-selection` 后，表格进入可选择状态。`selection-mode="row"` 时点击当前行任意位置会选中或取消选中该行，通过 `v-model:selected-row-keys` 维护当前选中的行键；同时可以用 `show-selection-column` 控制是否显示左侧选择行列，显示时选中行会自动打勾。开启 `editable` 后，普通单元格点击需要留给编辑交互，整行点击选中会失效，用户只能通过左侧选择列勾选行；双击数据单元格会进入内联编辑，默认使用 `XBaseInput`，也可以用 `editor-[key]` 插槽替换指定列的编辑器，提交后通过 `update:data` 和 `cell-change` 抛出结果。`selection-mode="cell"` 时普通点击数据单元格只会在当前单元格上显示激活框，通过 `v-model:selected-cell-keys` 维护当前激活的单元格 key；选中一个单元格后按 Tab 会让选区右移一列，当前行最后一列会跳到下一行第一列，按 Shift+Tab 会左移一列，当前行第一列会跳到上一行最后一列；按 Enter 会让选区移动到当前列下一行，当前列最后一行会跳到下一列第一行；选中一个单元格后直接输入普通字符，也会进入编辑态并用输入的字符作为新内容；按住 Ctrl 或 Command 点击时可以保留多个单元格激活态；按下并拖过其它单元格时会形成矩形框选区域，选区右下角的方形手柄可以再次拖拽调整选区大小。单元格选择开启后，可以通过右键菜单或 Ctrl/Cmd+C 复制当前选区为制表符分隔文本；只有同时开启 `editable` 和单元格选择时，才能通过右键菜单或 Ctrl/Cmd+V 从剪贴板粘贴，粘贴会从当前最后一个选中单元格开始向右、向下写入可见列。选择行列和单元格选择互不冲突，单元格选择模式下仍可通过左侧选择列勾选行。

单元格框选区域支持通过 props 或 CSS 变量配置选区背景色、文字色、边框色和相邻单元格之间的内线色。未传 props 时，仍可以在表格容器或主题节点上直接覆盖 `--x-table-cell-selected-background`、`--x-table-cell-selected-text-color`、`--x-table-cell-selected-border-color`、`--x-table-cell-selected-inner-border-color`。

<XDocDemo title="选择列和单元格选择" :code="tableSelectionCode">
  <ClientOnly>
    <XTable
      v-model:selected-cell-keys="selectedCellKeys"
      :columns="columns"
      :data="rows"
      show-selection
      selection-mode="cell"
      selected-cell-background-color="rgba(59, 130, 246, 0.22)"
      selected-cell-border-color="#60a5fa"
    />
  </ClientOnly>
</XDocDemo>

开启 `row-draggable` 后，数据行左侧会显示拖拽手柄。只有从拖拽列开始拖动时才会触发行排序，避免影响后续单元格框选能力。拖拽完成时组件触发 `row-reorder`，业务侧需要用事件中的 `rows` 更新数据源顺序。

<XDocDemo title="行拖拽排序" :code="tableRowDragCode">
  <ClientOnly>
    <XTable
      v-model:selected-row-keys="selectedRowKeys"
      :columns="columns"
      :data="rows"
      show-selection
      selection-mode="row"
      row-draggable
    />
  </ClientOnly>
</XDocDemo>

## 可编辑行工具栏

开启 `editable` 后，单元格编辑提交会先形成脏单元格标记，并通过 `cell-change`、`dirty-change` 抛出变化；不会自动保存到后端。开启 `show-dirty-actions` 后，表顶会显示保存修改、标记已保存、撤销修改三个图标按钮。保存按钮会触发 `save` 事件，业务侧可在保存成功后调用 `clearDirtyChanges()` 清除脏标记；撤销按钮会调用 `resetDirtyChanges()` 恢复旧值。

还可以通过 `show-append-row-button` 和 `show-delete-selected-rows-button` 在表顶显示内置行操作图标按钮。`新建行数据` 会在末尾追加一行空数据；`删除选择行` 会删除左侧选择列勾选的行。两个操作都会通过 `update:data` 抛出最新数据，适合和 `v-model:data` 搭配使用。为避免分页数据和全量数据不一致，开启分页时按钮会禁用。

<XDocDemo title="可编辑行工具栏" :code="tableEditableCode">
  <ClientOnly>
    <XTable
      v-model:data="rows"
      v-model:selected-row-keys="selectedRowKeys"
      :columns="columns"
      editable
      show-dirty-actions
      show-selection
      show-append-row-button
      show-delete-selected-rows-button
    />
  </ClientOnly>
</XDocDemo>

## Excel 导入导出

在数据单元格上右键会打开表格右键菜单。菜单按剪贴板、行操作、列宽和 Excel 分组：

- `复制`：复制当前单元格选区，快捷键为 `Ctrl+C`。只有开启单元格选择时可用。
- `粘贴`：从当前最后一个选中单元格开始粘贴剪贴板内容，快捷键为 `Ctrl+V`。只有同时开启 `editable` 和单元格选择时可用。
- `增加行`：在表格末尾追加一行空数据，快捷键为 `Ctrl+I`。只有开启 `editable` 且未开启分页时可用。
- `向上插入行`：在当前右键行上方插入一行空数据，快捷键为 `Ctrl+U`。只有开启 `editable` 且未开启分页时可用。
- `向下插入行`：在当前右键行下方插入一行空数据，快捷键为 `Ctrl+D`。只有开启 `editable` 且未开启分页时可用。
- `适合宽度`：按当前可见列的数据单元格文字调整列宽，不计算表头文字宽度，快捷键为 `Ctrl+W`。
- `适应宽度`：按当前可见列的数据单元格文字和表头文字调整列宽。
- `导出Excel（默认表格数据）`：按当前可见列顺序导出 `data` 中的原始字段值。
- `导出Excel（格式化文字）`：按当前可见列顺序导出单元格展示文字，会应用 `TableColumn.formatter`。
- `导入Excel`：读取首个工作表，并按表头文本匹配 `column.label` 或 `column.key` 后更新 `data`。该菜单项只有 `editable` 为 `true` 时可用，导入后通过 `update:data` 和 `excel-import` 抛出结果。

导入时如果 Excel 没有表头，会按当前可见列顺序读取；未在表格中显示的字段会尽量保留原行数据，新导入出的额外行会自动补充 `row-key` 字段。

## 撑满父元素

父容器有明确高度时，可以开启 `full-height`，让表格高度撑满父元素，表头、表底保持固定，数据区域在内部滚动。`full-height` 只负责表格填满已有高度容器；应用根节点和页面容器也需要形成完整高度链，否则滚动条可能落到 `body`、页签面板或页面 wrapper 上。

<XDocDemo title="撑满父元素" :code="tableFullHeightCode">
  <ClientOnly>
    <div style="height: 360px">
      <XTable :columns="columns" :data="rows" full-height />
    </div>
  </ClientOnly>
</XDocDemo>

后台壳应用常见写法：

```css
html,
body,
#app {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.table-page {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}
```

## 尺寸与行高

`size` 会控制表格字号、单元格内边距、圆角和控件高度。需要单独调整表头、数据行和汇总行高度时，可以使用 `row-height`；数字和纯数字字符串会按 px 处理，带单位字符串会原样写入 CSS 变量。

`row-height` 的优先级高于 `size` 生成的行高度，但不会改变表顶工具按钮、列设置弹窗按钮和分页按钮高度。这些控件仍跟随 `size`，避免调高数据行时把操作区一起撑大。建议业务侧不要把 `row-height` 设置得低于 `22px`，否则单元格内容或编辑器可能显得拥挤。

<XDocDemo title="尺寸与行高" :code="tableSizeCode">
  <ClientOnly>
    <XTable :columns="columns" :data="rows" size="sm" :row-height="40" />
  </ClientOnly>
</XDocDemo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | `Record<string, unknown>[]` | 必填 |
| columns | 列配置 | `TableColumn[]` | 必填 |
| rowHeight | 表头、数据行和汇总行高度，数字和纯数字字符串按 px 处理，优先于 `size` 行高度，不影响分页和工具按钮高度 | `number \| string` | - |
| columnSettings | 列设置，支持排序、冻结、对齐和宽度 | `TableColumnSetting[]` | - |
| selectedRowKeys | 选中行的 key，支持 `v-model:selected-row-keys` | `TableRowKey[]` | - |
| selectedCellKeys | 选中单元格的 key，支持 `v-model:selected-cell-keys` | `string[]` | - |
| selectionMode | 选择模式，行选或单元格选择 | `'row' \| 'cell'` | `'row'` |
| rowKey | 行唯一键字段 | `string` | `'id'` |
| emptyText | 空数据文案 | `string` | `'暂无数据'` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| showActions | 是否显示操作列 | `boolean` | `false` |
| actionsFixed | 是否将操作列冻结在右侧；操作列不参与列设置 | `boolean` | `false` |
| showSelection | 表格是否可选 | `boolean` | `false` |
| showSelectionColumn | 是否显示左侧选择行列，可和单元格选择同时使用 | `boolean` | `true` |
| editable | 表格是否可编辑，开启后行选模式下点击普通单元格不再选中行 | `boolean` | `false` |
| showDirtyActions | `editable` 时是否在表顶显示保存、标记已保存和撤销修改图标按钮 | `boolean` | `false` |
| showAppendRowButton | `editable` 时是否在表顶显示新建行数据图标按钮 | `boolean` | `false` |
| showDeleteSelectedRowsButton | `editable` 时是否在表顶显示删除选择行图标按钮 | `boolean` | `false` |
| saveDirtyButtonLabel | 保存修改图标按钮的 `aria-label` 和 `title` | `string` | `'保存修改'` |
| clearDirtyButtonLabel | 标记已保存图标按钮的 `aria-label` 和 `title` | `string` | `'标记已保存'` |
| resetDirtyButtonLabel | 撤销修改图标按钮的 `aria-label` 和 `title` | `string` | `'撤销修改'` |
| appendRowButtonLabel | 新建行数据图标按钮的 `aria-label` 和 `title` | `string` | `'新建行数据'` |
| deleteSelectedRowsButtonLabel | 删除选择行图标按钮的 `aria-label` 和 `title` | `string` | `'删除选择行'` |
| rowDraggable | 是否开启行拖拽排序 | `boolean` | `false` |
| columnResizable | 是否允许通过表头拖拽调整列宽 | `boolean` | `true` |
| showColumnSettings | 是否显示内置列设置图标按钮 | `boolean` | `false` |
| columnSettingsDialog | 列设置按钮是否打开内置弹窗；`auto` 会在没有外部 `column-settings-click` 监听时打开 | `boolean \| 'auto'` | `'auto'` |
| columnSettingsDialogTitle | 内置列设置弹窗标题 | `string` | `'列设置'` |
| columnSettingsDialogWidth | 内置列设置弹窗宽度 | `number` | `760` |
| columnSettingsDialogHeight | 内置列设置弹窗高度 | `number` | `620` |
| panelBackgroundColor | 表格根容器背景色；显式传入时也作为 `topBackgroundColor`、`bottomBackgroundColor` 未设置时的兜底 | `string` | - |
| topBackgroundColor | 表顶插槽容器背景色，支持 CSS 颜色值 | `string` | `'transparent'` |
| bottomBackgroundColor | 表底插槽容器背景色，支持 CSS 颜色值 | `string` | `'transparent'` |
| headerBackgroundColor | 表头区域背景色，支持 CSS 颜色值 | `string` | - |
| headerTextColor | 表头区域文字颜色，支持 CSS 颜色值 | `string` | - |
| bodyBackgroundColor | 表格内容区背景色，支持 CSS 颜色值 | `string` | - |
| bodyStripeBackgroundColor | 表格内容区斑马纹背景色，作用于偶数数据行，默认透明 | `string` | `'transparent'` |
| bodyTextColor | 表格内容区文字颜色，支持 CSS 颜色值 | `string` | - |
| selectedCellBackgroundColor | 单元格框选区域背景色，会写入 `--x-table-cell-selected-background` | `string` | - |
| selectedCellTextColor | 单元格框选区域文字色，会写入 `--x-table-cell-selected-text-color` | `string` | - |
| selectedCellBorderColor | 单元格框选区域边框色和手柄颜色，会写入 `--x-table-cell-selected-border-color` | `string` | - |
| selectedCellInnerBorderColor | 单元格框选区域相邻边内线色，会写入 `--x-table-cell-selected-inner-border-color` | `string` | - |
| borderColor | 表格所有边线的统一兜底颜色，会写入 `--x-table-border-color` | `string` | - |
| viewportBorderColor | 表格 viewport 外框整体颜色，优先于横线和竖线颜色 | `string` | - |
| headerDividerColor | 表头 viewport 底部分隔线颜色，未设置时回退到 `horizontalBorderColor` | `string` | - |
| rowBorderColor | 数据行横向分隔线颜色，未设置时回退到 `horizontalBorderColor` | `string` | - |
| columnBorderColor | 单元格竖向分隔线颜色，未设置时回退到 `verticalBorderColor` | `string` | - |
| horizontalBorderColor | 表格横向边框颜色，影响表格上下边框、表头分隔线和行分隔线 | `string` | - |
| horizontalBorderWidth | 表格横向边框宽度，支持数字或 CSS 长度字符串；纯数字字符串会按 px 兼容处理 | `number \| string` | - |
| verticalBorderColor | 表格竖向边框颜色，影响表格左右边框和列分隔线 | `string` | - |
| verticalBorderWidth | 表格竖向边框宽度，支持数字或 CSS 长度字符串；纯数字字符串会按 px 兼容处理 | `number \| string` | - |
| showPagination | 是否显示表底内置分页器，关闭时显示全部传入数据 | `boolean` | `false` |
| paginationMode | 分页模式，客户端分页会切分本地数据，服务器分页只抛出翻页事件 | `'client' \| 'server'` | `'client'` |
| currentPage | 当前页，支持 `v-model:current-page` | `number` | `1` |
| pageSize | 每页条数，支持 `v-model:page-size` | `number` | `10` |
| total | 总条数，服务器分页时用于计算页数；未设置时使用 `data.length` | `number` | - |
| pageSizes | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| actionsWidth | 操作列宽度，支持数字或 CSS 长度字符串；模板中推荐 `:actions-width="180"`，纯数字字符串会按 px 兼容处理 | `number \| string` | `160` |
| fullHeight | 是否撑满父元素高度 | `boolean` | `false` |

## TableColumn

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 数据字段名 | `string` | 必填 |
| label | 表头文本 | `string` | 必填 |
| width | 固定列宽，支持数字或 CSS 长度字符串；纯数字字符串会按 px 兼容处理 | `number \| string` | - |
| minWidth | 最小列宽，未设置 `width` 时参与自适应分配；支持数字或 CSS 长度字符串，纯数字字符串会按 px 兼容处理；未配置时默认为 `40px` | `number \| string` | `40` |
| align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| formatter | 单元格格式化函数 | `(value, row) => string` | - |

## TableColumnSetting

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应列字段名 | `string` | 必填 |
| order | 列排序序号，从小到大排列 | `number` | 列原始顺序 |
| hidden | 是否隐藏该列 | `boolean` | `false` |
| fixed | 列冻结方向 | `'left' \| 'none' \| 'right'` | `'none'` |
| align | 单元格默认内容对齐方式 | `'left' \| 'center' \| 'right'` | 当前列 `align` 或 `'left'` |
| widthRatio | 列宽比例，按表格可视宽度百分比分配 | `number` | - |
| width | 固定列宽 px，优先级高于 `widthRatio` | `number` | - |

## TablePaginationChangePayload

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| currentPage | 当前页 | `number` |
| pageSize | 每页条数 | `number` |
| total | 总条数 | `number` |
| pageCount | 总页数 | `number` |
| mode | 分页模式 | `'client' \| 'server'` |
| pageSizeChanged | 是否由每页条数变化触发 | `boolean` |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:columnSettings | 列设置变化时触发 | `TableColumnSetting[]` |
| column-settings-change | 列设置变化时触发 | `TableColumnSetting[]` |
| column-settings-click | 点击内置列设置图标按钮时触发 | `TableColumnSetting[]` |
| update:selectedRowKeys | 选中行变化时触发 | `string[]` |
| selection-change | 选中行变化时触发，包含选中 key 和行数据 | `{ keys, rows }` |
| update:selectedCellKeys | 选中单元格变化时触发 | `string[]` |
| cell-selection-change | 选中单元格变化时触发，包含选中 key 和单元格数据 | `{ keys, cells }` |
| update:data | 单元格编辑提交后触发，支持 `v-model:data` | `Record<string, unknown>[]` |
| cell-change | 单元格编辑提交后触发，包含当前行、全量行、列和值变化 | `TableCellChangePayload` |
| dirty-change | 脏单元格变化时触发，包含全部脏单元格、当前数据和脏行 | `TableDirtyChangePayload` |
| save | 点击保存修改按钮或调用 `save()` 时触发，业务侧决定如何落库 | `TableSavePayload` |
| append-row | 通过表顶按钮、右键菜单或快捷键追加行后触发 | `TableAppendRowPayload` |
| delete-selected-rows | 通过表顶按钮删除选中行后触发 | `TableDeleteSelectedRowsPayload` |
| excel-export | 右键菜单导出 Excel 后触发，包含导出模式、行数据和列配置 | `TableExcelExportPayload` |
| excel-import | 导入 Excel 后触发，包含文件、导入后的行数据和列配置 | `TableExcelImportPayload` |
| row-click | 单击数据行时触发，包含当前行、行索引、行 key 和原始鼠标事件 | `TableRowClickPayload` |
| row-dblclick | 双击数据行时触发，包含当前行、行索引、行 key 和原始鼠标事件 | `TableRowClickPayload` |
| column-resize | 表头拖拽调整列宽时触发，包含列、列 key、新旧宽度和最新列设置 | `TableColumnResizePayload` |
| row-reorder | 行拖拽排序完成时触发，业务侧应使用 `rows` 更新数据源 | `TableRowReorderPayload` |
| update:currentPage | 当前页变化时触发，支持 `v-model:current-page` | `number` |
| update:pageSize | 每页条数变化时触发，支持 `v-model:page-size` | `number` |
| page-change | 当前页变化时触发 | `TablePaginationChangePayload` |
| page-size-change | 每页条数变化时触发 | `TablePaginationChangePayload` |
| pagination-change | 当前页或每页条数变化时触发，适合服务器分页统一请求数据 | `TablePaginationChangePayload` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| top | 自定义表顶区域，可用于列设置 | `{ columns, data, visibleData, columnSettings, selectedRowKeys, selectedCellKeys, pagination, updateColumnSetting, moveColumnSetting, reorderColumnSetting, resetColumnSettings, setPage, setPageSize }` |
| bottom | 自定义表底区域，可和内置分页器同时显示 | `{ columns, data, visibleData, columnSettings, selectedRowKeys, selectedCellKeys, pagination, updateColumnSetting, moveColumnSetting, reorderColumnSetting, resetColumnSettings, setPage, setPageSize }` |
| cell-[key] | 自定义指定列单元格 | `{ row, value, column, rowIndex }` |
| editor-[key] | 自定义指定列编辑器 | `{ row, value, modelValue, column, rowIndex, updateModelValue, commit, commitValue, cancel }` |
| row-actions | 自定义操作列内容，需要 `showActions` | `{ row, rowIndex }` |

## Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getColumnSettings | 获取当前列设置 | `() => TableColumnSetting[]` |
| setColumnSettings | 设置列配置 | `(settings: TableColumnSetting[]) => void` |
| resetColumnSettings | 重置列配置 | `() => void` |
| getPagination | 获取当前分页状态 | `() => TablePaginationState` |
| setPage | 设置当前页，并触发分页事件 | `(page: number) => void` |
| setPageSize | 设置每页条数，并触发分页事件 | `(pageSize: number) => void` |
| save | 提交当前脏数据并触发 `save` 事件 | `() => void` |
| clearDirtyChanges | 清除全部脏标记，或按行 key 清除指定行脏标记 | `(rowKeys?: Array<string \| number>) => void` |
| resetDirtyChanges | 撤销全部脏数据，或按行 key 撤销指定行脏数据 | `(rowKeys?: Array<string \| number>) => void` |
| getDirtyChanges | 获取当前脏单元格列表 | `() => TableDirtyCellChange[]` |
| exportExcel | 导出 Excel，`raw` 为默认字段值，`formatted` 为格式化文字 | `(mode: 'raw' \| 'formatted') => Promise<void>` |
| importExcelFile | 导入指定 Excel 文件，只有 `editable` 为 `true` 时会更新数据 | `(file: File) => Promise<void>` |

## 手动验收建议

- 检查基础表头、数据行和空态是否正常显示。
- 检查 `width`、`minWidth`、`align` 和 `formatter` 是否生效。
- 检查 `top`、`bottom`、`cell-[key]`、`row-actions` 插槽是否能正常渲染。
- 开启 `show-selection` 后，检查行选、单元格点击选择、Tab / Shift+Tab 横向移动选区、Ctrl/Command 多选、拖拽框选、手柄调整选区、选择行列勾选和已选数量是否正确；再开启 `editable`，确认普通单元格点击不会切换行选，只能通过选择列勾选行，双击单元格或选中单元格后直接输入字符都可以进入编辑并提交新值。
- 开启 `row-draggable` 后，从拖拽列拖拽数据行，检查拖拽高亮和排序结果是否正确；从普通单元格开始拖动不应触发行排序。
- 开启 `show-column-settings` 后，点击表顶列设置图标按钮，在 `XDialog` 弹窗中检查列名拖拽排序、置顶、置底、左/右冻结、对齐、比例宽度和 px 宽度是否生效；滚动列设置列表时，检查列表内容不会叠加在列头上。
- 在数据单元格右键菜单中检查复制、粘贴启用条件和 `Ctrl+C`、`Ctrl+V` 快捷键文案；开启单元格选择后复制选区，开启 `editable` 后从剪贴板粘贴多行多列内容，确认 `v-model:data` 得到更新。
- 在未开启分页且开启 `editable` 时，通过右键菜单和 `Ctrl+I`、`Ctrl+U`、`Ctrl+D` 检查 `增加行`、`向上插入行`、`向下插入行` 是否能更新 `v-model:data`；开启分页后这三项应禁用。
- 开启 `show-append-row-button` 和 `show-delete-selected-rows-button` 后，检查表顶图标按钮只在 `editable` 时显示；追加行应更新 `v-model:data`，删除选择行应根据左侧选择列勾选结果删除并清空选择。
- 在数据单元格右键菜单中分别检查 `适合宽度` 和 `适应宽度`，并用 `Ctrl+W` 检查 `适合宽度` 快捷键；确认后者会把表头文字宽度也纳入列宽计算；分别导出默认表格数据和格式化文字，确认 `formatter` 列导出内容符合预期；开启 `editable` 后导入 Excel，确认菜单可用且 `v-model:data` 得到更新。
- 在窄容器中检查横向滚动和文本截断效果。
- 开启 `full-height` 后，检查父容器高度变化时表格是否撑满，数据区域是否在内部滚动。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XTable / `TableProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `sorter` | 公开属性，详见类型定义 | `TableSorter` | — |
| `defaultSorter` | 公开属性，详见类型定义 | `TableSorter` | — |
| `summaryRow` | 公开属性，详见类型定义 | `false \| TableSummaryRow<Row>` | — |
| `summaryScope` | 公开属性，详见类型定义 | `TableSummaryScope` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
