<script setup lang="ts">
import Example1 from '../examples/grid/Example1.vue'
import Example1Source from '../examples/grid/Example1.vue?raw'
import Example2 from '../examples/grid/Example2.vue'
import Example2Source from '../examples/grid/Example2.vue?raw'
import Example3 from '../examples/grid/Example3.vue'
import Example3Source from '../examples/grid/Example3.vue?raw'
import Example4 from '../examples/grid/Example4.vue'
import Example4Source from '../examples/grid/Example4.vue?raw'
import Example5 from '../examples/grid/Example5.vue'
import Example5Source from '../examples/grid/Example5.vue?raw'
</script>
# 宫格 Grid

`XGrid` 用于构建二维宫格和栅格布局，适合九宫格、16 宫格、卡片列表、表单区域分组和需要跨行跨列的局部布局。

`XBrick` 更适合左右栏、上下区块这类一维分隔；需要二维行列时优先使用 `XGrid`。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 九宫格和 16 宫格

没有默认插槽内容时，可以通过 `count` 快速生成占位格，方便调试宫格尺寸。

<XDocDemo title="九宫格和 16 宫格" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 跨行跨列

`XGridItem` 支持 `span`、`colSpan`、`rowSpan`，也可以通过 `column`、`row` 直接传入 CSS grid line。

<XDocDemo title="跨行跨列" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 响应式列数

通过 `responsiveColumns` 可以按断点调整列数。`lg` 在 `1024px` 及以下生效，`md` 在 `768px` 及以下生效，`sm` 在 `640px` 及以下生效；未配置的断点会回退到更大断点或 `columns`。

<XDocDemo title="响应式列数" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 颜色、边框和圆角

容器和格子都公开了常用外观属性，数字尺寸会自动转为 `px`。

<XDocDemo title="颜色、边框和圆角" :code="Example5Source">
  <Example5 />
</XDocDemo>

### Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列模板；数字转为 `repeat(n, minmax(0, 1fr))`，字符串原样作为 CSS 值 | `number \| string` | `3` |
| responsiveColumns | 响应式列模板；支持 `sm`、`md`、`lg` 三个断点，数字转为等分列模板，字符串原样作为 CSS 值 | `GridResponsiveColumns` | - |
| rows | 行模板；数字转为 `repeat(n, minmax(0, 1fr))`，字符串原样作为 CSS 值 | `number \| string` | - |
| gap | 横竖统一间距，数字按 px 处理 | `number \| string` | - |
| rowGap | 竖向间距，优先级高于 `gap` | `number \| string` | - |
| columnGap | 横向间距，优先级高于 `gap` | `number \| string` | - |
| width | 容器宽度 | `number \| string` | `100%` |
| height | 容器高度 | `number \| string` | - |
| minWidth | 容器最小宽度 | `number \| string` | `0` |
| minHeight | 容器最小高度 | `number \| string` | `0` |
| padding | 容器内边距 | `number \| string` | - |
| autoRows | 自动生成行尺寸 | `number \| string` | - |
| autoColumns | 自动生成列尺寸 | `number \| string` | - |
| justifyItems | 格子默认水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| alignItems | 格子默认垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| backgroundColor | 容器背景色 | `string` | - |
| textColor | 容器文字色 | `string` | - |
| borderColor | 容器边框颜色 | `string` | - |
| borderWidth | 容器边框粗细 | `number \| string` | - |
| borderStyle | 容器边框样式 | `string` | `'solid'` |
| radius | 容器圆角 | `number \| string` | - |
| count | 无默认插槽内容时生成的占位格数量 | `number` | `0` |

### GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列跨度快捷属性 | `number` | - |
| colSpan | 列跨度 | `number` | - |
| rowSpan | 行跨度 | `number` | - |
| column | 自定义 `grid-column` | `string` | - |
| row | 自定义 `grid-row` | `string` | - |
| width | 格子宽度 | `number \| string` | - |
| height | 格子高度 | `number \| string` | - |
| minWidth | 格子最小宽度 | `number \| string` | `0` |
| minHeight | 格子最小高度 | `number \| string` | `0` |
| padding | 格子内边距 | `number \| string` | - |
| justifySelf | 当前格子水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| alignSelf | 当前格子垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| horizontalCenter | 让格子内的直接插槽内容水平居中；不改变格子在网格中的宽度或位置 | `boolean` | `false` |
| backgroundColor | 格子背景色 | `string` | - |
| textColor | 格子文字色 | `string` | - |
| borderColor | 格子边框颜色 | `string` | - |
| borderWidth | 格子边框粗细 | `number \| string` | - |
| borderStyle | 格子边框样式 | `string` | `'solid'` |
| radius | 格子圆角 | `number \| string` | - |
| overflow | 内容溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |

### 类型

