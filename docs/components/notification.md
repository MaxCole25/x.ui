<script setup lang="ts">
import Example1 from '../examples/notification/Example1.vue'
import Example1Source from '../examples/notification/Example1.vue?raw'
</script>
# 通知 Notification

用于右上角或角落持久通知，适合后台任务、系统消息和异步结果提醒。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `id` | 原生元素标识 id | `string` | `—` | — |
| `title` | 标题 | `string` | `''` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，单位 px；不改变控件高度、内边距或圆角 | `number` | `14` | px |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `status` | 状态 | `NotificationStatus` | `'info'` | — |
| `showClose` | 是否显示关闭按钮 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 位置 | `NotificationPlacement` | `'top-right'` | — |
| `zIndex` | 浮层层级 | `number` | `2200` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `message` | 内容 | `string` | `''` | — |
| `duration` | 自动关闭时间 | `number` | `4500` | ms |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `close` | 关闭时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### NotificationStatus

```ts
export type NotificationStatus = 'success' | 'warning' | 'info' | 'error'
```

### NotificationPlacement

```ts
export type NotificationPlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
```

### NotificationProps

```ts
export interface NotificationProps {
  id?: string
  title?: string
  message?: string
  status?: NotificationStatus
  placement?: NotificationPlacement
  duration?: number
  showClose?: boolean
  fontSize?: number
  zIndex?: number
}
```

### NotificationOptions

```ts
export interface NotificationOptions extends NotificationProps {
  onClose?: () => void
}
```

### NotificationHandler

```ts
export interface NotificationHandler {
  close: () => void
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
