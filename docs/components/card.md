<script setup lang="ts">
import Example1 from '../examples/card/Example1.vue'
import Example1Source from '../examples/card/Example1.vue?raw'
import Example2 from '../examples/card/Example2.vue'
import Example2Source from '../examples/card/Example2.vue?raw'
</script>
# 卡片 Card

用于承载一组相关内容，可配置头部、底部、边框、背景和阴影。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义插槽

通过 `header`、`default` 和 `footer` 插槽组合更完整的内容区块。

<XDocDemo title="自定义插槽" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `header` | 头部文本 | `string` | `—` | — |
| `footer` | 底部文本 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 高度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `shadow` | 阴影策略 | `CardShadow` | `'always'` | — |
| `padding` | 内边距，数字按 px 处理；字符串使用 CSS 单位 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `bodyStyle` | 正文区域样式 | `CSSProperties` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | 头部文本 | `无作用域参数` |
| `default` | 卡片内容 | `无作用域参数` |
| `footer` | 底部文本 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### CardShadow

```ts
export type CardShadow = 'always' | 'hover' | 'never'
```

### CardProps

```ts
export interface CardProps extends ElementStyleProps {
  fontSize?: number
  header?: string
  footer?: string
  shadow?: CardShadow
  width?: number | string
  height?: number | string
  padding?: number | string
  bodyStyle?: CSSProperties
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
