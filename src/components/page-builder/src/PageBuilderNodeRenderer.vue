<script setup lang="ts">
import { computed } from 'vue'
import { GridItem, GridLayout } from 'vue-grid-layout-v3'
import PageBuilderPreview from './PageBuilderPreview.vue'
import type { PageBuilderCanvasSchema, PageBuilderNodeSchema, PageBuilderWidgetDefinition } from './types'

defineOptions({
  name: 'XPageBuilderNodeRenderer'
})

const props = defineProps<{
  node: PageBuilderNodeSchema
  selectedId: string
  readonly: boolean
  canvas: PageBuilderCanvasSchema
  widgets: PageBuilderWidgetDefinition[]
}>()

const emit = defineEmits<{
  select: [id: string]
  duplicate: [id: string]
  remove: [id: string]
  dropWidget: [payload: { type: string; parentId: string }]
  layoutChange: [payload: { id: string; layout: Partial<PageBuilderNodeSchema['layout']> }]
}>()

const isContainer = computed(() => props.node.type === 'container')
const columns = computed(() => Math.max(1, Number(props.node.props.columns ?? 1)))
const gap = computed(() => Math.max(0, Number(props.node.props.gap ?? 0)))
const rowHeight = computed(() => Math.max(36, Number(props.canvas.rowHeight)))
const previewPaddingTop = computed(() => Math.max(0, Number(props.node.props.previewPaddingTop ?? props.node.props.previewPadding ?? 12)))
const previewPaddingRight = computed(() => Math.max(0, Number(props.node.props.previewPaddingRight ?? props.node.props.previewPadding ?? 12)))
const previewPaddingBottom = computed(() => Math.max(0, Number(props.node.props.previewPaddingBottom ?? props.node.props.previewPadding ?? 12)))
const previewPaddingLeft = computed(() => Math.max(0, Number(props.node.props.previewPaddingLeft ?? props.node.props.previewPadding ?? 12)))
const previewStyle = computed(() => ({
  padding: `${previewPaddingTop.value}px ${previewPaddingRight.value}px ${previewPaddingBottom.value}px ${previewPaddingLeft.value}px`
}))
const childLayout = computed(() =>
  (props.node.children ?? []).map((child) => ({
    i: child.id,
    x: Math.max(0, Number(child.layout.x) || 0),
    y: Math.max(0, Number(child.layout.y) || 0),
    w: Math.max(1, Number(child.layout.w) || 1),
    h: Math.max(1, Number(child.layout.h) || 1)
  }))
)

const containerStyle = computed(() => ({
  '--x-page-builder-container-columns': String(columns.value),
  '--x-page-builder-container-gap': `${gap.value}px`,
  '--x-page-builder-container-bg': String(props.node.props.background ?? '#fff'),
  '--x-page-builder-container-border': String(props.node.props.borderColor ?? '#d8e2ec')
}))

function handleDrop(event: DragEvent) {
  if (!isContainer.value || props.readonly) {
    return
  }

  const type = event.dataTransfer?.getData('application/x-page-builder-widget')
  if (type) {
    emit('dropWidget', { type, parentId: props.node.id })
  }
}

function handleChildLayoutUpdated(layout: Array<{ i: string | number; x: number; y: number; w: number; h: number }>) {
  layout.forEach((item) => {
    emit('layoutChange', {
      id: String(item.i),
      layout: {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
      }
    })
  })
}
</script>

<template>
  <article
    class="x-page-builder-node"
    :class="{ 'is-selected': selectedId === node.id, 'is-container': isContainer }"
    :data-node-id="node.id"
    @click.stop="emit('select', node.id)"
    @dragover.prevent
    @drop.stop="handleDrop"
  >
    <div class="x-page-builder-node__float-tools" aria-label="组件操作">
      <span class="x-page-builder-node__type" :title="`${node.label} ${node.component}，拖动可移动组件`">
        <span>{{ node.label }}</span>
        <small>{{ node.component }}</small>
      </span>
      <template v-if="!readonly">
        <button type="button" title="复制" @click.stop="emit('duplicate', node.id)">
          <i class="ri-file-copy-line" aria-hidden="true"></i>
        </button>
        <button type="button" title="删除" @click.stop="emit('remove', node.id)">
          <i class="ri-delete-bin-line" aria-hidden="true"></i>
        </button>
      </template>
    </div>

    <section v-if="isContainer" class="x-page-builder-node__container" :style="containerStyle">
      <GridLayout
        class="x-page-builder-node__container-grid"
        :layout="childLayout"
        :col-num="columns"
        :row-height="rowHeight"
        :margin="[gap, gap]"
        :is-draggable="!readonly"
        :is-resizable="!readonly"
        :auto-size="true"
        :vertical-compact="true"
        :prevent-collision="false"
        @layout-updated="handleChildLayoutUpdated"
      >
        <GridItem
          v-for="child in node.children || []"
          :key="child.id"
          :i="child.id"
          :x="child.layout.x"
          :y="child.layout.y"
          :w="child.layout.w"
          :h="child.layout.h"
          :is-resizable="!readonly"
          :is-draggable="!readonly"
          drag-allow-from=".x-page-builder-node__float-tools"
        >
          <PageBuilderNodeRenderer
            :node="child"
            :selected-id="selectedId"
            :readonly="readonly"
            :canvas="canvas"
            :widgets="widgets"
            @select="emit('select', $event)"
            @duplicate="emit('duplicate', $event)"
            @remove="emit('remove', $event)"
            @drop-widget="emit('dropWidget', $event)"
            @layout-change="emit('layoutChange', $event)"
          />
        </GridItem>
        <div v-if="!node.children?.length" class="x-page-builder-node__empty" aria-hidden="true"></div>
      </GridLayout>
    </section>

    <section v-else class="x-page-builder-node__preview" :style="previewStyle">
      <PageBuilderPreview :node="node" :widgets="widgets" />
    </section>
  </article>
