<script setup lang="ts">
import Example1 from '../examples/scrollbar/Example1.vue'
import Example1Source from '../examples/scrollbar/Example1.vue?raw'
import Example2 from '../examples/scrollbar/Example2.vue'
import Example2Source from '../examples/scrollbar/Example2.vue?raw'
</script>
# 滚动条 Scrollbar

用于约束内容区域高度并提供统一滚动条样式。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 固定高度

通过 `height` 固定滚动区域高度，也可以结合外观属性设置边框和背景。

<XDocDemo title="固定高度" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `maxHeight` | 最大高度 | `string \| number` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 固定高度 | `string \| number` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ScrollbarProps

```ts
export interface ScrollbarProps extends ElementStyleProps {
  fontSize?: number
  maxHeight?: string | number
  height?: string | number
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
