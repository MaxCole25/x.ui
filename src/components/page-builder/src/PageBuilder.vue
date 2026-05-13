<script setup lang="ts">
import 'remixicon/fonts/remixicon.css'
import { computed, ref, watch } from 'vue'
import { GridItem, GridLayout } from 'vue-grid-layout-v3'
import { XButton } from '../../button'
import { XInput } from '../../input'
import { XJsonEditor } from '../../json-editor'
import { XSelect } from '../../select'
import { XSwitch } from '../../switch'
import { XTabs, type TabItem, type TabName } from '../../tabs'
import PageBuilderNodeRenderer from './PageBuilderNodeRenderer.vue'
import {
  pageBuilderCategoryLabels,
  pageBuilderWidgets,
  getPageBuilderWidget,
  isPageBuilderContainer
} from './registry'
import {
  clonePageBuilderSchema,
  createDefaultPageBuilderSchema,
  createPageBuilderNode
} from './schema'
import type { PageBuilderNodeSchema, PageBuilderProps, PageBuilderSchema, PageBuilderWidgetDefinition } from './types'

defineOptions({
  name: 'XPageBuilder'
})

const props = withDefaults(defineProps<PageBuilderProps>(), {
  modelValue: undefined,
  readonly: false,
  customWidgets: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: PageBuilderSchema]
  change: [value: PageBuilderSchema]
  'select-node': [value: PageBuilderNodeSchema | null]
  'export-json': [value: PageBuilderSchema]
}>()

const schema = ref<PageBuilderSchema>(clonePageBuilderSchema(props.modelValue ?? createDefaultPageBuilderSchema()))
const selectedNodeId = ref(schema.value.nodes[0]?.id ?? '')
const past = ref<PageBuilderSchema[]>([])
const future = ref<PageBuilderSchema[]>([])
const propsDraft = ref('{}')
const propsError = ref('')
const slotsDraft = ref('{}')
const slotsError = ref('')
const activePaletteCategory = ref<TabName>('layout')
const activeInspectorTab = ref<TabName>('canvas')
const paletteVisible = ref(true)
const inspectorVisible = ref(true)

const categoryIcons: Record<string, string> = {
  layout: 'ri-layout-grid-line',
  basic: 'ri-shapes-line',
  form: 'ri-input-cursor-move',
  data: 'ri-table-line',
  business: 'ri-briefcase-4-line',
  feedback: 'ri-chat-1-line',
  fields: 'ri-list-check-3'
}

const allWidgets = computed(() => [...pageBuilderWidgets, ...props.customWidgets])

function getWidget(type: string) {
  return allWidgets.value.find((widget) => widget.type === type) ?? getPageBuilderWidget(type)
}

const widgetGroups = computed(() => {
  return Object.entries(pageBuilderCategoryLabels)
    .map(([category, label]) => ({
      category,
      label,
      widgets: allWidgets.value.filter((widget) => widget.category === category)
    }))
    .filter((group) => group.widgets.length > 0)
})

const widgetOptions = computed(() =>
  allWidgets.value.map((widget) => ({
    label: widget.label,
    value: widget.type
  }))
)

const paletteTabItems = computed<TabItem[]>(() =>
  widgetGroups.value.map((group) => ({
    name: group.category,
    label: group.label,
    icon: categoryIcons[group.category]
  }))
)

const widgetsByCategory = computed(() => {
  const record: Record<string, PageBuilderWidgetDefinition[]> = {}
  widgetGroups.value.forEach((group) => {
    record[group.category] = group.widgets
  })
  return record
})

const inspectorTabItems = computed<TabItem[]>(() => [
  { name: 'canvas', label: '画布', icon: 'ri-artboard-line' },
  { name: 'node', label: '组件', icon: 'ri-cursor-line' },
  { name: 'features', label: '特性', icon: 'ri-braces-line' },
  { name: 'slots', label: 'Slots', icon: 'ri-text-snippet' }
])

const selectedNode = computed(() => findNodeById(schema.value.nodes, selectedNodeId.value)?.node ?? null)
const featureEntries = computed(() => {
  const node = selectedNode.value
  if (!node) {
    return []
  }

  return Object.entries(node.props).filter(([key]) => {
    if (key === 'previewPadding' || key === 'previewPaddingTop' || key === 'previewPaddingRight' || key === 'previewPaddingBottom' || key === 'previewPaddingLeft') {
      return false
    }

    if (isPageBuilderContainer(node.type) && key === 'gap') {
      return false
    }

    return true
  })
})
const outputJson = computed(() => JSON.stringify(schema.value, null, 2))
const canUndo = computed(() => past.value.length > 0)
const canRedo = computed(() => future.value.length > 0)
const rootLayout = computed(() =>
  schema.value.nodes.map((node) => ({
    i: node.id,
    x: Math.max(0, Number(node.layout.x) || 0),
    y: Math.max(0, Number(node.layout.y) || 0),
    w: Math.max(1, Number(node.layout.w) || 1),
    h: Math.max(1, Number(node.layout.h) || 1)
  }))
)
const canvasFrameStyle = computed(() => ({
  '--x-page-builder-bg': schema.value.canvas.background
}))
const canvasStyle = computed(() => ({
  '--x-page-builder-columns': String(Math.max(1, Number(schema.value.canvas.columns))),
  '--x-page-builder-row-height': `${Math.max(36, Number(schema.value.canvas.rowHeight))}px`,
  '--x-page-builder-gap': `${Math.max(0, Number(schema.value.canvas.gap))}px`,
  '--x-page-builder-padding': `${Math.max(0, Number(schema.value.canvas.padding))}px`
}))

