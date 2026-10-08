<script setup lang="ts">
import Example1 from '../examples/nav-menu/Example1.vue'
import Example1Source from '../examples/nav-menu/Example1.vue?raw'
import Example2 from '../examples/nav-menu/Example2.vue'
import Example2Source from '../examples/nav-menu/Example2.vue?raw'
import Example3 from '../examples/nav-menu/Example3.vue'
import Example3Source from '../examples/nav-menu/Example3.vue?raw'
import Example4 from '../examples/nav-menu/Example4.vue'
import Example4Source from '../examples/nav-menu/Example4.vue?raw'
import Example5 from '../examples/nav-menu/Example5.vue'
import Example5Source from '../examples/nav-menu/Example5.vue?raw'
import Example6 from '../examples/nav-menu/Example6.vue'
import Example6Source from '../examples/nav-menu/Example6.vue?raw'
</script>
# 菜单 NavMenu

`XNavMenu` 是从 NexMod `DashboardNavMenu` 抽离出的独立菜单组件，支持纵向/横向两种菜单模式，并支持多级菜单、收起态与侧边栏隐藏态。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 菜单图标

`NavMenuItem.icon` 支持两种写法：传字符串时会交给 `XIcon` 渲染，可以使用 `dashboard`、`settings-3` 这类语义名，也可以继续传完整 Remix Icon 名称，例如 `ri-dashboard-line`；传 Vue 组件时会通过动态组件渲染，适合接入 `lucide-vue-next`、`@element-plus/icons-vue`、`ant-design-vue` 等第三方图标组件。

上方基础示例中的 `dashboard`、`settings-3`、`user` 等图标名称均会交给 `XIcon` 渲染。

### 自定义菜单项圆角与子菜单箭头

通过 `item-radius` 控制菜单项圆角，通过 `submenu-item-radius` 控制弹出子菜单项圆角，通过 `submenu-popup-gap` 控制弹出子菜单框体与上级菜单之间的距离。子菜单箭头默认跟随展开状态自动切换，也可以通过 `show-submenu-arrow` 隐藏，或通过 `submenu-arrow-icon` 统一替换为指定图标。

<XDocDemo title="自定义菜单项圆角与子菜单箭头" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 纵向菜单内部滚动

`scrollable` 只影响纵向菜单。传入 `max-height` 后，滚动条会出现在菜单自身区域，适合菜单项较多且外层容器高度受限的场景。

纵向菜单收起后如果还需要弹出多级子菜单，建议同时开启 `teleported`。这样弹出层会挂载到 `teleport-to` 指定目标，避免被菜单自身或外层滚动容器裁剪。

<XDocDemo title="纵向菜单内部滚动" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 固定侧边栏

固定高度侧边栏中可以让头部保持固定，菜单区域独立滚动，避免页面整体被菜单撑高。

<XDocDemo title="固定侧边栏" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 隐藏侧边栏

当外层布局需要完全隐藏侧边栏时，可以传入 `hidden`。它会保留组件实例和受控状态，但让菜单根节点 `display: none`，适合窄容器抽屉关闭或后台布局切换。

<XDocDemo title="隐藏侧边栏" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 手风琴展开

开启 `accordion` 后，纵向菜单同一层级内只会保留一个父菜单展开。`activeKey` 对应的父级路径会默认展开，并在 `activeKey` 变化时自动展开到当前激活项。

<XDocDemo title="手风琴展开" :code="Example6Source">
  <Example6 />
</XDocDemo>

### NavMenuItem 类型

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 菜单唯一标识 | `string` |
| label | 菜单文本 | `string` |
| icon | 菜单图标，字符串按 `XIcon` 名称渲染，Vue 组件按第三方图标组件渲染（可选） | `string \| Component` |
| routeName | 路由名（可选） | `string` |
| permissionCode | 权限码（可选） | `string` |
| children | 子菜单（可选） | `NavMenuItem[]` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### XHorizontalMenu · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `items` | 菜单数据 | `NavMenuItem[]` | `—` | — |

### XHorizontalMenu · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `submenuArrowIcon` | 自定义子菜单箭头图标，字符串按 `XIcon` 名称渲染，Vue 组件按第三方图标组件渲染 | `string \| Component` | `—` | — |

