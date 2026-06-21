<script setup lang="ts">
const code = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-column">
    <XTableColumnSettings v-model="columnSettings" :columns="columns" />
    <XTable :columns="columns" :data="rows" :column-settings="columnSettings" row-key="id" />
  </div>`
</script>

# 表格列设置 TableColumnSettings

`XTableColumnSettings` 用于在表格外部维护 `TableColumnSetting[]`，再把结果传给 `XTable`。它支持显示/隐藏、拖拽排序、置顶、置底、左/右冻结、左/中/右对齐、比例宽度、固定像素宽度和恢复默认。

## 基础用法

<XDocDemo title="基础用法" :code="code">
  <div class="x-demo-column">
    <XTableColumnSettings v-model="columnSettings" :columns="columns" />
    <XTable :columns="columns" :data="rows" :column-settings="columnSettings" row-key="id" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置 | `TableColumn[]` | 必填 |
| modelValue | 当前列设置 | `TableColumnSetting[]` | - |
| title | 弹窗标题 | `string` | `'列设置'` |
| width | 弹窗宽度 | `number` | `760` |
| height | 弹窗高度 | `number` | `620` |
| disabled | 是否禁用列设置按钮 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 列设置变化时触发 |
| change | 列设置变化时触发 |
| reset | 点击恢复默认后触发 |

## Expose

| 名称 | 说明 |
| --- | --- |
| open | 打开列设置弹窗 |
| close | 关闭列设置弹窗 |
| reset | 恢复默认列设置 |
| getSettings | 获取当前列设置 |

## 手动验收建议

1. 打开列设置弹窗，检查显示/隐藏列是否同步影响表格。
2. 拖拽列名、置顶、置底后，确认表格列顺序更新。
3. 切换冻结和对齐，确认表格固定列和文本对齐生效。
4. 修改比例宽度和 px 宽度，确认列宽变化且长文本不溢出遮挡。