watch(
  () => props.modelValue,
  (value) => {
    const next = clonePageBuilderSchema(value ?? createDefaultPageBuilderSchema())
    if (JSON.stringify(next) !== JSON.stringify(schema.value)) {
      schema.value = next
      selectedNodeId.value = next.nodes[0]?.id ?? ''
      past.value = []
      future.value = []
    }
  },
  { deep: true }
)

watch(
  schema,
  (value) => {
    const next = clonePageBuilderSchema(value)
    emit('update:modelValue', next)
    emit('change', next)
  },
  { deep: true }
)

watch(
  selectedNode,
  (node) => {
    propsDraft.value = JSON.stringify(node?.props ?? {}, null, 2)
    slotsDraft.value = JSON.stringify(node?.slots ?? {}, null, 2)
    propsError.value = ''
    slotsError.value = ''
    emit('select-node', node ? clonePageBuilderSchema(node) : null)
  },
  { immediate: true }
)

function findNodeById(
  nodes: PageBuilderNodeSchema[],
  id: string,
  parent: PageBuilderNodeSchema | null = null
): { node: PageBuilderNodeSchema; parent: PageBuilderNodeSchema | null; list: PageBuilderNodeSchema[]; index: number } | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]
    if (node.id === id) {
      return { node, parent, list: nodes, index }
    }

    const match = findNodeById(node.children ?? [], id, node)
    if (match) {
      return match
    }
  }

  return null
}

function maxY(nodes: PageBuilderNodeSchema[]) {
  return nodes.reduce((value, node) => Math.max(value, node.layout.y + node.layout.h), 0)
}

function commit(mutator: (draft: PageBuilderSchema) => void, nextSelectedId = selectedNodeId.value) {
  if (props.readonly) {
    return
  }

  const draft = clonePageBuilderSchema(schema.value)
  past.value.push(clonePageBuilderSchema(schema.value))
  mutator(draft)
  schema.value = draft
  future.value = []
  selectedNodeId.value = nextSelectedId
}

function resolveTargetList(draft: PageBuilderSchema, parentId?: string) {
  const explicitParent = parentId ? findNodeById(draft.nodes, parentId)?.node : null
  if (explicitParent && isPageBuilderContainer(explicitParent.type)) {
    explicitParent.children = explicitParent.children ?? []
    return explicitParent.children
  }

  const selected = findNodeById(draft.nodes, selectedNodeId.value)?.node
  if (selected && isPageBuilderContainer(selected.type)) {
    selected.children = selected.children ?? []
    return selected.children
  }

  return draft.nodes
}

function addWidget(type: string, parentId?: string) {
  let nextSelectedId = ''

  commit((draft) => {
    const targetList = resolveTargetList(draft, parentId)
    const widget = getWidget(type)
    const node = createPageBuilderNode(type, {
      layout: {
        ...(widget?.defaultLayout ?? { x: 0, y: 0, w: 3, h: 1 }),
        y: maxY(targetList)
      }
    }, allWidgets.value)

    targetList.push(node)
    nextSelectedId = node.id
  })

  if (nextSelectedId) {
    selectedNodeId.value = nextSelectedId
  }
}

function selectNode(id: string) {
  selectedNodeId.value = id
}

function removeNode(id: string) {
  commit((draft) => {
    const match = findNodeById(draft.nodes, id)
    if (!match) {
      return
    }

    match.list.splice(match.index, 1)
  }, '')
}

function duplicateNode(id: string) {
  let duplicatedId = ''

  commit((draft) => {
    const match = findNodeById(draft.nodes, id)
    if (!match) {
      return
    }

    const copy = clonePageBuilderSchema(match.node)
    copy.id = `${copy.id}-copy-${Math.random().toString(36).slice(2, 6)}`
    copy.label = `${copy.label} 副本`
    copy.layout = {
      ...copy.layout,
      y: copy.layout.y + copy.layout.h
    }
    refreshChildIds(copy)
    match.list.splice(match.index + 1, 0, copy)
    duplicatedId = copy.id
  })

  if (duplicatedId) {
    selectedNodeId.value = duplicatedId
  }
}

function refreshChildIds(node: PageBuilderNodeSchema) {
  node.children?.forEach((child) => {
    child.id = `${child.id}-copy-${Math.random().toString(36).slice(2, 6)}`
    refreshChildIds(child)
  })
}

function updateCanvasField(key: keyof PageBuilderSchema['canvas'], value: unknown) {
  commit((draft) => {
    if (key === 'background') {
      draft.canvas[key] = String(value)
      return
    }

    draft.canvas[key] = Math.max(key === 'columns' ? 1 : 0, Number(value) || 0)
  })
}

function updateSelectedLabel(value: unknown) {
  const id = selectedNodeId.value
  commit((draft) => {
    const node = findNodeById(draft.nodes, id)?.node
    if (node) {
      node.label = String(value)
    }
  }, id)
}

