<script setup lang="ts">
import Example1 from '../examples/switch/Example1.vue'
import Example1Source from '../examples/switch/Example1.vue?raw'
import Example2 from '../examples/switch/Example2.vue'
import Example2Source from '../examples/switch/Example2.vue?raw'
import Example3 from '../examples/switch/Example3.vue'
import Example3Source from '../examples/switch/Example3.vue?raw'
import Example4 from '../examples/switch/Example4.vue'
import Example4Source from '../examples/switch/Example4.vue?raw'
import Example5 from '../examples/switch/Example5.vue'
import Example5Source from '../examples/switch/Example5.vue?raw'
import Example6 from '../examples/switch/Example6.vue'
import Example6Source from '../examples/switch/Example6.vue?raw'
</script>
# Switch 开关

用于在开和关两种状态之间切换。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 带文字

<XDocDemo title="带文字" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 文字位置

<XDocDemo title="文字位置" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 尺寸

`fontSize` 使用数字，单位 px，只控制文字大小，未设置时继承 Form 字号，独立使用时为 14px。轨道默认高度为 24px，宽高比为 2:1；`height` 优先于 `buttonSize`，两者都未设置时使用 24px。字号不会改变轨道尺寸或圆角。

<XDocDemo title="尺寸" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 禁用状态

<XDocDemo title="禁用状态" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 业务主题

<XDocDemo title="业务主题" :code="Example6Source">
  <Example6 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 绑定值 | `boolean` | `false` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `activeText` | 开启文案 | `string` | `'开'` | — |
| `inactiveText` | 关闭文案 | `string` | `'关'` | — |
| `labelPosition` | 文案位置，`outside` 为开关左右两侧，`inside` 为轨道内部 | `SwitchLabelPosition` | `'outside'` | — |
| `name` | 原生 name 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 轨道高度，独立于字号 | `number \| string` | `—`<br>height 优先于 buttonSize；两者未设置时轨道高度为 24px | 数字为 px；字符串使用 CSS 单位 |
| `buttonSize` | 未设置 height 时的轨道高度，宽度按 2:1 等比调整 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `checkedColor` | 开启时背景色 | `string` | `—` | — |
| `inactiveColor` | 关闭时背景色 | `string` | `—` | — |
| `thumbColor` | 圆形按钮色 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined`<br>未设置时继承 Form 字号，独立使用时为 14px | px |
| `fontFamily` | 开/关文字字体 | `string` | `—` | — |
| `radius` | 轨道圆角，未设置时使用 999px 胶囊圆角 | `number \| string` | `—`<br>未设置时使用 999px 胶囊圆角 | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `activeValue` | 开启值 | `SwitchValue` | `true` | — |
| `inactiveValue` | 关闭值 | `SwitchValue` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 非禁用状态下切换时首先触发，参数为下一个开启值或关闭值 | `[value: SwitchValue]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | update:modelValue 之后触发，参数与其一致；禁用时不触发 | `[value: SwitchValue]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### SwitchFontSize

```ts
export type SwitchFontSize = number
```

### SwitchValue

```ts
export type SwitchValue = boolean
```

### SwitchLabelPosition

```ts
export type SwitchLabelPosition = 'outside' | 'inside'
```

### SwitchProps

```ts
export interface SwitchProps extends ElementStyleProps {
  height?: number | string
  modelValue?: boolean
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  labelPosition?: SwitchLabelPosition
  activeValue?: SwitchValue
  inactiveValue?: SwitchValue
  checkedColor?: string
  inactiveColor?: string
  thumbColor?: string
  buttonSize?: number | string
  fontSize?: number
  fontFamily?: string
  radius?: number | string
  name?: string
}
```

### SwitchEmits

```ts
export interface SwitchEmits {
  'update:modelValue': [value: SwitchValue]
  change: [value: SwitchValue]
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
