<script setup lang="ts">
import Example1 from '../examples/flow/Example1.vue'
import Example1Source from '../examples/flow/Example1.vue?raw'
import Example2 from '../examples/flow/Example2.vue'
import Example2Source from '../examples/flow/Example2.vue?raw'
import Example3 from '../examples/flow/Example3.vue'
import Example3Source from '../examples/flow/Example3.vue?raw'
</script>
# 流式布局 Flow

`XFlow` 用于按元素最小宽度自动换行，适合图标库、工具入口、卡片选择器和其它数量较多的轻量元素列表。

和 `XGrid` 的固定列数不同，`XFlow` 通过 `itemWidth` 控制每列最小宽度，容器变宽或变窄时会自动增减列数。大量图标场景建议使用 `items` 数据驱动模式，并开启 `lazy` 增量渲染。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 增量渲染

开启 `lazy` 后，组件会先渲染 `initialCount` 条数据，滚动接近底部时再按 `loadCount` 追加。它不是完整虚拟滚动，但对大量图标这类轻量节点更简单稳定。

<XDocDemo title="大量图标增量渲染" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 主题外观

容器和子项都提供配色、边框、圆角、内边距接口，便于在业务主题中统一覆盖。

<XDocDemo title="主题外观" :code="Example3Source">
  <Example3 />
</XDocDemo>

### Flow Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据驱动列表；传入后默认插槽会收到 `item` 和 `index` | `unknown[]` | - |
| itemKey | 子项 key；支持字段名或函数 | `string \| number \| ((item, index) => string \| number)` | - |
| itemWidth | 流式列最小宽度 | `number \| string` | `'72px'` |
| gap | 横竖统一间距，数字按 px 处理 | `number \| string` | - |
| rowGap | 竖向间距，优先级高于 `gap` | `number \| string` | - |
| columnGap | 横向间距，优先级高于 `gap` | `number \| string` | - |
| width | 容器宽度 | `number \| string` | `100%` |
| height | 容器高度 | `number \| string` | - |
| minWidth | 容器最小宽度 | `number \| string` | `0` |
| minHeight | 容器最小高度 | `number \| string` | `0` |
| padding | 容器内边距 | `number \| string` | - |
| justifyItems | 子项默认水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| alignItems | 子项默认垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| backgroundColor | 容器背景色 | `string` | - |
| textColor | 容器文字色 | `string` | - |
| borderColor | 容器边框颜色 | `string` | - |
| borderWidth | 容器边框粗细 | `number \| string` | - |
| borderStyle | 容器边框样式 | `string` | `'solid'` |
| radius | 容器圆角 | `number \| string` | - |
| itemBackgroundColor | 子项默认背景色 | `string` | - |
| itemTextColor | 子项默认文字色 | `string` | - |
| itemBorderColor | 子项默认边框颜色 | `string` | - |
| itemBorderWidth | 子项默认边框粗细 | `number \| string` | - |
| itemBorderStyle | 子项默认边框样式 | `string` | `'solid'` |
| itemRadius | 子项默认圆角 | `number \| string` | - |
| itemPadding | 子项默认内边距 | `number \| string` | - |
| itemOverflow | 子项默认溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |
| lazy | 是否开启增量渲染 | `boolean` | `false` |
| initialCount | 开启增量渲染时的初始渲染数量 | `number` | `120` |
| loadCount | 每次追加渲染数量 | `number` | `80` |

### FlowItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 子项宽度 | `number \| string` | - |
| height | 子项高度 | `number \| string` | - |
| minWidth | 子项最小宽度 | `number \| string` | `0` |
| minHeight | 子项最小高度 | `number \| string` | `0` |
| padding | 子项内边距 | `number \| string` | - |
| justifySelf | 当前子项水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| alignSelf | 当前子项垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| backgroundColor | 子项背景色 | `string` | - |
| textColor | 子项文字色 | `string` | - |
| borderColor | 子项边框颜色 | `string` | - |
| borderWidth | 子项边框粗细 | `number \| string` | - |
| borderStyle | 子项边框样式 | `string` | - |
| radius | 子项圆角 | `number \| string` | - |
| overflow | 子项溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | - |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XFlow · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `items` | 数据驱动列表；传入后默认插槽会收到 `item` 和 `index` | `unknown[]` | `—` | — |