function updateSelectedType(value: unknown) {
  const id = selectedNodeId.value
  const type = String(value)
  const widget = getWidget(type)
  if (!widget) {
    return
  }

  commit((draft) => {
    const node = findNodeById(draft.nodes, id)?.node
    if (!node) {
      return
    }

    node.type = widget.type
    node.component = widget.component
    node.label = widget.label
    node.props = clonePageBuilderSchema(widget.defaultProps)
    node.slots = clonePageBuilderSchema(widget.defaultSlots ?? {})
    if (widget.acceptsChildren) {
      node.children = node.children ?? []
    } else {
      delete node.children
    }
  }, id)
}

function updateSelectedLayout(key: keyof PageBuilderNodeSchema['layout'], value: unknown) {
  const id = selectedNodeId.value
  commit((draft) => {
    const node = findNodeById(draft.nodes, id)?.node
    if (node) {
      node.layout[key] = Math.max(key === 'x' || key === 'y' ? 0 : 1, Number(value) || 0)
    }
  }, id)
}

function updateSelectedContainerGap(value: unknown) {
  const id = selectedNodeId.value
  commit((draft) => {
    const node = findNodeById(draft.nodes, id)?.node
    if (node && isPageBuilderContainer(node.type)) {
      node.props.gap = Math.max(0, Number(value) || 0)
    }
  }, id)
}

function updateSelectedPreviewPadding(key: 'previewPaddingTop' | 'previewPaddingRight' | 'previewPaddingBottom' | 'previewPaddingLeft', value: unknown) {
  const id = selectedNodeId.value
  commit((draft) => {
    const node = findNodeById(draft.nodes, id)?.node
    if (node) {
      node.props[key] = Math.max(0, Number(value) || 0)
    }
  }, id)
}

function getFeatureLabel(key: string) {
  const labels: Record<string, string> = {
    activeKey: '激活项',
    activeText: '开启文字',
    background: '背景',
    borderColor: '边框颜色',
    clearable: '可清除',
    columns: '列配置',
    data: '数据',
    description: '描述',
    fallbackHtml: '默认 HTML',
    footerHeight: '底栏高度',
    gap: '间距',
    label: '标签',
    labelPosition: '标签位置',
    labelWidth: '标签宽度',
    minHeight: '最小高度',
    modelValue: '绑定值',
    options: '选项',
    placeholder: '占位提示',
    showPagination: '显示分页',
    showPath: '显示路径',
    showRegister: '显示注册',
    showToolbar: '显示工具栏',
    sidebarWidth: '侧栏宽度',
    size: '尺寸',
    title: '标题',
    topbarHeight: '顶栏高度',
    treeData: '树数据',
    value: '值',
    variant: '样式',
    width: '宽度'
  }

  return labels[key] ?? key
}

function stringifyFeatureValue(value: unknown) {
  if (typeof value === 'string') {
    return value
  }

  if (value == null) {
    return ''
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}

function isColorFeature(key: string, value: unknown) {
  return typeof value === 'string' && (key.toLowerCase().includes('color') || key.toLowerCase().includes('background'))
}

function normalizeColorValue(value: unknown) {
  const text = String(value ?? '')
  return /^#[0-9a-fA-F]{6}$/.test(text) ? text : '#000000'
}

function updateSelectedFeature(key: string, value: unknown, kind: 'string' | 'number' | 'boolean' | 'complex') {
  const id = selectedNodeId.value
  commit((draft) => {
    const node = findNodeById(draft.nodes, id)?.node
    if (!node) {
      return
    }

    if (kind === 'number') {
      node.props[key] = Number(value) || 0
      return
    }

    if (kind === 'boolean') {
      node.props[key] = Boolean(value)
      return
    }

    if (kind === 'complex') {
      try {
        node.props[key] = JSON.parse(String(value))
      } catch {
        node.props[key] = String(value)
      }
      return
    }

    node.props[key] = String(value)
  }, id)
}

function updateNodeLayout(payload: { id: string; layout: Partial<PageBuilderNodeSchema['layout']> }) {
  commit((draft) => {
    const node = findNodeById(draft.nodes, payload.id)?.node
    if (!node) {
      return
    }

    Object.entries(payload.layout).forEach(([key, value]) => {
      const layoutKey = key as keyof PageBuilderNodeSchema['layout']
      node.layout[layoutKey] = Math.max(layoutKey === 'x' || layoutKey === 'y' ? 0 : 1, Number(value) || 0)
    })
  }, payload.id)
}

function updateNodeLayoutList(layout: Array<{ i: string | number; x: number; y: number; w: number; h: number }>) {
  commit((draft) => {
    layout.forEach((item) => {
      const node = findNodeById(draft.nodes, String(item.i))?.node
      if (!node) {
        return
      }

      node.layout.x = Math.max(0, Number(item.x) || 0)
      node.layout.y = Math.max(0, Number(item.y) || 0)
      node.layout.w = Math.max(1, Number(item.w) || 1)
      node.layout.h = Math.max(1, Number(item.h) || 1)
    })
  }, selectedNodeId.value)
}

function applySelectedJson(kind: 'props' | 'slots') {
  const id = selectedNodeId.value
  const source = kind === 'props' ? propsDraft.value : slotsDraft.value

  try {
    const parsed = JSON.parse(source) as Record<string, unknown>
    commit((draft) => {
      const node = findNodeById(draft.nodes, id)?.node
      if (!node) {
        return
      }

      if (kind === 'props') {
        node.props = parsed
      } else {
        node.slots = Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, String(value)]))
      }
    }, id)
    if (kind === 'props') {
      propsError.value = ''
    } else {
      slotsError.value = ''
    }
  } catch {
    if (kind === 'props') {
      propsError.value = 'Props JSON 格式不正确。'
    } else {
      slotsError.value = 'Slots JSON 格式不正确。'
    }
  }
}

