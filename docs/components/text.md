<script setup lang="ts">
import Example1 from '../examples/text/Example1.vue'
import Example1Source from '../examples/text/Example1.vue?raw'
import Example2 from '../examples/text/Example2.vue'
import Example2Source from '../examples/text/Example2.vue?raw'
import Example3 from '../examples/text/Example3.vue'
import Example3Source from '../examples/text/Example3.vue?raw'
</script>
# 文本 Text

用于展示标题、正文、辅助说明和状态文本。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 外观接口

`XText` 支持常用外观属性，可用于在低代码配置面板中统一控制文本容器、边框和字号样式。
`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。
`fontWeight` 用于控制字体粗细，支持 `400`、`700`、`normal`、`bold` 等 CSS `font-weight` 值；未传入时正文默认 `400`，`variant="title"` 默认 `700`。
设置 `autoHeight` 后，组件会撑满父元素高度；如需控制文字在父元素内的垂直位置，可使用 `verticalAlign="top" | "middle" | "bottom"`。当需要更贴近底部对齐时，可配合 `lineHeight="1"` 减少文字行盒上下留白。

<XDocDemo title="外观接口" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 文本格式化

通过 `formatter` 可以把绑定值格式化后展示。组件不内置具体业务格式，展示规则由使用方决定。

<XDocDemo title="文本格式化" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定文本值，无默认插槽时显示 | `string \| number` | `''` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `name` | 原生 `name` 属性 | `string` | `—` | — |
| `id` | 原生 `id` 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `lineHeight` | 行高，数字会作为无单位行高使用 | `number \| string` | `—` | 数字为行高倍数；字符串使用 CSS 单位 |
| `width` | 组件宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 组件高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `autoHeight` | 是否自动高度 | `boolean` | `false` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 文本视觉形态 | `TextType` | `'default'` | — |
| `fontFamily` | 字体样式 | `string` | `—` | — |
| `fontWeight` | 字体粗细 | `number \| string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `padding` | 容器内边距 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textAlign` | 文字对齐 | `TextAlign` | `—` | — |
| `verticalAlign` | 垂直对齐 | `TextVerticalAlign` | `'middle'` | — |
| `borderWidth` | 边框粗细 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `tag` | 渲染标签 | `string` | `'span'` | — |
| `truncated` | 是否单行省略 | `boolean` | `false` | — |
| `formatter` | 自定义格式化函数 | `TextFormatter` | `—` | — |
| `maxlength` | 最大显示长度 | `number` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TextFontSize

```ts
export type TextFontSize = number
```

### TextType

```ts
export type TextType = 'default' | 'title' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'
```

### TextAlign

```ts
export type TextAlign = 'left' | 'center' | 'right'
```

### TextFormatter

```ts
export type TextFormatter = (value: string | number) => string
```

### TextProps

```ts
export interface TextProps extends ElementStyleProps {
  modelValue?: string | number
  variant?: TextType
  tag?: string
  truncated?: boolean
  formatter?: TextFormatter
  disabled?: boolean
  fontFamily?: string
  fontWeight?: number | string
  fontSize?: number
  lineHeight?: number | string
  width?: number | string
  height?: number | string
  autoHeight?: boolean
  padding?: number | string
  radius?: number | string
  textAlign?: TextAlign
  verticalAlign?: TextVerticalAlign
  name?: string
  id?: string
  maxlength?: number
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### TextVerticalAlign

```ts
export type TextVerticalAlign = 'top' | 'middle' | 'bottom'
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