</template>

<style scoped>
.x-page-builder-node {
  background: #ffffff;
  border: 1px solid #d8e2ec;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: visible;
  position: relative;
}

.x-page-builder-node.is-selected {
  border-color: #0b4a52;
  box-shadow: 0 0 0 2px rgba(11, 74, 82, 0.14), 0 8px 18px rgba(15, 23, 42, 0.08);
}

.x-page-builder-node__float-tools {
  align-items: center;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  display: inline-flex;
  gap: 4px;
  left: auto;
  max-width: calc(100% - 16px);
  opacity: 0;
  padding: 2px 4px 2px 8px;
  pointer-events: none;
  position: absolute;
  right: 8px;
  top: 0;
  transform: translateY(-50%);
  transition: opacity 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
  z-index: 8;
}

.x-page-builder-node.is-container > .x-page-builder-node__float-tools {
  left: 8px;
  right: auto;
}

.x-page-builder-node:hover > .x-page-builder-node__float-tools,
.x-page-builder-node.is-selected > .x-page-builder-node__float-tools {
  opacity: 1;
  pointer-events: auto;
}

.x-page-builder-node.is-selected > .x-page-builder-node__float-tools {
  border-color: #0b4a52;
  box-shadow: 0 0 0 2px rgba(11, 74, 82, 0.12), 0 8px 20px rgba(15, 23, 42, 0.12);
}

.x-page-builder-node__type {
  align-items: center;
  color: #102a43;
  cursor: move;
  display: inline-flex;
  gap: 5px;
  max-width: 220px;
  min-width: 0;
  user-select: none;
}

.x-page-builder-node__type span {
  flex: 0 1 auto;
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-page-builder-node__type small {
  color: #64748b;
  flex: 0 1 auto;
  font-family: Consolas, 'Cascadia Code', monospace;
  font-size: 10px;
  line-height: 18px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-page-builder-node__float-tools button {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 999px;
  color: #64748b;
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 12px;
  height: 20px;
  justify-content: center;
  padding: 0;
  width: 20px;
}

.x-page-builder-node__float-tools button:hover {
  background: #e6f3f5;
  color: #0b4a52;
}

.x-page-builder-node__preview {
  box-sizing: border-box;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.x-page-builder-node__container {
  background: var(--x-page-builder-container-bg);
  border: 1px dashed var(--x-page-builder-container-border);
  border-radius: 7px;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0;
}

.x-page-builder-node__container-grid {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.x-page-builder-node__container-grid :deep(.vue-grid-item) {
  max-width: 100%;
  overflow: visible;
}

.x-page-builder-node__container-grid :deep(.vue-grid-layout) {
  position: relative;
  transition: height 0.2s ease;
}

.x-page-builder-node__container-grid :deep(.vue-grid-item) {
  transition: all 0.2s ease;
  transition-property: left, top, right;
}

.x-page-builder-node__container-grid :deep(.vue-grid-item.cssTransforms) {
  left: 0;
  right: auto;
  transition-property: transform;
}

.x-page-builder-node__container-grid :deep(.vue-grid-item.no-touch) {
  touch-action: none;
}

.x-page-builder-node__container-grid :deep(.vue-grid-item.vue-draggable-dragging),
.x-page-builder-node__container-grid :deep(.vue-grid-item.resizing) {
  opacity: 0.82;
  transition: none;
  z-index: 12;
}

.x-page-builder-node__container-grid :deep(.vue-grid-placeholder) {
  background: rgba(11, 74, 82, 0.16);
  border: 1px dashed #0b4a52;
  border-radius: 8px;
  opacity: 1;
  transition-duration: 0.1s;
  user-select: none;
  z-index: 2;
}

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

.x-page-builder-node__container-grid :deep(.vue-grid-item:hover > .vue-resizable-handle),
.x-page-builder-node__container-grid :deep(.vue-grid-item.vue-draggable-dragging > .vue-resizable-handle),
.x-page-builder-node__container-grid :deep(.vue-grid-item.resizing > .vue-resizable-handle) {
  opacity: 1;
}

.x-page-builder-node__container-grid :deep(.vue-grid-item > .vue-resizable-handle:hover) {
  border-color: #0b4a52;
}

.x-page-builder-node__empty {
  align-items: center;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  min-height: 96px;
}
</style>
