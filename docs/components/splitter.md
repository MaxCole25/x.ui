<script setup lang="ts">
import Example1 from '../examples/splitter/Example1.vue'
import Example1Source from '../examples/splitter/Example1.vue?raw'
import Example2 from '../examples/splitter/Example2.vue'
import Example2Source from '../examples/splitter/Example2.vue?raw'
</script>
# 可拖拽分栏 Splitter

`XSplitter` 用于将容器分成可由鼠标或触控拖拽调整的多个面板。直接子元素使用 `XSplitPane`，可通过 `locked` 固定某个面板大小。默认状态只显示 1px 分隔线；鼠标靠近分隔区时会显示方向箭头，提示可拖拽调整相邻面板。

## 使用示例

### 横向三栏

<XDocDemo title="横向三栏" :code="Example1Source">
  <Example1 />
</XDocDemo>

拖拽分隔条可调整相邻面板的尺寸，尺寸数组通过 `v-model` 同步更新。

### 竖向与锁定栏位

竖向分栏需要设置可计算的高度。锁定面板后，其相邻分隔条不再允许拖拽。

<XDocDemo title="竖向与锁定栏位" :code="Example2Source">
  <Example2 />
</XDocDemo>

### Splitter Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 与各 `XSplitPane` 顺序一致的主轴像素尺寸 | `number[]` | — |
| direction | 分栏方向，`horizontal` 为左右栏，`vertical` 为上下栏 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| width | 容器宽度 | `number \| string` | `'100%'` |
| height | 容器高度 | `number \| string` | — |
| splitterSize | 分隔拖拽区尺寸（px），可见分隔线固定为 1px | `number` | `6` |
| splitterColor | 分隔条颜色 | `string` | `#d8e2e8` |
| activeSplitterColor | 悬停或拖拽时的分隔条颜色 | `string` | `#5b6b9a` |

### SplitPane Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| paneSize | 未使用 `v-model` 时的初始主轴尺寸，支持像素或百分比 | `number \| string` | — |
| minSize | 主轴最小尺寸（px） | `number` | `0` |
| maxSize | 主轴最大尺寸（px） | `number` | — |
| padding | 面板内容内边距，支持数字像素或 CSS 长度 | `number \| string` | — |
| locked | 是否锁定该栏的大小 | `boolean` | `false` |
| overflow | 内容溢出行为 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XSplitPane · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `paneSize` | 未使用 `v-model` 时的初始主轴尺寸，支持像素或百分比 | `SplitterSize` | `—` | — |
| `minSize` | 主轴最小尺寸（px） | `number` | `—` | — |
| `maxSize` | 主轴最大尺寸（px） | `number` | `—` | — |

### XSplitPane · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `padding` | 面板内容内边距，支持数字像素或 CSS 长度 | `SplitterSize` | `—` | 数字为 px；字符串使用 CSS 单位 |

### XSplitPane · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `locked` | 是否锁定该栏的大小 | `boolean` | `false` | — |
| `overflow` | 内容溢出行为 | `SplitPaneOverflow` | `'auto'` | — |

### XSplitter · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 与各 `XSplitPane` 顺序一致的主轴像素尺寸 | `number[]` | `—` | — |

### XSplitter · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 分栏方向，`horizontal` 为左右栏，`vertical` 为上下栏 | `SplitterDirection` | `'horizontal'` | — |
| `width` | 容器宽度 | `SplitterSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 容器高度 | `SplitterSize` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `splitterSize` | 分隔拖拽区尺寸（px），可见分隔线固定为 1px | `number` | `6` | — |

### XSplitter · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `splitterColor` | 分隔条颜色 | `string` | `—` | — |
| `activeSplitterColor` | 悬停或拖拽时的分隔条颜色 | `string` | `—` | — |
| `borderWidth` | 边框宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 拖拽过程中更新尺寸数组 | `[value: number[]]` |

### 布局与尺寸

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `resize-start` | 开始拖拽分隔条 | `[payload: SplitterResizePayload]` |
| `resize` | 拖拽过程中触发 | `[payload: SplitterResizePayload]` |
| `resize-end` | 结束拖拽 | `[payload: SplitterResizePayload]` |

## 插槽

### XSplitPane · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

### XSplitter · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### SplitterDirection

```ts
export type SplitterDirection = 'horizontal' | 'vertical'
```

### SplitterSize

```ts
export type SplitterSize = number | string
```

### SplitPaneOverflow

```ts
export type SplitPaneOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
```

### SplitterProps

```ts
export interface SplitterProps extends ElementStyleProps {
  modelValue?: number[]
  direction?: SplitterDirection
  width?: SplitterSize
  height?: SplitterSize
  splitterSize?: number
  splitterColor?: string
  activeSplitterColor?: string
}
```

### SplitPaneProps

```ts
export interface SplitPaneProps {
  paneSize?: SplitterSize
  minSize?: number
  maxSize?: number
  padding?: SplitterSize
  locked?: boolean
  overflow?: SplitPaneOverflow
}
```

### SplitterResizePayload

```ts
export interface SplitterResizePayload {
  index: number
  sizes: number[]
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### SplitPaneRegistration

```ts
export interface SplitPaneRegistration {
  element: Ref<HTMLElement | undefined>
  props: SplitPaneProps
}
```

### SplitterContext

```ts
export interface SplitterContext {
  direction: ComputedRef<SplitterDirection>
  registerPane: (pane: SplitPaneRegistration) => () => void
}
```

## 验收说明

1. 在横向和竖向模式靠近分隔线，确认显示对应方向箭头，并拖动各分隔条确认仅相邻两个栏位改变。
2. 设置最小/最大尺寸，确认拖动不会突破边界。
3. 锁定任意面板，确认其相邻分隔条变为不可拖拽。
4. 在包含表格或滚动内容的面板中，确认内容不会越过分隔区。
5. 将 `v-model` 的尺寸数组保存并重新传入，确认布局可恢复。

