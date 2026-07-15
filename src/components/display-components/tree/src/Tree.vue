<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import TreeNode from './TreeNode.vue'
import { componentSizePreset } from '../../../_utils/size'
import type { TreeContextAction, TreeContextMenuItem, TreeNodeData, TreeNodeIcon, TreeProps, TreeSlots } from './types'

defineOptions({ name: 'XTree' })

const props = withDefaults(defineProps<TreeProps>(), {
  currentTreeKey: '',
  currentUserId: null,
  activeAccentColor: '#2f66cf',
  textColor: 'var(--x-color-text, #121826)',
  mutedTextColor: 'var(--x-color-muted, #606b7d)',
  hoverBackgroundColor: 'var(--x-color-primary-soft, #f5f8fb)',
  activeBackgroundColor: 'rgba(14, 116, 144, 0.12)',
  activeTextColor: 'var(--x-color-text, #121826)',
  allowDrag: () => true,
  allowDrop: () => true,
  canCreateChildByNode: () => true,
  canDeleteNodeById: () => true,
  canManageMembersByNode: () => true,
  canMigrateNode: () => true
})

const emit = defineEmits<{
  (e: 'nodeClick', node: TreeNodeData): void
  (e: 'nodeExtraClick', node: TreeNodeData, event: MouseEvent): void
  (e: 'nodeDrop', draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' | 'after' | 'inner'): void
  (e: 'nodeToggle', payload: { node: TreeNodeData; expanded: boolean }): void
  (e: 'contextAction', action: TreeContextAction, node: TreeNodeData): void
}>()

defineSlots<TreeSlots>()

const currentKeyState = ref(props.currentTreeKey)
const draggingNode = ref<TreeNodeData | null>(null)
const expandedState = ref<Record<string, boolean>>({})
const contextMenu = reactive({ visible: false, x: 0, y: 0, node: null as TreeNodeData | null })
const localIdSeed = ref(100000)
const instance = getCurrentInstance()
const hasNodeExtraClickListener = computed(() => Boolean(instance?.vnode.props?.onNodeExtraClick))
const shouldStopExtraClick = computed(() => Boolean(hasNodeExtraClickListener.value || instance?.slots.nodeExtra))
const defaultContextMenuItems = computed<TreeContextMenuItem[]>(() => {
  const items: TreeContextMenuItem[] = [{ action: 'new-root', label: '增加根节点' }]
  if (contextMenu.node && props.canCreateChildByNode(contextMenu.node)) {
    items.push({ action: 'new-child', label: '新建节点' })
  }
  if (contextMenu.node && canDeleteCurrentNode()) {
    items.push({ action: 'delete-node', label: '删除节点', tone: 'danger' })
  }
  return items
})
const resolvedContextMenuItems = computed(() => {
  const context = { node: contextMenu.node, treeData: props.treeData }
  const items = typeof props.contextMenuItems === 'function'
    ? props.contextMenuItems(context)
    : props.contextMenuItems ?? defaultContextMenuItems.value

  return items.filter((item) => item.visible !== false)
})
const visibleNodes = computed(() => {
  const nodes: TreeNodeData[] = []
  const walk = (items: TreeNodeData[]) => {
    items.forEach((item) => {
      nodes.push(item)
      const key = String(item.id)
      if (item.children?.length && expandedState.value[key] !== false) {
        walk(item.children)
      }
    })
  }

  walk(props.treeData || [])
  return nodes
})

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
        if (item.hasChildren && !item.children?.length) {
          next[key] = expandedState.value[key] ?? false
        }
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
function findVisibleNodeIndex(key: string) {
  return visibleNodes.value.findIndex((node) => String(node.id) === key)
}
function scrollNodeIntoView(key: string) {
  nextTick(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>('.x-tree-node__row'))
    rows.find((row) => row.dataset.treeNodeKey === key)?.scrollIntoView?.({ block: 'nearest' })
  })
}
function selectNode(node: TreeNodeData) {
  const key = String(node.id)
  currentKeyState.value = key
  scrollNodeIntoView(key)
  emit('nodeClick', node)
}
function isInteractiveKeyboardTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(target.closest('input, textarea, select, button, a[href], [contenteditable="true"]'))
}
function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  if (isInteractiveKeyboardTarget(event.target)) return

  const nodes = visibleNodes.value
  if (!nodes.length) return

  const currentIndex = findVisibleNodeIndex(currentKeyState.value)
  const nextIndex = currentIndex === -1
    ? 0
    : event.key === 'ArrowDown'
      ? Math.min(currentIndex + 1, nodes.length - 1)
      : Math.max(currentIndex - 1, 0)

  event.preventDefault()
  if (nextIndex === currentIndex) return

  selectNode(nodes[nextIndex])
}
function setExpanded(key: string, expanded: boolean) {
  expandedState.value = { ...expandedState.value, [key]: expanded }
}
function handleToggle(key: string, expanded: boolean, node: TreeNodeData) {
  setExpanded(key, expanded)
  emit('nodeToggle', { node, expanded })
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
function createDraftNode(label: string): TreeNodeData {
  const rawId = localIdSeed.value
  localIdSeed.value += 1
  return {
    id: `new-${rawId}`,
    rawId,
    label,
    type: 'document',
    isEditing: true
  }
}

function createDefaultRootNode() {
  const newNode = createDraftNode('新建节点')
  props.treeData.push(newNode)
  return newNode
}

function createDefaultChildNode(parent: TreeNodeData) {
  const newNode = createDraftNode('新建节点')
  parent.children = parent.children || []
  parent.children.push(newNode)
  setExpanded(String(parent.id), true)
  return newNode
}

function deleteDefaultNode(target: TreeNodeData) {
  return removeNode(props.treeData, target)
}

function removeNode(nodes: TreeNodeData[], target: TreeNodeData): TreeNodeData | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    if (node === target || node.id === target.id) {
      return nodes.splice(index, 1)[0]
    }
    if (node.children?.length) {
      const removed = removeNode(node.children, target)
      if (removed) return removed
    }
  }
  return null
}

