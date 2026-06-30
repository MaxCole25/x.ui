<script setup lang="ts">
const code = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-column">
    <XTableColumnSettings v-model="columnSettings" :columns="columns" />
    <XTable :columns="columns" :data="rows" :column-settings="columnSettings" row-key="id" />
  </div>`

const customTriggerCode = `<XTableColumnSettings v-model="columnSettings" :columns="columns">
  <template #trigger="{ open, disabled }">
    <button
      class="x-table-column-settings-doc__icon-trigger"
      type="button"
      :disabled="disabled"
      aria-label="列设置"
      title="列设置"
      @click="open"
    >
      <i class="ri-settings-3-line"></i>
    </button>
  </template>
</XTableColumnSettings>`
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

## 自定义触发按钮

通过 `trigger` 插槽可以自定义打开列设置弹窗的按钮。插槽会提供 `open`、`disabled` 和 `visible`，适合放入工具栏图标按钮或业务自定义操作区。

<XDocDemo title="自定义图标按钮" :code="customTriggerCode">
  <XTableColumnSettings v-model="columnSettings" :columns="columns">
    <template #trigger="{ open, disabled }">
      <button class="x-table-column-settings-doc__icon-trigger" type="button" :disabled="disabled" aria-label="列设置" title="列设置" @click="open">
        <i class="ri-settings-3-line"></i>
      </button>
    </template>
  </XTableColumnSettings>
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

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| trigger | 自定义列设置触发按钮 | `{ open, disabled, visible }` |

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
5. 使用自定义图标按钮打开弹窗，确认禁用状态下不会打开。

<style scoped>
.x-table-column-settings-doc__icon-trigger {
  align-items: center;
  background: var(--x-table-control-bg, var(--x-color-surface, #fff));
  border: 1px solid var(--x-table-control-border-color, var(--x-color-border, #cbd5e1));
  border-radius: 6px;
  color: var(--x-table-control-text-color, var(--x-color-text, #334155));
  cursor: pointer;
  display: inline-flex;
  font-size: 18px;
  height: 30px;
  justify-content: center;
  padding: 0;
  width: 30px;
}

.x-table-column-settings-doc__icon-trigger:hover,
.x-table-column-settings-doc__icon-trigger:focus-visible {
  border-color: var(--x-color-primary, #1264f4);
  color: var(--x-color-primary, #1264f4);
  outline: none;
}

.x-table-column-settings-doc__icon-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.56;
}
</style>