function emitExport() {
  emit('export-json', clonePageBuilderSchema(schema.value))
}

function undo() {
  if (props.readonly) {
    return
  }

  const previous = past.value.pop()
  if (!previous) {
    return
  }

  future.value.unshift(clonePageBuilderSchema(schema.value))
  schema.value = previous
  selectedNodeId.value = previous.nodes[0]?.id ?? ''
}

function redo() {
  if (props.readonly) {
    return
  }

  const next = future.value.shift()
  if (!next) {
    return
  }

  past.value.push(clonePageBuilderSchema(schema.value))
  schema.value = next
  selectedNodeId.value = next.nodes[0]?.id ?? ''
}

function reset() {
  if (props.readonly) {
    return
  }

  commit((draft) => {
    const next = createDefaultPageBuilderSchema()
    draft.version = next.version
    draft.canvas = next.canvas
    draft.nodes = next.nodes
  }, '')
  selectedNodeId.value = schema.value.nodes[0]?.id ?? ''
}

function handleDragStart(event: DragEvent, type: string) {
  event.dataTransfer?.setData('application/x-page-builder-widget', type)
  event.dataTransfer?.setData('text/plain', type)
}

function handleDropToRoot(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/x-page-builder-widget')
  if (type) {
    addWidget(type, '')
  }
}
</script>

