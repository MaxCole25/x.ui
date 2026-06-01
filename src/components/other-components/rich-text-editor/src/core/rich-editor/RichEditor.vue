<template>
  <section
    class="xl-rich-editor"
    :class="{
      'xl-rich-editor--toolbar-hidden': !props.showToolbar,
      'xl-rich-editor--readonly': props.readonly,
      'xl-rich-editor--editable': !props.readonly,
      'xl-rich-editor--fill-height': props.fullHeight,
      [`xl-rich-editor--${mergedSize}`]: true,
    }"
    :style="editorStyle"
  >
    <EditorToolbar
      v-if="props.showToolbar"
      :editor="editor"
      :is-outline-visible="showOutline"
      :can-save="props.canSave"
      :readonly="props.readonly"
      :toolbar-buttons="props.toolbarButtons"
      :toolbar-tooltip-placement="props.toolbarTooltipPlacement"
      :show-outline="props.showOutline"
      @pick-image="pickImage"
      @pick-file="pickFile"
      @toggle-outline="toggleOutline"
      @save-doc="$emit('save-doc')"
      @import-markdown="pickMarkdown"
    />

    <div v-if="hasSelectedImage && !props.readonly" class="xl-rich-editor__image-resizer">
      <span>图片宽度</span>
      <input v-model.number="selectedImageWidth" type="range" min="20" max="100" step="1" @input="setSelectedImageWidth" />
      <strong>{{ selectedImageWidth }}%</strong>
    </div>

    <div
      class="xl-rich-editor__surface"
      :class="{ 'xl-rich-editor__surface--with-outline': showOutline && props.showOutline }"
      :style="{ '--xl-editor-content-bg': props.contentBackground }"
    >
      <EditorContent :editor="editor" @mousedown="handleEditorMouseDown" />
      <span v-if="showOutline && props.showOutline" class="xl-rich-editor__outline-divider" aria-hidden="true"></span>
      <OutlinePanel v-if="showOutline && props.showOutline" class="xl-rich-editor__outline" :editor="editor" />
      <SlashMenu :visible="false" :items="slashItems" @select="handleSlashSelect" />
    </div>

    <input ref="imageInput" type="file" accept="image/*" hidden @change="handleImagePick" />
    <input ref="fileInput" type="file" hidden @change="handleFilePick" />
    <input ref="markdownInput" type="file" accept=".md,.markdown,text/markdown,text/plain" hidden @change="handleMarkdownPick" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { JSONContent } from '@tiptap/core'
import type { Editor } from '@tiptap/vue-3'
import '../../../../../../styles/index.css'
import './styles/index.css'
import { componentSizePreset, type XSize } from '../../../../../_utils/size'
import { toHtml } from './custom/adapters/htmlAdapter'
import { toJson } from './custom/adapters/jsonAdapter'
import { fromMarkdown } from './custom/adapters/markdownAdapter'
import { useTiptapEditor } from './composables/useTiptapEditor'
import { useEditorCommands } from './composables/useEditorCommands'
import { useEditorUpload } from './composables/useEditorUpload'
import type { RichEditorExpose, UploadResult } from './custom/types'
import EditorContent from './EditorContent.vue'
import EditorToolbar from './EditorToolbar.vue'
import OutlinePanel from './OutlinePanel.vue'
import SlashMenu from './SlashMenu.vue'

export interface RichTextEditorTheme {
  toolbarBackground?: string
  toolbarBorderColor?: string
  toolbarTextColor?: string
  toolbarHoverBackground?: string
  toolbarHoverTextColor?: string
  toolbarActiveBackground?: string
  toolbarActiveTextColor?: string
  toolbarDividerColor?: string
  contentBackground?: string
  contentTextColor?: string
  placeholderColor?: string
  overlayBackground?: string
  overlayBorderColor?: string
  overlayTextColor?: string
  outlineActiveColor?: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: JSONContent | string | null
    readonly?: boolean
    minHeight?: number | string
    fullHeight?: boolean
    canSave?: boolean
    toolbarButtons?: string[]
    toolbarTooltipPlacement?: 'top' | 'bottom'
    showToolbar?: boolean
    showOutline?: boolean
    pasteImages?: boolean
    size?: XSize
    contentBackground?: string
    contentTextColor?: string
    contentFontSize?: number | string
    theme?: RichTextEditorTheme
    uploadImage?: (file: File) => Promise<UploadResult>
    uploadFile?: (file: File) => Promise<UploadResult>
  }>(),
  {
    readonly: false,
    minHeight: 520,
    fullHeight: false,
    modelValue: null,
    canSave: false,
    toolbarTooltipPlacement: 'bottom',
    showToolbar: true,
    showOutline: true,
    pasteImages: true,
    size: undefined,
    contentBackground: 'var(--x-color-surface, #ffffff)',
    contentTextColor: 'var(--x-color-text, #111827)',
    contentFontSize: 14,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: JSONContent | string | null]
  change: [{ json: JSONContent | null; html: string }]
  'save-doc': []
}>()

