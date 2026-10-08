<script setup lang="ts">
import Example1 from '../examples/tree/Example1.vue'
import Example1Source from '../examples/tree/Example1.vue?raw'
import Example2 from '../examples/tree/Example2.vue'
import Example2Source from '../examples/tree/Example2.vue?raw'
import Example3 from '../examples/tree/Example3.vue'
import Example3Source from '../examples/tree/Example3.vue?raw'
</script>
# 树目录 Tree

`XTree` 提供树形目录展示、展开收起、键盘上下选择、右键菜单、节点新增删除和拖拽落点事件能力。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 右侧内容

节点右侧默认显示 `authorDisplayName || authorUserName`，用于展示作者或成员名称。需要替换为业务操作区时，可以使用 `nodeExtra` 插槽；点击右侧区域会触发 `nodeExtraClick`，并且不会同时触发 `nodeClick`。

<XDocDemo title="右侧内容" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 右键菜单

默认右键菜单只包含三项：

- `增加根节点`：向 `treeData` 根级追加一个临时节点，并进入重命名输入态。
- `新建节点`：在当前右键节点下追加一个临时子节点，并自动展开父节点。
- `删除节点`：从 `treeData` 中删除当前右键节点。

可以通过 `createRootNode`、`createNode`、`deleteNode` 接管这三项的具体方法。传入自定义方法后，组件不会再执行内置新增或删除逻辑。

<XDocDemo title="右键菜单" :code="Example3Source">
  <Example3 />
</XDocDemo>

如果需要替换菜单文案、隐藏菜单项或增加业务动作，可以传入 `contextMenuItems`。默认动作建议继续使用 `new-root`、`new-child`、`delete-node`，其中 `new-node` 也会按新建当前节点子节点处理。

源码示例展示了如何替换菜单文案、禁用菜单项和标记危险操作。

### 类型

`TreeNodeData` 关键字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 节点唯一标识 |
| `rawId` | 业务原始 id，常用于权限判断 |
| `label` | 节点文本 |
| `icon` | Remix Icon 类名、自定义字符或 `false` |
| `isEditing` | 是否进入重命名输入态 |
| `type` | `'group' \| 'user' \| 'document'` |
| `children` | 子节点 |

`TreeContextMenuItem` 字段：

| 字段 | 说明 |
| --- | --- |
| `action` | 菜单动作，默认支持 `new-root`、`new-child`、`new-node`、`delete-node` |
| `label` | 菜单文案 |
| `disabled` | 是否禁用 |
| `visible` | 是否显示，设置为 `false` 时隐藏 |
| `tone` | 菜单语义色，支持 `'default' \| 'danger'` |

高亮规则：

- 传入 `currentUserId` 时，按 `authorId === currentUserId` 判定高亮。
- 未传 `currentUserId` 时，回退到 `isCurrentUserRootMember` 字段。

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `nodeIcon` | 自定义节点图标 | `(node: TreeNodeData) => TreeNodeIcon` | `—` | — |
| `contextMenuItems` | 自定义右键菜单项 | `TreeContextMenuItems` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `activeAccentColor` | 当前用户节点高亮色 | `string` | `'#2f66cf'` | — |
| `textColor` | 节点文字色 | `string` | `'var(--x-color-text, #121826)'` | — |
| `mutedTextColor` | 次要文字和图标色 | `string` | `'var(--x-color-muted, #606b7d)'` | — |
| `hoverBackgroundColor` | 节点悬浮背景色 | `string` | `'var(--x-color-primary-soft, #f5f8fb)'` | — |
| `activeBackgroundColor` | 当前节点背景色 | `string` | `'rgba(14, 116, 144, 0.12)'` | — |
| `activeTextColor` | 当前节点文字色 | `string` | `'var(--x-color-text, #121826)'` | — |
| `activeIconColor` | 当前节点图标色 | `string` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `treeData` | 树数据 | `TreeNodeData[]` | `—` | — |
| `currentTreeKey` | 当前选中节点 key | `string` | `''` | — |
| `currentUserId` | 当前用户 id | `number \| null` | `null` | — |
| `allowDrag` | 是否允许拖拽节点 | `(node: TreeNodeData) => boolean` | `() => true` | — |
| `allowDrop` | 是否允许落点 | `(draggingNode: TreeNodeData, dropNode: TreeNodeData, type: 'before' \| 'after' \| 'inner') => boolean` | `() => true` | — |
| `createRootNode` | 自定义“增加根节点”方法 | `TreeCreateRootNode` | `—` | — |
| `createNode` | 自定义“新建节点”方法 | `TreeCreateNode` | `—` | — |
| `deleteNode` | 自定义“删除节点”方法 | `TreeDeleteNode` | `—` | — |
| `canCreateChildByNode` | 默认菜单中是否显示“新建节点” | `(node: TreeNodeData) => boolean` | `() => true` | — |
| `canDeleteNodeById` | 默认菜单中是否显示“删除节点” | `(nodeId?: number \| null) => boolean` | `() => true` | — |
| `canManageMembersByNode` | canManageMembersByNode 判断回调 | `(node: TreeNodeData) => boolean` | `() => true` | — |
| `canMigrateNode` | canMigrateNode 判断回调 | `(node: TreeNodeData) => boolean` | `() => true` | — |

