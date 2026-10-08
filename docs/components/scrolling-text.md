<script setup lang="ts">
import Example1 from '../examples/scrolling-text/Example1.vue'
import Example1Source from '../examples/scrolling-text/Example1.vue?raw'
import Example2 from '../examples/scrolling-text/Example2.vue'
import Example2Source from '../examples/scrolling-text/Example2.vue?raw'
import Example3 from '../examples/scrolling-text/Example3.vue'
import Example3Source from '../examples/scrolling-text/Example3.vue?raw'
</script>
# 滚动文字 ScrollingText

用于公告、状态提示或短文本信息的循环滚动展示。单份文本从容器外进入，移出后开始下一轮；组件不复制插槽内容。组件默认 `padding` 为 `0`，只提供显示方向、文字流向、速度和字体颜色相关外观接口。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 竖向滚动

<XDocDemo title="竖向滚动" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自定义外观和速度

<XDocDemo title="自定义外观和速度" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `displayDirection` | 显示方向 | `ScrollingTextDisplayDirection` | `'horizontal'` | — |
| `flowDirection` | 文字流向；横向只生效 `left/right`，竖向只生效 `up/down` | `ScrollingTextFlowDirection` | `—` | — |
| `width` | 横向滚动时的组件宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 竖向滚动时的组件高度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `gap` | 子项间距，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontFamily` | 字体样式 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `textColor` | 字体颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `speed` | 滚动速度，单位为 px/s | `number` | `40` | px/s |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 滚动显示的文字内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ScrollingTextDisplayDirection

```ts
export type ScrollingTextDisplayDirection = 'horizontal' | 'vertical'
```

### ScrollingTextFlowDirection

```ts
export type ScrollingTextFlowDirection = 'left' | 'right' | 'up' | 'down'
```

### ScrollingTextProps

```ts
export interface ScrollingTextProps {
  displayDirection?: ScrollingTextDisplayDirection
  flowDirection?: ScrollingTextFlowDirection
  width?: number | string
  height?: number | string
  gap?: number | string
  speed?: number
  fontFamily?: string
  fontSize?: number
  textColor?: string
  backgroundColor?: string
}
```

## 验收说明

- 横向时切换 `left`、`right`，确认只出现宽度控制且文字连续滚动。
- 竖向时切换 `up`、`down`，确认只出现高度控制且文字连续滚动。
- 调整 `speed`，确认数值越大滚动越快。
- 检查字体样式、字体大小、字体颜色和背景色是否即时生效，并确认组件自身没有额外 padding。
