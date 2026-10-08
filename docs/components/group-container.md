<script setup lang="ts">
import Example1 from '../examples/group-container/Example1.vue'
import Example1Source from '../examples/group-container/Example1.vue?raw'
import Example2 from '../examples/group-container/Example2.vue'
import Example2Source from '../examples/group-container/Example2.vue?raw'
import Example3 from '../examples/group-container/Example3.vue'
import Example3Source from '../examples/group-container/Example3.vue?raw'
</script>
# 分组容器 GroupContainer

用于将同一分类下的表单或页面内容放在带标题外框中。标题覆盖在边线上，适合“基础设置”“高级设置”等内容分区。

`XGroupContainer` 负责语义分组和外框样式；需要卡片头部、底部或阴影时，请使用 `XCard`。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 标题位置

通过 `titlePosition` 设置标题在外框上的位置，支持顶部和底部的左、中、右六个位置。

<XDocDemo title="标题位置" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自定义标题

`title` 插槽优先于 `title` 属性，可组合图标、标签或操作按钮。

<XDocDemo title="自定义标题" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题文本 | `string` | `—` | — |
| `titlePosition` | 标题位置 | `GroupContainerTitlePosition` | `'top-left'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 容器宽度 | `number \| string` | `'100%'` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 容器高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `padding` | 内容区内边距 | `number \| string` | `'16px'` | 数字为 px；字符串使用 CSS 单位 |
| `radius` | 外框圆角 | `number \| string` | `'6px'` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细 | `number \| string` | `'1px'` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `borderStyle` | 边框样式 | `GroupContainerBorderStyle` | `'solid'` | — |
| `backgroundColor` | 容器背景色 | `string` | `—` | — |
| `textColor` | 内容文字色 | `string` | `—` | — |
| `titleTextColor` | 标题文字色 | `string` | `—` | — |
| `titleBackgroundColor` | 标题背景色 | `string` | `—` | — |
| `titlePadding` | 标题内边距 | `number \| string` | `'0 8px'` | 数字为 px；字符串使用 CSS 单位 |
| `titleFontSize` | 标题字号 | `number \| string` | `'14px'` | 数字为 px；字符串使用 CSS 单位 |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | 标题文本 | `无作用域参数` |
| `default` | 分组内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### GroupContainerTitlePosition

```ts
export type GroupContainerTitlePosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
```

### GroupContainerBorderStyle

```ts
export type GroupContainerBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double'
```

### GroupContainerProps

```ts
export interface GroupContainerProps {
  title?: string
  titlePosition?: GroupContainerTitlePosition
  width?: number | string
  height?: number | string
  padding?: number | string
  radius?: number | string
  borderWidth?: number | string
  borderColor?: string
  borderStyle?: GroupContainerBorderStyle
  backgroundColor?: string
  textColor?: string
  titleTextColor?: string
  titleBackgroundColor?: string
  titlePadding?: number | string
  titleFontSize?: number | string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
