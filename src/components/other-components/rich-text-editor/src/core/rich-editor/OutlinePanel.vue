<template>
  <aside class="xl-outline-panel">
    <div class="xl-outline-panel__header">
      <div class="xl-outline-panel__titles">
        <h3 class="xl-outline-panel__title">{{ title }}</h3>
      </div>
    </div>

    <span class="xl-outline-panel__separator" aria-hidden="true"></span>

    <div class="xl-outline-panel__body">
      <div class="xl-outline-panel__content">
        <div v-if="visibleNodes.length" class="xl-outline-panel__list">
          <div
            v-for="item in visibleNodes"
            :key="item.key"
            class="xl-outline-panel__row"
            :class="{ 'is-active': item.activePath }"
            :style="{ paddingLeft: `${item.depth * indentStep}px` }"
          >
            <button
              v-if="item.hasChildren"
              type="button"
              class="xl-outline-panel__toggle"
              :aria-expanded="!item.collapsed"
              :title="item.collapsed ? '展开' : '折叠'"
              @click.stop="toggleCollapse(item.key)"
            >
              <i :class="item.collapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-down-s-line'"></i>
            </button>
            <span v-else class="xl-outline-panel__toggle xl-outline-panel__toggle--spacer"></span>

            <span v-if="item.activePath" class="xl-outline-panel__active-bar"></span>
            <button type="button" class="xl-outline-panel__item" @click="jumpToHeading(item.pos)">
              <span class="xl-outline-panel__text">{{ item.text }}</span>
            </button>
          </div>
        </div>

        <div v-else class="xl-outline-panel__empty">
          {{ emptyText }}
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { Editor } from '@tiptap/vue-3'

type OutlineHeading = {
  key: string
  pos: number
  level: number
  text: string
  active: boolean
}

type OutlineNode = OutlineHeading & {
  depth: number
  children: OutlineNode[]
  collapsed: boolean
  hasChildren: boolean
  activePath: boolean
}

const props = withDefaults(
  defineProps<{
    editor?: Editor
    title?: string
    emptyText?: string
    minLevel?: number
    maxLevel?: number
    indentStep?: number
  }>(),
  {
    title: '大纲',
    emptyText: '当前文档没有标题',
    minLevel: 1,
    maxLevel: 3,
    indentStep: 18
  }
)

const revision = ref(0)
const collapsedMap = ref<Record<string, boolean>>({})
const activeHeadingKey = ref<string | null>(null)

const headings = computed<OutlineHeading[]>(() => {
  revision.value

  const editor = props.editor
  if (!editor) {
    return []
  }

  const items: OutlineHeading[] = []
  const selectionFrom = editor.state.selection.from
  const selectionTo = editor.state.selection.to

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== 'heading') {
      return
    }

    const level = Number(node.attrs.level ?? 1)
    if (level < props.minLevel || level > props.maxLevel) {
      return
    }

    const end = pos + node.nodeSize
    const text = node.textContent.trim() || '未命名标题'
    const key = getHeadingKey(pos, level, text)
    const activeBySelection = selectionFrom >= pos && selectionTo <= end
    const active = activeHeadingKey.value ? activeHeadingKey.value === key : activeBySelection

    items.push({
      key,
      pos,
      level,
      text,
      active
    })
  })

  return items
})

const tree = computed<OutlineNode[]>(() => {
  const roots: OutlineNode[] = []
  const stack: OutlineNode[] = []

  for (const item of headings.value) {
    const node: OutlineNode = {
      ...item,
      depth: 0,
      children: [],
      collapsed: collapsedMap.value[item.key] ?? false,
      hasChildren: false,
      activePath: false
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }

    const parent = stack[stack.length - 1]
    node.depth = parent ? parent.depth + 1 : 0

    if (parent) {
      parent.children.push(node)
      parent.hasChildren = true
    } else {
      roots.push(node)
    }

    stack.push(node)
  }

  markActivePath(roots)
  return roots
})

const visibleNodes = computed(() => flattenTree(tree.value))

