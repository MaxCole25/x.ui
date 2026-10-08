<script setup lang="ts">
import Example1 from '../examples/table-column-settings/Example1.vue'
import Example1Source from '../examples/table-column-settings/Example1.vue?raw'
import Example2 from '../examples/table-column-settings/Example2.vue'
import Example2Source from '../examples/table-column-settings/Example2.vue?raw'
</script>
# 表格列设置 TableColumnSettings

`XTableColumnSettings` 用于在表格外部维护 `TableColumnSetting[]`，再把结果传给 `XTable`。它支持显示/隐藏、拖拽排序、置顶、置底、左/右冻结、左/中/右对齐、比例宽度、固定像素宽度和恢复默认。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义触发按钮

通过 `trigger` 插槽可以自定义打开列设置弹窗的按钮。插槽会提供 `open`、`disabled` 和 `visible`，适合放入工具栏图标按钮或业务自定义操作区。

<XDocDemo title="自定义图标按钮" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前列设置 | `TableColumnSetting[]` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 弹窗标题 | `string` | `'列设置'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 弹窗宽度 | `number` | `760` | — |
| `height` | 弹窗高度 | `number` | `620` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用列设置按钮 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `columns` | 表格列配置 | `TableColumn<Row>[]` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 列设置变化时触发 | `[value: TableColumnSetting[]]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 列设置变化时触发 | `[value: TableColumnSetting[]]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `reset` | 点击恢复默认后触发 | `[value: TableColumnSetting[]]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `trigger` | 自定义列设置触发按钮 | `open: () => void; disabled: boolean; visible: boolean` |

## 实例方法

### 状态与交互

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `open` | 打开列设置弹窗 | `() => void` |
| `close` | 关闭列设置弹窗 | `() => void` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `reset` | 点击恢复默认后触发 | `() => void` |
| `getSettings` | 获取当前列设置 | `() => { key: string; order?: number \| undefined; hidden?: boolean \| undefined; fixed?: TableFixed \| undefined; align?: TableAlign \| undefined; widthRatio?: number \| undefined; width?: number \| undefined; }[]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TableColumnSettingsProps

```ts
export interface TableColumnSettingsProps<Row extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<Row>[]
  modelValue?: TableColumnSetting[]
  title?: string
  width?: number
  height?: number
  disabled?: boolean
}
```

### TableColumnSettingsTriggerSlotProps

```ts
export interface TableColumnSettingsTriggerSlotProps {
  open: () => void
  disabled: boolean
  visible: boolean
}
```

### TableColumnSettingsSlots

```ts
export interface TableColumnSettingsSlots {
  trigger?: (props: TableColumnSettingsTriggerSlotProps) => unknown
}
```

### TableColumnSettingsExpose

```ts
export interface TableColumnSettingsExpose {
  open: () => void
  close: () => void
  reset: () => void
  getSettings: () => TableColumnSetting[]
}
```

## 验收说明

1. 打开列设置弹窗，检查显示/隐藏列是否同步影响表格。
2. 拖拽列名、置顶、置底后，确认表格列顺序更新。
3. 切换冻结和对齐，确认表格固定列和文本对齐生效。
4. 修改比例宽度和 px 宽度，确认列宽变化且长文本不溢出遮挡。
5. 使用自定义图标按钮打开弹窗，确认禁用状态下不会打开。

