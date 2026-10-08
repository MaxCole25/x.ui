<script setup lang="ts">
import Example1 from '../examples/message/Example1.vue'
import Example1Source from '../examples/message/Example1.vue?raw'
import Example2 from '../examples/message/Example2.vue'
import Example2Source from '../examples/message/Example2.vue?raw'
</script>
# Message 消息提示

`XMessage` 参考 Element Plus 的 `ElMessage` 设计，适合展示轻量的全局反馈。组件库同时提供服务调用和 `XMessageComponent` 直接渲染两种方式。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source" language="ts">
  <Example1 />
</XDocDemo>

### 组件渲染

<XDocDemo title="组件渲染" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `id` | 原生 id 属性 | `string` | `—` | — |
| `icon` | 自定义图标 class | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `offset` | 距离边缘的偏移长度 | `number` | `20` | px |
| `width` | 宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 最小宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `maxWidth` | 最大宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字色 | `string` | `—` | — |
| `borderColor` | 边框色 | `string` | `—` | — |
| `closeColor` | 关闭按钮色 | `string` | `—` | — |
| `iconColor` | 图标色 | `string` | `—` | — |
| `padding` | 内边距 | `string` | `—` | — |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `shadow` | 阴影 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `status` | 消息状态 | `MessageType` | `'info'` | — |
| `showClose` | 是否显示关闭按钮 | `boolean` | `false` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 弹出位置 | `MessagePlacement` | `'top'` | — |
| `zIndex` | 层级 | `number` | `2200` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `message` | 消息内容 | `string` | `''` | — |
| `duration` | 自动关闭时间，`0` 表示不自动关闭 | `number` | `3000` | ms |
| `plain` | 是否朴素背景 | `boolean` | `false` | — |
| `round` | 是否圆角胶囊形态 | `boolean` | `false` | — |
| `center` | 内容是否居中 | `boolean` | `false` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `close` | 关闭时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### MessageType

```ts
export type MessageType = 'success' | 'warning' | 'info' | 'error'
```

### MessagePlacement

```ts
export type MessagePlacement = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
```

### MessageProps

```ts
export interface MessageProps {
  id?: string
  message?: string
  status?: MessageType
  fontSize?: number
  duration?: number
  showClose?: boolean
  plain?: boolean
  round?: boolean
  center?: boolean
  offset?: number
  placement?: MessagePlacement
  zIndex?: number
  icon?: string
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  closeColor?: string
  iconColor?: string
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  padding?: string
  radius?: number | string
  shadow?: string
}
```

### MessageHandler

```ts
export interface MessageHandler {
  close: () => void
}
```

### MessageOptions

```ts
export interface MessageOptions extends MessageProps {
  onClose?: () => void
}
```

## 验收说明

- 检查四种类型、六个位置、自动关闭和手动关闭。
- 检查长文本是否自动换行，不应撑破视口。
- 检查自定义背景色、文字色、边框色、图标色是否生效。
