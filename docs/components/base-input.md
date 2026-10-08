<script setup lang="ts">
import Example1 from '../examples/base-input/Example1.vue'
import Example1Source from '../examples/base-input/Example1.vue?raw'
import Example2 from '../examples/base-input/Example2.vue'
import Example2Source from '../examples/base-input/Example2.vue?raw'
import Example3 from '../examples/base-input/Example3.vue'
import Example3Source from '../examples/base-input/Example3.vue?raw'
import Example4 from '../examples/base-input/Example4.vue'
import Example4Source from '../examples/base-input/Example4.vue?raw'
import Example5 from '../examples/base-input/Example5.vue'
import Example5Source from '../examples/base-input/Example5.vue?raw'
</script>
# BaseInput 基础输入框

`XBaseInput` 是输入框的底层基础组件。它使用外层 `div.x-base-input` 承载边框、圆角、背景和聚焦状态，内部原生 `input.x-base-input__inner` 隐藏边框并保持透明背景，适合被更上层的输入框组件复用。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 可清空

<XDocDemo title="可清空" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 格式化显示

金额、统计值等场景可以用 `formatter` 负责展示文本，用 `parser` 把用户输入转换回真实值。输入框内显示格式化后的内容，`v-model` 仍保持解析后的原始值。

<XDocDemo title="格式化显示" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 前后缀

<XDocDemo title="前后缀" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 外观接口

<XDocDemo title="外观接口" :code="Example5Source">
  <Example5 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string \| number` | `''` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 占位文本 | `string` | `—` | — |
| `prefix` | 前缀文本 | `string` | `—` | — |
| `suffix` | 后缀文本 | `string` | `—` | — |
| `name` | 原生 `input` 的 `name` 属性 | `string` | `—` | — |
| `id` | 原生 `input` 的 `id` 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `clearIconSize` | 清除图标大小 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 输入框宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 输入框高度 | `number \| string` | `—`<br>默认 32px；autoHeight 为 true 时撑满父容器高度 | 数字为 px；字符串使用 CSS 单位 |
| `autoHeight` | 自动高度，比组件高度 `height` 优先级高；开启后 `height` 不再参与最小高度计算，适合嵌入表格单元格等容器 | `boolean` | `false` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活边框色，聚焦时生效 | `string` | `—` | — |
| `clearIconColor` | 清除图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用状态背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用状态文字色 | `string` | `—` | — |
| `fontFamily` | 字体样式 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined`<br>未设置时继承 Form 字号，独立使用时为 14px | px |
| `padding` | 外层 `div` 内边距 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 圆角 | `number \| string` | `—`<br>未设置时使用 --x-form-radius，未提供该变量时为 6px | 数字为 px；字符串使用 CSS 单位 |
| `textAlign` | 文字对齐方式 | `BaseInputTextAlign` | `—` | — |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框粗细 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `formatOnBlur` | 失焦后是否重新显示格式化值 | `boolean` | `true` | — |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读 | `boolean` | `false` | — |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` | — |
| `status` | 状态 | `BaseInputStatus` | `'default'` | — |
| `hideClearButton` | 是否隐藏清除按钮 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `type` | 原生输入类型 | `BaseInputType` | `'text'` | — |
| `formatter` | 将真实值格式化为输入框展示值；与 `type="number"` 同用时内部按文本输入展示 | `BaseInputFormatter` | `—` | — |
| `parser` | 将输入框展示值解析为真实值，并用于 `update:modelValue`、`input`、`change` 事件输出 | `BaseInputParser` | `—` | — |
| `maxlength` | 最大输入长度 | `number` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发 | `[value: string \| number]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `input` | 输入时触发 | `[value: string \| number]` |
| `change` | 原生 change 时触发 | `[value: string \| number]` |
| `clear` | 点击清空时触发 | `[]` |
| `focus` | focus 事件 | `[event: FocusEvent]` |
| `blur` | blur 事件 | `[event: FocusEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `keydown` | keydown 事件 | `[event: KeyboardEvent]` |
| `keyup` | keyup 事件 | `[event: KeyboardEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 前缀文本 | `无作用域参数` |
| `suffix` | 后缀文本 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `inner` | inner 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### BaseInputFontSize

```ts
export type BaseInputFontSize = number
```

### BaseInputType

```ts
export type BaseInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
```

### BaseInputStatus

```ts
export type BaseInputStatus = 'default' | 'success' | 'warning' | 'error'
```

### BaseInputTextAlign

```ts
export type BaseInputTextAlign = 'left' | 'center' | 'right'
```

### BaseInputProps

```ts
export interface BaseInputProps extends ElementStyleProps {
  showActiveBorder?: boolean
  modelValue?: string | number
  type?: BaseInputType
  formatter?: BaseInputFormatter
  parser?: BaseInputParser
  formatOnBlur?: boolean
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  status?: BaseInputStatus
  prefix?: string
  suffix?: string
  accentColor?: string
  activeBorderColor?: string
  clearIconColor?: string
  clearIconSize?: number | string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  fontFamily?: string
  fontSize?: number
  width?: number | string
  height?: number | string
  autoHeight?: boolean
  hideClearButton?: boolean
  padding?: number | string
  radius?: number | string
  textAlign?: BaseInputTextAlign
  inputBackgroundColor?: string
  name?: string
  id?: string
  maxlength?: number
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### BaseInputFormatter

```ts
export type BaseInputFormatter = (value: string | number) => string
```

### BaseInputParser

```ts
export type BaseInputParser = (displayValue: string) => string | number
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
