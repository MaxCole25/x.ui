<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { TreeNodeData, TreeNodeIcon } from './types'

const props = defineProps<{
  node: TreeNodeData
  depth: number
  currentTreeKey: string
  currentUserId: number | null
  expandedState: Record<string, boolean>
  draggingNode: TreeNodeData | null
  resolveNodeIcon: (node: TreeNodeData) => TreeNodeIcon
  allowDrag: (node: TreeNodeData) => boolean
  allowDrop: (draggingNode: TreeNodeData, dropNode: TreeNodeData, type: 'before' | 'after' | 'inner') => boolean
}>()

const emit = defineEmits<{
  (e: 'node-click', node: TreeNodeData): void
  (e: 'node-drop', draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' | 'after' | 'inner'): void
  (e: 'node-contextmenu', event: MouseEvent, node: TreeNodeData): void
  (e: 'drag-start', node: TreeNodeData): void
  (e: 'drag-end'): void
  (e: 'toggle', key: string, expanded: boolean, node: TreeNodeData): void
  (e: 'rename', node: TreeNodeData, label: string): void
}>()

const rowRef = ref<HTMLElement | null>(null)
const dropPosition = ref<'before' | 'after' | 'inner' | null>(null)
const hasChildren = computed(() => Boolean(props.node.hasChildren) || (props.node.children?.length ?? 0) > 0)
const nodeKey = computed(() => String(props.node.id))
const expanded = computed(() => {
  if (!hasChildren.value) return false
  return props.expandedState[nodeKey.value] !== false
})
const isCurrent = computed(() => props.currentTreeKey === nodeKey.value)
const nodeType = computed(() => props.node.type ?? 'document')
const nodeIcon = computed(() => props.resolveNodeIcon(props.node))
const hasCustomIcon = computed(() => typeof nodeIcon.value === 'string' && nodeIcon.value.trim().length > 0)
const isRemixIcon = computed(() => typeof nodeIcon.value === 'string' && nodeIcon.value.trim().startsWith('ri-'))
const nodeIconText = computed(() => (typeof nodeIcon.value === 'string' ? nodeIcon.value.trim().slice(0, 1).toUpperCase() : ''))
const isNodeOwner = computed(() => Number(props.node.authorId ?? 0) > 0 && Number(props.node.authorId ?? 0) === Number(props.currentUserId ?? 0))
const isMember = computed(() => {
  if (props.currentUserId !== null && props.currentUserId !== undefined) {
    return isNodeOwner.value
  }
  return Boolean(props.node.isCurrentUserRootMember) || isNodeOwner.value
})
const editingLabel = ref(props.node.label)
const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.node.isEditing,
  (value) => {
    if (!value) return
    editingLabel.value = props.node.label
    nextTick(() => {
      inputRef.value?.focus()
      inputRef.value?.select()
    })
  },
  { immediate: true }
)

watch(
  () => props.draggingNode,
  (value) => {
    if (value) return
    clearDropPosition()
  }
)

function clearDropPosition() {
  dropPosition.value = null
}

function forwardNodeDrop(draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' | 'after' | 'inner') {
  emit('node-drop', draggingNode, dropNode, dropType)
}

function forwardNodeContextMenu(event: MouseEvent, node: TreeNodeData) {
  emit('node-contextmenu', event, node)
}

function forwardToggle(key: string, expanded: boolean, node: TreeNodeData) {
  emit('toggle', key, expanded, node)
}

function forwardRename(node: TreeNodeData, label: string) {
  emit('rename', node, label)
}

function forwardDragEnd() {
  clearDropPosition()
  emit('drag-end')
}

function handleClick() {
  emit('node-click', props.node)
}

function handleContextMenu(event: MouseEvent) {
  emit('node-contextmenu', event, props.node)
}

function toggleExpand(event: MouseEvent) {
  event.stopPropagation()
  emit('toggle', nodeKey.value, !expanded.value, props.node)
}

function resolveDropType(event: DragEvent): 'before' | 'after' | 'inner' {
  const rect = rowRef.value?.getBoundingClientRect()
  if (!rect) return 'inner'
  const ratio = (event.clientY - rect.top) / Math.max(rect.height, 1)
  if (ratio < 0.25) return 'before'
  if (ratio > 0.75) return 'after'
  return 'inner'
}