### XHorizontalMenu · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `maxHeight` | 菜单最大高度，传入数字时按 px 处理 | `string \| number` | `—` | — |
| `itemGap` | 竖向菜单项间距 | `number \| string` | `—` | — |
| `submenuPopupGap` | 弹出子菜单框体与上级菜单之间的距离，传入数字时按 px 处理 | `number \| string` | `—` | — |

### XHorizontalMenu · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontFamily` | 菜单字体族 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `textColor` | 菜单文字默认色 | `string` | `—` | — |
| `activeBackgroundColor` | 菜单激活背景色 | `string` | `—` | — |
| `activeTextColor` | 菜单文字激活色 | `string` | `—` | — |
| `fontWeight` | 菜单文字默认字重 | `number \| string` | `—` | — |
| `submenuActiveTextColor` | 弹出子菜单 active 项文字色，只控制弹出子菜单中的激活项；未传时回退使用 `activeTextColor` | `string` | `—` | — |
| `activeAncestorTextColor` | 激活菜单祖先节点文字颜色 | `string` | `—` | — |
| `activeAncestorBackgroundColor` | 激活菜单祖先节点背景色 | `string` | `—` | — |
| `activeFontWeight` | 菜单文字激活字重 | `number \| string` | `—` | — |
| `itemRadius` | 菜单项圆角，传入数字时按 px 处理 | `number \| string` | `—` | — |
| `submenuItemRadius` | 弹出子菜单项圆角，传入数字时按 px 处理 | `number \| string` | `—` | — |

### XHorizontalMenu · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `openKeys` | 当前展开的父菜单 key，配合 `update:openKeys` 可受控使用 | `string[]` | `—` | — |
| `defaultOpenKeys` | 默认展开的父菜单 key | `string[]` | `—` | — |
| `showSubmenuArrow` | 是否显示有子菜单项右侧箭头 | `boolean` | `—` | — |

### XHorizontalMenu · 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `teleported` | 是否将弹出子菜单挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `—` | — |
| `teleportTo` | 弹出子菜单挂载目标 | `string` | `—` | — |

### XHorizontalMenu · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `hidden` | 是否隐藏菜单侧边栏区域 | `boolean` | `—` | — |
| `activeKey` | 当前激活菜单 key | `string` | `—` | — |
| `scrollable` | 是否启用菜单自身滚动（仅纵向有效） | `boolean` | `—` | — |

### XNavMenu · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `items` | 菜单数据 | `NavMenuItem[]` | `—` | — |

### XNavMenu · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `submenuArrowIcon` | 自定义子菜单箭头图标，字符串按 `XIcon` 名称渲染，Vue 组件按第三方图标组件渲染 | `string \| Component` | `—` | — |

### XNavMenu · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `maxHeight` | 菜单最大高度，传入数字时按 px 处理 | `string \| number` | `—` | — |
| `itemGap` | 竖向菜单项间距 | `number \| string` | `4` | — |
| `submenuPopupGap` | 弹出子菜单框体与上级菜单之间的距离，传入数字时按 px 处理 | `number \| string` | `8` | — |

### XNavMenu · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `textColor` | 菜单文字默认色 | `string` | `'var(--x-color-text)'` | — |
| `activeTextColor` | 菜单文字激活色 | `string` | `'#dde0fe'` | — |
| `submenuActiveTextColor` | 弹出子菜单 active 项文字色，只控制弹出子菜单中的激活项；未传时回退使用 `activeTextColor` | `string` | `—` | — |
| `activeBackgroundColor` | 菜单激活背景色 | `string` | `'#1d305b'` | — |
| `activeAncestorTextColor` | 激活菜单祖先节点文字颜色 | `string` | `undefined` | — |
| `activeAncestorBackgroundColor` | 激活菜单祖先节点背景色 | `string` | `undefined` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `fontWeight` | 菜单文字默认字重 | `number \| string` | `400` | — |
| `activeFontWeight` | 菜单文字激活字重 | `number \| string` | `600` | — |
| `fontFamily` | 菜单字体族 | `string` | `'var(--x-font-family)'` | — |
| `itemRadius` | 菜单项圆角，传入数字时按 px 处理 | `number \| string` | `—` | — |
| `submenuItemRadius` | 弹出子菜单项圆角，传入数字时按 px 处理 | `number \| string` | `—` | — |

