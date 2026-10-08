<script setup lang="ts">
import Example1 from '../examples/message-box/Example1.vue'
import Example1Source from '../examples/message-box/Example1.vue?raw'
import Example2 from '../examples/message-box/Example2.vue'
import Example2Source from '../examples/message-box/Example2.vue?raw'
</script>
# MessageBox 消息弹框

`XMessageBox` 参考 Element Plus 的 `ElMessageBox`，用于需要用户确认的反馈场景。它支持服务调用，也支持 `XMessageBoxComponent` 作为普通组件使用。

## 使用示例

### 服务调用

<XDocDemo title="服务调用" :code="Example1Source" language="ts">
  <Example1 />
</XDocDemo>

### 组件用法

<XDocDemo title="组件用法" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示，仅组件模式使用 | `boolean` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `'提示'` | — |
| `confirmButtonText` | 确认按钮文字 | `string` | `'确定'` | — |
| `cancelButtonText` | 取消按钮文字 | `string` | `'取消'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 宽度 | `number \| string` | `420` | 数字为 px；字符串使用 CSS 单位 |
| `minWidth` | 最小宽度 | `number \| string` | `280` | 数字为 px；字符串使用 CSS 单位 |
| `maxWidth` | 最大宽度 | `number \| string` | `'calc(100vw - 32px)'` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `backgroundColor` | 弹框背景色 | `string` | `—` | — |
| `textColor` | 内容文字色 | `string` | `—` | — |
| `titleColor` | 标题色 | `string` | `—` | — |
| `borderColor` | 边框色 | `string` | `—` | — |
| `iconColor` | 图标色 | `string` | `—` | — |
| `confirmBackgroundColor` | 确认按钮背景色 | `string` | `—` | — |
| `confirmTextColor` | 确认按钮文字色 | `string` | `—` | — |
| `confirmBorderColor` | 确认按钮边框色 | `string` | `—` | — |
| `cancelBackgroundColor` | 取消按钮背景色 | `string` | `—` | — |
| `cancelTextColor` | 取消按钮文字色 | `string` | `—` | — |
| `cancelBorderColor` | 取消按钮边框色 | `string` | `—` | — |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `padding` | 内边距 | `string` | `—` | — |
| `shadow` | 阴影 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `status` | 反馈状态 | `MessageBoxType` | `'info'` | — |
| `showCancelButton` | 是否显示取消按钮 | `boolean` | `false` | — |
| `showConfirmButton` | 是否显示确认按钮 | `boolean` | `true` | — |
| `showClose` | 是否显示关闭按钮 | `boolean` | `true` | — |
| `distinguishCancelAndClose` | 是否区分取消和关闭 | `boolean` | `false` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `closeOnMaskClick` | 点击遮罩是否关闭 | `boolean` | `true` | — |
| `closeOnEsc` | 是否允许按 Esc 关闭；仅作用于最上层模态框 | `boolean` | `true` | — |
| `maskColor` | 遮罩色 | `string` | `—` | — |
| `teleported` | 是否将弹框挂载到 `teleportTo` | `boolean` | `true` | — |
| `teleportTo` | 弹框挂载目标 | `string` | `'body'` | — |
| `zIndex` | 层级 | `number` | `2300` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `message` | 内容 | `string` | `''` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 显隐变化 | `[value: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `close` | 点击关闭 | `[]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `action` | 用户动作 | `[action: MessageBoxAction]` |
| `confirm` | 点击确认 | `[]` |
| `cancel` | 点击取消 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `title` | 标题 | `无作用域参数` |
| `default` | default 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### MessageBoxType

```ts
export type MessageBoxType = 'success' | 'warning' | 'info' | 'error'
```

### MessageBoxAction

```ts
export type MessageBoxAction = 'confirm' | 'cancel' | 'close'
```

### MessageBoxProps

```ts
export interface MessageBoxProps extends OverlayProps {
  modelValue?: boolean
  title?: string
  message?: string
  status?: MessageBoxType
  fontSize?: number
  showCancelButton?: boolean
  showConfirmButton?: boolean
  showClose?: boolean
  closeOnMaskClick?: boolean
  closeOnEsc?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  distinguishCancelAndClose?: boolean
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  borderColor?: string
  iconColor?: string
  maskColor?: string
  confirmBackgroundColor?: string
  confirmTextColor?: string
  confirmBorderColor?: string
  cancelBackgroundColor?: string
  cancelTextColor?: string
  cancelBorderColor?: string
  radius?: number | string
  padding?: string
  shadow?: string
}
```

### MessageBoxOptions

```ts
export interface MessageBoxOptions extends Omit<MessageBoxProps, 'modelValue'> {
  callback?: (action: MessageBoxAction) => void
}
```

## 验收说明

- 检查 alert、confirm 服务调用是否能正常打开和关闭。
- 检查遮罩关闭、关闭按钮、确认按钮、取消按钮的动作事件。
- 检查窄容器窄屏下宽度不会溢出。