<template>
  <section
    class="x-page-builder"
    :class="{
      'is-palette-hidden': !paletteVisible,
      'is-inspector-hidden': !inspectorVisible
    }"
  >
    <aside v-show="paletteVisible" class="x-page-builder__palette" aria-label="组件库" data-test="page-builder-palette-panel">
      <div class="x-page-builder__panel-head">
        <strong>组件库</strong>
        <span>容器 + x.ui</span>
      </div>

      <div class="x-page-builder__palette-scroll">
        <XTabs
          v-model="activePaletteCategory"
          class="x-page-builder__palette-tabs"
          :items="paletteTabItems"
          type="card"
          size="small"
          :show-avatar="false"
          tab-position="left"
          label-direction="vertical"
          :stretch="false"
          :fill-height="true"
          :tab-gap="4"
          :vertical-width="38"
          :vertical-label-min-height="96"
          :border-radius="6"
          content-border="1px solid #d8e2ec"
          content-background-color="transparent"
        >
          <template #pane="{ item }">
            <section class="x-page-builder__palette-group" :data-test="`page-builder-palette-${item.name}`">
              <button
                v-for="widget in widgetsByCategory[String(item.name)] || []"
                :key="widget.type"
                class="x-page-builder__palette-item"
                type="button"
                draggable="true"
                :data-test="`page-builder-add-${widget.type}`"
                :disabled="readonly"
                @click="addWidget(widget.type)"
                @dragstart="handleDragStart($event, widget.type)"
              >
                <i :class="widget.previewIcon" aria-hidden="true"></i>
                <span>
                  <strong>{{ widget.label }}</strong>
                  <small>{{ widget.description }}</small>
                </span>
              </button>
            </section>
          </template>
        </XTabs>
      </div>
    </aside>

    <main class="x-page-builder__main">
      <header class="x-page-builder__toolbar">
        <XButton
          class="x-page-builder__panel-toggle"
          :variant="paletteVisible ? 'solid' : 'outline'"
          size="sm"
          :aria-label="paletteVisible ? '隐藏组件库' : '显示组件库'"
          :aria-pressed="paletteVisible"
          :title="paletteVisible ? '隐藏组件库' : '显示组件库'"
          data-test="page-builder-toggle-palette"
          @click="paletteVisible = !paletteVisible"
        >
          <i :class="paletteVisible ? 'ri-side-bar-fill' : 'ri-side-bar-line'" aria-hidden="true"></i>
        </XButton>

        <div class="x-page-builder__toolbar-center">
          <div class="x-page-builder__toolbar-group">
            <XButton variant="outline" size="sm" :disabled="readonly || !canUndo" @click="undo">
              <i class="ri-arrow-go-back-line" aria-hidden="true"></i>
              撤销
            </XButton>
            <XButton variant="outline" size="sm" :disabled="readonly || !canRedo" @click="redo">
              <i class="ri-arrow-go-forward-line" aria-hidden="true"></i>
              重做
            </XButton>
            <XButton variant="ghost" size="sm" :disabled="readonly" @click="reset">
              <i class="ri-refresh-line" aria-hidden="true"></i>
              重置
            </XButton>
          </div>

          <XButton variant="solid" size="sm" @click="emitExport">
            <i class="ri-braces-line" aria-hidden="true"></i>
            输出 JSON
          </XButton>
        </div>

        <XButton
          class="x-page-builder__panel-toggle"
          :variant="inspectorVisible ? 'solid' : 'outline'"
          size="sm"
          :aria-label="inspectorVisible ? '隐藏属性面板' : '显示属性面板'"
          :aria-pressed="inspectorVisible"
          :title="inspectorVisible ? '隐藏属性面板' : '显示属性面板'"
          data-test="page-builder-toggle-inspector"
          @click="inspectorVisible = !inspectorVisible"
        >
          <i :class="inspectorVisible ? 'ri-layout-right-fill' : 'ri-layout-right-line'" aria-hidden="true"></i>
        </XButton>
      </header>

      <section class="x-page-builder__canvas-wrap" :style="canvasFrameStyle">
        <GridLayout
          class="x-page-builder__canvas"
          :layout="rootLayout"
          :col-num="Math.max(1, Number(schema.canvas.columns))"
          :row-height="Math.max(36, Number(schema.canvas.rowHeight))"
          :margin="[Math.max(0, Number(schema.canvas.gap)), Math.max(0, Number(schema.canvas.gap))]"
          :is-draggable="!readonly"
          :is-resizable="!readonly"
          :auto-size="true"
          :vertical-compact="true"
          :prevent-collision="false"
          :style="canvasStyle"
          data-test="page-builder-canvas"
          @click="selectedNodeId = ''"
          @dragover.prevent
          @drop.prevent="handleDropToRoot"
          @layout-updated="updateNodeLayoutList"
        >
          <GridItem
            v-for="node in schema.nodes"
            :key="node.id"
            :i="node.id"
            :x="node.layout.x"
            :y="node.layout.y"
            :w="node.layout.w"
            :h="node.layout.h"
            :is-resizable="!readonly"
            :is-draggable="!readonly"
            drag-allow-from=".x-page-builder-node__float-tools"
          >
            <PageBuilderNodeRenderer
              :node="node"
              :selected-id="selectedNodeId"
              :readonly="readonly"
              :canvas="schema.canvas"
              :widgets="allWidgets"
              @select="selectNode"
              @duplicate="duplicateNode"
              @remove="removeNode"
              @drop-widget="addWidget($event.type, $event.parentId)"
              @layout-change="updateNodeLayout"
            />
          </GridItem>
          <div v-if="!schema.nodes.length" class="x-page-builder__empty">
            从左侧组件库添加 x.ui 组件
          </div>
        </GridLayout>
      </section>
    </main>

    <aside v-show="inspectorVisible" class="x-page-builder__inspector" aria-label="属性面板" data-test="page-builder-inspector-panel">
      <div class="x-page-builder__panel-head">
        <strong>属性</strong>
        <span>{{ selectedNode ? selectedNode.component : '页面' }}</span>
      </div>

      <div class="x-page-builder__inspector-scroll">
        <XTabs
          v-model="activeInspectorTab"
          class="x-page-builder__inspector-tabs"
          :items="inspectorTabItems"
          type="card"
          size="small"
          :show-avatar="false"
          :fill-height="true"
          :tab-gap="4"
          :tab-min-width="64"
          :border-radius="6"
          content-border="1px solid #d8e2ec"
          content-background-color="transparent"
        >
          <template #pane="{ item }">
            <section v-if="item.name === 'canvas'" class="x-page-builder__section" data-test="page-builder-inspector-canvas">
              <label class="x-page-builder__field">
                <span>列数</span>
                <XInput type="number" :model-value="schema.canvas.columns" :disabled="readonly" @update:model-value="updateCanvasField('columns', $event)" />
              </label>
              <label class="x-page-builder__field">
                <span>行高</span>
                <XInput type="number" :model-value="schema.canvas.rowHeight" :disabled="readonly" @update:model-value="updateCanvasField('rowHeight', $event)" />
              </label>
              <label class="x-page-builder__field">
                <span>间距</span>
                <XInput type="number" :model-value="schema.canvas.gap" :disabled="readonly" @update:model-value="updateCanvasField('gap', $event)" />
              </label>
              <label class="x-page-builder__field">
                <span>内边距</span>
                <XInput type="number" :model-value="schema.canvas.padding" :disabled="readonly" @update:model-value="updateCanvasField('padding', $event)" />
              </label>
              <label class="x-page-builder__field">
                <span>背景</span>
                <XInput :model-value="schema.canvas.background" :disabled="readonly" @update:model-value="updateCanvasField('background', $event)" />
              </label>
            </section>

            <section v-else-if="item.name === 'node'" class="x-page-builder__section" data-test="page-builder-inspector-node">
              <template v-if="selectedNode">
                <label class="x-page-builder__field">
                  <span>名称</span>
                  <XInput :model-value="selectedNode.label" :disabled="readonly" @update:model-value="updateSelectedLabel" />
                </label>
                <label class="x-page-builder__field">
                  <span>类型</span>
                  <XSelect :model-value="selectedNode.type" :options="widgetOptions" :disabled="readonly" @update:model-value="updateSelectedType" />
                </label>
                <div class="x-page-builder__grid-fields">
                  <label class="x-page-builder__field">
                    <span>X</span>
                    <XInput type="number" :model-value="selectedNode.layout.x" :disabled="readonly" @update:model-value="updateSelectedLayout('x', $event)" />
                  </label>
                  <label class="x-page-builder__field">
                    <span>Y</span>
                    <XInput type="number" :model-value="selectedNode.layout.y" :disabled="readonly" @update:model-value="updateSelectedLayout('y', $event)" />
                  </label>
                  <label class="x-page-builder__field">
                    <span>W</span>
                    <XInput type="number" :model-value="selectedNode.layout.w" :disabled="readonly" @update:model-value="updateSelectedLayout('w', $event)" />
                  </label>
                  <label class="x-page-builder__field">
                    <span>H</span>
                    <XInput type="number" :model-value="selectedNode.layout.h" :disabled="readonly" @update:model-value="updateSelectedLayout('h', $event)" />
                  </label>
                </div>
                <div v-if="!isPageBuilderContainer(selectedNode.type)" class="x-page-builder__grid-fields">
                  <label class="x-page-builder__field">
                    <span>上内边距</span>
                    <XInput type="number" :model-value="Number(selectedNode.props.previewPaddingTop ?? selectedNode.props.previewPadding ?? 12)" :disabled="readonly" @update:model-value="updateSelectedPreviewPadding('previewPaddingTop', $event)" />
                  </label>
                  <label class="x-page-builder__field">
                    <span>右内边距</span>
                    <XInput type="number" :model-value="Number(selectedNode.props.previewPaddingRight ?? selectedNode.props.previewPadding ?? 12)" :disabled="readonly" @update:model-value="updateSelectedPreviewPadding('previewPaddingRight', $event)" />
                  </label>
                  <label class="x-page-builder__field">
                    <span>下内边距</span>
                    <XInput type="number" :model-value="Number(selectedNode.props.previewPaddingBottom ?? selectedNode.props.previewPadding ?? 12)" :disabled="readonly" @update:model-value="updateSelectedPreviewPadding('previewPaddingBottom', $event)" />
                  </label>
                  <label class="x-page-builder__field">
                    <span>左内边距</span>
                    <XInput type="number" :model-value="Number(selectedNode.props.previewPaddingLeft ?? selectedNode.props.previewPadding ?? 12)" :disabled="readonly" @update:model-value="updateSelectedPreviewPadding('previewPaddingLeft', $event)" />
                  </label>
                </div>
                <label v-if="isPageBuilderContainer(selectedNode.type)" class="x-page-builder__field">
                  <span>内部间距</span>
                  <XInput
                    type="number"
                    :model-value="Number(selectedNode.props.gap ?? 0)"
                    :disabled="readonly"
                    @update:model-value="updateSelectedContainerGap"
                  />
                </label>
              </template>
              <p v-else class="x-page-builder__empty-hint">先在画布中选择一个组件。</p>
            </section>

            <section v-else-if="item.name === 'features'" class="x-page-builder__section" data-test="page-builder-inspector-features">
              <template v-if="selectedNode">
                <template v-if="featureEntries.length">
                  <label v-for="[key, value] in featureEntries" :key="key" class="x-page-builder__field">
                    <span>{{ getFeatureLabel(key) }}</span>
                    <span v-if="isColorFeature(key, value)" class="x-page-builder__color-field">
                      <input
                        type="color"
                        :value="normalizeColorValue(value)"
                        :disabled="readonly"
                        @input="updateSelectedFeature(key, ($event.target as HTMLInputElement).value, 'string')"
                      />
                      <XInput
                        :model-value="stringifyFeatureValue(value)"
                        :disabled="readonly"
                        @update:model-value="updateSelectedFeature(key, $event, 'string')"
                      />
                    </span>
                    <XInput
                      v-else-if="typeof value === 'number'"
                      type="number"
                      :model-value="value"
                      :disabled="readonly"
                      @update:model-value="updateSelectedFeature(key, $event, 'number')"
                    />
                    <XSwitch
                      v-else-if="typeof value === 'boolean'"
                      :model-value="value"
                      :disabled="readonly"
                      @update:model-value="updateSelectedFeature(key, $event, 'boolean')"
                    />
                    <textarea
                      v-else-if="value && typeof value === 'object'"
                      class="x-page-builder__feature-textarea"
                      :value="stringifyFeatureValue(value)"
                      :disabled="readonly"
                      @change="updateSelectedFeature(key, ($event.target as HTMLTextAreaElement).value, 'complex')"
                    ></textarea>
                    <XInput
                      v-else
                      :model-value="stringifyFeatureValue(value)"
                      :disabled="readonly"
                      @update:model-value="updateSelectedFeature(key, $event, 'string')"
                    />
                  </label>
                </template>
                <p v-else class="x-page-builder__empty-hint">当前组件没有可配置特性。</p>
              </template>
              <p v-else class="x-page-builder__empty-hint">先在画布中选择一个组件。</p>
            </section>

            <section v-else-if="item.name === 'slots'" class="x-page-builder__section" data-test="page-builder-inspector-slots">
              <template v-if="selectedNode">
                <XJsonEditor v-model="slotsDraft" title="Slots" :external-error="slotsError" :resizable="false" />
                <XButton variant="outline" size="sm" :disabled="readonly" @click="applySelectedJson('slots')">应用 Slots</XButton>
              </template>
              <p v-else class="x-page-builder__empty-hint">先在画布中选择一个组件。</p>
            </section>

            <textarea v-else class="x-page-builder__sr-json" readonly :value="outputJson" data-test="page-builder-output-json" />
          </template>
        </XTabs>
      </div>
    </aside>
  </section>
