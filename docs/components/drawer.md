<script setup lang="ts">
import Example1 from '../examples/drawer/Example1.vue'
import Example1Source from '../examples/drawer/Example1.vue?raw'
</script>
# 抽屉 Drawer

从屏幕边缘滑出的容器，适合配置面板、详情面板和页面构建器属性面板。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 主题变量

`XDrawer` 的默认颜色可由全局 CSS 变量统一控制，单个实例传入 props 时优先级更高。

| 变量 | 说明 |
| --- | --- |
| `--x-drawer-mask` | 遮罩背景 |
| `--x-drawer-bg` | 面板背景 |
| `--x-drawer-text` | 面板文字 |
| `--x-drawer-title` | 标题文字 |
| `--x-drawer-border-color` | 面板边框颜色 |
| `--x-drawer-border-width` | 面板边框宽度 |
| `--x-drawer-header-bg` | 头部背景 |
| `--x-drawer-body-bg` | 内容区背景 |
| `--x-drawer-footer-bg` | 底部背景 |
| `--x-drawer-header-border` | 头部分割线 |
| `--x-drawer-footer-border` | 底部分割线 |
| `--x-drawer-header-padding` | 头部内边距 |
| `--x-drawer-body-padding` | 内容区内边距 |
| `--x-drawer-footer-padding` | 底部内边距 |
| `--x-drawer-close-icon` | 关闭按钮图标 |
| `--x-drawer-close-icon-hover` | 关闭按钮悬浮图标 |
| `--x-drawer-close-hover-bg` | 关闭按钮悬浮背景 |
| `--x-drawer-shadow` | 面板阴影 |
| `--x-drawer-z-index` | 遮罩层级 |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 显示状态 | `boolean` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `''` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `direction` | 展开方向 | `DrawerDirection` | `'rtl'` | — |
| `panelSize` | 面板宽度或高度，左右抽屉控制宽度，上下抽屉控制高度 | `number \| string` | `'30%'` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `undefined` | px |
| `titleColor` | 标题文字色 | `string` | `—` | — |
| `headerBackgroundColor` | 头部背景色 | `string` | `—` | — |
| `bodyBackgroundColor` | 内容区背景色 | `string` | `—` | — |
| `footerBackgroundColor` | 底部背景色 | `string` | `—` | — |
| `headerBorderColor` | 头部分割线颜色 | `string` | `—` | — |
| `footerBorderColor` | 底部分割线颜色 | `string` | `—` | — |
| `closeIconColor` | 关闭按钮图标颜色 | `string` | `—` | — |
| `closeIconHoverColor` | 关闭按钮悬浮图标颜色 | `string` | `—` | — |
| `closeIconHoverBackgroundColor` | 关闭按钮悬浮背景色 | `string` | `—` | — |
| `shadow` | 面板阴影 | `string` | `—` | — |
| `borderWidth` | 面板边框宽度，会写入 `--x-drawer-border-width` 和 `--x-element-border-width` | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 面板边框色，会写入 `--x-drawer-border-color` 和 `--x-element-border-color` | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 面板背景色，会写入 `--x-drawer-bg` 和 `--x-element-bg` | `string` | `—` | — |
| `textColor` | 面板文字色，会写入 `--x-drawer-text` 和 `--x-element-text` | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showClose` | 是否显示关闭按钮 | `boolean` | `true` | — |
| `destroyOnClose` | 关闭后是否销毁内容 | `boolean` | `false` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `closeOnMaskClick` | 点击遮罩是否关闭 | `boolean` | `true` | — |
| `closeOnEsc` | 是否允许按 Esc 关闭；仅作用于最上层模态框 | `boolean` | `true` | — |
| `maskColor` | 遮罩背景色 | `string` | `—` | — |
| `teleported` | 是否将抽屉挂载到 `teleportTo` | `boolean` | `true` | — |
| `teleportTo` | 抽屉挂载目标 | `string` | `'body'` | — |
| `zIndex` | 遮罩层级 | `number` | `1800` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `withHeader` | 是否显示头部 | `boolean` | `true` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 显示状态变化 | `[value: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `open` | 打开动画结束后触发 | `[]` |
| `close` | 请求关闭时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | 自定义头部内容 | `无作用域参数` |
| `default` | 抽屉主体内容 | `无作用域参数` |
| `footer` | 自定义底部内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DrawerDirection

```ts
export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt'
```

### DrawerProps

```ts
export interface DrawerProps extends ElementStyleProps, OverlayProps {
  modelValue?: boolean
  title?: string
  direction?: DrawerDirection
  fontSize?: number
  panelSize?: number | string
  withHeader?: boolean
  showClose?: boolean
  closeOnMaskClick?: boolean
  closeOnEsc?: boolean
  destroyOnClose?: boolean
  maskColor?: string
  titleColor?: string
  headerBackgroundColor?: string
  bodyBackgroundColor?: string
  footerBackgroundColor?: string
  headerBorderColor?: string
  footerBorderColor?: string
  closeIconColor?: string
  closeIconHoverColor?: string
  closeIconHoverBackgroundColor?: string
  shadow?: string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。


## 交互验收补充

抽屉与弹窗共享模态键盘和滚动锁。内部 Select 先处理 Esc；closeOnEsc=false 不阻止下拉关闭。多层模态框按 zIndex 处理最上层，关闭一层保留其它层的滚动锁和焦点范围。
