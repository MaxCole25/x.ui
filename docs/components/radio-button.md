<script setup lang="ts">
import Example1 from '../examples/radio-button/Example1.vue'
import Example1Source from '../examples/radio-button/Example1.vue?raw'
import Example2 from '../examples/radio-button/Example2.vue'
import Example2Source from '../examples/radio-button/Example2.vue?raw'
import Example3 from '../examples/radio-button/Example3.vue'
import Example3Source from '../examples/radio-button/Example3.vue?raw'
import Example4 from '../examples/radio-button/Example4.vue'
import Example4Source from '../examples/radio-button/Example4.vue?raw'
import Example5 from '../examples/radio-button/Example5.vue'
import Example5Source from '../examples/radio-button/Example5.vue?raw'
</script>
# RadioButton 单选按钮

用于在一组选项中选择一个值。`XRadioButton` 是 `XRadio` 的按钮形态，分组方式、绑定值和事件保持一致：多个按钮绑定同一个 `v-model`，并设置同一个 `name`，即可形成一组按钮式单选。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 分组单选控制

`XRadioButton` 不需要额外的 `XRadioGroup`。同一组按钮绑定同一个 `v-model`，并设置相同的 `name`；不同分组使用不同的 `v-model` 和 `name`，即可互不影响。这个规则与 `XRadio` 完全一致，业务中可以直接把 `XRadio` 替换为 `XRadioButton`。

<XDocDemo title="分组单选控制" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 禁用状态

<XDocDemo title="禁用状态" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 尺寸

<XDocDemo title="尺寸" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 外观定制

<XDocDemo title="外观定制" :code="Example5Source">
  <Example5 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string \| number \| boolean` | `—` | — |
| `value` | 当前选项值 | `string \| number \| boolean` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `label` | 文案 | `string` | `—` | — |
| `name` | 原生 name | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 相邻按钮拼接方向，对齐 `XButtonGroup` | `ButtonGroupDirection` | `'horizontal'` | — |
| `width` | 按钮宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 按钮高度，数字按 px 处理，优先级高于 `buttonSize` | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `buttonSize` | 矩形按钮高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 按钮类型，对齐 `XButton` | `ButtonVariant` | `—` | — |
| `radius` | 按钮组外侧圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `activeBackgroundColor` | 选中态背景色，对齐按钮激活色接口 | `string` | `—` | — |
| `activeBorderColor` | 选中态边框色，对齐按钮激活色接口 | `string` | `—` | — |
| `activeTextColor` | 选中态文字色，对齐按钮激活色接口 | `string` | `—` | — |
| `fontFamily` | 字体 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `labelColor` | 标签文字颜色 | `string` | `—` | — |
| `buttonColor` | 按钮颜色 | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 选中时触发，用于 `v-model` | `[value: string \| number \| boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 选中时触发 | `[value: string \| number \| boolean]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 按钮文案 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### RadioFontSize

```ts
export type RadioFontSize = number
```

### RadioProps

```ts
export interface RadioProps extends ElementStyleProps {
  height?: number | string

  modelValue?: string | number | boolean
  label?: string
  value: string | number | boolean
  disabled?: boolean
  fontFamily?: string
  fontSize?: number
  labelColor?: string
  buttonColor?: string
  buttonSize?: number | string
  name?: string
}
```

### RadioButtonProps

```ts
export interface RadioButtonProps extends RadioProps {
  variant?: ButtonVariant
  direction?: ButtonGroupDirection
  width?: number | string
  height?: number | string
  radius?: number | string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