let detach: (() => void) | null = null
let scrollFrame = 0
let scrollViewport: HTMLElement | null = null

function refresh() {
  revision.value += 1
}

function bindEditor(editor?: Editor) {
  detach?.()
  detach = null
  activeHeadingKey.value = null
  scrollViewport = null

  if (!editor) {
    refresh()
    return
  }

  const handleScroll = () => queueScrollActiveRefresh(editor)
  const bindViewport = () => {
    const viewport = getEditorViewport(editor)
    if (viewport === scrollViewport) {
      return
    }

    scrollViewport?.removeEventListener('scroll', handleScroll)
    scrollViewport = viewport
    scrollViewport?.addEventListener('scroll', handleScroll, { passive: true })
  }
  const update = () => {
    refresh()
    bindViewport()
    queueScrollActiveRefresh(editor)
  }

  editor.on('update', update)
  editor.on('selectionUpdate', update)
  editor.on('transaction', update)
  bindViewport()

  detach = () => {
    editor.off('update', update)
    editor.off('selectionUpdate', update)
    editor.off('transaction', update)
    scrollViewport?.removeEventListener('scroll', handleScroll)
    scrollViewport = null
    if (scrollFrame) {
      window.cancelAnimationFrame(scrollFrame)
      scrollFrame = 0
    }
  }

  refresh()
  void nextTick(() => {
    bindViewport()
    queueScrollActiveRefresh(editor)
  })
}

watch(
  () => props.editor,
  (editor) => {
    bindEditor(editor)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  detach?.()
  detach = null
})

function toggleCollapse(key: string) {
  collapsedMap.value = {
    ...collapsedMap.value,
    [key]: !(collapsedMap.value[key] ?? false)
  }
}

function getElementFromNodeDom(node: Node | null) {
  if (node instanceof HTMLElement) {
    return node
  }

  return node?.parentElement ?? null
}

function getHeadingKey(pos: number, level: number, text: string) {
  return `${pos}-${level}-${text}`
}

function getEditorViewport(editor: Editor) {
  return editor.view.dom.closest('.xl-editor__viewport') as HTMLElement | null
}

function queueScrollActiveRefresh(editor: Editor) {
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0
    updateScrollActiveHeading(editor)
  })
}

function updateScrollActiveHeading(editor: Editor) {
  const viewport = getEditorViewport(editor)
  if (!viewport) {
    return
  }

  const viewportRect = viewport.getBoundingClientRect()
  const activationOffset = 80
  let firstHeadingKey: string | null = null
  let firstVisibleHeadingKey: string | null = null
  let activeKey: string | null = null
  let activeTop = Number.NEGATIVE_INFINITY

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== 'heading') {
      return
    }

    const level = Number(node.attrs.level ?? 1)
    if (level < props.minLevel || level > props.maxLevel) {
      return
    }

    const text = node.textContent.trim() || '未命名标题'
    const key = getHeadingKey(pos, level, text)
    const headingElement = getElementFromNodeDom(editor.view.nodeDOM(pos))
    firstHeadingKey ??= key

    if (!headingElement) {
      return
    }

    const headingRect = headingElement.getBoundingClientRect()
    const relativeTop = headingRect.top - viewportRect.top
    const relativeBottom = headingRect.bottom - viewportRect.top

    if (!firstVisibleHeadingKey && relativeBottom >= 0) {
      firstVisibleHeadingKey = key
    }

    if (relativeTop <= activationOffset && relativeTop >= activeTop) {
      activeKey = key
      activeTop = relativeTop
    }
  })

  activeHeadingKey.value = activeKey ?? firstVisibleHeadingKey ?? firstHeadingKey
  refresh()
}

function scrollHeadingIntoView(editor: Editor, pos: number) {
  const viewport = getEditorViewport(editor)
  const headingElement = getElementFromNodeDom(editor.view.nodeDOM(pos))

  if (!viewport || !headingElement) {
    editor.chain().focus().setTextSelection(pos).scrollIntoView().run()
    return
  }

  const viewportRect = viewport.getBoundingClientRect()
  const headingRect = headingElement.getBoundingClientRect()
  const targetTop = viewport.scrollTop + headingRect.top - viewportRect.top - 12

  viewport.scrollTo({
    top: Math.max(0, targetTop),
    left: viewport.scrollLeft,
    behavior: 'auto'
  })
}