function handleContextAction(action: TreeContextAction) {
  if (action === 'new-root') {
    const newNode = props.createRootNode ? props.createRootNode(props.treeData) : createDefaultRootNode()
    if (!newNode) {
      closeContextMenu()
      return
    }
    emit('contextAction', action, newNode)
    closeContextMenu()
    return
  }

  if (!contextMenu.node) {
    closeContextMenu()
    return
  }

  if (action === 'new-node' || action === 'new-child') {
    const newNode = props.createNode ? props.createNode(contextMenu.node) : createDefaultChildNode(contextMenu.node)
    if (!newNode) {
      closeContextMenu()
      return
    }
    emit('contextAction', action, newNode)
    closeContextMenu()
    return
  }

  if (action === 'delete-node') {
    const target = contextMenu.node
    if (props.deleteNode) {
      props.deleteNode(target, props.treeData)
    } else {
      deleteDefaultNode(target)
    }
    emit('contextAction', action, target)
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

function openContextMenu(event: MouseEvent, node: TreeNodeData | null = null) {
  contextMenu.visible = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.node = node
}

function handleRootContextMenu(event: MouseEvent) {
  openContextMenu(event)
}

function resolveNodeIcon(node: TreeNodeData): TreeNodeIcon {
  return props.nodeIcon?.(node) ?? node.icon
}

function resolveTreeStyle() {
  const sizePreset = componentSizePreset[props.size ?? 'md']
  const paddingParts = sizePreset.padding.split(' ')

  return {
    '--x-tree-active-color': props.activeAccentColor,
    '--x-tree-text-color': props.textColor,
    '--x-tree-muted-color': props.mutedTextColor,
    '--x-tree-hover-bg-color': props.hoverBackgroundColor,
    '--x-tree-active-bg-color': props.activeBackgroundColor,
    '--x-tree-active-text-color': props.activeTextColor,
    '--x-tree-active-icon-color': props.activeIconColor ?? props.activeAccentColor,
    '--x-tree-row-height': `${sizePreset.height + 4}px`,
    '--x-tree-font-size': `${sizePreset.fontSize}px`,
    '--x-tree-icon-size': `${Math.max(12, sizePreset.fontSize + 2)}px`,
    '--x-tree-node-radius': sizePreset.radius,
    '--x-tree-row-padding-right': paddingParts[paddingParts.length - 1] ?? '8px',
    '--x-tree-indent-size': `${sizePreset.height > 30 ? 18 : 16}px`,
  }
}

onMounted(() => window.addEventListener('click', closeContextMenu))
onBeforeUnmount(() => window.removeEventListener('click', closeContextMenu))

defineExpose({ setCurrentKey, expandAll, collapseAll })
</script>

<template>
  <div
    class="x-tree"
    :class="`x-tree--${props.size ?? 'md'}`"
    :style="resolveTreeStyle()"
    role="tree"
    tabindex="0"
    @contextmenu.prevent.stop="handleRootContextMenu"
    @keydown="handleKeydown"
  >
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
      :resolve-node-icon="resolveNodeIcon"
      :allow-drag="props.allowDrag"
      :allow-drop="props.allowDrop"
      :stop-extra-click="shouldStopExtraClick"
      @node-click="selectNode"
      @node-extra-click="(nodeData, event) => emit('nodeExtraClick', nodeData, event)"
      @node-drop="handleNodeDrop"
      @node-contextmenu="(event, nodeData) => openContextMenu(event, nodeData)"
      @drag-start="draggingNode = $event"
      @drag-end="draggingNode = null"
      @toggle="handleToggle"
      @rename="handleRename"
    >
      <template v-if="$slots.nodeExtra" #nodeExtra="{ node: slotNode }">
        <slot name="nodeExtra" :node="slotNode" />
      </template>
    </TreeNode>

    <teleport to="body">
      <ul v-if="contextMenu.visible && resolvedContextMenuItems.length" class="x-tree-menu" :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }">
        <li
          v-for="item in resolvedContextMenuItems"
          :key="item.action"
          class="x-tree-menu__item"
          :class="{ 'is-danger': item.tone === 'danger', 'is-disabled': item.disabled }"
          :aria-disabled="item.disabled ? 'true' : undefined"
          @click.stop="!item.disabled && handleContextAction(item.action)"
        >
          {{ item.label }}
        </li>
      </ul>
    </teleport>
  </div>
</template>
