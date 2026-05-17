<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import TreeNode from './TreeNode.vue'
import type { TreeContextAction, TreeNodeData, TreeProps } from './types'

defineOptions({ name: 'XTree' })

const props = withDefaults(defineProps<TreeProps>(), {
  currentTreeKey: '',
  currentUserId: null,
  activeColor: '#2f66cf',
  allowDrag: () => true,
  allowDrop: () => true,
  canCreateChildByNode: () => true,
  canDeleteNodeById: () => true,
  canManageMembersByNode: () => true,
  canMigrateNode: () => true
})

const emit = defineEmits<{
  (e: 'nodeClick', node: TreeNodeData): void
  (e: 'nodeDrop', draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' | 'after' | 'inner'): void
  (e: 'contextAction', action: TreeContextAction, node: TreeNodeData): void
}>()

const currentKeyState = ref(props.currentTreeKey)
const draggingNode = ref<TreeNodeData | null>(null)
const expandedState = ref<Record<string, boolean>>({})
const contextMenu = reactive({ visible: false, x: 0, y: 0, node: null as TreeNodeData | null })
const localIdSeed = ref(100000)

watch(
  () => props.currentTreeKey,
  (v) => {
    currentKeyState.value = v
  },
  { immediate: true }
)

watch(
  () => props.treeData,
  (nodes) => {
    const next: Record<string, boolean> = {}
    const walk = (items: TreeNodeData[]) => {
      items.forEach((item) => {
        const key = String(item.id)
        next[key] = expandedState.value[key] !== false
        if (item.children?.length) walk(item.children)
      })
    }
    walk(nodes || [])
    expandedState.value = next
  },
  { immediate: true, deep: true }
)

function setCurrentKey(key: string | null) {
  currentKeyState.value = key || ''
}
function setExpanded(key: string, expanded: boolean) {
  expandedState.value = { ...expandedState.value, [key]: expanded }
}
function expandAll() {
  Object.keys(expandedState.value).forEach((k) => (expandedState.value[k] = true))
}
function collapseAll() {
  Object.keys(expandedState.value).forEach((k) => (expandedState.value[k] = false))
}
function closeContextMenu() {
  contextMenu.visible = false
  contextMenu.node = null
}
function handleContextAction(action: TreeContextAction) {
  if (action === 'new-root') {
    const newNode: TreeNodeData = {
      id: `new-${localIdSeed.value}`,
      rawId: localIdSeed.value,
      label: '新建节点',
      type: 'document',
      isEditing: true
    }
    localIdSeed.value += 1
    props.treeData.push(newNode)
    emit('contextAction', action, newNode)
    closeContextMenu()
    return
  }

  if (!contextMenu.node) return

  if (action === 'new-child') {
    const parent = contextMenu.node
    parent.children = parent.children || []
    const newNode: TreeNodeData = {
      id: `new-${localIdSeed.value}`,
      rawId: localIdSeed.value,
      label: '新建子节点',
      type: 'document',
      isEditing: true
    }
    localIdSeed.value += 1
    parent.children.push(newNode)
    emit('contextAction', action, newNode)
    closeContextMenu()
    return
  }

  emit('contextAction', action, contextMenu.node)
  closeContextMenu()
}

function handleNodeDrop(dragging: TreeNodeData, drop: TreeNodeData, type: 'before' | 'after' | 'inner') {
  emit('nodeDrop', dragging, drop, type)
}

function handleRename(node: TreeNodeData, label: string) {
  node.label = label
  node.isEditing = false
}

function canDeleteCurrentNode() {
  return props.canDeleteNodeById(contextMenu.node?.rawId ?? null)
}

onMounted(() => window.addEventListener('click', closeContextMenu))
onBeforeUnmount(() => window.removeEventListener('click', closeContextMenu))

defineExpose({ setCurrentKey, expandAll, collapseAll })
</script>

<template>
  <div class="x-tree" :style="{ '--x-tree-active-color': props.activeColor }">
    <div v-if="!props.treeData.length" class="x-tree__empty">还没有数据</div>
    <TreeNode
      v-for="node in props.treeData"
      :key="String(node.id)"
      :node="node"
      :depth="0"
      :current-tree-key="currentKeyState"
      :expanded-state="expandedState"
      :dragging-node="draggingNode"
      :current-user-id="props.currentUserId"
      :allow-drag="props.allowDrag"
      :allow-drop="props.allowDrop"
      @node-click="emit('nodeClick', $event)"
      @node-drop="handleNodeDrop"
      @node-contextmenu="
        (event, nodeData) => {
          contextMenu.visible = true
          contextMenu.x = event.clientX
          contextMenu.y = event.clientY
          contextMenu.node = nodeData
        }
      "
      @drag-start="draggingNode = $event"
      @drag-end="draggingNode = null"
      @toggle="setExpanded"
      @rename="handleRename"
    />

    <teleport to="body">
      <ul v-if="contextMenu.visible" class="x-tree-menu" :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }">
        <li class="x-tree-menu__item" @click.stop="handleContextAction('open')">打开</li>
        <li class="x-tree-menu__item" @click.stop="handleContextAction('new-root')">增加根节点</li>
        <li
          v-if="contextMenu.node && props.canCreateChildByNode(contextMenu.node)"
          class="x-tree-menu__item"
          @click.stop="handleContextAction('new-child')"
        >
          新建子节点
        </li>
        <li
          v-if="contextMenu.node && props.canMigrateNode(contextMenu.node)"
          class="x-tree-menu__item"
          @click.stop="handleContextAction('migrate-node')"
        >
          节点迁移
        </li>
        <li
          v-if="contextMenu.node && props.canManageMembersByNode(contextMenu.node)"
          class="x-tree-menu__item"
          @click.stop="handleContextAction('manage-members')"
        >
          管理成员
        </li>
        <li v-if="canDeleteCurrentNode()" class="x-tree-menu__item is-danger" @click.stop="handleContextAction('delete-node')">删除节点</li>
      </ul>
    </teleport>
  </div>
</template>