function jumpToHeading(pos: number) {
  const editor = props.editor
  if (!editor) {
    return
  }

  editor.chain().focus().setTextSelection(pos).run()
  window.requestAnimationFrame(() => {
    scrollHeadingIntoView(editor, pos)
    queueScrollActiveRefresh(editor)
  })
}

function flattenTree(nodes: OutlineNode[]): OutlineNode[] {
  const result: OutlineNode[] = []

  for (const node of nodes) {
    result.push(node)
    if (!node.collapsed) {
      result.push(...flattenTree(node.children))
    }
  }

  return result
}

function markActivePath(nodes: OutlineNode[]): boolean {
  let found = false

  for (const node of nodes) {
    const childFound = markActivePath(node.children)
    node.activePath = node.active || childFound
    if (node.activePath) {
      found = true
    }
  }

  return found
}
</script>

<style scoped>
.xl-outline-panel {
  --xl-outline-panel-title: var(--xl-outline-title, #111827);
  --xl-outline-panel-toggle: var(--xl-outline-toggle, #6b7280);
  --xl-outline-panel-text: var(--xl-outline-text, #374151);
  --xl-outline-panel-hover: var(--xl-outline-hover, #111827);
  --xl-outline-panel-empty: var(--xl-outline-empty, #64748b);
  --xl-outline-panel-separator: var(--xl-outline-separator, rgba(64, 158, 255, 0.18));
  --xl-outline-panel-active: var(--xl-outline-active, #409EFF);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  height: 100%;
  min-height: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.xl-outline-panel__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
}

.xl-outline-panel__titles {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.xl-outline-panel__title {
  margin: 0;
  font-size: 14px;
  line-height: 1.2;
  color: var(--xl-outline-panel-title);
  font-weight: 700;
}

.xl-outline-panel__separator {
  height: 1px;
  margin-top: 6px;
  margin-left: 10px;
  background: var(--xl-outline-panel-separator);
}

.xl-outline-panel__body {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.xl-outline-panel__content {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scrollbar-gutter: auto;
  padding-left: 10px;
  padding-bottom: 50px;
  box-sizing: border-box;
}

.xl-outline-panel__content::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.xl-outline-panel__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.xl-outline-panel__row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}

.xl-outline-panel__toggle {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--xl-outline-panel-toggle);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.xl-outline-panel__toggle i {
  font-size: 18px;
  line-height: 1;
}

.xl-outline-panel__toggle--spacer {
  visibility: hidden;
  width: 16px;
  height: 16px;
}

.xl-outline-panel__item {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 0;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--xl-outline-panel-text);
  text-align: left;
  cursor: pointer;
  transition: color 0.16s ease;
}

.xl-outline-panel__item:hover {
  color: var(--xl-outline-panel-hover);
}

.xl-outline-panel__active-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -6px;
  width: 4px;
  border-radius: 999px;
  background: var(--xl-outline-panel-active);
  pointer-events: none;
}

.xl-outline-panel__text {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1.45;
  color: inherit;
}

.xl-outline-panel__empty {
  padding: 12px 0;
  color: var(--xl-outline-panel-empty);
  font-size: 13px;
}

:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__title {
  color: #f8fafc !important;
}

:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__toggle {
  color: #cbd5e1 !important;
}

:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__item,
:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__text {
  color: #f1f5f9 !important;
}

:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__item:hover,
:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__item:hover .xl-outline-panel__text {
  color: #ffffff !important;
}

:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__empty {
  color: #cbd5e1 !important;
}

:global([data-doc-theme-scheme='dark']) .xl-outline-panel .xl-outline-panel__separator {
  background: var(--doc-divider-color, rgba(148, 163, 184, 0.18)) !important;
}
</style>