function handleDragStart(event: DragEvent) {
  if (!props.allowDrag(props.node)) {
    event.preventDefault()
    return
  }
  emit('drag-start', props.node)
}

function handleDragOver(event: DragEvent) {
  if (!props.draggingNode) return
  const type = resolveDropType(event)
  if (!props.allowDrop(props.draggingNode, props.node, type)) {
    clearDropPosition()
    return
  }
  event.preventDefault()
  dropPosition.value = type
}

function handleDragLeave(event: DragEvent) {
  const target = event.currentTarget as HTMLElement | null
  const nextTarget = event.relatedTarget as Node | null
  if (target && nextTarget && target.contains(nextTarget)) return
  clearDropPosition()
}

function handleDrop(event: DragEvent) {
  if (!props.draggingNode) return
  const type = resolveDropType(event)
  if (!props.allowDrop(props.draggingNode, props.node, type)) return
  event.preventDefault()
  clearDropPosition()
  emit('node-drop', props.draggingNode, props.node, type)
}

function handleDragEnd() {
  clearDropPosition()
  emit('drag-end')
}

function submitRename() {
  const next = editingLabel.value.trim()
  if (!next) return
  emit('rename', props.node, next)
}
</script>

<template>
  <div class="x-tree-node">
    <div
      ref="rowRef"
      class="x-tree-node__row"
      :class="{
        'is-current': isCurrent,
        'is-drop-before': dropPosition === 'before',
        'is-drop-after': dropPosition === 'after',
        'is-drop-inner': dropPosition === 'inner'
      }"
      :style="{ paddingLeft: `calc(var(--x-tree-row-padding-right, 8px) + ${props.depth} * var(--x-tree-indent-size, 16px))` }"
      :draggable="props.allowDrag(props.node)"
      @click.stop="handleClick"
      @contextmenu.prevent.stop="handleContextMenu"
      @dragstart="handleDragStart"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @dragend="handleDragEnd"
    >
      <button v-if="hasChildren" type="button" class="x-tree-node__toggle" @click.stop="toggleExpand">
        {{ expanded ? '▾' : '▸' }}
      </button>
      <span v-else class="x-tree-node__toggle-placeholder" />
      <span v-if="hasCustomIcon" class="x-tree-node__icon" :class="{ 'is-member': isMember }" aria-hidden="true">
        <i v-if="isRemixIcon" :class="nodeIcon"></i>
        <template v-else>{{ nodeIconText }}</template>
      </span>
      <span v-else-if="nodeType === 'group'" class="x-tree-node__group-icon" :class="{ 'is-member': isMember }" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            d="M9 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6 1a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM3.5 18.5a5.5 5.5 0 0 1 11 0v.5h-11v-.5Zm11.5.5v-.5a6.8 6.8 0 0 0-1.3-4.1A5 5 0 0 1 20.5 19H15Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span v-else class="x-tree-node__dot" :class="{ 'is-member': isMember }" />
      <input
        v-if="props.node.isEditing"
        ref="inputRef"
        v-model="editingLabel"
        class="x-tree-node__edit-input"
        @click.stop
        @keydown.enter.prevent="submitRename"
        @blur="submitRename"
      />
      <span v-else class="x-tree-node__label">{{ props.node.label }}</span>
      <span v-if="props.node.authorUserName || props.node.authorDisplayName" class="x-tree-node__author">
        {{ props.node.authorDisplayName || props.node.authorUserName }}
      </span>
    </div>

    <div v-if="props.node.children?.length && expanded" class="x-tree-node__children">
      <TreeNode
        v-for="child in props.node.children"
        :key="String(child.id)"
        :node="child"
        :depth="props.depth + 1"
        :current-tree-key="props.currentTreeKey"
        :current-user-id="props.currentUserId"
        :expanded-state="props.expandedState"
        :dragging-node="props.draggingNode"
        :resolve-node-icon="props.resolveNodeIcon"
        :allow-drag="props.allowDrag"
        :allow-drop="props.allowDrop"
        @node-click="emit('node-click', $event)"
        @node-drop="forwardNodeDrop"
        @node-contextmenu="forwardNodeContextMenu"
        @drag-start="emit('drag-start', $event)"
        @drag-end="forwardDragEnd"
        @toggle="forwardToggle"
        @rename="forwardRename"
      />
    </div>
  </div>
</template>
