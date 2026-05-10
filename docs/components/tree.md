# 树目录 Tree

`XTree` 提供树形目录展示、展开收起、右键菜单和拖拽落点事件能力。

## 用法

```vue
<XTree :tree-data="treeData" :current-tree-key="currentKey" @nodeClick="onNodeClick" />
```

## Props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| treeData | 树数据 | `TreeNodeData[]` |
| currentTreeKey | 当前选中节点 key | `string` |
| currentUserId | 当前用户 id | `number \| null` |
| activeColor | 当前用户节点高亮色 | `string` |
| allowDrag | 是否允许拖拽节点 | `(node) => boolean` |
| allowDrop | 是否允许落点 | `(dragging, drop, type) => boolean` |
| canCreateChildByNode | 是否显示“新建子节点” | `(node) => boolean` |
| canDeleteNodeById | 是否显示“删除节点” | `(rawId) => boolean` |
| canManageMembersByNode | 是否显示“管理成员” | `(node) => boolean` |
| canMigrateNode | 是否显示“节点迁移” | `(node) => boolean` |

## 类型

`TreeNodeData` 关键字段：
- `type?: 'group' | 'user' | 'document'`
- `authorId/authorUserName/authorDisplayName`
- `isCurrentUserRootMember/hasMembers`

高亮规则：
- 传入 `currentUserId` 时，按 `authorId === currentUserId` 判定高亮。
- 未传 `currentUserId` 时，回退到 `isCurrentUserRootMember` 字段。

## 事件

| 事件 | 说明 |
| --- | --- |
| `nodeClick` | 点击节点 |
| `nodeDrop` | 拖拽放置 |
| `contextAction` | 右键菜单动作 |

说明：
- 右键选择 `增加根节点/新建子节点` 会立即创建临时节点并进入重命名输入态。
