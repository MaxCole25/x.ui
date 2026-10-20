<script setup lang="ts">
import Example1 from '../examples/checkbox/Example1.vue'
import Example1Source from '../examples/checkbox/Example1.vue?raw'
import Example2 from '../examples/checkbox/Example2.vue'
import Example2Source from '../examples/checkbox/Example2.vue?raw'
import Example3 from '../examples/checkbox/Example3.vue'
import Example3Source from '../examples/checkbox/Example3.vue?raw'
import Example4 from '../examples/checkbox/Example4.vue'
import Example4Source from '../examples/checkbox/Example4.vue?raw'
import Example5 from '../examples/checkbox/Example5.vue'
import Example5Source from '../examples/checkbox/Example5.vue?raw'
</script>
# Checkbox 多选框

用于布尔选择或一组选项的多选。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 多选数组

<XDocDemo title="多选数组" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 半选、只读和禁用

只读状态保留正常的选中颜色，可聚焦查看，鼠标点击和键盘操作均不会改变绑定值或触发更新事件。`disabled` 与 `readonly` 同时设置时，禁用状态优先。

<XDocDemo title="半选、只读和禁用" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 尺寸

<XDocDemo title="尺寸" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 业务主题

使用 `disabledBackgroundColor` 和 `disabledTextColor` 覆盖禁用背景与前景色，支持 CSS 变量；前景色同时作用于文字、勾选和半选标记。未设置时分别继承 `--x-color-disabled-bg`、`--x-color-disabled-text`，边框继承 `--x-color-disabled-border`。由 `XForm disabled` 触发的禁用状态同样生效。

<XDocDemo title="业务主题" :code="Example5Source">
  <Example5 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `boolean \| Array<string \| number \| boolean>` | `—` | — |
| `value` | 多选时的选项值 | `string \| number \| boolean` | `true` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `label` | 文案 | `string` | `—` | — |
| `name` | 原生 name 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 控件高度，独立于字号 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `checkedColor` | 选中色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用时复选框背景色，默认使用主题禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用时文字、勾选和半选标记的前景色，默认使用主题禁用文字色 | `string` | `—` | — |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读，保留选中颜色并禁止切换 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `indeterminate` | 是否半选 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | update:modelValue 事件 | `[value: boolean \| Array<string \| number \| boolean>]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | change 事件 | `[value: boolean \| Array<string \| number \| boolean>]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### CheckboxFontSize

```ts
export type CheckboxFontSize = number
```

### CheckboxProps

```ts
export interface CheckboxProps extends ElementStyleProps {
  height?: number | string
  modelValue?: boolean | Array<string | number | boolean>
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  readonly?: boolean
  indeterminate?: boolean
  fontSize?: number
  checkedColor?: string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  radius?: number | string
  name?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