const editor = useTiptapEditor({
  content: normalizeContent(props.modelValue),
  readonly: props.readonly,
  onPasteImages: (files) => {
    void handlePasteImages(files)
  },
  onSelectionUpdate: ({ editor: currentEditor }) => {
    syncSelectedImage(currentEditor)
  },
  onUpdate: ({ editor: currentEditor }) => {
    const json = currentEditor.getJSON()
    const html = currentEditor.getHTML()
    emit('update:modelValue', json)
    emit('change', { json, html })
  }
})

const editorRef = computed(() => editor.value as Editor | undefined)
const showOutline = ref(props.showOutline)
const hasSelectedImage = ref(false)
const selectedImageWidth = ref(100)
const commands = useEditorCommands(editorRef)
const mergedSize = computed(() => props.size ?? 'md')
const sizePreset = computed(() => componentSizePreset[mergedSize.value])
const editorStyle = computed(() => {
  const theme = props.theme || {}
  const preset = sizePreset.value

  return {
    '--xl-editor-min-height': typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight,
    '--xl-editor-font-size': `${preset.fontSize}px`,
    '--xl-editor-control-height': `${preset.height}px`,
    '--xl-editor-control-padding': preset.padding,
    '--xl-editor-radius': preset.radius,
    '--xl-editor-content-bg': theme.contentBackground || props.contentBackground,
    '--xl-editor-content-text': theme.contentTextColor || props.contentTextColor,
    '--xl-editor-content-font-size': typeof props.contentFontSize === 'number' ? `${props.contentFontSize}px` : props.contentFontSize,
    '--xl-editor-placeholder': theme.placeholderColor || '',
    '--xl-toolbar-bg': theme.toolbarBackground || '',
    '--xl-toolbar-border': theme.toolbarBorderColor || '',
    '--xl-toolbar-text': theme.toolbarTextColor || '',
    '--xl-toolbar-hover-bg': theme.toolbarHoverBackground || '',
    '--xl-toolbar-hover-text': theme.toolbarHoverTextColor || '',
    '--xl-toolbar-active-bg': theme.toolbarActiveBackground || '',
    '--xl-toolbar-active-text': theme.toolbarActiveTextColor || '',
    '--xl-toolbar-divider': theme.toolbarDividerColor || '',
    '--xl-editor-overlay-bg': theme.overlayBackground || '',
    '--xl-editor-overlay-border': theme.overlayBorderColor || '',
    '--xl-editor-overlay-text': theme.overlayTextColor || '',
    ...(theme.outlineActiveColor ? { '--xl-outline-active': theme.outlineActiveColor } : {}),
  }
})

const uploadHandlers = useEditorUpload(editorRef, {
  uploadImage: props.uploadImage ?? uploadImageAsDataUrl,
  uploadFile: props.uploadFile ?? uploadFileAsObjectUrl
})

async function handlePasteImages(files: File[]) {
  if (props.readonly || !props.pasteImages || !files.length) {
    return
  }

  for (const file of files) {
    await uploadHandlers.uploadImageFile(file)
  }
}

function readDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function uploadImageAsDataUrl(file: File): Promise<UploadResult> {
  return {
    fileKey: await readDataUrl(file),
    fileName: file.name,
    size: file.size,
    mimeType: file.type
  }
}

async function uploadFileAsObjectUrl(file: File): Promise<UploadResult> {
  return {
    fileKey: URL.createObjectURL(file),
    fileName: file.name,
    size: file.size,
    mimeType: file.type
  }
}

const imageInput = ref<HTMLInputElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const markdownInput = ref<HTMLInputElement | null>(null)

interface SelectableImageNode {
  type: { name: string }
  attrs: Record<string, unknown>
}

