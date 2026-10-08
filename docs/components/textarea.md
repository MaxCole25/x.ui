<script setup lang="ts">
import Example1 from '../examples/textarea/Example1.vue'
import Example1Source from '../examples/textarea/Example1.vue?raw'
import Example2 from '../examples/textarea/Example2.vue'
import Example2Source from '../examples/textarea/Example2.vue?raw'
import Example3 from '../examples/textarea/Example3.vue'
import Example3Source from '../examples/textarea/Example3.vue?raw'
import Example4 from '../examples/textarea/Example4.vue'
import Example4Source from '../examples/textarea/Example4.vue?raw'
</script>
# Textarea 多行输入框

`XTextarea` 用于输入多行文本，支持自动高度、最大行数滚动、禁用换行、清空按钮和输入框体系一致的尺寸与状态。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自动高度

设置 `autoHeight` 后，文本域会根据输入内容自动增高。不设置 `maxRows` 时，高度会持续跟随内容增长。

<XDocDemo title="自动高度" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 最大行数滚动

设置 `maxRows` 后，文本域最多显示指定行数；内容超过后保留竖向滚动条，避免撑开页面布局。

<XDocDemo title="最大行数滚动" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 禁止自动换行

设置 `allowWrap=false` 后，文本不会自动换行，横向溢出会隐藏；需要滚动时只显示竖向滚动条。

<XDocDemo title="禁止自动换行" :code="Example4Source">
  <Example4 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | `''` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 占位文本 | `string` | `—` | — |
| `name` | 原生 `name` 属性 | `string` | `—` | — |
| `id` | 原生 `id` 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `autoHeight` | 是否随内容自动增高 | `boolean` | `false` | — |
| `fullHeight` | 是否撑满父容器高度 | `boolean` | `false` | — |
| `clearIconSize` | 清空图标尺寸 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 组件宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 组件高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活边框色 | `string` | `—` | — |
| `clearIconColor` | 清空图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字颜色 | `string` | `—` | — |
| `fontFamily` | 字体 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `padding` | 内边距 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textAlign` | 文本对齐 | `TextareaTextAlign` | `—` | — |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框粗细 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读 | `boolean` | `false` | — |
| `clearable` | 是否显示清空按钮 | `boolean` | `false` | — |
| `hideClearButton` | 是否隐藏清空按钮 | `boolean` | `false` | — |
| `status` | 校验状态 | `TextareaStatus` | `'default'` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `rows` | 初始可见行数 | `number` | `3` | — |
| `maxRows` | 最大显示行数，超出后显示竖向滚动条 | `number` | `—` | — |
| `allowWrap` | 是否允许自动换行 | `boolean` | `true` | — |
| `maxlength` | 最大输入长度 | `number` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 输入值变化时触发 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `input` | 输入时触发 | `[value: string]` |
| `change` | 原生 change 时触发 | `[value: string]` |
| `clear` | 点击清空时触发 | `[]` |
| `focus` | 聚焦时触发 | `[event: FocusEvent]` |
| `blur` | 失焦时触发 | `[event: FocusEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `keydown` | 按键按下时触发 | `[event: KeyboardEvent]` |
| `keyup` | 按键释放时触发 | `[event: KeyboardEvent]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TextareaFontSize

```ts
export type TextareaFontSize = BaseInputFontSize
```

### TextareaStatus

```ts
export type TextareaStatus = BaseInputStatus
```

### TextareaTextAlign

```ts
export type TextareaTextAlign = BaseInputTextAlign
```

### TextareaProps

```ts
export interface TextareaProps extends ElementStyleProps {
  showActiveBorder?: boolean
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  hideClearButton?: boolean
  status?: TextareaStatus
  rows?: number
  maxRows?: number
  autoHeight?: boolean
  fullHeight?: boolean
  allowWrap?: boolean
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
  padding?: number | string
  textAlign?: TextareaTextAlign
  inputBackgroundColor?: string
  name?: string
  id?: string
  maxlength?: number
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