</template>

<style scoped>
.x-page-builder {
  background: #eef3f7;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-sizing: border-box;
  color: #102a43;
  display: grid;
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  gap: 10px;
  grid-template-columns: 280px minmax(0, 1fr) 360px;
  height: var(--x-page-builder-height, min(900px, 88vh));
  min-height: var(--x-page-builder-min-height, 680px);
  min-width: 0;
  overflow: hidden;
  padding: 10px;
  width: 100%;
}

.x-page-builder.is-palette-hidden {
  grid-template-columns: minmax(0, 1fr) 360px;
}

.x-page-builder.is-inspector-hidden {
  grid-template-columns: 280px minmax(0, 1fr);
}

.x-page-builder.is-palette-hidden.is-inspector-hidden {
  grid-template-columns: minmax(0, 1fr);
}

.x-page-builder__palette,
.x-page-builder__main,
.x-page-builder__inspector {
  background: #ffffff;
  border: 1px solid #d8e2ec;
  border-radius: 8px;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
}

.x-page-builder__palette,
.x-page-builder__inspector {
  display: flex;
  flex-direction: column;
}

.x-page-builder__panel-head,
.x-page-builder__toolbar {
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: space-between;
  min-height: 48px;
  padding: 0 12px;
}

.x-page-builder__panel-head strong {
  font-size: 15px;
}

