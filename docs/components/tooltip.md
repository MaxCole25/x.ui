<script setup lang="ts">
import Example1 from '../examples/tooltip/Example1.vue'
import Example1Source from '../examples/tooltip/Example1.vue?raw'
import Example2 from '../examples/tooltip/Example2.vue'
import Example2Source from '../examples/tooltip/Example2.vue?raw'
</script>
# 文字提示 Tooltip

用于在元素悬停、点击或聚焦时展示简短说明。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义外观

Tooltip 支持两种外观定制方式：单个实例可以通过 `backgroundColor`、`textColor`、`borderColor`、`borderWidth` 覆盖；全局主题可以通过 CSS 变量调整默认值。

<XDocDemo title="自定义外观" :code="Example2Source">
  <Example2 />
</XDocDemo>

```css
:root {
  --x-tooltip-bg: #1f2937;
  --x-tooltip-text: #ffffff;
  --x-tooltip-border-color: transparent;
  --x-tooltip-border-width: 0;
  --x-tooltip-z-index: 2000;
}

:root.dark {
  --x-tooltip-bg: #12243a;
  --x-tooltip-text: #eef4fb;
  --x-tooltip-border-color: #203247;
  --x-tooltip-border-width: 1px;
}
```

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 受控显示状态 | `boolean` | `undefined`<br>未设置时由组件内部管理显示状态 | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `content` | 提示内容 | `string` | `—` | — |
| `trigger` | 触发方式 | `TooltipTrigger` | `'hover'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `borderWidth` | 提示弹层边框宽度，数字按 px 处理，会写入 `--x-element-border-width` | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 提示弹层边框色，会写入 `--x-element-border-color`，优先级高于主题变量 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 提示弹层背景色，会写入 `--x-element-bg`，优先级高于主题变量 | `string` | `—` | — |
| `textColor` | 提示弹层文字色，会写入 `--x-element-text`，优先级高于主题变量 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `showArrow` | 是否显示箭头 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 出现位置 | `TooltipPlacement` | `'top'` | — |
| `openDelay` | 打开延迟，毫秒 | `number` | `0` | ms |
| `closeDelay` | 关闭延迟，毫秒 | `number` | `80` | ms |
| `teleported` | 是否将提示弹层挂载到 `teleportTo`，用于避免被表格、Tabs、滚动容器等父级裁剪 | `boolean` | `true` | — |
| `teleportTo` | 提示弹层挂载目标 | `string` | `'body'` | — |
| `zIndex` | 提示弹层层级 | `number \| string` | `2000` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 显示状态变化 | `[value: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `show` | 显示时触发 | `[]` |
| `hide` | 隐藏时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | default 插槽 | `无作用域参数` |
| `content` | 提示内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TooltipPlacement

```ts
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
```

### TooltipTrigger

```ts
export type TooltipTrigger = 'hover' | 'click' | 'focus'
```

### TooltipProps

```ts
export interface TooltipProps extends ElementStyleProps {
  fontSize?: number
  modelValue?: boolean
  content?: string
  placement?: TooltipPlacement
  trigger?: TooltipTrigger
  disabled?: boolean
  showArrow?: boolean
  openDelay?: number
  closeDelay?: number
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
}
```

## 验收说明

- 打开浮层后滚动父容器、调整窗口和内容尺寸，检查定位更新及边界翻转。
- 在打开状态切换 `teleported`，确认容器内显示不沿用旧视口坐标；连续切换后恢复默认或卸载，确认监听与 ResizeObserver 清理。

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
