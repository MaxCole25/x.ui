<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  XRichTextEditor,
  type RichTextEditorExpose,
  type RichTextEditorProps,
  type RichTextEditorToolbarButton,
} from 'x.ui'
import { normalizeBaseXSize } from './xSize'

defineOptions({
  name: 'BaseXRichTextEditor',
  inheritAttrs: false,
})

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
  contentTextColor: 'var(--x-color-text, var(--color-text, #111827))',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  htmlChange: [value: string]
  'save-doc': []
}>()

const defaultToolbarButtons: RichTextEditorToolbarButton[] = [
  'undo',
  'redo',
  'bold',
  'italic',
  'underline',
  'strike',
  'subscript',
  'superscript',
  'clear-formatting',
  'font-family',
  'font-size',
  'text-color',
  'highlight',
  'heading',
  'bullet-list',
  'ordered-list',
  'task-list',
  'blockquote',
  'outline',
  'align',
  'horizontal-rule',
  'image',
  'table',
]

const editorRef = ref<RichTextEditorExpose | null>(null)
const toolbarButtons = computed(() => props.toolbarButtons ?? defaultToolbarButtons)

function getJson() {
  return editorRef.value?.getJson() ?? null
}

function getHtml() {
  return editorRef.value?.getHtml() ?? ''
}

function setContent(content: Parameters<RichTextEditorExpose['setContent']>[0]) {
  editorRef.value?.setContent(content)
}

function insertImage(fileKey: string) {
  editorRef.value?.insertImage(fileKey)
}

function insertAttachment(file: Parameters<RichTextEditorExpose['insertAttachment']>[0]) {
  editorRef.value?.insertAttachment(file)
}

function locateKeyword(keyword: string) {
  return editorRef.value?.locateKeyword(keyword) ?? false
}

defineExpose<RichTextEditorExpose>({
  getJson,
  getHtml,
  setContent,
  insertImage,
  insertAttachment,
  locateKeyword,
})
</script>

<template>
  <XRichTextEditor
    ref="editorRef"
    v-bind="$attrs"
    :model-value="modelValue"
    :fallback-html="fallbackHtml"
    :readonly="readonly"
    :min-height="minHeight"
    :fill-height="fillHeight"
    :can-save="canSave"
    :show-toolbar="showToolbar"
    :toolbar-buttons="toolbarButtons"
    :toolbar-tooltip-placement="toolbarTooltipPlacement"
    :show-outline="showOutline"
    :paste-images="pasteImages"
    :size="normalizeBaseXSize(size)"
    :content-background="contentBackground"
    :content-text-color="contentTextColor"
    :theme="theme"
    :upload-image="uploadImage"
    :upload-file="uploadFile"
    @update:model-value="emit('update:modelValue', $event)"
    @html-change="emit('htmlChange', $event)"
    @save-doc="emit('save-doc')"
  />
</template>
