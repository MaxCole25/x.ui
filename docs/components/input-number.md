<script setup lang="ts">
import Example1 from '../examples/input-number/Example1.vue'
import Example1Source from '../examples/input-number/Example1.vue?raw'
</script>
# 数字输入框 InputNumber

用于输入带步进控制的数值。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 尺寸规则

`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前值 | `number` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 占位文本 | `string` | `'请输入数字'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 控件高度，独立于字号 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `fullWidth` | 是否撑满父元素宽度 | `boolean` | `false` | — |
| `fullHeight` | 是否撑满父元素高度 | `boolean` | `false` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示聚焦边框 | `boolean` | `true` | — |
| `padding` | 内边距，数字按 px 处理；字符串使用 CSS 单位 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活边框颜色，优先级高于 `accentColor` 和 `color` | `string` | `—` | — |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `fontFamily` | 字体 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `decreaseButtonBackgroundColor` | 减号按钮背景色 | `string` | `—` | — |
| `increaseButtonBackgroundColor` | 加号按钮背景色 | `string` | `—` | — |
| `borderWidth` | 边框粗细 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `min` | 最小值 | `number` | `—` | — |
| `max` | 最大值 | `number` | `—` | — |
| `step` | 步进 | `number` | `1` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | update:modelValue 事件 | `[value: number \| undefined]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | change 事件 | `[value: number \| undefined]` |
| `focus` | focus 事件 | `[event: FocusEvent]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### InputNumberProps

```ts
export interface InputNumberProps extends ElementStyleProps {
  showActiveBorder?: boolean
  height?: number | string
  padding?: number | string
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  fullWidth?: boolean
  fullHeight?: boolean
  accentColor?: string
  activeBorderColor?: string
  radius?: number | string
  fontFamily?: string
  fontSize?: number
  decreaseButtonBackgroundColor?: string
  increaseButtonBackgroundColor?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