function getSelectedImageNode(selection: Editor['state']['selection']): SelectableImageNode | null {
  if (!('node' in selection)) {
    return null
  }

  const node = selection.node as Partial<SelectableImageNode> | null
  return node?.type?.name === 'image' && node.attrs ? (node as SelectableImageNode) : null
}

function syncSelectedImage(currentEditor: { state: Editor['state'] }) {
  const selectedNode = getSelectedImageNode(currentEditor.state.selection)
  if (!selectedNode) {
    hasSelectedImage.value = false
    return
  }

  hasSelectedImage.value = true
  const rawWidth = String(selectedNode.attrs.width || '100%').replace('%', '')
  const parsedWidth = Number(rawWidth)
  selectedImageWidth.value = Number.isFinite(parsedWidth) ? parsedWidth : 100
}

function setSelectedImageWidth() {
  if (!editor.value || !hasSelectedImage.value) {
    return
  }

  editor.value.chain().focus().updateAttributes('image', { width: `${selectedImageWidth.value}%` }).run()
}

function getEmptyDoc(): JSONContent {
  return {
    type: 'doc',
    content: [{ type: 'paragraph' }],
  }
}

const slashItems = [
  { label: 'Heading 1', description: 'Insert a level-1 heading', action: 'heading-1' },
  { label: 'Heading 2', description: 'Insert a level-2 heading', action: 'heading-2' },
  { label: 'Image', description: 'Insert an image placeholder', action: 'image' }
]

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value || value == null) {
      return
    }

    const next = JSON.stringify(normalizeContent(value) ?? value)
    const current = JSON.stringify(editor.value.getJSON())
    if (next !== current) {
      const normalized = normalizeContent(value)
      if (normalized != null) {
        editor.value.commands.setContent(normalized, false)
      } else {
        editor.value.commands.setContent(getEmptyDoc(), false)
      }
    }
  }
)

function pickImage() {
  imageInput.value?.click()
}

function pickFile() {
  fileInput.value?.click()
}

function pickMarkdown() {
  if (props.readonly) {
    return
  }

  markdownInput.value?.click()
}

async function handleImagePick(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    return
  }

  await uploadHandlers.uploadImageFile(file)
  input.value = ''
}

async function handleFilePick(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    return
  }

  await uploadHandlers.uploadAttachmentFile(file)
  input.value = ''
}

async function handleMarkdownPick(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    return
  }

  try {
    const markdown = await file.text()
    const html = fromMarkdown(markdown)
    editor.value?.commands.setContent(html, false)
  } finally {
    input.value = ''
  }
}

function handleSlashSelect(action: string) {
  if (action === 'heading-1') {
    editor.value?.chain().focus().toggleHeading({ level: 1 }).run()
  }
}

function toggleOutline() {
  if (!props.showOutline) {
    return
  }

  showOutline.value = !showOutline.value
}

watch(
  () => props.showOutline,
  (value) => {
    if (!value) {
      showOutline.value = false
    }
  },
)

watch(
  () => props.readonly,
  (value) => {
    editor.value?.setEditable(!value)
  },
  { immediate: true },
)

function handleEditorMouseDown(event: MouseEvent) {
  if (props.readonly || !editor.value) {
    return
  }

  const editorDom = editor.value.view.dom as HTMLElement | null
  if (!editorDom) {
    return
  }

  if (editor.value.isEmpty) {
    editor.value.chain().focus().setTextSelection(1).scrollIntoView().run()
    event.preventDefault()
    return
  }

  const proseMirror = editorDom.querySelector('.ProseMirror') as HTMLElement | null
  const blocks = proseMirror ? Array.from(proseMirror.children).filter((node) => node instanceof HTMLElement) : []
  const lastBlock = (blocks[blocks.length - 1] as HTMLElement | undefined) ?? null
  const lastRect = lastBlock?.getBoundingClientRect() ?? editorDom.getBoundingClientRect()

  if (event.clientY >= lastRect.bottom) {
    const endPos = editor.value.state.doc.content.size
    editor.value.chain().focus().setTextSelection(endPos).scrollIntoView().run()
    event.preventDefault()
    return
  }
}

function getJson() {
  return toJson(editor.value)
}

function getHtml() {
  return toHtml(editor.value)
}

function setContent(content: JSONContent | string | null | undefined) {
  if (!editor.value) {
    return
  }

  const normalized = normalizeContent(content)
  if (normalized == null) {
    editor.value.commands.setContent(getEmptyDoc(), false)
    return
  }

  editor.value.commands.setContent(normalized, false)
}

