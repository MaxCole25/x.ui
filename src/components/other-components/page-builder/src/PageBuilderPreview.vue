<script setup lang="ts">
import { computed, markRaw } from 'vue'
import { getPageBuilderWidget } from './registry'
import type { PageBuilderNodeSchema, PageBuilderWidgetDefinition } from './types'

defineOptions({
  name: 'XPageBuilderPreview'
})

const props = defineProps<{
  node: PageBuilderNodeSchema
  widgets?: PageBuilderWidgetDefinition[]
}>()

const widget = computed(() => props.widgets?.find((item) => item.type === props.node.type) ?? getPageBuilderWidget(props.node.type))
const renderer = computed(() => widget.value?.renderer ? markRaw(widget.value.renderer) : undefined)
const previewProps = computed(() => props.node.props ?? {})
const defaultSlot = computed(() => props.node.slots?.default ?? '')

const isStaticDialog = computed(() => props.node.type === 'x-dialog')
const isLayout = computed(() => props.node.type === 'x-layout')
const isForm = computed(() => props.node.type === 'x-form')
</script>

<template>
  <div v-if="!renderer" class="x-page-builder-preview x-page-builder-preview--empty">
    未知组件：{{ node.component }}
  </div>

  <div v-else-if="isStaticDialog" class="x-page-builder-preview x-page-builder-preview--dialog">
    <div class="x-page-builder-preview__dialog-title">{{ String(node.props.title || '弹窗') }}</div>
    <div class="x-page-builder-preview__dialog-body">{{ defaultSlot || '弹窗内容' }}</div>
  </div>

  <component v-else-if="isLayout" :is="renderer" class="x-page-builder-preview__component" v-bind="previewProps">
    <template #topbar>顶部栏</template>
    <template #sidebar>侧边栏</template>
    <span>{{ defaultSlot || '内容区' }}</span>
    <template #footer>页脚</template>
  </component>

  <component v-else-if="isForm" :is="renderer" class="x-page-builder-preview__component" v-bind="previewProps">
    <div class="x-page-builder-preview__form-placeholder">{{ defaultSlot || '表单内容区域' }}</div>
  </component>

  <component v-else :is="renderer" class="x-page-builder-preview__component" v-bind="previewProps">
    {{ defaultSlot }}
  </component>
</template>

<style scoped>
.x-page-builder-preview {
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
}

.x-page-builder-preview__component {
  max-width: 100%;
}

.x-page-builder-preview--empty {
  align-items: center;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  color: #64748b;
  display: flex;
  font-size: 13px;
  justify-content: center;
  min-height: 72px;
  padding: 12px;
}

.x-page-builder-preview--dialog {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
  display: grid;
  gap: 8px;
  padding: 12px;
}

.x-page-builder-preview__dialog-title {
  color: #102a43;
  font-size: 14px;
  font-weight: 700;
}

.x-page-builder-preview__dialog-body,
.x-page-builder-preview__form-placeholder {
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.x-page-builder-preview__form-placeholder {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  padding: 12px;
}
</style>
