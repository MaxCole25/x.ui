<script setup lang="ts">
import Example1 from '../examples/tabs/Example1.vue'
import Example1Source from '../examples/tabs/Example1.vue?raw'
import Example2 from '../examples/tabs/Example2.vue'
import Example2Source from '../examples/tabs/Example2.vue?raw'
import Example3 from '../examples/tabs/Example3.vue'
import Example3Source from '../examples/tabs/Example3.vue?raw'
import Example4 from '../examples/tabs/Example4.vue'
import Example4Source from '../examples/tabs/Example4.vue?raw'
</script>
# 标签页 Tabs

`XTabs` 是用于多页签内容切换的容器组件，支持关闭、新增、拖拽排序、懒渲染、右键菜单、四向布局和自定义标签内容。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 页签类型

<XDocDemo title="页签类型" :code="Example2Source">
  <Example2 />
</XDocDemo>

`variant=""` 与 `variant="line"` 都会使用线条页签。`card` 为默认卡片页签，`border-card` 会给整体容器增加边框并弱化内容区内边框，适合需要完整外框的页面模块。

### 新增与关闭

<XDocDemo title="新增与关闭" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 拖拽排序

<XDocDemo title="拖拽排序" :code="Example4Source">
  <Example4 />
</XDocDemo>

`reorder` 会返回 `{ source, target, position }`，业务侧根据这个结果调整 `items` 顺序。

### TabItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| name | 页签唯一值 | `TabName` |
| label | 页签显示文本 | `string` |
| icon | 文本图标或 Vue 组件 | `string \| Component` |
| avatarUrl | 头像图片地址 | `string` |
| avatarText | 头像文本 | `string` |
| disabled | 是否禁用 | `boolean` |
| locked | 是否锁定。锁定后不可关闭、不可刷新、不可作为拖拽源或拖拽目标，并显示锁图标 | `boolean` |
| closable | 是否覆盖全局关闭设置 | `boolean` |
| refreshable | 是否覆盖全局刷新设置 | `boolean` |
| draggable | 是否覆盖全局拖拽设置 | `boolean` |
| lazy | 是否覆盖全局懒渲染设置 | `boolean` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前激活页签值 | `TabName` | `—` | — |
| `items` | 页签列表 | `TabItem[]` | `() => []` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `labelDirection` | 标签文字方向 | `TabsLabelDirection` | `'horizontal'` | — |
| `tabMinWidth` | 单个页签最小宽度（支持数字像素或 CSS 长度） | `number \| string` | `undefined` | — |
| `tabGap` | 公开属性，详见类型定义 | `number \| string` | `4` | — |
| `verticalWidth` | vertical宽度 | `number \| string` | `undefined` | — |
| `verticalLabelMinHeight` | vertical标签Min高度 | `number \| string` | `undefined` | — |
| `fullHeight` | 是否填满父容器高度 | `boolean` | `false` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 页签视觉形态 | `TabsType` | `'card'` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `activeTabTextColor` | 激活页签文字色 | `string` | `'var(--x-color-primary)'` | — |
| `tabBackgroundColor` | 普通页签背景色，不影响透明的标签头容器 | `string` | `'transparent'` | — |
| `tabTextColor` | 普通页签文字色 | `string` | `'var(--x-color-text-muted)'` | — |
| `tabFontSize` | 标签文字大小（支持数字像素或 CSS 长度） | `number \| string` | `undefined` | — |
| `padding` | 内容区域内边距，支持 CSS 四边写法 | `number \| string` | `undefined` | — |
| `radius` | 页签整体圆角（支持数字像素或 CSS 长度） | `number \| string` | `4` | — |
| `border` | 标签头和内容页边框 | `string` | `'1px solid var(--x-color-border)'` | — |
| `contentBackgroundColor` | 内容页和激活页签背景色 | `string` | `'var(--x-color-surface)'` | — |
| `contextMenuBackgroundColor` | 右键菜单背景色 | `string` | `'var(--x-color-surface)'` | — |
| `contextMenuTextColor` | 右键菜单文字色 | `string` | `'var(--x-color-text)'` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showAvatar` | 是否显示头像信息 | `boolean` | `true` | — |
| `showCloseIcon` | 是否显示关闭入口 | `boolean` | `true` | — |
| `showRefreshIcon` | 是否默认允许刷新 | `boolean` | `false` | — |
| `showContextMenu` | 是否启用页签右键菜单 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `tabPosition` | 页签位置 | `TabPosition` | `'top'` | — |
| `tabStretch` | 是否拉伸页签 | `boolean` | `false` | — |
| `closable` | 是否覆盖全局关闭设置 | `boolean` | `false` | — |
| `addable` | 是否显示新增按钮 | `boolean` | `false` | — |
| `editable` | 是否进入编辑态，效果同新增按钮 | `boolean` | `false` | — |
| `lazy` | 是否覆盖全局懒渲染设置 | `boolean` | `false` | — |
| `draggable` | 是否覆盖全局拖拽设置 | `boolean` | `false` | — |
| `beforeLeave` | 切换前守卫，返回 `false` 阻止切换 | `(activeName: TabName, oldActiveName: TabName) => boolean \| Promise<boolean>` | `undefined` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 激活页签变化 | `[value: TabName]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 激活页签变化 | `[value: TabName]` |
| `tab-click` | 点击页签 | `[pane: TabsPaneContext, event: Event]` |
| `tab-close-all` | 请求关闭全部可关闭、未锁定页签 | `[payload: TabsCloseAllPayload]` |
| `tab-close-others` | 请求关闭除当前右键目标外的其它可关闭、未锁定页签 | `[payload: TabsCloseOthersPayload]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `tab-remove` | 请求关闭页签 | `[name: TabName]` |
| `tab-add` | 请求新增页签 | `[]` |
| `edit` | 新增或删除编辑事件 | `[targetName: TabName \| undefined, action: 'remove' \| 'add']` |
| `tab-refresh` | 请求刷新单个页签 | `[name: TabName]` |
| `tab-refresh-all` | 请求刷新全部页签 | `[]` |
| `reorder` | 拖拽排序 | `[payload: { source: TabName; target: TabName; position: TabsReorderPosition }]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `label` | 页签显示文本 | `item: TabItem; active: boolean; locked: boolean` |
| `pane` | 统一内容面板 | `item: TabItem` |
| `pane-${name}` | pane-${name} 插槽 | `item: TabItem` |
| `default` | `items` 为空时的默认内容 | `无作用域参数` |

