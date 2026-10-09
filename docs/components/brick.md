<script setup lang="ts">
import Example1 from '../examples/brick/Example1.vue'
import Example1Source from '../examples/brick/Example1.vue?raw'
import Example2 from '../examples/brick/Example2.vue'
import Example2Source from '../examples/brick/Example2.vue?raw'
import Example3 from '../examples/brick/Example3.vue'
import Example3Source from '../examples/brick/Example3.vue?raw'
import Example4 from '../examples/brick/Example4.vue'
import Example4Source from '../examples/brick/Example4.vue?raw'
import Example5 from '../examples/brick/Example5.vue'
import Example5Source from '../examples/brick/Example5.vue?raw'
</script>
# 砖格 Brick

`XBrick` 用于把一个容器按单一方向分隔成多个区域，适合面板、左右栏、上下分区和可嵌套的局部布局。

固定尺寸区域会先占用空间，未设置尺寸的区域会平分剩余空间。复杂二维布局可以通过嵌套 `XBrick` 实现。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 竖向分隔

<XDocDemo title="竖向分隔" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 多层嵌套

下面通过四层 `XBrick` 组合页面布局：第一层上下分隔页面顶部、主区和底部；第二层把主区分成左侧导航和右侧工作区；第三层把工作区分成摘要和详情；第四层把详情分成两个等宽区域。

每层 `XBrick` 都放在上一层的 `XBrickItem` 中。内层设置 `width="100%"`、`height="100%"` 撑满所在区域；外层显式设置高度，使多层百分比高度有确定的参考尺寸。

`itemSize` 按所在层的 `direction` 决定固定宽度或高度。未设置主轴尺寸的区域平分剩余空间，`gap` 只控制当前层的间距。承载嵌套布局的区域使用 `padding="0"`，文字区域再单独设置内边距与居中，避免继承的内边距逐层累加。

<XDocDemo title="四层嵌套布局" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 根据数量生成空容器

当没有传入内部容器插槽时，可以通过 `count` 生成指定数量的空区域，用于占位或后续动态填充。

<XDocDemo title="根据数量生成空容器" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 区块对齐、内容对齐和内边距

`XBrick` 的 `rightAlign` 用于让直接子区块整体靠右排列；横向分隔时会把区块组推到右侧，竖向分隔时会把区块贴到右侧。横向右对齐时，未设置主轴尺寸的 `XBrickItem` 会按内容收缩，避免继续平分剩余空间。

`XBrick` 仍可以为所有内部容器统一设置内容垂直居中、水平居中、下对齐和内边距；`XBrickItem` 传入同名属性时会覆盖父级配置。`XBrickItem` 的 `rightAlign` 用于控制当前容器内部内容右对齐。若同时开启居中和末端对齐，末端对齐优先。

<XDocDemo title="区块对齐、内容对齐和内边距" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 滚动条样式

`XBrickItem` 默认使用 `overflow="auto"`，内容过多时会显示较细的半透明滚动条。需要隐藏滚动条和溢出内容时，可以显式设置 `overflow="hidden"`。

滚动条颜色可以通过 `--x-brick-scrollbar-thumb` 和 `--x-brick-scrollbar-thumb-hover` 覆盖。

### 尺寸规则

- `direction="horizontal"` 表示从左到右分隔，固定项按 `size || width` 占宽度。
- `direction="vertical"` 表示从上到下分隔，固定项按 `size || height` 占高度。
- 未设置主轴尺寸的 `XBrickItem` 使用 `flex: 1 1 0` 平分剩余空间。
- 设置主轴尺寸的 `XBrickItem` 使用 `flex: 0 0 <size>`。
- 数字尺寸会转成 `px`，字符串尺寸会原样作为 CSS 长度。
- `XBrickItem` 的 `verticalCenter`、`horizontalCenter`、`bottomAlign`、`rightAlign` 和 `padding` 优先级高于 `XBrick` 的内容布局同名属性。
- `XBrickItem` 内继续嵌套 `XBrick` 时，内层 `XBrick` 会继承外层 item 已合并后的居中和内边距；内层 `XBrick` 显式传入同名属性时仍以显式值为准。

### Brick Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 分隔方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| count | 无内部容器时生成的空容器数量 | `number` | `0` |
| gap | 容器间距，支持数字像素或 CSS 长度 | `number \| string` | `0` |
| width | 外层宽度，支持数字像素或 CSS 长度 | `number \| string` | `undefined` |
| height | 外层高度，支持数字像素或 CSS 长度 | `number \| string` | `undefined` |
| wrap | 是否允许换行 | `boolean` | `false` |
| verticalCenter | 是否让内部容器内容垂直居中 | `boolean` | `false` |
| horizontalCenter | 是否让内部容器内容水平居中 | `boolean` | `false` |
| bottomAlign | 是否让内部容器内容下对齐，优先级高于 `verticalCenter` | `boolean` | `false` |
| rightAlign | 是否让直接子区块整体靠右排列；横向分隔时未设置主轴尺寸的子区块会按内容收缩 | `boolean` | `false` |
| backgroundColor | 外层背景色，会通过 `--x-brick-bg` 写到 `XBrick` 自身，不会向子组件写入通用背景变量 | `string` | `undefined`，默认显示为透明 |
| textColor | 内部容器文字颜色，会通过 CSS 变量传递给 `XBrickItem` | `string` | `undefined` |
| padding | 内部容器默认内边距，支持数字像素或 CSS 长度 | `number \| string` | `undefined` |

### BrickItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemSize | 沿主轴的固定尺寸，优先级高于 `width` 或 `height` | `number \| string` | `undefined` |
| width | 宽度；横向分隔时也作为主轴尺寸 | `number \| string` | `undefined` |
| height | 高度；竖向分隔时也作为主轴尺寸 | `number \| string` | `undefined` |
| minSize | 沿主轴的最小尺寸 | `number \| string` | `undefined` |
| maxSize | 沿主轴的最大尺寸 | `number \| string` | `undefined` |
| backgroundColor | 当前容器背景色 | `string` | `'transparent'` |
| overflow | 内容溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |
| verticalCenter | 是否让当前容器内容垂直居中，优先级高于 `XBrick` | `boolean` | `undefined` |
| horizontalCenter | 是否让当前容器内容水平居中，优先级高于 `XBrick` | `boolean` | `undefined` |
| bottomAlign | 是否让当前容器内容下对齐，优先级高于 `XBrick` 和 `verticalCenter` | `boolean` | `undefined` |
| rightAlign | 是否让当前容器内容右对齐，优先级高于 `XBrick` 和 `horizontalCenter` | `boolean` | `undefined` |
| padding | 当前容器内边距，优先级高于 `XBrick` | `number \| string` | `undefined` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XBrick · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 分隔方向 | `BrickDirection` | `'horizontal'` | — |
| `gap` | 容器间距，支持数字像素或 CSS 长度 | `BrickSize` | `0` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 外层宽度，支持数字像素或 CSS 长度 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 外层高度，支持数字像素或 CSS 长度 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XBrick · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `backgroundColor` | 外层背景色，会通过 `--x-brick-bg` 写到 `XBrick` 自身，不会向子组件写入通用背景变量 | `string` | `—` | — |
| `bottomAlign` | 是否让内部容器内容下对齐，优先级高于 `verticalCenter` | `boolean` | `undefined` | — |
| `rightAlign` | 是否让直接子区块整体靠右排列；横向分隔时未设置主轴尺寸的子区块会按内容收缩 | `boolean` | `undefined` | — |
| `padding` | 内部容器默认内边距，支持数字像素或 CSS 长度 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textColor` | 内部容器文字颜色，会通过 CSS 变量传递给 `XBrickItem` | `string` | `—` | — |

### XBrick · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `count` | 无内部容器时生成的空容器数量 | `number` | `0` | — |
| `wrap` | 是否允许换行 | `boolean` | `false` | — |
| `verticalCenter` | 是否让内部容器内容垂直居中 | `boolean` | `undefined` | — |
| `horizontalCenter` | 是否让内部容器内容水平居中 | `boolean` | `undefined` | — |

### XBrickItem · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `itemSize` | 沿主轴的固定尺寸，优先级高于 `width` 或 `height` | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `width` | 宽度；横向分隔时也作为主轴尺寸 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 高度；竖向分隔时也作为主轴尺寸 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minSize` | 沿主轴的最小尺寸 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `maxSize` | 沿主轴的最大尺寸 | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XBrickItem · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `backgroundColor` | 当前容器背景色 | `string` | `'transparent'` | — |
| `bottomAlign` | 是否让当前容器内容下对齐，优先级高于 `XBrick` 和 `verticalCenter` | `boolean` | `undefined` | — |
| `rightAlign` | 是否让当前容器内容右对齐，优先级高于 `XBrick` 和 `horizontalCenter` | `boolean` | `undefined` | — |
| `padding` | 当前容器内边距，优先级高于 `XBrick` | `BrickSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textColor` | 当前容器文字颜色；未设置时沿用父容器文字颜色 | `string` | `—` | — |

### XBrickItem · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `overflow` | 内容溢出方式 | `BrickItemOverflow` | `'auto'` | — |
| `verticalCenter` | 是否让当前容器内容垂直居中，优先级高于 `XBrick` | `boolean` | `undefined` | — |
| `horizontalCenter` | 是否让当前容器内容水平居中，优先级高于 `XBrick` | `boolean` | `undefined` | — |

## 插槽

### XBrick · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 放置 `XBrickItem`，也可以嵌套其它 `XBrick` 形成组合布局 | `无作用域参数` |

### XBrickItem · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 当前容器内部内容，支持嵌套 XBrick 组合布局 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### BrickDirection

```ts
export type BrickDirection = 'horizontal' | 'vertical'
```

### BrickSize

```ts
export type BrickSize = number | string
```

### BrickItemOverflow

```ts
export type BrickItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
```

### BrickProps

```ts
export interface BrickProps extends ElementStyleProps {
  direction?: BrickDirection
  count?: number
  gap?: BrickSize
  width?: BrickSize
  height?: BrickSize
  wrap?: boolean
  backgroundColor?: string
  verticalCenter?: boolean
  horizontalCenter?: boolean
  bottomAlign?: boolean
  rightAlign?: boolean
  padding?: BrickSize
}
```

### BrickItemProps

```ts
export interface BrickItemProps extends ElementStyleProps {
  itemSize?: BrickSize
  width?: BrickSize
  height?: BrickSize
  minSize?: BrickSize
  maxSize?: BrickSize
  backgroundColor?: string
  overflow?: BrickItemOverflow
  verticalCenter?: boolean
  horizontalCenter?: boolean
  bottomAlign?: boolean
  rightAlign?: boolean
  padding?: BrickSize
}
```

## 验收说明

1. 在 Histoire 中切换横向和竖向，确认固定尺寸和自适应区域分配正确。
2. 清空中间区域尺寸，确认多个未设尺寸的容器平分剩余空间。
3. 关闭内部容器开关，调整 `count`，确认可以生成指定数量的空容器。
4. 开启 `XBrick` 的右对齐，确认直接子区块整体靠右排列；再开启 `XBrickItem` 的右对齐和下对齐，确认子项内部内容右下对齐。
