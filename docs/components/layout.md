<script setup lang="ts">
import Example1 from '../examples/layout/Example1.vue'
import Example1Source from '../examples/layout/Example1.vue?raw'
import Example2 from '../examples/layout/Example2.vue'
import Example2Source from '../examples/layout/Example2.vue?raw'
</script>
# 布局 Layout

`XLayout` 是从 NexMod 主布局抽离出的基础布局组件，支持通过属性快速切换布局方式。

属性不传时会全部使用默认值。布局容器默认撑满父容器，并至少占满视口高度，组件本身不额外设置内容滚动逻辑。

`fullHeight` 默认开启。组件会通过 `min-height: 100vh` 适配 Vue 常见的 `#app { min-height: 100vh; display: block; }` 场景；当布局处在纵向 `flex` 或 `grid` 页面容器内时，也会尽量吃掉顶部工具栏、筛选区之外的剩余高度。如果 `XLayout` 放在弹窗、卡片、局部容器里，应传 `:full-height="false"` 或由外层显式控制高度，避免局部区域默认占满视口。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

`sidebarPadding` 和 `contentPadding` 支持标准 CSS padding 写法，例如：`12`、`'12px'`、`'8px 12px'`、`'8px 12px 10px 6px'`。

### 布局模式

- `top-sidebar`：顶部横向 + 左侧栏 + 内容 + 底部。
- `sidebar-top`：左侧栏贯穿整列，顶部、内容、底部在右侧。
- `top-only`：仅顶部 + 内容 + 底部，不渲染侧栏。

<XDocDemo title="侧栏贯穿布局" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fullHeight` | 是否占满父级 flex/grid 容器的剩余高度 | `boolean` | `true` | — |
| `sidebarWidth` | 侧栏宽度（支持数字像素或 CSS 长度） | `number \| string` | `288` | — |
| `sidebarCollapsedWidth` | 收起侧栏后的宽度（支持数字像素或 CSS 长度） | `number \| string` | `88` | — |
| `gap` | 区域间距（支持数字像素或 CSS 长度） | `number \| string` | `0` | — |
| `topbarHeight` | 顶部栏高度（支持数字像素或 CSS 长度） | `number \| string` | `55` | — |
| `footerHeight` | 底部栏高度（支持数字像素或 CSS 长度） | `number \| string` | `30` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `topbarBackgroundColor` | 顶部栏背景色 | `string` | `'#ffffff'` | — |
| `topbarTextColor` | 顶部栏文字色 | `string` | `'#14221f'` | — |
| `topbarRadius` | 顶部栏圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` | — |
| `topbarBorderColor` | 顶部栏下边框色 | `string` | `'1px solid #cdded7'` | — |
| `sidebarBackgroundColor` | 侧栏背景色 | `string` | `'#263d6f'` | — |
| `sidebarTextColor` | 侧栏文字色 | `string` | `'#dde0fe'` | — |
| `sidebarRadius` | 侧栏圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` | — |
| `sidebarBorderColor` | 侧栏右边框色 | `string` | `'1px solid #cdded7'` | — |
| `sidebarPadding` | 侧栏内边距（支持数字像素或 CSS padding 写法） | `number \| string` | `12` | — |
| `contentBackgroundColor` | 内容区背景色 | `string` | `'#ffffff'` | — |
| `contentTextColor` | 内容区文字色 | `string` | `'#14221f'` | — |
| `contentPadding` | 内容区内边距（支持数字像素或 CSS padding 写法） | `number \| string` | `0` | — |
| `contentRadius` | 内容区圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` | — |
| `footerBackgroundColor` | 底部栏背景色 | `string` | `'#ffffff'` | — |
| `footerTextColor` | 底部栏文字色 | `string` | `'#6f5a25'` | — |
| `footerRadius` | 底部栏圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` | — |
| `footerBorderColor` | 底部栏上边框色 | `string` | `'1px solid #cdded7'` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `mode` | 布局模式 | `LayoutMode` | `'top-sidebar'` | — |
| `sidebarCollapsed` | 是否收起侧栏 | `boolean` | `false` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 主内容区域 | `无作用域参数` |
| `footer` | 底部区域 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `topbar` | 顶部区域 | `无作用域参数` |
| `sidebar` | 侧栏区域 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### LayoutMode

```ts
export type LayoutMode = 'top-sidebar' | 'sidebar-top' | 'top-only'
```

### LayoutProps

```ts
export interface LayoutProps {
  fontSize?: number
  mode?: LayoutMode
  fullHeight?: boolean
  sidebarWidth?: number | string
  sidebarCollapsed?: boolean
  sidebarCollapsedWidth?: number | string
  gap?: number | string
  topbarHeight?: number | string
  footerHeight?: number | string
  topbarBackgroundColor?: string
  topbarTextColor?: string
  topbarRadius?: number | string
  topbarBorderColor?: string
  sidebarBackgroundColor?: string
  sidebarTextColor?: string
  sidebarRadius?: number | string
  sidebarBorderColor?: string
  sidebarPadding?: number | string
  contentBackgroundColor?: string
  contentTextColor?: string
  contentPadding?: number | string
  contentRadius?: number | string
  footerBackgroundColor?: string
  footerTextColor?: string
  footerRadius?: number | string
  footerBorderColor?: string
}
```

## 验收说明

1. 在 Histoire 中切换 `mode`，确认网格区域位置变化符合预期。
2. 切换 `sidebarCollapsed`，确认侧栏宽度变窄且内容可正常显示。
3. 缩小浏览器到 `1200px` 以下，确认布局自动改为纵向堆叠。
