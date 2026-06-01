<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { JSONContent } from '@tiptap/core'
import type { RichEditorExpose, UploadResult } from './core/rich-editor/custom/types'
import RichEditor from './core/rich-editor/RichEditor.vue'
import type { RichTextEditorProps } from './types'

defineOptions({ name: 'XRichTextEditor' })

const props = withDefaults(defineProps<RichTextEditorProps>(), {
  modelValue: '',
  fallbackHtml: '',
  readonly: false,
  minHeight: 520,
  fillHeight: false,
  canSave: false,
  showToolbar: true,
  toolbarTooltipPlacement: 'bottom',
  showOutline: true,
  pasteImages: true,
  contentBackground: 'var(--x-color-surface, #ffffff)',
  contentTextColor: 'var(--x-color-text, #111827)',
  contentFontSize: 14
})

const emit = defineEmits<{
      'update:modelValue': [value: string]
  htmlChange: [value: string]
  'save-doc': []
}>()

const editorRef = ref<RichEditorExpose | null>(null)

function parseValue(value: string, fallbackHtml: string): JSONContent | string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return fallbackHtml || ''
  }

  try {
    const parsed = JSON.parse(trimmed) as JSONContent
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && typeof parsed.type === 'string') {
      return parsed
    }
  } catch {
    // Non-JSON input intentionally falls back to HTML for compatibility.
  }

  return fallbackHtml || trimmed
}

function stringifyValue(value: JSONContent | string | null | undefined): string {
  if (value == null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value)
}

const editorValue = ref<JSONContent | string | null>(parseValue(props.modelValue, props.fallbackHtml))

function handleGlobalKeydown(event: KeyboardEvent) {
  if (!props.canSave || props.readonly) {
    return
  }

  const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's'
  if (!isSaveShortcut) {
    return
  }

  event.preventDefault()
  emit('save-doc')
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

watch(
  () => [props.modelValue, props.fallbackHtml],
  ([modelValue, fallbackHtml]) => {
    const nextValue = parseValue(modelValue, fallbackHtml)
    const currentValue = stringifyValue(editorValue.value)
    const nextString = stringifyValue(nextValue)
    if (currentValue !== nextString) {
      editorValue.value = nextValue
      editorRef.value?.setContent(nextValue)
    }
  }
)

function handleUpdate(value: JSONContent | string | null) {
  editorValue.value = value
  emit('update:modelValue', stringifyValue(value))
}

function handleChange(payload: { json: JSONContent | null; html: string }) {
  emit('htmlChange', payload.html)
}

function getJson() {
  return editorRef.value?.getJson() ?? null
}

function getHtml() {
  return editorRef.value?.getHtml() ?? ''
}

function setContent(content: JSONContent | string | null | undefined) {
  editorRef.value?.setContent(content)
}

function insertImage(fileKey: string) {
  editorRef.value?.insertImage(fileKey)
}

function insertAttachment(file: UploadResult) {
  editorRef.value?.insertAttachment(file)
}

function locateKeyword(keyword: string) {
  return editorRef.value?.locateKeyword(keyword) ?? false
}

defineExpose<RichEditorExpose>({
  getJson,
  getHtml,
  setContent,
  insertImage,
  insertAttachment,
  locateKeyword
})

const editorMinHeight = computed(() => (typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight))
</script>

<template>
  <div
    class="x-rich-text-editor"
    :class="{ 'x-rich-text-editor--fill-height': props.fillHeight }"
    :style="{ '--xl-editor-min-height': editorMinHeight }"
  >
    <RichEditor
      ref="editorRef"
      :model-value="editorValue"
      :readonly="props.readonly"
      :can-save="props.canSave"
      :show-toolbar="props.showToolbar"
      :toolbar-buttons="props.toolbarButtons"
      :toolbar-tooltip-placement="props.toolbarTooltipPlacement"
      :show-outline="props.showOutline"
      :paste-images="props.pasteImages"
      :size="props.size"
      :content-background="props.contentBackground"
      :content-text-color="props.contentTextColor"
      :content-font-size="props.contentFontSize"
      :theme="props.theme"
      :upload-image="props.uploadImage"
      :upload-file="props.uploadFile"
      :min-height="props.minHeight"
      :fill-height="props.fillHeight"
      @update:model-value="handleUpdate"
      @change="handleChange"
      @save-doc="$emit('save-doc')"
    />
  </div>
</template>