### XNavMenu · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `openKeys` | 当前展开的父菜单 key，配合 `update:openKeys` 可受控使用 | `string[]` | `—` | — |
| `defaultOpenKeys` | 默认展开的父菜单 key | `string[]` | `—` | — |
| `showSubmenuArrow` | 是否显示有子菜单项右侧箭头 | `boolean` | `true` | — |

### XNavMenu · 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `teleported` | 是否将弹出子菜单挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `false` | — |
| `teleportTo` | 弹出子菜单挂载目标 | `string` | `'body'` | — |

### XNavMenu · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `activeKey` | 当前激活菜单 key | `string` | `''` | — |
| `mode` | 菜单模式 | `NavMenuMode` | `'vertical'` | — |
| `collapsed` | 是否收起（仅纵向有效） | `boolean` | `false` | — |
| `allowCollapse` | 是否启用收起能力 | `boolean` | `false` | — |
| `hidden` | 是否隐藏菜单侧边栏区域 | `boolean` | `false` | — |
| `scrollable` | 是否启用菜单自身滚动（仅纵向有效） | `boolean` | `false` | — |
| `accordion` | 是否启用同级仅展开一个子菜单（仅纵向非收起态有效） | `boolean` | `false` | — |

### XVerticalMenu · 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `items` | 菜单数据 | `NavMenuItem[]` | `—` | — |

### XVerticalMenu · 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `submenuArrowIcon` | 自定义子菜单箭头图标，字符串按 `XIcon` 名称渲染，Vue 组件按第三方图标组件渲染 | `string \| Component` | `—` | — |

### XVerticalMenu · 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `maxHeight` | 菜单最大高度，传入数字时按 px 处理 | `string \| number` | `—` | — |
| `itemGap` | 竖向菜单项间距 | `number \| string` | `—` | — |
| `submenuPopupGap` | 弹出子菜单框体与上级菜单之间的距离，传入数字时按 px 处理 | `number \| string` | `—` | — |

### XVerticalMenu · 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontFamily` | 菜单字体族 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `textColor` | 菜单文字默认色 | `string` | `—` | — |
| `activeBackgroundColor` | 菜单激活背景色 | `string` | `—` | — |
| `activeTextColor` | 菜单文字激活色 | `string` | `—` | — |
| `fontWeight` | 菜单文字默认字重 | `number \| string` | `—` | — |
| `submenuActiveTextColor` | 弹出子菜单 active 项文字色，只控制弹出子菜单中的激活项；未传时回退使用 `activeTextColor` | `string` | `—` | — |
| `activeAncestorTextColor` | 激活菜单祖先节点文字颜色 | `string` | `—` | — |
| `activeAncestorBackgroundColor` | 激活菜单祖先节点背景色 | `string` | `—` | — |
| `activeFontWeight` | 菜单文字激活字重 | `number \| string` | `—` | — |
| `itemRadius` | 菜单项圆角，传入数字时按 px 处理 | `number \| string` | `—` | — |
| `submenuItemRadius` | 弹出子菜单项圆角，传入数字时按 px 处理 | `number \| string` | `—` | — |

### XVerticalMenu · 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `openKeys` | 当前展开的父菜单 key，配合 `update:openKeys` 可受控使用 | `string[]` | `—` | — |
| `defaultOpenKeys` | 默认展开的父菜单 key | `string[]` | `—` | — |
| `showSubmenuArrow` | 是否显示有子菜单项右侧箭头 | `boolean` | `—` | — |

### XVerticalMenu · 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `teleported` | 是否将弹出子菜单挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `—` | — |
| `teleportTo` | 弹出子菜单挂载目标 | `string` | `—` | — |

### XVerticalMenu · 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `hidden` | 是否隐藏菜单侧边栏区域 | `boolean` | `—` | — |
| `collapsed` | 是否收起（仅纵向有效） | `boolean` | `—` | — |
| `allowCollapse` | 是否启用收起能力 | `boolean` | `—` | — |
| `accordion` | 是否启用同级仅展开一个子菜单（仅纵向非收起态有效） | `boolean` | `—` | — |
| `activeKey` | 当前激活菜单 key | `string` | `—` | — |
| `scrollable` | 是否启用菜单自身滚动（仅纵向有效） | `boolean` | `—` | — |