.x-page-builder__panel-head span {
  color: #64748b;
  font-size: 12px;
}

.x-page-builder__palette-scroll,
.x-page-builder__inspector-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 12px;
}

.x-page-builder__palette-scroll {
  overflow: hidden;
  padding: 10px;
}

.x-page-builder__inspector-scroll {
  overflow: hidden;
  padding: 10px;
}

.x-page-builder__palette-tabs {
  height: 100%;
  min-height: 0;
}

.x-page-builder__inspector-tabs {
  height: 100%;
  min-height: 0;
}

.x-page-builder__palette-tabs :deep(.x-tabs__head),
.x-page-builder__inspector-tabs :deep(.x-tabs__head) {
  border-bottom: 0;
}

.x-page-builder__palette-tabs :deep(.x-tabs__track) {
  gap: 4px;
}

.x-page-builder__palette-tabs :deep(.x-tabs__item) {
  min-width: 0;
}

.x-page-builder__palette-tabs :deep(.x-tabs__content) {
  background: transparent;
  min-height: 0;
  overflow: auto;
  padding: 10px;
}

.x-page-builder__palette-tabs :deep(.x-tabs__pane) {
  padding-right: 2px;
}

.x-page-builder__inspector-tabs :deep(.x-tabs__track) {
  gap: 4px;
}

.x-page-builder__inspector-tabs :deep(.x-tabs__item) {
  min-width: 0;
}

.x-page-builder__inspector-tabs :deep(.x-tabs__content) {
  background: transparent;
  min-height: 0;
  overflow: auto;
  padding: 10px;
}

.x-page-builder__inspector-tabs :deep(.x-tabs__pane) {
  padding-right: 2px;
}

.x-page-builder__palette-group {
  display: grid;
  gap: 8px;
}

.x-page-builder__section + .x-page-builder__section {
  margin-top: 16px;
}

.x-page-builder__section h3 {
  color: #334155;
  font-size: 13px;
  margin: 0;
}

.x-page-builder__palette-item {
  align-items: flex-start;
  background: #f8fafc;
  border: 1px solid #d8e2ec;
  border-radius: 7px;
  color: #102a43;
  cursor: grab;
  display: grid;
  gap: 10px;
  grid-template-columns: 22px minmax(0, 1fr);
  padding: 10px;
  text-align: left;
}

.x-page-builder__palette-item:hover:not(:disabled) {
  background: #e6f3f5;
  border-color: #0b4a52;
}

.x-page-builder__palette-item:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.x-page-builder__palette-item i {
  color: #0b4a52;
  font-size: 18px;
  line-height: 1.25;
}

.x-page-builder__palette-item span {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.x-page-builder__palette-item strong {
  font-size: 13px;
}

.x-page-builder__palette-item small {
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}

.x-page-builder__main {
  display: flex;
  flex-direction: column;
}

.x-page-builder__toolbar-center,
.x-page-builder__toolbar-group {
  align-items: center;
  display: inline-flex;
  gap: 8px;
  min-width: 0;
}

.x-page-builder__toolbar-center {
  flex: 1 1 auto;
  flex-wrap: wrap;
  justify-content: center;
}

.x-page-builder__panel-toggle {
  flex: 0 0 auto;
}

.x-page-builder__panel-toggle :deep(.x-button__content) {
  justify-content: center;
  width: 18px;
}

.x-page-builder__toolbar :deep(.x-button__content) {
  align-items: center;
  display: inline-flex;
  gap: 6px;
}

.x-page-builder__canvas-wrap {
  background:
    linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px),
    linear-gradient(180deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px),
    var(--x-page-builder-bg);
  background-size: 24px 24px;
  border: 1px solid #d8e2ec;
  border-radius: 8px;
  box-sizing: border-box;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 12px;
}

.x-page-builder__canvas {
  box-sizing: border-box;
  min-height: 100%;
  min-width: 920px;
  padding: var(--x-page-builder-padding);
}

.x-page-builder__canvas :deep(.vue-grid-item) {
  overflow: visible;
}

.x-page-builder__canvas :deep(.vue-grid-layout),
.x-page-builder-node__container-grid :deep(.vue-grid-layout) {
  position: relative;
  transition: height 0.2s ease;
}

