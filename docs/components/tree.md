# 树目录 Tree

`XTree` 提供树形目录展示、展开收起、右键菜单、节点新增删除和拖拽落点事件能力。

## 用法

```vue
<XTree :tree-data="treeData" :current-tree-key="currentKey" @nodeClick="onNodeClick" />
```

## 右键菜单

默认右键菜单只包含三项：

- `增加根节点`：向 `treeData` 根级追加一个临时节点，并进入重命名输入态。
- `新建节点`：在当前右键节点下追加一个临时子节点，并自动展开父节点。
- `删除节点`：从 `treeData` 中删除当前右键节点。

可以通过 `createRootNode`、`createNode`、`deleteNode` 接管这三项的具体方法。传入自定义方法后，组件不会再执行内置新增或删除逻辑。

```vue
<script setup lang="ts">
import type { TreeNodeData } from 'x.ui'

function createRootNode(treeData: TreeNodeData[]) {
  const node = { id: Date.now(), label: '业务根节点', isEditing: true }
  treeData.push(node)
  return node
}

function createNode(node: TreeNodeData) {
  const child = { id: Date.now(), label: '业务节点', isEditing: true }
  node.children = node.children || []
  node.children.push(child)
  return child
}

function deleteNode(node: TreeNodeData, treeData: TreeNodeData[]) {
  // 也可以在这里弹确认框、调用接口，再由业务侧更新 treeData
}
</script>

<template>
  <XTree
    :tree-data="treeData"
    :create-root-node="createRootNode"
    :create-node="createNode"
    :delete-node="deleteNode"
  />
</template>
```

如果需要替换菜单文案、隐藏菜单项或增加业务动作，可以传入 `contextMenuItems`。默认动作建议继续使用 `new-root`、`new-child`、`delete-node`，其中 `new-node` 也会按新建当前节点子节点处理。

```vue
<XTree
  :tree-data="treeData"
  :context-menu-items="({ node }) => [
    { action: 'new-root', label: '增加根节点' },
    { action: 'new-child', label: '新建节点', disabled: !node },
    { action: 'delete-node', label: '删除节点', disabled: !node, tone: 'danger' }
  ]"
/>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树数据 | `TreeNodeData[]` | 必填 |
| currentTreeKey | 当前选中节点 key | `string` | `''` |
| currentUserId | 当前用户 id | `number \| null` | `null` |
| size | 树节点尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| activeColor | 当前用户节点高亮色 | `string` | `'#2f66cf'` |
| textColor | 节点文字色 | `string` | 主题文字色 |
| mutedColor | 次要文字和图标色 | `string` | 主题次要色 |
| hoverBgColor | 节点悬浮背景色 | `string` | 主题主色浅底 |
| activeBgColor | 当前节点背景色 | `string` | `'rgba(14, 116, 144, 0.12)'` |
| activeTextColor | 当前节点文字色 | `string` | 主题文字色 |
| activeIconColor | 当前节点图标色 | `string` | `activeColor` |
| nodeIcon | 自定义节点图标 | `(node) => TreeNodeIcon` | `undefined` |
| allowDrag | 是否允许拖拽节点 | `(node) => boolean` | `() => true` |
| allowDrop | 是否允许落点 | `(dragging, drop, type) => boolean` | `() => true` |
| contextMenuItems | 自定义右键菜单项 | `TreeContextMenuItem[] \| (context) => TreeContextMenuItem[]` | 默认三项 |
| createRootNode | 自定义“增加根节点”方法 | `(treeData) => TreeNodeData \| void` | 内置追加根节点 |
| createNode | 自定义“新建节点”方法 | `(node) => TreeNodeData \| void` | 内置追加子节点 |
| deleteNode | 自定义“删除节点”方法 | `(node, treeData) => void` | 内置删除节点 |
| canCreateChildByNode | 默认菜单中是否显示“新建节点” | `(node) => boolean` | `() => true` |
| canDeleteNodeById | 默认菜单中是否显示“删除节点” | `(rawId) => boolean` | `() => true` |

## 类型

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

## 事件

| 事件 | 说明 |
| --- | --- |
| `nodeClick` | 点击节点时触发，返回当前节点 |
| `nodeDrop` | 拖拽放置时触发，返回拖拽节点、落点节点和落点类型 |
| `contextAction` | 右键菜单动作执行后触发，返回动作和目标节点 |

## 手动验收建议

- 右键节点，确认默认菜单只显示 `增加根节点`、`新建节点`、`删除节点`。
- 右键空白树区域，确认可以通过 `增加根节点` 创建根级节点。
- 传入 `createRootNode`、`createNode`、`deleteNode` 后，确认新增和删除逻辑由业务方法接管。
- 传入 `contextMenuItems` 后，确认菜单文案、禁用态、危险色和自定义动作符合预期。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XTree / `TreeProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `canManageMembersByNode` | canManageMembersByNode 判断回调 | `(node: TreeNodeData) => boolean` | — |
| `canMigrateNode` | canMigrateNode 判断回调 | `(node: TreeNodeData) => boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
