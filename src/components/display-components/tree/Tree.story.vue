<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import { XTree } from './index'
import type { TreeContextMenuContext, TreeContextMenuItem, TreeNodeData } from './src/types'
import '../../../styles/index.css'
const current = ref('1-1')
const currentUserId = ref<number | null>(1001)
const lastAction = ref('')
const dropLog = ref('')
const extraLog = ref('')
const flags = reactive({
  allowCreate: true,
  allowDelete: true,
  useCustomMenu: false,
  useCustomMethods: false,
  useExtraSlot: false
})
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
function onContextAction(action: string, node: TreeNodeData) {
  lastAction.value = `${action}: ${node.label}`
}
function onNodeExtraClick(node: TreeNodeData) {
  extraLog.value = `右侧点击: ${node.label}`
}
function makeNode(label: string): TreeNodeData {
  const id = `story-${Date.now()}-${Math.round(Math.random() * 1000)}`
  return {
    id,
    rawId: Number(String(Date.now()).slice(-6)),
    type: 'document',
    label,
    isEditing: true
  }
}
function createRootNode(treeData: TreeNodeData[]) {
  const node = makeNode('业务新增根节点')
  treeData.push(node)
  return node
}
function createNode(node: TreeNodeData) {
  const child = makeNode('业务新增节点')
  node.children = node.children || []
  node.children.push(child)
  return child
}
function deleteNode(node: TreeNodeData, treeData: TreeNodeData[]) {
  removeNodeById(treeData, node.id)
}
function customContextMenuItems(context: TreeContextMenuContext): TreeContextMenuItem[] {
  return [
    { action: 'new-root', label: '增加根节点' },
    { action: 'new-child', label: '新建节点', disabled: !context.node || !flags.allowCreate },
    { action: 'delete-node', label: '删除节点', disabled: !context.node || !flags.allowDelete, tone: 'danger' }
  ]
}
function removeNodeById(nodes: TreeNodeData[], id: string | number): TreeNodeData | null {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    if (node.id === id) {
      return nodes.splice(i, 1)[0]
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
  <Story title="展示组件/树目录 Tree" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTree">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTree
            v-if="!flags.useExtraSlot"
            :tree-data="data"
            :current-tree-key="current"
            :current-user-id="currentUserId"

            :can-create-child-by-node="() => flags.allowCreate"
            :can-delete-node-by-id="() => flags.allowDelete"
            :context-menu-items="flags.useCustomMenu ? customContextMenuItems : undefined"
            :create-root-node="flags.useCustomMethods ? createRootNode : undefined"
            :create-node="flags.useCustomMethods ? createNode : undefined"
            :delete-node="flags.useCustomMethods ? deleteNode : undefined"
            @node-click="(node) => (current = String(node.id))"
            @node-extra-click="onNodeExtraClick"
            @context-action="onContextAction"
            @node-drop="handleNodeDrop"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