function insertImage(fileKey: string) {
  commands.insertImage(fileKey)
}

function insertAttachment(file: UploadResult) {
  commands.insertAttachment(file)
}

function locateKeyword(keyword: string) {
  const editorInstance = editor.value
  const normalizedKeyword = keyword.trim().toLowerCase()
  if (!editorInstance || !normalizedKeyword) {
    return false
  }

  const segments: Array<{ start: number; end: number; pos: number; text: string }> = []
  let plainText = ''

  editorInstance.state.doc.descendants((node, pos) => {
    if (!node.isText) {
      return true
    }

    const text = node.text || ''
    if (!text) {
      return true
    }

    const start = plainText.length
    plainText += text
    const end = plainText.length
    segments.push({ start, end, pos, text })
    return true
  })

  if (!plainText || !segments.length) {
    return false
  }

  const lowerText = plainText.toLowerCase()
  const matchStartIndex = lowerText.indexOf(normalizedKeyword)
  if (matchStartIndex < 0) {
    return false
  }

  const startSegment = segments.find((item) => matchStartIndex >= item.start && matchStartIndex < item.end)
  if (!startSegment) {
    return false
  }

  const from = startSegment.pos + (matchStartIndex - startSegment.start)
  const docSize = editorInstance.state.doc.content.size
  const to = Math.max(from + 1, Math.min(from + normalizedKeyword.length, docSize))

  const rangeLocated = editorInstance
    .chain()
    .focus()
    .setTextSelection({ from, to })
    .scrollIntoView()
    .run()

  if (rangeLocated) {
    return true
  }

  return editorInstance.chain().focus().setTextSelection(from).scrollIntoView().run()
}

defineExpose<RichEditorExpose>({
  getJson,
  getHtml,
  setContent,
  insertImage,
  insertAttachment,
  locateKeyword,
})

function normalizeContent(content: JSONContent | string | null | undefined): JSONContent | string | null {
  if (content == null) {
    return null
  }

  if (typeof content === 'string') {
    const trimmed = content.trim()
    return trimmed ? trimmed : null
  }

  if (typeof content === 'object' && !Array.isArray(content) && typeof content.type === 'string') {
    return content
  }

  return null
}
</script>

