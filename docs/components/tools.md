<script setup lang="ts">
import Example1 from '../examples/tools/Example1.vue'
import Example1Source from '../examples/tools/Example1.vue?raw'
import Example2 from '../examples/tools/Example2.vue'
import Example2Source from '../examples/tools/Example2.vue?raw'
</script>
# 工具栏 Tools

用于组织页面顶部的轻量操作入口，适合后台列表、报表、编辑器等场景。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

默认使用 `vertical` 布局：图标在上、文字在下，适合页面顶部的常规工具栏。

### 横向布局

设置 `item-layout="horizontal"` 后，图标和文字会在同一行显示。配合 `:font-size="10"` 可用于业务明细表标题栏右侧的紧凑工具栏。

<XDocDemo title="横向紧凑工具栏" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 工具项类型

| 类型 | 说明 |
| --- | --- |
| `button` | 普通工具按钮，点击执行 `onClick` 并触发 `click` 事件。 |
| `dropdown` | 整个按钮点击打开下拉菜单，不执行主按钮方法。 |
| `split-dropdown` | 主按钮区域执行 `onClick`，右侧箭头打开下拉菜单。 |
| `separator` | 渲染竖向分隔线，用于分隔工具分组。 |

### 图标与角标

工具项设置 `showName: false` 后，按钮只显示图标，`name` 仍会作为按钮的 `title` 和无障碍名称使用。角标能力复用 `XBadge` 的语义，支持数字、最大值、圆点、状态和自定义颜色。角标只显示在顶层工具项图标上，不影响下拉菜单项文字。

### ToolsItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| type | 工具项类型 | `button \| dropdown \| split-dropdown \| separator` |
| key | 工具项唯一标识 | `string \| number` |
| name | 工具项名称 | `string` |
| showName | 是否显示工具项名称，设为 `false` 时只显示图标 | `boolean` |
| icon | 图标名称，使用 `XIcon` 的图标命名 | `string` |
| disabled | 是否禁用当前项 | `boolean` |
| badgeValue | 角标内容 | `string \| number` |
| badgeMax | 数字角标最大值，超过后显示为 `max+` | `number` |
| badgeDot | 是否显示圆点角标 | `boolean` |
| badgeHidden | 是否隐藏角标 | `boolean` |
| badgeStatus | 角标状态 | `primary \| success \| warning \| danger \| info` |
| badgeShowZero | 角标值为 `0` 时是否显示 | `boolean` |
| badgeAccentColor | 角标主题色 | `string` |
| badgeBackgroundColor | 角标背景色 | `string` |
| badgeTextColor | 角标文字色 | `string` |
| badgeBorderColor | 角标边框色 | `string` |
| children | 下拉菜单项 | `ToolsMenuItem[]` |
| onClick | 主按钮点击方法 | `(item, event) => void` |
| onCommand | 下拉命令方法 | `(command, item, menuItem) => void` |

### ToolsMenuItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| key | 菜单项标识 | `string \| number` |
| name | 菜单项名称 | `string` |
| command | 命令值，未传时使用 `key` 或 `name` | `unknown` |
| icon | 菜单项图标 | `string` |
| disabled | 是否禁用 | `boolean` |
| divided | 是否显示上分割线 | `boolean` |
| active | 是否激活 | `boolean` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `items` | 工具项列表 | `ToolsItem[]` | `() => []` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `borderWidth` | 边框宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用当前项 | `boolean` | `false` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `teleported` | 下拉菜单是否挂载到外部 | `boolean` | `false` | — |
| `teleportTo` | 下拉菜单挂载目标 | `string` | `'body'` | — |
| `zIndex` | 下拉菜单层级 | `number` | `2000` | — |
| `placement` | 下拉菜单弹出位置 | `DropdownPlacement` | `'bottom-start'` | — |
| `popperWidth` | 下拉菜单宽度 | `number \| string` | `148` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `itemLayout` | 工具项布局；`vertical` 为图标在上、文字在下，`horizontal` 为图标与文字同行 | `ToolsItemLayout` | `'vertical'` | — |

## 事件

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `click` | 工具按钮主动作点击时触发。 | `[item: ToolsActionItem, event: MouseEvent]` |
| `visible-change` | 某个下拉项显示状态变化时触发。 | `[item: ToolsActionItem, visible: boolean]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `command` | 命令值，未传时使用 `key` 或 `name` | `[command: unknown, item: ToolsActionItem, menuItem: ToolsMenuItem]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `icon` | 图标名称，使用 `XIcon` 的图标命名 | `item: ToolsItem` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `item` | 自定义单个工具项内容。 | `item: ToolsItem; disabled: boolean` |
| `dropdown-item` | 自定义下拉菜单项内容。 | `item: ToolsItem; menuItem: ToolsMenuItem` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ToolsItemKey

```ts
export type ToolsItemKey = string | number
```

### ToolsItemType

```ts
export type ToolsItemType = 'button' | 'dropdown' | 'split-dropdown' | 'separator'
```

### ToolsItemLayout

```ts
export type ToolsItemLayout = 'vertical' | 'horizontal'
```

### ToolsMenuItem

```ts
export interface ToolsMenuItem {
  key?: ToolsItemKey
  name: string
  command?: unknown
  icon?: string
  disabled?: boolean
  divided?: boolean
  active?: boolean
  onClick?: (menuItem: ToolsMenuItem, item: ToolsActionItem) => void
}
```

### ToolsActionItem

```ts
export interface ToolsActionItem {
  type?: Exclude<ToolsItemType, 'separator'>
  key: ToolsItemKey
  name?: string
  showName?: boolean
  icon?: string
  disabled?: boolean
  badgeValue?: string | number
  badgeMax?: number
  badgeDot?: boolean
  badgeHidden?: boolean
  badgeStatus?: BadgeProps['status']
  badgeShowZero?: boolean
  badgeAccentColor?: string
  badgeBackgroundColor?: string
  badgeTextColor?: string
  badgeBorderColor?: string
  children?: ToolsMenuItem[]
  onClick?: (item: ToolsActionItem, event: MouseEvent) => void
  onCommand?: (command: unknown, item: ToolsActionItem, menuItem: ToolsMenuItem) => void
}
```

### ToolsSeparatorItem

```ts
export interface ToolsSeparatorItem {
  type: 'separator'
  key?: ToolsItemKey
}
```

### ToolsItem

```ts
export type ToolsItem = ToolsActionItem | ToolsSeparatorItem
```

### ToolsProps

```ts
export interface ToolsProps extends ElementStyleProps {
  items?: ToolsItem[]
  fontSize?: number
  itemLayout?: ToolsItemLayout
  disabled?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
  placement?: DropdownPlacement
  popperWidth?: number | string
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