## 事件

### XHorizontalMenu · 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:openKeys` | 受控展开菜单更新时触发 | `[openKeys: string[]]` |

### XHorizontalMenu · 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `open-change` | 展开菜单变化时触发 | `[openKeys: string[]]` |

### XHorizontalMenu · 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `select` | 点击叶子节点菜单时触发 | `[key: string]` |

### XNavMenu · 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:openKeys` | 受控展开菜单更新时触发 | `[openKeys: string[]]` |

### XNavMenu · 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `open-change` | 展开菜单变化时触发 | `[openKeys: string[]]` |

### XNavMenu · 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `select` | 点击叶子节点菜单时触发 | `[key: string]` |

### XVerticalMenu · 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:openKeys` | 受控展开菜单更新时触发 | `[openKeys: string[]]` |

### XVerticalMenu · 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `open-change` | 展开菜单变化时触发 | `[openKeys: string[]]` |

### XVerticalMenu · 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `select` | 点击叶子节点菜单时触发 | `[key: string]` |

## 插槽

### XHorizontalMenu · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | header 插槽 | `无作用域参数` |
| `footer` | footer 插槽 | `无作用域参数` |

### XNavMenu · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | header 插槽 | `无作用域参数` |
| `footer` | footer 插槽 | `无作用域参数` |

### XVerticalMenu · 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | header 插槽 | `无作用域参数` |
| `footer` | footer 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### NavMenuMode

```ts
export type NavMenuMode = 'vertical' | 'horizontal'
```

### NavMenuItem

```ts
export interface NavMenuItem {
  key: string
  label: string
  icon?: string | Component
  routeName?: string
  permissionCode?: string
  children?: NavMenuItem[]
}
```

### NavMenuProps

```ts
export interface NavMenuProps {
  items: NavMenuItem[]
  activeKey?: string
  mode?: NavMenuMode
  collapsed?: boolean
  allowCollapse?: boolean
  hidden?: boolean
  teleported?: boolean
  teleportTo?: string
  scrollable?: boolean
  maxHeight?: string | number
  accordion?: boolean
  openKeys?: string[]
  defaultOpenKeys?: string[]
  textColor?: string
  activeTextColor?: string
  submenuActiveTextColor?: string
  activeBackgroundColor?: string
  activeAncestorTextColor?: string
  activeAncestorBackgroundColor?: string
  fontSize?: number
  fontWeight?: number | string
  activeFontWeight?: number | string
  fontFamily?: string
  itemGap?: number | string
  itemRadius?: number | string
  submenuItemRadius?: number | string
  submenuPopupGap?: number | string
  showSubmenuArrow?: boolean
  submenuArrowIcon?: string | Component
}
```

### HorizontalMenuProps

```ts
export type HorizontalMenuProps = Omit<
  NavMenuProps,
  'mode' | 'collapsed' | 'allowCollapse' | 'accordion'
>
```

### VerticalMenuProps

```ts
export type VerticalMenuProps = Omit<NavMenuProps, 'mode'>
```

## 验收说明

1. 在 Histoire 中切换 `vertical/horizontal`，确认菜单布局变化正确。
2. 在 `vertical` 模式下开启 `hidden`，确认侧边栏菜单区域被隐藏；关闭后状态仍保留。
3. 在 `vertical` 模式下开启 `collapsed`，确认一级菜单仅显示图标并保留 `title` 提示。
4. 在收起的纵向菜单中点击或悬停带子菜单的一级项，确认子菜单从右侧弹出，且更深层级继续向右级联弹出。
5. 点击多级菜单叶子项，确认 `select` 事件能正确返回 `key`。
6. 调整字体大小、字重和字体族，确认一级菜单、子菜单和激活态文本样式同步生效。
7. 开启 `scrollable` 并设置 `maxHeight=300`，确认滚动条只出现在菜单内部。
8. 开启 `accordion`，依次展开同级父菜单，确认前一个父菜单会自动折叠。
9. 设置 `activeKey="/security/roles"`，确认“系统设置”和“权限管理”等父级路径默认展开。
10. 调整 `itemGap`、`itemRadius`、`submenuItemRadius`、`submenuPopupGap`、`showSubmenuArrow`、`submenuArrowIcon`，确认间距、圆角和箭头显示符合配置。
