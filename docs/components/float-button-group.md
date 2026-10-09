<script setup lang="ts">
import Example1 from '../examples/float-button-group/Example1.vue'
import Example1Source from '../examples/float-button-group/Example1.vue?raw'
import Example2 from '../examples/float-button-group/Example2.vue'
import Example2Source from '../examples/float-button-group/Example2.vue?raw'
</script>
# 悬浮按钮组 FloatButtonGroup

用于页面固定的悬浮图标入口，适合客服、帮助、返回顶部、快捷操作等场景。按钮本体只显示图标，说明文字通过 Tooltip 展示。默认使用 `fixed` 固定在视口，也可以设置 `position="absolute"` 放在局部容器内。

`menu` 模式中主按钮本身就是展开和关闭入口，默认使用客服图标；弹出的菜单项建议放帮助、反馈、返回顶部等次级操作，避免重复出现同一个入口图标。

## 使用示例

以下示例使用 `position="absolute"`，并在外层设置 `position: relative` 和明确高度，让按钮组定位在各自的预览容器内。实际页面需要按钮始终悬浮在视口角落时，使用默认的 `position="fixed"`。

### 点击菜单

<XDocDemo title="点击菜单" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 直接显示

<XDocDemo title="直接显示" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 定位说明

未设置 `top`、`right`、`bottom`、`left` 时，组件会根据 `placement`、`offsetX`、`offsetY` 计算位置。传入任意自定义坐标后，对应方向会覆盖 `placement` 推导出的坐标；例如父容器设置 `position: relative` 和明确高度后，`position="absolute"` 配合 `:right="32"`、`:bottom="32"` 可以把按钮组定位在局部容器右下角。缺少局部定位容器时，按钮组会相对于更外层的定位元素显示，可能落到整页底部。左下角示例应同时设置 `placement="bottom-left"`，使排列方向和默认坐标与目标位置一致。

### FloatButtonGroupItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string \| number` |
| label | 按钮说明，用于 Tooltip 和无障碍文本 | `string` |
| icon | 图标名称，使用 `XIcon` 的图标命名 | `string` |
| disabled | 是否禁用 | `boolean` |
| backgroundColor | 按钮背景色 | `string` |
| textColor | 图标颜色 | `string` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `items` | 按钮项数组 | `FloatButtonGroupItem[]` | `() => []` | — |
| `modelValue` | 菜单展开状态，仅 `menu` 模式使用 | `boolean` | `undefined` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 菜单按钮排列方向 | `FloatButtonGroupDirection` | `'vertical'` | — |
| `offsetX` | 距离左右边缘的偏移 | `number \| string` | `24` | 数字为 px；字符串使用 CSS 单位 |
| `offsetY` | 距离上下边缘的偏移 | `number \| string` | `24` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `triggerIcon` | 主按钮默认图标 | `string` | `'customer-service-2'` | — |
| `closeIcon` | 兼容保留字段，默认渲染不再使用 | `string` | `'close'` | — |
| `triggerLabel` | 主按钮提示文字 | `string` | `'快捷菜单'` | — |
| `showTooltip` | 是否显示 Tooltip | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 固定位置 | `FloatButtonGroupPlacement` | `'bottom-right'` | — |
| `zIndex` | 层级 | `number` | `2000` | — |
| `tooltipPlacement` | Tooltip 位置，不传时自动判断 | `TooltipPlacement` | `undefined` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `mode` | 显示状态，点击菜单或直接显示 | `FloatButtonGroupMode` | `'menu'` | — |
| `defaultModelValue` | 非受控默认展开状态 | `boolean` | `false` | — |
| `position` | 定位方式 | `FloatButtonGroupPosition` | `'fixed'` | — |
| `top` | 自定义上方坐标，优先于 `placement` 推导 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |
| `right` | 自定义右侧坐标，优先于 `placement` 推导 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |
| `bottom` | 自定义下方坐标，优先于 `placement` 推导 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |
| `left` | 自定义左侧坐标，优先于 `placement` 推导 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 菜单展开状态变化时触发。 | `[expanded: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `item-click` | 点击菜单按钮时触发。 | `[item: FloatButtonGroupItem, event: MouseEvent]` |
| `trigger-click` | 点击主按钮时触发。 | `[expanded: boolean, event: MouseEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `trigger` | 自定义 `menu` 模式主按钮内容。 | `expanded: boolean` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `item` | 自定义按钮图标内容。 | `item: FloatButtonGroupItem` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### FloatButtonGroupMode

```ts
export type FloatButtonGroupMode = 'menu' | 'direct'
```

### FloatButtonGroupDirection

```ts
export type FloatButtonGroupDirection = 'horizontal' | 'vertical'
```

### FloatButtonGroupPlacement

```ts
export type FloatButtonGroupPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
```

### FloatButtonGroupPosition

```ts
export type FloatButtonGroupPosition = 'fixed' | 'absolute'
```

### FloatButtonGroupItemKey

```ts
export type FloatButtonGroupItemKey = string | number
```

### FloatButtonGroupItem

```ts
export interface FloatButtonGroupItem {
  key: FloatButtonGroupItemKey
  label: string
  icon: string
  disabled?: boolean
  backgroundColor?: string
  textColor?: string
}
```

### FloatButtonGroupProps

```ts
export interface FloatButtonGroupProps {
  items?: FloatButtonGroupItem[]
  mode?: FloatButtonGroupMode
  modelValue?: boolean
  defaultModelValue?: boolean
  direction?: FloatButtonGroupDirection
  placement?: FloatButtonGroupPlacement
  position?: FloatButtonGroupPosition
  offsetX?: number | string
  offsetY?: number | string
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
  fontSize?: number
  zIndex?: number
  triggerIcon?: string
  closeIcon?: string
  triggerLabel?: string
  tooltipPlacement?: TooltipPlacement
  showTooltip?: boolean
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