.x-page-builder__canvas :deep(.vue-grid-item),
.x-page-builder-node__container-grid :deep(.vue-grid-item) {
  transition: all 0.2s ease;
  transition-property: left, top, right;
}

.x-page-builder__canvas :deep(.vue-grid-item.cssTransforms),
.x-page-builder-node__container-grid :deep(.vue-grid-item.cssTransforms) {
  left: 0;
  right: auto;
  transition-property: transform;
}

.x-page-builder__canvas :deep(.vue-grid-item.no-touch),
.x-page-builder-node__container-grid :deep(.vue-grid-item.no-touch) {
  touch-action: none;
}

.x-page-builder__canvas :deep(.vue-grid-item.vue-draggable-dragging),
.x-page-builder__canvas :deep(.vue-grid-item.resizing),
.x-page-builder-node__container-grid :deep(.vue-grid-item.vue-draggable-dragging),
.x-page-builder-node__container-grid :deep(.vue-grid-item.resizing) {
  opacity: 0.82;
  transition: none;
  z-index: 12;
}

.x-page-builder__canvas :deep(.vue-grid-placeholder),
.x-page-builder-node__container-grid :deep(.vue-grid-placeholder) {
  background: rgba(11, 74, 82, 0.16);
  border: 1px dashed #0b4a52;
  border-radius: 8px;
  opacity: 1;
  transition-duration: 0.1s;
  user-select: none;
  z-index: 2;
}

.x-page-builder__canvas :deep(.vue-grid-item > .vue-resizable-handle),
.x-page-builder-node__container-grid :deep(.vue-grid-item > .vue-resizable-handle) {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  bottom: -11px;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
  box-sizing: border-box;
  cursor: se-resize;
  height: 22px;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: -11px;
  transition: opacity 0.16s ease, border-color 0.16s ease;
  width: 22px;
  z-index: 9;
}

.x-page-builder__canvas :deep(.vue-grid-item > .vue-resizable-handle::after),
.x-page-builder-node__container-grid :deep(.vue-grid-item > .vue-resizable-handle::after) {
  border-bottom: 2px solid #64748b;
  border-right: 2px solid #64748b;
  bottom: 5px;
  content: '';
  height: 7px;
  position: absolute;
  right: 5px;
  width: 7px;
}

.x-page-builder__canvas :deep(.vue-grid-item:hover > .vue-resizable-handle),
.x-page-builder__canvas :deep(.vue-grid-item.vue-draggable-dragging > .vue-resizable-handle),
.x-page-builder__canvas :deep(.vue-grid-item.resizing > .vue-resizable-handle),
.x-page-builder-node__container-grid :deep(.vue-grid-item:hover > .vue-resizable-handle),
.x-page-builder-node__container-grid :deep(.vue-grid-item.vue-draggable-dragging > .vue-resizable-handle),
.x-page-builder-node__container-grid :deep(.vue-grid-item.resizing > .vue-resizable-handle) {
  opacity: 1;
}

.x-page-builder__canvas :deep(.vue-grid-item > .vue-resizable-handle:hover),
.x-page-builder-node__container-grid :deep(.vue-grid-item > .vue-resizable-handle:hover) {
  border-color: #0b4a52;
}

.x-page-builder__empty {
  align-items: center;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  color: #64748b;
  display: flex;
  font-size: 14px;
  grid-column: 1 / -1;
  justify-content: center;
  min-height: 220px;
}

.x-page-builder__section {
  display: grid;
  gap: 10px;
}

.x-page-builder__empty-hint {
  align-items: center;
  border: 1px dashed #cbd5e1;
  border-radius: 7px;
  color: #64748b;
  display: flex;
  font-size: 13px;
  justify-content: center;
  line-height: 1.6;
  margin: 0;
  min-height: 120px;
  padding: 12px;
  text-align: center;
}

.x-page-builder__field {
  display: grid;
  gap: 6px;
}

.x-page-builder__field > span {
  color: #475569;
  font-size: 12px;
  font-weight: 700;
}

.x-page-builder__feature-textarea {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  color: #102a43;
  font: 12px/1.5 Consolas, 'Cascadia Code', monospace;
  min-height: 88px;
  outline: none;
  padding: 8px;
  resize: vertical;
  width: 100%;
}

.x-page-builder__feature-textarea:focus {
  border-color: #0b4a52;
  box-shadow: 0 0 0 2px rgba(11, 74, 82, 0.12);
}

.x-page-builder__color-field {
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: 42px minmax(0, 1fr);
}

.x-page-builder__color-field input[type='color'] {
  background: transparent;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  height: 32px;
  padding: 2px;
  width: 42px;
}

.x-page-builder__color-field input[type='color']:disabled {
  cursor: not-allowed;
  opacity: 0.58;
}

.x-page-builder__grid-fields {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.x-page-builder__json-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.x-page-builder__sr-json {
  height: 1px;
  opacity: 0;
  position: absolute;
  width: 1px;
}

.x-page-builder :deep(.x-json-editor__shell) {
  min-height: 180px;
}

@media (max-width: 1280px) {
  .x-page-builder {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 0;
  }

  .x-page-builder__palette,
  .x-page-builder__inspector {
    max-height: 520px;
  }

  .x-page-builder__main {
    min-height: 680px;
  }
}
</style>
