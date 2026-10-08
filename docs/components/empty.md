<script setup lang="ts">
import Example1 from '../examples/empty/Example1.vue'
import Example1Source from '../examples/empty/Example1.vue?raw'
import Example2 from '../examples/empty/Example2.vue'
import Example2Source from '../examples/empty/Example2.vue?raw'
</script>
# 空状态 Empty

用于列表、表格、树或容器没有数据时展示占位状态。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义操作

<XDocDemo title="自定义操作" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `description` | 描述文本 | `string` | `'暂无数据'` | — |
| `actionText` | 默认操作按钮文本 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `imageSize` | 图片尺寸 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `image` | 图片地址 | `string` | `—` | — |

## 事件

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `action` | action 事件 | `[event: MouseEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `description` | 描述文本 | `无作用域参数` |
| `default` | 自定义操作区 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `image` | 图片地址 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### EmptyProps

```ts
export interface EmptyProps extends ElementStyleProps {
  fontSize?: number
  image?: string
  imageSize?: number | string
  description?: string
  actionText?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
