<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XTree } from './index'
import type { TreeNodeData } from './src/types'
import '../../styles/index.css'

const current = ref('1-1')
const currentUserId = ref<number | null>(1001)
const lastAction = ref('')
const dropLog = ref('')
const flags = reactive({
  allowCreate: true,
  allowDelete: true,
  allowManage: true,
  allowMigrate: true
})
const activeColor = ref('#2f66cf')
const data = ref<TreeNodeData[]>([
  {
    id: '1',
    rawId: 1,
    type: 'group',
    label: '产品组',
    authorId: 1001,
    authorDisplayName: '张三',
    isCurrentUserRootMember: true,
    children: [
      { id: '1-1', rawId: 11, type: 'user', label: '需求文档', authorId: 1002, authorDisplayName: '李四' },
      { id: '1-2', rawId: 12, type: 'document', label: '发布记录', authorId: 1001, authorDisplayName: '张三' }
    ]
  },
  { id: '2', rawId: 2, type: 'group', label: '运营组', authorId: 1003, authorDisplayName: '王五' }
])

function onContextAction(action: string) {
  lastAction.value = action
}

function removeNodeById(nodes: TreeNodeData[], id: string | number): TreeNodeData | null {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    if (node.id === id) {
      nodes.splice(i, 1)
      return node
    }
    if (node.children?.length) {
      const found = removeNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

function findNodeById(nodes: TreeNodeData[], id: string | number): TreeNodeData | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

function insertBeforeOrAfter(nodes: TreeNodeData[], targetId: string | number, dragging: TreeNodeData, type: 'before' | 'after'): boolean {
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].id === targetId) {
      const at = type === 'before' ? i : i + 1
      nodes.splice(at, 0, dragging)
      return true
    }
    if (nodes[i].children?.length) {
      const ok = insertBeforeOrAfter(nodes[i].children!, targetId, dragging, type)
      if (ok) return true
    }
  }
  return false
}

function handleNodeDrop(draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' | 'after' | 'inner') {
  const dragging = removeNodeById(data.value, draggingNode.id)
  if (!dragging) return

  if (dropType === 'inner') {
    const target = findNodeById(data.value, dropNode.id)
    if (!target) return
    target.children = target.children || []
    target.children.push(dragging)
  } else {
    insertBeforeOrAfter(data.value, dropNode.id, dragging, dropType)
  }

  dropLog.value = `拖拽: ${String(draggingNode.id)} -> ${String(dropNode.id)} (${dropType})`
}
</script>

<template>
  <Story title="组件/树目录 Tree" group="components">
    <Variant title="交互调试">
      <div style="display: grid; gap: 12px">
        <div style="display: flex; gap: 12px; flex-wrap: wrap; font-size: 13px">
          <label><input v-model="flags.allowCreate" type="checkbox" />允许新建子节点</label>
          <label><input v-model="flags.allowDelete" type="checkbox" />允许删除</label>
          <label><input v-model="flags.allowManage" type="checkbox" />允许管理成员</label>
          <label><input v-model="flags.allowMigrate" type="checkbox" />允许迁移</label>
          <label>
            当前用户ID
            <input v-model.number="currentUserId" type="number" style="width: 84px" />
          </label>
          <label>
            激活颜色
            <input v-model="activeColor" type="color" />
          </label>
        </div>
        <XTree
          :tree-data="data"
          :current-tree-key="current"
          :current-user-id="currentUserId"
          :active-color="activeColor"
          :can-create-child-by-node="() => flags.allowCreate"
          :can-delete-node-by-id="() => flags.allowDelete"
          :can-manage-members-by-node="() => flags.allowManage"
          :can-migrate-node="() => flags.allowMigrate"
          @node-click="(node) => (current = String(node.id))"
          @context-action="(action) => onContextAction(action)"
          @node-drop="handleNodeDrop"
        />
        <div style="font-size: 12px; color: #64748b">
          当前选中: {{ current }} | 最近动作: {{ lastAction || '-' }} | 拖拽日志: {{ dropLog || '-' }}
        </div>
      </div>
    </Variant>
  </Story>
</template>