### XFlow · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `itemWidth` | 流式列最小宽度 | `FlowSize` | `'72px'` | 数字为 px；字符串使用 CSS 单位 |
| `gap` | 横竖统一间距，数字按 px 处理 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `rowGap` | 竖向间距，优先级高于 `gap` | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `columnGap` | 横向间距，优先级高于 `gap` | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 容器宽度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 容器高度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 容器最小宽度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minHeight` | 容器最小高度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XFlow · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `padding` | 容器内边距 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `alignItems` | 子项默认垂直对齐 | `FlowAlign` | `'center'` | — |
| `backgroundColor` | 容器背景色 | `string` | `—` | — |
| `textColor` | 容器文字色 | `string` | `—` | — |
| `borderColor` | 容器边框颜色 | `string` | `—` | — |
| `borderWidth` | 容器边框粗细 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderStyle` | 容器边框样式 | `string` | `'solid'` | — |
| `radius` | 容器圆角 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `itemBackgroundColor` | 子项默认背景色 | `string` | `—` | — |
| `itemTextColor` | 子项默认文字色 | `string` | `—` | — |
| `itemBorderColor` | 子项默认边框颜色 | `string` | `—` | — |
| `itemBorderWidth` | 子项默认边框粗细 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `itemBorderStyle` | 子项默认边框样式 | `string` | `'solid'` | — |
| `itemRadius` | 子项默认圆角 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `itemPadding` | 子项默认内边距 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XFlow · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `itemKey` | 子项 key；支持字段名或函数 | `FlowItemKey` | `—` | — |
| `justifyItems` | 子项默认水平对齐 | `FlowAlign` | `'center'` | — |
| `itemOverflow` | 子项默认溢出方式 | `FlowItemOverflow` | `'auto'` | — |
| `lazy` | 是否开启增量渲染 | `boolean` | `false` | — |
| `initialCount` | 开启增量渲染时的初始渲染数量 | `number` | `120` | — |
| `loadCount` | 每次追加渲染数量 | `number` | `80` | — |

### XFlowItem · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 子项宽度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 子项高度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 子项最小宽度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minHeight` | 子项最小高度 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XFlowItem · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `padding` | 子项内边距 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `alignSelf` | 当前子项垂直对齐 | `FlowAlign` | `—` | — |
| `backgroundColor` | 子项背景色 | `string` | `—` | — |
| `textColor` | 子项文字色 | `string` | `—` | — |
| `borderColor` | 子项边框颜色 | `string` | `—` | — |
| `borderWidth` | 子项边框粗细 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderStyle` | 子项边框样式 | `string` | `—` | — |
| `radius` | 子项圆角 | `FlowSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XFlowItem · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `justifySelf` | 当前子项水平对齐 | `FlowAlign` | `—` | — |
| `overflow` | 子项溢出方式 | `FlowItemOverflow` | `undefined` | — |

## 插槽

### XFlow · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 数据驱动模式下接收 `{ item, index }`；非数据模式下放置普通内容或 `XFlowItem` | `item: unknown; index: number` |

### XFlowItem · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 数据驱动模式下接收 `{ item, index }`；非数据模式下放置普通内容或 `XFlowItem` | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### FlowSize

```ts
export type FlowSize = number | string
```

### FlowAlign

```ts
export type FlowAlign = 'start' | 'center' | 'end' | 'stretch'
```

### FlowItemOverflow

```ts
export type FlowItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
```

### FlowItemKey

```ts
export type FlowItemKey = string | number | ((item: unknown, index: number) => string | number)
```

### FlowProps

```ts
export interface FlowProps {
  items?: unknown[]
  itemKey?: FlowItemKey
  itemWidth?: FlowSize
  gap?: FlowSize
  rowGap?: FlowSize
  columnGap?: FlowSize
  width?: FlowSize
  height?: FlowSize
  minWidth?: FlowSize
  minHeight?: FlowSize
  padding?: FlowSize
  justifyItems?: FlowAlign
  alignItems?: FlowAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: FlowSize
  borderStyle?: string
  radius?: FlowSize
  itemBackgroundColor?: string
  itemTextColor?: string
  itemBorderColor?: string
  itemBorderWidth?: FlowSize
  itemBorderStyle?: string
  itemRadius?: FlowSize
  itemPadding?: FlowSize
  itemOverflow?: FlowItemOverflow
  lazy?: boolean
  initialCount?: number
  loadCount?: number
}
```

### FlowItemProps

```ts
export interface FlowItemProps {
  width?: FlowSize
  height?: FlowSize
  minWidth?: FlowSize
  minHeight?: FlowSize
  padding?: FlowSize
  justifySelf?: FlowAlign
  alignSelf?: FlowAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: FlowSize
  borderStyle?: string
  radius?: FlowSize
  overflow?: FlowItemOverflow
}
```

## 验收说明

1. 调整 `itemWidth` 和浏览器宽度，确认列数会自动变化。
2. 开启 `lazy` 并滚动到底部，确认图标会分批追加渲染。
3. 设置容器和子项的背景、边框、圆角、内边距，确认主题外观接口生效。