```ts
interface GridResponsiveColumns {
  sm?: number | string
  md?: number | string
  lg?: number | string
}
```

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XGrid · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `gap` | 横竖统一间距，数字按 px 处理 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `rowGap` | 竖向间距，优先级高于 `gap` | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `columnGap` | 横向间距，优先级高于 `gap` | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 容器宽度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 容器高度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 容器最小宽度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minHeight` | 容器最小高度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XGrid · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `padding` | 容器内边距 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `alignItems` | 格子默认垂直对齐 | `GridAlign` | `'stretch'` | — |
| `backgroundColor` | 容器背景色 | `string` | `—` | — |
| `textColor` | 容器文字色 | `string` | `—` | — |
| `borderColor` | 容器边框颜色 | `string` | `—` | — |
| `borderWidth` | 容器边框粗细 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderStyle` | 容器边框样式 | `string` | `—` | — |
| `radius` | 容器圆角 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XGrid · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `columns` | 列模板；数字转为 `repeat(n, minmax(0, 1fr))`，字符串原样作为 CSS 值 | `number \| string` | `3` | — |
| `responsiveColumns` | 响应式列模板；支持 `sm`、`md`、`lg` 三个断点，数字转为等分列模板，字符串原样作为 CSS 值 | `GridResponsiveColumns` | `—` | — |
| `rows` | 行模板；数字转为 `repeat(n, minmax(0, 1fr))`，字符串原样作为 CSS 值 | `number \| string` | `—` | — |
| `autoRows` | 自动生成行尺寸 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `autoColumns` | 自动生成列尺寸 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `justifyItems` | 格子默认水平对齐 | `GridAlign` | `'stretch'` | — |
| `count` | 无默认插槽内容时生成的占位格数量 | `number` | `0` | — |

### XGridItem · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `span` | 列跨度快捷属性 | `number` | `—` | — |
| `colSpan` | 列跨度 | `number` | `—` | — |
| `rowSpan` | 行跨度 | `number` | `—` | — |
| `width` | 格子宽度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 格子高度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 格子最小宽度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minHeight` | 格子最小高度 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XGridItem · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `padding` | 格子内边距 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `alignSelf` | 当前格子垂直对齐 | `GridAlign` | `—` | — |
| `backgroundColor` | 格子背景色 | `string` | `—` | — |
| `textColor` | 格子文字色 | `string` | `—` | — |
| `borderColor` | 格子边框颜色 | `string` | `—` | — |
| `borderWidth` | 格子边框粗细 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderStyle` | 格子边框样式 | `string` | `—` | — |
| `radius` | 格子圆角 | `GridSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XGridItem · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `column` | 自定义 `grid-column` | `string` | `—` | — |
| `row` | 自定义 `grid-row` | `string` | `—` | — |
| `justifySelf` | 当前格子水平对齐 | `GridAlign` | `—` | — |
| `horizontalCenter` | 让格子内的直接插槽内容水平居中；不改变格子在网格中的宽度或位置 | `boolean` | `false` | — |
| `overflow` | 内容溢出方式 | `GridItemOverflow` | `'auto'` | — |

## 插槽

### XGrid · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 放置任意内容，推荐使用 `XGridItem` 包裹需要外观或跨行跨列控制的格子 | `无作用域参数` |

### XGridItem · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 放置任意内容，推荐使用 `XGridItem` 包裹需要外观或跨行跨列控制的格子 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### GridSize

```ts
export type GridSize = number | string
```

### GridAlign

```ts
export type GridAlign = 'start' | 'center' | 'end' | 'stretch'
```

### GridItemOverflow

```ts
export type GridItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
```

### GridResponsiveColumns

```ts
export interface GridResponsiveColumns {
  sm?: number | string
  md?: number | string
  lg?: number | string
}
```

### GridProps

```ts
export interface GridProps {
  columns?: number | string
  responsiveColumns?: GridResponsiveColumns
  rows?: number | string
  gap?: GridSize
  rowGap?: GridSize
  columnGap?: GridSize
  width?: GridSize
  height?: GridSize
  minWidth?: GridSize
  minHeight?: GridSize
  padding?: GridSize
  autoRows?: GridSize
  autoColumns?: GridSize
  justifyItems?: GridAlign
  alignItems?: GridAlign
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: GridSize
  borderStyle?: string
  radius?: GridSize
  count?: number
}
```

### GridItemProps

```ts
export interface GridItemProps {
  span?: number
  colSpan?: number
  rowSpan?: number
  column?: string
  row?: string
  width?: GridSize
  height?: GridSize
  minWidth?: GridSize
  minHeight?: GridSize
  padding?: GridSize
  justifySelf?: GridAlign
  alignSelf?: GridAlign
  horizontalCenter?: boolean
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: GridSize
  borderStyle?: string
  radius?: GridSize
  overflow?: GridItemOverflow
}
```

## 验收说明

1. 切换 `columns` 为 `3` 和 `4`，确认九宫格和 16 宫格等分。
2. 调整 `gap`、`rowGap`、`columnGap`，确认横竖间距优先级正确。
3. 调整浏览器宽度到 `1024px`、`768px`、`640px` 以下，确认 `responsiveColumns` 列数按断点回退。
4. 设置 `colSpan`、`rowSpan`、`column`、`row`，确认单项跨行跨列生效。
5. 调整容器和格子的颜色、边框、圆角、内边距，确认公开外观属性可覆盖。
6. 设置 `horizontalCenter`，确认格子边框仍铺满网格列，直接插槽内容在格子内居中；`justifySelf` 仍只控制格子自身位置。
