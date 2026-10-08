<script setup lang="ts">
import Example1 from '../examples/popconfirm/Example1.vue'
import Example1Source from '../examples/popconfirm/Example1.vue?raw'
</script>
# 气泡确认 Popconfirm

用于删除、停用等轻量确认操作，避免为了小动作打开完整弹窗。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示 | `boolean` | `undefined` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `'确认执行该操作？'` | — |
| `content` | 内容 | `string` | `''` | — |
| `confirmText` | 确认按钮文案 | `string` | `'确认'` | — |
| `cancelText` | 取消按钮文案 | `string` | `'取消'` | — |
| `trigger` | 浮层触发方式 | `PopoverTrigger` | `'click'` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 浮层首选方向，空间不足时自动翻转 | `PopoverPlacement` | `'top'` | — |
| `teleported` | 是否将浮层传送到目标容器 | `boolean` | `true` | — |
| `teleportTo` | 浮层挂载目标的 CSS 选择器 | `string` | `'body'` | — |
| `zIndex` | 浮层层级 | `number` | `2000` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 显示状态变化 | `[value: boolean]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `confirm` | 点击确认 | `[]` |
| `cancel` | 点击取消 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |
| `content` | 内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### PopconfirmProps

```ts
export interface PopconfirmProps {
  modelValue?: boolean
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  disabled?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
}
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
