<script setup lang="ts">
import NestedDialog from '../examples/dialog/Nested.vue'
import NestedDialogSource from '../examples/dialog/Nested.vue?raw'
import Example1 from '../examples/dialog/Example1.vue'
import Example1Source from '../examples/dialog/Example1.vue?raw'
</script>
# 弹窗 Dialog

`XDialog` 是可拖拽、可缩放的弹出窗体组件，支持 `v-model` 控制显隐，并通过插槽承载自定义业务内容。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 嵌套弹窗与键盘操作

<XDocDemo title="嵌套弹窗与 Esc" :code="NestedDialogSource">
  <NestedDialog />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示弹窗（`v-model`） | `boolean` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题文本（未传 `header` 插槽时显示） | `string` | `''` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 弹窗宽度（像素） | `number` | `920` | — |
| `height` | 弹窗高度（像素） | `number` | `760` | — |
| `minWidth` | 最小宽度（像素） | `number` | `720` | — |
| `minHeight` | 最小高度（像素） | `number` | `520` | — |
| `maxWidth` | 最大宽度（像素，`0` 表示按视口自适应上限） | `number` | `0` | — |
| `maxHeight` | 最大高度（像素，`0` 表示按视口自适应上限） | `number` | `0` | — |
| `showFullscreen` | 是否显示全屏切换图标按钮，点击后弹窗在当前浏览器页面视口内铺满显示 | `boolean` | `false` | — |
| `footerDividerWidth` | 底部分割线粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `titleColor` | 标题颜色 | `string` | `—` | — |
| `headerBackgroundColor` | 头部背景色 | `string` | `—` | — |
| `bodyBackgroundColor` | 主体背景色 | `string` | `—` | — |
| `footerBackgroundColor` | 底部背景色 | `string` | `—` | — |
| `headerBorderColor` | 头部边框颜色 | `string` | `—` | — |
| `footerBorderColor` | 底部边框颜色 | `string` | `—` | — |
| `footerDividerColor` | 底部分割线颜色，未设置时使用淡色主题变量 | `string` | `—` | — |
| `closeIconColor` | 关闭图标颜色 | `string` | `—` | — |
| `closeIconHoverColor` | 关闭图标悬浮颜色 | `string` | `—` | — |
| `closeIconHoverBackgroundColor` | 关闭图标悬浮背景色 | `string` | `—` | — |
| `shadow` | 阴影样式 | `string` | `—` | — |
| `resizerColor` | resizer颜色 | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showFooterDivider` | `footer` 插槽存在时，是否显示内容区与底部区域之间的分割线 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `closeOnMaskClick` | 点击遮罩是否关闭 | `boolean` | `true` | — |
| `closeOnEsc` | 是否允许按 Esc 关闭；仅作用于最上层模态框 | `boolean` | `true` | — |
| `maskColor` | 遮罩颜色 | `string` | `—` | — |
| `teleported` | 是否将弹窗挂载到 `teleportTo` | `boolean` | `true` | — |
| `teleportTo` | 弹窗挂载目标 | `string` | `'body'` | — |
| `zIndex` | 遮罩层级 | `number` | `1900` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `draggable` | 是否允许拖拽 | `boolean` | `true` | — |
| `resizable` | 是否允许右下角缩放 | `boolean` | `true` | — |
| `footerDividerStyle` | 底部分割线线型 | `DialogFooterDividerStyle` | `'solid'` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 显隐状态变化 | `[value: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮或遮罩触发关闭时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | 自定义头部区域 | `无作用域参数` |
| `default` | 主体内容区域 | `无作用域参数` |
| `footer` | 自定义底部操作区域 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DialogFooterDividerStyle

```ts
export type DialogFooterDividerStyle = 'solid' | 'dashed' | 'dotted'
```

### DialogProps

```ts
export interface DialogProps extends ElementStyleProps, OverlayProps {
  modelValue?: boolean
  title?: string
  fontSize?: number
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  draggable?: boolean
  resizable?: boolean
  showFullscreen?: boolean
  closeOnMaskClick?: boolean
  closeOnEsc?: boolean
  maskColor?: string
  titleColor?: string
  headerBackgroundColor?: string
  bodyBackgroundColor?: string
  footerBackgroundColor?: string
  headerBorderColor?: string
  footerBorderColor?: string
  showFooterDivider?: boolean
  footerDividerColor?: string
  footerDividerWidth?: number | string
  footerDividerStyle?: DialogFooterDividerStyle
  closeIconColor?: string
  closeIconHoverColor?: string
  closeIconHoverBackgroundColor?: string
  shadow?: string
  resizerColor?: string
}
```

## 样式变量

| 变量名 | 说明 |
| --- | --- |
| `--x-dialog-header-padding` | 头部内边距 |
| `--x-dialog-body-padding` | 正文内边距 |
| `--x-dialog-footer-padding` | 底部内边距 |
| `--x-dialog-footer-divider-color` | 底部分割线颜色 |
| `--x-dialog-radius` | 弹窗圆角 |






## 验收说明

1. 分别检查 `draggable`、`resizable`、`showFullscreen` 开关，确认拖拽、缩放和全屏切换行为符合预期。
2. 验证 `closeOnMaskClick` 在 `true/false` 两种状态下的关闭行为。
3. 在默认、`header`、`footer` 三个插槽中放入长文本和复杂表单，确认内容不溢出且窄容器可滚动。
