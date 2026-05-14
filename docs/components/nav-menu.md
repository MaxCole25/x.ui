# 菜单 NavMenu

`XNavMenu` 是从 NexMod `DashboardNavMenu` 抽离出的独立菜单组件，支持纵向/横向两种菜单模式，并支持多级菜单与收起态。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XNavMenu, type NavMenuItem } from 'x.ui'
import 'x.ui/style.css'

const activeKey = ref('dashboard')

const items: NavMenuItem[] = [
  { key: 'dashboard', label: '控制台' },
  {
    key: 'system',
    label: '系统管理',
    children: [
      { key: 'user', label: '用户管理' },
      { key: 'role', label: '角色管理' }
    ]
  }
]
</script>

<template>
  <XNavMenu :items="items" :active-key="activeKey" mode="vertical" @select="(key) => (activeKey = key)" />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单数据 | `NavMenuItem[]` | `[]` |
| activeKey | 当前激活菜单 key | `string` | `''` |
| mode | 菜单模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| collapsed | 是否收起（仅纵向有效） | `boolean` | `false` |
| allowCollapse | 是否启用收起能力 | `boolean` | `false` |
| textColor | 菜单文字默认色 | `string` | `'var(--x-color-text)'` |
| activeTextColor | 菜单文字激活色 | `string` | `'#fff'` |
| activeBgColor | 菜单激活背景色 | `string` | `'var(--x-color-primary)'` |
| fontSize | 菜单文字大小，传入数字时按 px 处理 | `number \| string` | `14` |
| fontWeight | 菜单文字默认字重 | `number \| string` | `400` |
| activeFontWeight | 菜单文字激活字重 | `number \| string` | `600` |
| fontFamily | 菜单字体族 | `string` | `'var(--x-font-family)'` |

## NavMenuItem 类型

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 菜单唯一标识 | `string` |
| label | 菜单文本 | `string` |
| icon | 菜单图标标记（可选） | `string` |
| routeName | 路由名（可选） | `string` |
| permissionCode | 权限码（可选） | `string` |
| children | 子菜单（可选） | `NavMenuItem[]` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击叶子节点菜单时触发 | `(key: string) => void` |

## 手动验收建议

1. 在 Histoire 中切换 `vertical/horizontal`，确认菜单布局变化正确。
2. 在 `vertical` 模式下开启 `collapsed`，确认一级菜单仅显示图标并保留 `title` 提示。
3. 在收起的纵向菜单中点击或悬停带子菜单的一级项，确认子菜单从右侧弹出，且更深层级继续向右级联弹出。
4. 点击多级菜单叶子项，确认 `select` 事件能正确返回 `key`。
5. 调整字体大小、字重和字体族，确认一级菜单、子菜单和激活态文本样式同步生效。