## 实例方法

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `scrollActiveTabIntoView` | scrollActiveTabIntoView 方法 | `() => void` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TabName

```ts
export type TabName = string | number
```

### TabPosition

```ts
export type TabPosition = 'top' | 'right' | 'bottom' | 'left'
```

### TabsLabelDirection

```ts
export type TabsLabelDirection = 'horizontal' | 'vertical'
```

### TabsType

```ts
export type TabsType = '' | 'line' | 'card' | 'border-card'
```

### TabsEditAction

```ts
export type TabsEditAction = 'remove' | 'add'
```

### TabsReorderPosition

```ts
export type TabsReorderPosition = 'before' | 'after'
```

### TabItem

```ts
export interface TabItem {
  name: TabName
  label: string
  icon?: string | Component
  avatarUrl?: string
  avatarText?: string
  disabled?: boolean
  locked?: boolean
  closable?: boolean
  refreshable?: boolean
  draggable?: boolean
  lazy?: boolean
}
```

### TabsPaneContext

```ts
export interface TabsPaneContext {
  paneName: TabName
  item: TabItem
}
```

### TabsReorderPayload

```ts
export interface TabsReorderPayload {
  source: TabName
  target: TabName
  position: TabsReorderPosition
}
```

### TabsCloseAllPayload

```ts
export interface TabsCloseAllPayload {
  names: TabName[]
}
```

### TabsCloseOthersPayload

```ts
export interface TabsCloseOthersPayload {
  targetName: TabName
  names: TabName[]
}
```

### TabsExpose

```ts
export interface TabsExpose {
  scrollActiveTabIntoView: () => void
}
```

### TabsProps

```ts
export interface TabsProps {
  modelValue?: TabName
  items?: TabItem[]
  variant?: TabsType
  fontSize?: number
  tabPosition?: TabPosition
  labelDirection?: TabsLabelDirection
  tabStretch?: boolean
  closable?: boolean
  addable?: boolean
  editable?: boolean
  lazy?: boolean
  showAvatar?: boolean
  showCloseIcon?: boolean
  showRefreshIcon?: boolean
  showContextMenu?: boolean
  draggable?: boolean
  activeTabTextColor?: string
  tabBackgroundColor?: string
  tabTextColor?: string
  tabFontSize?: number | string
  tabMinWidth?: number | string
  tabGap?: number | string
  padding?: number | string
  verticalWidth?: number | string
  verticalLabelMinHeight?: number | string
  radius?: number | string
  border?: string
  contentBackgroundColor?: string
  contextMenuBackgroundColor?: string
  contextMenuTextColor?: string
  fullHeight?: boolean
  beforeLeave?: (activeName: TabName, oldActiveName: TabName) => boolean | Promise<boolean>
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### TabsFontSize

```ts
export type TabsFontSize = FontSize
```

## 验收说明

- 切换普通、禁用和懒渲染页签，确认内容显示和事件触发正确。
- 开启关闭、新增、拖拽排序后，确认业务侧更新 `items` 后界面同步。
- 为系统首页等固定页签设置 `locked: true`，确认关闭、拖拽、刷新和锁图标都遵循锁定语义。
- 使用右键菜单锁定、解锁、刷新、关闭其它和关闭全部，确认锁定页签不会被关闭或刷新。
- 分别检查 `top`、`bottom`、`left`、`right` 方向，确认长文本不会溢出遮挡。
