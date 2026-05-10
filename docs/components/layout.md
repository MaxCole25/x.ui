# 布局 Layout

`XLayout` 是从 NexMod 主布局抽离出的基础布局组件，支持通过属性快速切换布局方式。

属性不传时会全部使用默认值。布局容器默认撑满父容器，组件本身不额外设置内容滚动逻辑。

## 基础用法

```vue
<script setup lang="ts">
import { XLayout } from 'x.ui'
import 'x.ui/style.css'
</script>

<template>
  <XLayout mode="top-sidebar" :sidebar-width="280">
    <template #topbar>顶部区域</template>
    <template #sidebar>侧栏区域</template>
    主内容区域
    <template #footer>底部区域</template>
  </XLayout>
</template>
```

## 布局模式

- `top-sidebar`：顶部横向 + 左侧栏 + 内容 + 底部。
- `sidebar-top`：左侧栏贯穿整列，顶部、内容、底部在右侧。
- `top-only`：仅顶部 + 内容 + 底部，不渲染侧栏。

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 布局模式 | `'top-sidebar' \| 'sidebar-top' \| 'top-only'` | `'top-sidebar'` |
| sidebarWidth | 侧栏宽度（支持数字像素或 CSS 长度） | `number \| string` | `288` |
| sidebarCollapsed | 是否收起侧栏 | `boolean` | `false` |
| sidebarCollapsedWidth | 收起侧栏后的宽度（支持数字像素或 CSS 长度） | `number \| string` | `88` |
| gap | 区域间距（支持数字像素或 CSS 长度） | `number \| string` | `0` |
| topbarHeight | 顶部栏高度（支持数字像素或 CSS 长度） | `number \| string` | `55` |
| footerHeight | 底部栏高度（支持数字像素或 CSS 长度） | `number \| string` | `30` |
| topbarBackgroundColor | 顶部栏背景色 | `string` | `'#1E6B73'` |
| topbarColor | 顶部栏前景色 | `string` | `'#F9F9F9'` |
| topbarBorderRadius | 顶部栏圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` |
| topbarBorder | 顶部栏下边框 | `string` | `'none'` |
| sidebarBackgroundColor | 侧栏背景色 | `string` | `'#185A61'` |
| sidebarColor | 侧栏前景色 | `string` | `'#F9F9F9'` |
| sidebarBorderRadius | 侧栏圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` |
| sidebarBorder | 侧栏右边框 | `string` | `'none'` |
| contentBackgroundColor | 内容区背景色 | `string` | `'#2A7F87'` |
| contentColor | 内容区前景色 | `string` | `'#F9F9F9'` |
| contentBorderRadius | 内容区圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` |
| footerBackgroundColor | 底部栏背景色 | `string` | `'#124A50'` |
| footerColor | 底部栏前景色 | `string` | `'#F9F9F9'` |
| footerBorderRadius | 底部栏圆角（支持数字像素或 CSS 长度） | `number \| string` | `0` |
| footerBorder | 底部栏下边框 | `string` | `'none'` |

边框属性只作用于对应区域的指定边：`topbarBorder` 对应 Topbar 下边框，`sidebarBorder` 对应 Sidebar 右边框，`footerBorder` 对应 Footer 下边框。Content 不提供边框属性。

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `topbar` | 顶部区域 |
| `sidebar` | 侧栏区域 |
| `default` | 主内容区域 |
| `footer` | 底部区域 |

## 手动验收建议

1. 在 Histoire 中切换 `mode`，确认网格区域位置变化符合预期。
2. 切换 `sidebarCollapsed`，确认侧栏宽度变窄且内容可正常显示。
3. 缩小浏览器到 `1200px` 以下，确认布局自动改为纵向堆叠。