## 事件

### 内容与展示

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `contextAction` | 右键菜单动作执行后触发，返回动作和目标节点 | `[action: TreeContextAction, node: TreeNodeData]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `nodeClick` | 鼠标点击节点或键盘上下键选择节点时触发，返回当前节点 | `[node: TreeNodeData]` |
| `nodeExtraClick` | 点击节点右侧内容时触发，返回当前节点和原生点击事件 | `[node: TreeNodeData, event: MouseEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `nodeDrop` | 拖拽放置时触发，返回拖拽节点、落点节点和落点类型 | `[draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' \| 'after' \| 'inner']` |
| `nodeToggle` | nodeToggle 事件 | `[payload: { node: TreeNodeData; expanded: boolean }]` |

## 插槽

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `nodeExtra` | 自定义节点右侧内容；不传时显示 `authorDisplayName | `node: TreeNodeData` |

## 实例方法

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `setCurrentKey` | setCurrentKey 方法 | `(key: string \| null) => void` |
| `expandAll` | expandAll 方法 | `() => void` |
| `collapseAll` | collapseAll 方法 | `() => void` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### TreeContextAction

```ts
export type TreeContextAction =
  | 'new-root'
  | 'new-node'
  | 'new-child'
  | 'delete-node'
  | 'manage-members'
  | 'migrate-node'
  | (string & {})
```

### TreeContextMenuItem

```ts
export interface TreeContextMenuItem {
  action: TreeContextAction
  label: string
  disabled?: boolean
  visible?: boolean
  tone?: TreeContextMenuItemTone
}
```

### TreeContextMenuContext

```ts
export interface TreeContextMenuContext {
  node: TreeNodeData | null
  treeData: TreeNodeData[]
}
```

### TreeContextMenuItems

```ts
export type TreeContextMenuItems =
  | TreeContextMenuItem[]
  | ((context: TreeContextMenuContext) => TreeContextMenuItem[])
```

### TreeCreateRootNode

```ts
export type TreeCreateRootNode = (treeData: TreeNodeData[]) => TreeNodeData | void
```

### TreeCreateNode

```ts
export type TreeCreateNode = (node: TreeNodeData) => TreeNodeData | void
```

### TreeDeleteNode

```ts
export type TreeDeleteNode = (node: TreeNodeData, treeData: TreeNodeData[]) => void
```

### TreeNodeData

```ts
export interface TreeNodeData {
  id: string | number
  rawId?: number
  label: string
  icon?: TreeNodeIcon
  isEditing?: boolean
  type?: TreeNodeType
  authorId?: number | null
  authorUserName?: string
  authorDisplayName?: string
  hasMembers?: boolean
  isCurrentUserRootMember?: boolean
  permissionCode?: string
  hasChildren?: boolean
  children?: TreeNodeData[]
  [key: string]: unknown
}
```

### TreeProps

```ts
export interface TreeProps {
  fontSize?: number
  treeData: TreeNodeData[]
  currentTreeKey?: string
  currentUserId?: number | null
  activeAccentColor?: string
  textColor?: string
  mutedTextColor?: string
  hoverBackgroundColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string
  activeIconColor?: string
  nodeIcon?: (node: TreeNodeData) => TreeNodeIcon
  allowDrag?: (node: TreeNodeData) => boolean
  allowDrop?: (draggingNode: TreeNodeData, dropNode: TreeNodeData, type: 'before' | 'after' | 'inner') => boolean
  contextMenuItems?: TreeContextMenuItems
  createRootNode?: TreeCreateRootNode
  createNode?: TreeCreateNode
  deleteNode?: TreeDeleteNode
  canCreateChildByNode?: (node: TreeNodeData) => boolean
  canDeleteNodeById?: (nodeId?: number | null) => boolean
  canManageMembersByNode?: (node: TreeNodeData) => boolean
  canMigrateNode?: (node: TreeNodeData) => boolean
}
```

### TreeSlots

```ts
export interface TreeSlots {
  nodeExtra?: (props: { node: TreeNodeData }) => unknown
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### TreeNodeType

```ts
export type TreeNodeType = 'group' | 'user' | 'document'
```

### TreeNodeIcon

```ts
export type TreeNodeIcon = string | false | null | undefined
```

### TreeContextMenuItemTone

```ts
export type TreeContextMenuItemTone = 'default' | 'danger'
```

## 验收说明

- 右键节点，确认默认菜单只显示 `增加根节点`、`新建节点`、`删除节点`。
- 聚焦树目录后按上下方向键，确认当前节点会按可见顺序切换，并触发 `nodeClick`。
- 右键空白树区域，确认可以通过 `增加根节点` 创建根级节点。
- 传入 `createRootNode`、`createNode`、`deleteNode` 后，确认新增和删除逻辑由业务方法接管。
- 传入 `contextMenuItems` 后，确认菜单文案、禁用态、危险色和自定义动作符合预期。
