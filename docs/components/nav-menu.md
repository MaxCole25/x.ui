# 菜单 NavMenu

`XNavMenu` 是从 NexMod `DashboardNavMenu` 抽离出的独立菜单组件，支持纵向/横向两种菜单模式，并支持多级菜单、收起态与侧边栏隐藏态。

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

## 纵向菜单内部滚动

`scrollable` 只影响纵向菜单。传入 `max-height` 后，滚动条会出现在菜单自身区域，适合菜单项较多且外层容器高度受限的场景。

纵向菜单收起后如果还需要弹出多级子菜单，建议同时开启 `append-to-body`。这样弹出层会挂载到 `body`，避免被菜单自身或外层滚动容器裁剪。

```vue
<template>
  <XNavMenu
    :items="items"
    active-key="/security/roles"
    mode="vertical"
    scrollable
    append-to-body
    :max-height="300"
  />
</template>
```

## 固定侧边栏

固定高度侧边栏中可以让头部保持固定，菜单区域独立滚动，避免页面整体被菜单撑高。

```vue
<template>
  <aside class="demo-sidebar">
    <div class="demo-sidebar__brand">x.ui Admin</div>
    <XNavMenu
      :items="items"
      :active-key="activeKey"
      mode="vertical"
      scrollable
      max-height="calc(100vh - 72px)"
      accordion
      @select="(key) => (activeKey = key)"
    />
  </aside>
</template>

<style scoped>
.demo-sidebar {
  height: 100vh;
  overflow: hidden;
  width: 240px;
}

.demo-sidebar__brand {
  height: 72px;
  line-height: 72px;
  padding: 0 16px;
}
</style>
```

## 隐藏侧边栏

当外层布局需要完全隐藏侧边栏时，可以传入 `hidden`。它会保留组件实例和受控状态，但让菜单根节点 `display: none`，适合移动端抽屉关闭或后台布局切换。

```vue
<template>
  <XNavMenu
    :items="items"
    :active-key="activeKey"
    mode="vertical"
    hidden
  />
</template>
```

## 手风琴展开

开启 `accordion` 后，纵向菜单同一层级内只会保留一个父菜单展开。`activeKey` 对应的父级路径会默认展开，并在 `activeKey` 变化时自动展开到当前激活项。

```vue
<template>
  <XNavMenu
    :items="items"
    active-key="/security/roles"
    mode="vertical"
    accordion
    @open-change="(keys) => console.log(keys)"
  />
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
| hidden | 是否隐藏菜单侧边栏区域 | `boolean` | `false` |
| appendToBody | 是否将弹出子菜单挂载到 `body`，模板中使用 `append-to-body` | `boolean` | `false` |
| scrollable | 是否启用菜单自身滚动（仅纵向有效） | `boolean` | `false` |
| maxHeight | 菜单最大高度，传入数字时按 px 处理 | `number \| string` | `undefined` |
| accordion | 是否启用同级仅展开一个子菜单（仅纵向非收起态有效） | `boolean` | `false` |
| openKeys | 当前展开的父菜单 key，配合 `update:openKeys` 可受控使用 | `string[]` | `undefined` |
| defaultOpenKeys | 默认展开的父菜单 key | `string[]` | `[]` |
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
| open-change | 展开菜单变化时触发 | `(openKeys: string[]) => void` |
| update:openKeys | 受控展开菜单更新时触发 | `(openKeys: string[]) => void` |

## 手动验收建议

1. 在 Histoire 中切换 `vertical/horizontal`，确认菜单布局变化正确。
2. 在 `vertical` 模式下开启 `hidden`，确认侧边栏菜单区域被隐藏；关闭后状态仍保留。
3. 在 `vertical` 模式下开启 `collapsed`，确认一级菜单仅显示图标并保留 `title` 提示。
4. 在收起的纵向菜单中点击或悬停带子菜单的一级项，确认子菜单从右侧弹出，且更深层级继续向右级联弹出。
5. 点击多级菜单叶子项，确认 `select` 事件能正确返回 `key`。
6. 调整字体大小、字重和字体族，确认一级菜单、子菜单和激活态文本样式同步生效。
7. 开启 `scrollable` 并设置 `maxHeight=300`，确认滚动条只出现在菜单内部。
8. 开启 `accordion`，依次展开同级父菜单，确认前一个父菜单会自动折叠。
9. 设置 `activeKey="/security/roles"`，确认“系统设置”和“权限管理”等父级路径默认展开。
