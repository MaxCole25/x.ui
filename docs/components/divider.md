<script setup lang="ts">
import Example1 from '../examples/divider/Example1.vue'
import Example1Source from '../examples/divider/Example1.vue?raw'
import Example2 from '../examples/divider/Example2.vue'
import Example2Source from '../examples/divider/Example2.vue?raw'
import Example3 from '../examples/divider/Example3.vue'
import Example3Source from '../examples/divider/Example3.vue?raw'
</script>
# 分割线 Divider

用于分隔内容区域，支持水平、垂直、标题文本和线型。

## 使用示例

### 基础用法

<XDocDemo title="水平分割线" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 垂直分割线

垂直分割线适合在同一行内分隔短文本或工具项。

<XDocDemo title="垂直分割线" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 标题位置和线型

通过 `contentPosition`、`borderStyle`、`thickness` 和颜色属性调整分割线的视觉表现。

<XDocDemo title="标题位置和线型" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `contentPosition` | 文本位置 | `DividerContentPosition` | `'center'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 方向 | `DividerDirection` | `'horizontal'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `borderStyle` | 线型 | `DividerBorderStyle` | `'solid'` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `thickness` | 分割线粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `margin` | 外边距，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 水平分割线中的文本 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DividerDirection

```ts
export type DividerDirection = 'horizontal' | 'vertical'
```

### DividerContentPosition

```ts
export type DividerContentPosition = 'left' | 'center' | 'right'
```

### DividerBorderStyle

```ts
export type DividerBorderStyle = 'solid' | 'dashed' | 'dotted'
```

### DividerProps

```ts
export interface DividerProps extends ElementStyleProps {
  fontSize?: number
  direction?: DividerDirection
  contentPosition?: DividerContentPosition
  borderStyle?: DividerBorderStyle
  thickness?: number | string
  margin?: number | string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