<style>
.xl-rich-editor {
  --xl-toolbar-bg: transparent;
  --xl-toolbar-border: var(--nm-color-shell-border, rgba(15, 23, 42, 0.08));
  --xl-toolbar-text: var(--nm-color-text, #374151);
  --xl-toolbar-hover-bg: rgba(37, 99, 235, 0.08);
  --xl-toolbar-hover-text: var(--nm-color-text, #374151);
  --xl-toolbar-active-bg: rgba(37, 99, 235, 0.12);
  --xl-toolbar-active-text: #1d4ed8;
  --xl-toolbar-divider: var(--nm-color-shell-border, rgba(15, 23, 42, 0.08));
  --xl-editor-content-bg: transparent;
  --xl-editor-content-text: var(--nm-color-text, #111827);
  --xl-editor-placeholder: rgba(148, 163, 184, 0.78);
  --xl-editor-overlay-bg: rgba(255, 255, 255, 0.96);
  --xl-editor-overlay-border: rgba(37, 99, 235, 0.14);
  --xl-editor-overlay-text: #6b7280;
  --xl-outline-title: var(--nm-color-text, #111827);
  --xl-outline-toggle: color-mix(in srgb, var(--nm-color-text, #111827) 72%, #94a3b8 28%);
  --xl-outline-text: var(--nm-color-text, #334155);
  --xl-outline-hover: var(--nm-color-text, #0f172a);
  --xl-outline-empty: color-mix(in srgb, var(--nm-color-text, #111827) 78%, #94a3b8 22%);
  --xl-outline-separator: var(--nm-color-shell-border, rgba(15, 23, 42, 0.08));
  --xl-outline-active: #409EFF;
}

[data-doc-theme-scheme='dark'] .xl-rich-editor {
  --xl-toolbar-bg: var(--xl-editor-content-bg, var(--doc-content-bg, #111827));
  --xl-toolbar-border: var(--doc-divider-color, rgba(148, 163, 184, 0.18));
  --xl-toolbar-text: var(--xl-editor-content-text, #e5e7eb);
  --xl-toolbar-hover-bg: rgba(96, 165, 250, 0.14);
  --xl-toolbar-hover-text: #eff6ff;
  --xl-toolbar-active-bg: rgba(96, 165, 250, 0.2);
  --xl-toolbar-active-text: #93c5fd;
  --xl-toolbar-divider: var(--doc-divider-color, rgba(148, 163, 184, 0.18));
  --xl-editor-content-text: #e5e7eb;
  --xl-editor-placeholder: rgba(148, 163, 184, 0.74);
  --xl-editor-overlay-bg: rgba(15, 23, 42, 0.96);
  --xl-editor-overlay-border: rgba(96, 165, 250, 0.18);
  --xl-editor-overlay-text: #94a3b8;
  --xl-outline-title: #f8fafc;
  --xl-outline-toggle: #cbd5e1;
  --xl-outline-text: #f1f5f9;
  --xl-outline-hover: #ffffff;
  --xl-outline-empty: #cbd5e1;
  --xl-outline-separator: var(--doc-divider-color, rgba(148, 163, 184, 0.18));
  --xl-outline-active: #93c5fd;
}

.xl-rich-editor .xl-toolbar {
  background: var(--xl-toolbar-bg) !important;
}

.xl-rich-editor .xl-toolbar::after {
  background: var(--xl-toolbar-border) !important;
}

.xl-rich-editor .xl-toolbar button,
.xl-rich-editor .xl-bubble-menu button,
.xl-rich-editor .xl-floating-menu button,
.xl-rich-editor .xl-table-menu button,
.xl-rich-editor .xl-slash-menu__item,
.xl-rich-editor .xl-toolbar__outline-button {
  color: var(--xl-toolbar-text) !important;
}

.xl-rich-editor .xl-toolbar button:hover,
.xl-rich-editor .xl-bubble-menu button:hover,
.xl-rich-editor .xl-floating-menu button:hover,
.xl-rich-editor .xl-table-menu button:hover,
.xl-rich-editor .xl-slash-menu__item:hover {
  background: var(--xl-toolbar-hover-bg) !important;
  color: var(--xl-toolbar-hover-text) !important;
}

.xl-rich-editor .xl-toolbar button.active,
.xl-rich-editor .xl-toolbar__outline-button i.active {
  background: var(--xl-toolbar-active-bg) !important;
  color: var(--xl-toolbar-active-text) !important;
}

.xl-rich-editor .xl-toolbar__divider {
  background: var(--xl-toolbar-divider) !important;
}

.xl-rich-editor .xl-rich-editor__outline-divider {
  background: var(--nm-color-shell-border, rgba(15, 23, 42, 0.08)) !important;
}

.xl-rich-editor .xl-rich-editor__surface {
  background: var(--xl-editor-content-bg) !important;
}

.xl-rich-editor .xl-editor__content .ProseMirror {
  color: var(--xl-editor-content-text) !important;
}

.xl-rich-editor .xl-editor__content .ProseMirror p.is-editor-empty:first-child::before,
.xl-rich-editor .xl-editor__content .ProseMirror p.is-empty::before {
  color: var(--xl-editor-placeholder) !important;
}

.xl-rich-editor .xl-bubble-menu,
.xl-rich-editor .xl-floating-menu,
.xl-rich-editor .xl-slash-menu {
  background: var(--xl-editor-overlay-bg) !important;
  border-color: var(--xl-editor-overlay-border) !important;
}

.xl-rich-editor .xl-slash-menu__item span {
  color: var(--xl-editor-overlay-text) !important;
}

.xl-rich-editor .xl-outline-panel__title {
  color: var(--xl-outline-title) !important;
}

.xl-rich-editor .xl-outline-panel__toggle {
  color: var(--xl-outline-toggle) !important;
}

.xl-rich-editor .xl-outline-panel__item,
.xl-rich-editor .xl-outline-panel__text {
  color: var(--xl-outline-text) !important;
}

.xl-rich-editor .xl-outline-panel__item:hover,
.xl-rich-editor .xl-outline-panel__item:hover .xl-outline-panel__text {
  color: var(--xl-outline-hover) !important;
}

[data-doc-theme-scheme='dark'] .xl-rich-editor .xl-outline-panel__item,
[data-doc-theme-scheme='dark'] .xl-rich-editor .xl-outline-panel__text {
  color: var(--xl-editor-content-text) !important;
}

.xl-rich-editor .xl-outline-panel__empty {
  color: var(--xl-outline-empty) !important;
}

.xl-rich-editor .xl-outline-panel__separator {
  background: var(--xl-outline-separator) !important;
}
</style>





