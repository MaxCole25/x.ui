<template>
  <div ref="toolbarRef" class="xl-toolbar">
    <div v-if="showSaveGroup" class="xl-toolbar__group xl-toolbar__group--save">
      <button
        v-if="hasTool('save')"
        type="button"
        class="xl-toolbar__save-button"
        title="保存文档（Ctrl+S）"
        :disabled="!canSave"
        @click="handleSaveClick"
      >
        <i class="ri-save-3-line"></i>
      </button>
      <button
        v-if="hasTool('import-markdown')"
        type="button"
        class="xl-toolbar__import-md-button"
        title="导入 Markdown 文档"
        :disabled="readonly"
        @click="handleImportMarkdownClick"
      >
        <i class="ri-markdown-line"></i>
      </button>
    </div>

    <span v-if="showSaveGroup && showHistoryGroup" class="xl-toolbar__divider"></span>

    <div v-if="showHistoryGroup" class="xl-toolbar__group">
      <button v-if="hasTool('undo')" type="button" title="撤销" :disabled="!canUndo" @click="undo">
        <i class="ri-arrow-go-back-line"></i>
      </button>
      <button v-if="hasTool('redo')" type="button" title="重做" :disabled="!canRedo" @click="redo">
        <i class="ri-arrow-go-forward-line"></i>
      </button>
    </div>

    <span v-if="showHistoryGroup && showInlineGroup" class="xl-toolbar__divider"></span>

    <div v-if="showInlineGroup" class="xl-toolbar__group">
      <button v-if="hasTool('bold')" type="button" title="加粗" :class="{ active: isActive('bold') }" :disabled="readonly" @click="toggleBold">
        <i class="ri-bold"></i>
      </button>
      <button v-if="hasTool('italic')" type="button" title="斜体" :class="{ active: isActive('italic') }" :disabled="readonly" @click="toggleItalic">
        <i class="ri-italic"></i>
      </button>
      <button v-if="hasTool('underline')" type="button" title="下划线" :class="{ active: isActive('underline') }" :disabled="readonly" @click="toggleUnderline">
        <i class="ri-underline"></i>
      </button>
      <button v-if="hasTool('strike')" type="button" title="删除线" :class="{ active: isActive('strike') }" :disabled="readonly" @click="toggleStrike">
        <i class="ri-strikethrough"></i>
      </button>
      <span v-if="hasAnyTools(['code', 'subscript', 'superscript', 'clear-formatting', 'format-painter'])" class="xl-toolbar__divider xl-toolbar__divider--inline" aria-hidden="true"></span>
      <button v-if="hasTool('code')" type="button" title="行内代码" :class="{ active: isActive('code') }" :disabled="readonly" @click="toggleCode">
        <i class="ri-code-s-slash-line"></i>
      </button>
      <button v-if="hasTool('subscript')" type="button" title="下标" :class="{ active: isActive('subscript') }" :disabled="readonly" @click="toggleSubscript">
        <i class="ri-subscript"></i>
      </button>
      <button v-if="hasTool('superscript')" type="button" title="上标" :class="{ active: isActive('superscript') }" :disabled="readonly" @click="toggleSuperscript">
        <i class="ri-superscript"></i>
      </button>
      <button v-if="hasTool('clear-formatting')" type="button" title="清除格式" :disabled="readonly" @click="clearFormatting">
        <i class="ri-eraser-line"></i>
      </button>
      <button
        v-if="hasTool('format-painter')"
        type="button"
        title="格式刷"
        :disabled="readonly"
        @click="toggleFormatPainter"
      >
        <i class="ri-brush-3-line"></i>
      </button>
    </div>

    <span v-if="showInlineGroup && showFontGroup" class="xl-toolbar__divider"></span>

    <div v-if="showFontGroup" class="xl-toolbar__group">
      <div v-if="hasTool('font-family')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger xl-toolbar__menu-trigger--select" title="字体" :disabled="readonly" @click="toggleMenu('fontFamily')">
          <i class="ri-font-family"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'fontFamily'" class="xl-toolbar__menu-dropdown x-scrollbar--native">
          <button
            v-for="font in fontFamilyOptions"
            :key="font.value || 'default'"
            type="button"
            :class="{ active: currentFontFamily === font.value }"
            :style="font.style"
            @click="selectFontFamily(font.value)"
          >
            {{ font.label }}
          </button>
        </div>
      </div>

      <div v-if="hasTool('font-size')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger xl-toolbar__menu-trigger--select" title="字号" :disabled="readonly" @click="toggleMenu('fontSize')">
          <i class="ri-font-size"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'fontSize'" class="xl-toolbar__menu-dropdown x-scrollbar--native">
          <button
            v-for="size in fontSizeOptions"
            :key="size.value || 'default'"
            type="button"
            :class="{ active: currentFontSize === size.value }"
            :style="size.style"
            @click="selectFontSize(size.value)"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <div v-if="hasTool('text-color')" class="xl-toolbar__menu xl-toolbar__color-menu">
        <button type="button" class="xl-toolbar__menu-trigger" title="文字颜色" :disabled="readonly" @click="toggleMenu('textColor')">
          <i class="ri-palette-line"></i>
        </button>
        <div v-if="openMenu === 'textColor'" class="xl-toolbar__menu-dropdown xl-toolbar__color-panel x-scrollbar--native">
          <button type="button" class="xl-toolbar__color-reset" @click="selectTextColor('')">默认文字</button>
          <div class="xl-toolbar__color-grid" aria-label="文字颜色预设">
            <button
              v-for="color in textColorPresets"
              :key="color.value"
              type="button"
              class="xl-toolbar__color-swatch"
              :class="{ active: currentTextColor === color.value }"
              :title="color.label"
              :style="{ backgroundColor: color.value, '--xl-toolbar-color-swatch': color.value }"
              @click="selectTextColor(color.value)"
            ></button>
          </div>
          <label class="xl-toolbar__color-custom">
            <span>自定义</span>
            <input
              ref="textColorInput"
              type="color"
              class="xl-toolbar__color-input"
              :disabled="readonly"
              aria-label="文字颜色"
              @input="setTextColor"
            />
          </label>
        </div>
      </div>

      <div v-if="hasTool('highlight')" class="xl-toolbar__menu xl-toolbar__color-menu">
        <button type="button" class="xl-toolbar__menu-trigger" title="高亮颜色" :disabled="readonly" @click="toggleMenu('highlight')">
          <i class="ri-mark-pen-line"></i>
        </button>
        <div v-if="openMenu === 'highlight'" class="xl-toolbar__menu-dropdown xl-toolbar__color-panel x-scrollbar--native">
          <button type="button" class="xl-toolbar__color-reset" @click="selectHighlightColor('')">清除高亮</button>
          <div class="xl-toolbar__color-grid" aria-label="高亮颜色预设">
            <button
              v-for="color in highlightColorPresets"
              :key="color.value"
              type="button"
              class="xl-toolbar__color-swatch"
              :class="{ active: currentHighlightColor === color.value }"
              :title="color.label"
              :style="{ backgroundColor: color.value, '--xl-toolbar-color-swatch': color.value }"
              @click="selectHighlightColor(color.value)"
            ></button>
          </div>
          <label class="xl-toolbar__color-custom">
            <span>自定义</span>
            <input
              ref="highlightColorInput"
              type="color"
              class="xl-toolbar__color-input"
              :disabled="readonly"
              aria-label="高亮颜色"
              @input="setHighlight"
            />
          </label>
        </div>
      </div>
    </div>

    <span v-if="showFontGroup && showBlockGroup" class="xl-toolbar__divider"></span>

    <div v-if="showBlockGroup" class="xl-toolbar__group">
      <div v-if="hasTool('heading')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger xl-toolbar__menu-trigger--select" title="标题" :disabled="readonly" @click="toggleMenu('heading')">
          <i class="ri-heading"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'heading'" class="xl-toolbar__menu-dropdown x-scrollbar--native">
          <button
            v-for="heading in headingOptions"
            :key="heading.value"
            type="button"
            :class="{ active: currentHeading === heading.value }"
            :style="heading.style"
            @click="selectHeading(heading.value)"
          >
            {{ heading.label }}
          </button>
        </div>
      </div>

      <button v-if="hasTool('bullet-list')" type="button" title="无序列表" :class="{ active: isActive('bulletList') }" :disabled="readonly" @click="toggleBulletList">
        <i class="ri-list-unordered"></i>
      </button>
      <button v-if="hasTool('ordered-list')" type="button" title="有序列表" :class="{ active: isActive('orderedList') }" :disabled="readonly" @click="toggleOrderedList">
        <i class="ri-list-ordered"></i>
      </button>
      <span v-if="hasAnyTools(['task-list', 'blockquote', 'code-block'])" class="xl-toolbar__divider xl-toolbar__divider--inline" aria-hidden="true"></span>
      <button v-if="hasTool('task-list')" type="button" title="任务列表" :class="{ active: isActive('taskList') }" :disabled="readonly" @click="toggleTaskList">
        <i class="ri-list-check-3"></i>
      </button>
      <button v-if="hasTool('blockquote')" type="button" title="引用" :class="{ active: isActive('blockquote') }" :disabled="readonly" @click="toggleBlockquote">
        <i class="ri-double-quotes-l"></i>
      </button>
      <button v-if="hasTool('code-block')" type="button" title="代码块" :class="{ active: isActive('codeBlock') }" :disabled="readonly" @click="toggleCodeBlock">
        <i class="ri-code-box-line"></i>
      </button>
    </div>

    <span v-if="showBlockGroup && showOutlineGroup" class="xl-toolbar__divider"></span>

    <div v-if="showOutlineGroup" class="xl-toolbar__group">
      <button type="button" class="xl-toolbar__outline-button" title="显示/隐藏大纲" @click="$emit('toggle-outline')">
        <i class="ri-menu-search-line" :class="{ active: isOutlineVisible }"></i>
      </button>
    </div>

    <span v-if="showOutlineGroup && showAlignGroup" class="xl-toolbar__divider"></span>

    <div v-if="showAlignGroup" class="xl-toolbar__group">
      <button type="button" title="左对齐" :class="{ active: isTextAlign('left') }" :disabled="readonly" @click="setTextAlign('left')">
        <i class="ri-align-left"></i>
      </button>
      <button type="button" title="居中" :class="{ active: isTextAlign('center') }" :disabled="readonly" @click="setTextAlign('center')">
        <i class="ri-align-center"></i>
      </button>
      <button type="button" title="右对齐" :class="{ active: isTextAlign('right') }" :disabled="readonly" @click="setTextAlign('right')">
        <i class="ri-align-right"></i>
      </button>
      <button type="button" title="两端对齐" :class="{ active: isTextAlign('justify') }" :disabled="readonly" @click="setTextAlign('justify')">
        <i class="ri-align-justify"></i>
      </button>
    </div>

    <span v-if="showAlignGroup && showInsertGroup" class="xl-toolbar__divider"></span>

    <div v-if="showInsertGroup" class="xl-toolbar__group">
      <button v-if="hasTool('horizontal-rule')" type="button" title="水平分割线" :disabled="readonly" @click="insertHorizontalRule">
        <i class="ri-separator"></i>
      </button>
      <button v-if="hasTool('link')" type="button" title="链接" :disabled="readonly" @click="setLink">
        <i class="ri-link"></i>
      </button>
      <button v-if="hasTool('image')" type="button" title="图片" :disabled="readonly" @click="$emit('pick-image')">
        <i class="ri-image-add-line"></i>
      </button>
      <button v-if="hasTool('attachment')" type="button" title="附件" :disabled="readonly" @click="$emit('pick-file')">
        <i class="ri-attachment-line"></i>
      </button>

      <div v-if="hasTool('table')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger" title="表格" :disabled="readonly" @click="toggleMenu('table')">
          <i class="ri-table-2"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'table'" class="xl-toolbar__menu-dropdown x-scrollbar--native">
          <button type="button" @click="selectTableCommand('insert-table')">插入 3x3 表格</button>
          <button type="button" @click="selectTableCommand('add-row-before')">上方插入行</button>
          <button type="button" @click="selectTableCommand('add-row-after')">下方插入行</button>
          <button type="button" @click="selectTableCommand('delete-row')">删除行</button>
          <button type="button" @click="selectTableCommand('add-column-before')">左侧插入列</button>
          <button type="button" @click="selectTableCommand('add-column-after')">右侧插入列</button>
          <button type="button" @click="selectTableCommand('delete-column')">删除列</button>
          <button type="button" @click="selectTableCommand('merge-cells')">合并单元格</button>
          <button type="button" @click="selectTableCommand('split-cell')">拆分单元格</button>
          <button type="button" @click="selectTableCommand('toggle-header-row')">切换表头行</button>
          <button type="button" @click="selectTableCommand('toggle-header-column')">切换表头列</button>
          <button type="button" @click="selectTableCommand('delete-table')">删除表格</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS } from '../../types'

const props = withDefaults(
  defineProps<{
    editor?: Editor
    isOutlineVisible?: boolean
    canSave?: boolean
    readonly?: boolean
    toolbarButtons?: string[]
    toolbarTooltipPlacement?: 'top' | 'bottom'
    showOutline?: boolean
  }>(),
  {
    canSave: false,
    readonly: false,
    toolbarTooltipPlacement: 'bottom',
    showOutline: true
  }
)

const emit = defineEmits<{
  'pick-image': []
  'pick-file': []
  'toggle-outline': []
  'save-doc': []
  'import-markdown': []
}>()

const toolbarButtonSet = computed(() => new Set(props.toolbarButtons ?? RICH_TEXT_EDITOR_TOOLBAR_BUTTONS))
const textColorInput = ref<HTMLInputElement | null>(null)
const highlightColorInput = ref<HTMLInputElement | null>(null)
const toolbarRef = ref<HTMLElement | null>(null)

type ToolbarMenu = 'fontFamily' | 'fontSize' | 'textColor' | 'highlight' | 'heading' | 'table'

interface FormatSnapshot {
  bold: boolean
  italic: boolean
  underline: boolean
  strike: boolean
  code: boolean
  subscript: boolean
  superscript: boolean
  fontFamily: string
  fontSize: string
  textColor: string
  highlightColor: string
  heading: '' | '1' | '2' | '3'
  textAlign: '' | 'left' | 'center' | 'right' | 'justify'
  list: '' | 'ordered' | 'bullet' | 'task'
  blockquote: boolean
  sourceFrom: number
  sourceTo: number
}

const openMenu = ref<null | ToolbarMenu>(null)
const formatSnapshot = ref<FormatSnapshot | null>(null)
const isApplyingFormat = ref(false)
let applyFormatFrame = 0
const formatPainterCursorClass = 'xl-format-painter-cursor'
const readonly = computed(() => props.readonly)

const fontFamilyOptions = [
  { label: '默认字体', value: '', style: {} },
  { label: 'Inter', value: 'Inter', style: { fontFamily: 'Inter, sans-serif' } },
  { label: 'Arial', value: 'Arial', style: { fontFamily: 'Arial, sans-serif' } },
  { label: 'Georgia', value: 'Georgia', style: { fontFamily: 'Georgia, serif' } },
  { label: 'Times New Roman', value: 'Times New Roman', style: { fontFamily: '"Times New Roman", serif' } },
  { label: 'Microsoft YaHei', value: 'Microsoft YaHei', style: { fontFamily: '"Microsoft YaHei", sans-serif' } },
  { label: 'PingFang SC', value: 'PingFang SC', style: { fontFamily: '"PingFang SC", sans-serif' } }
] as const

const fontSizeOptions = [
  { label: '默认字号', value: '', style: {} },
  { label: '12', value: '12px', style: { fontSize: '12px' } },
  { label: '14', value: '14px', style: { fontSize: '14px' } },
  { label: '16', value: '16px', style: { fontSize: '16px' } },
  { label: '18', value: '18px', style: { fontSize: '18px' } },
  { label: '24', value: '24px', style: { fontSize: '24px' } },
  { label: '32', value: '32px', style: { fontSize: '32px' } }
] as const

const headingOptions = [
  { label: '正文', value: 'paragraph', style: { fontSize: '14px', fontWeight: '400', lineHeight: '1.5' } },
  { label: '一级标题', value: '1', style: { fontSize: '22px', fontWeight: '700', lineHeight: '1.25' } },
  { label: '二级标题', value: '2', style: { fontSize: '18px', fontWeight: '700', lineHeight: '1.3' } },
  { label: '三级标题', value: '3', style: { fontSize: '16px', fontWeight: '700', lineHeight: '1.35' } }
] as const

const textColorPresets = [
  { label: '黑色', value: '#000000' },
  { label: '深灰', value: '#374151' },
  { label: '灰色', value: '#6b7280' },
  { label: '白色', value: '#ffffff' },
  { label: '红色', value: '#ef4444' },
  { label: '橙色', value: '#f97316' },
  { label: '黄色', value: '#eab308' },
  { label: '绿色', value: '#22c55e' },
  { label: '青色', value: '#06b6d4' },
  { label: '蓝色', value: '#3b82f6' },
  { label: '紫色', value: '#8b5cf6' },
  { label: '粉色', value: '#ec4899' }
] as const

const highlightColorPresets = [
  { label: '浅黄', value: '#fef3c7' },
  { label: '浅橙', value: '#ffedd5' },
  { label: '浅红', value: '#fee2e2' },
  { label: '浅粉', value: '#fce7f3' },
  { label: '浅紫', value: '#ede9fe' },
  { label: '浅蓝', value: '#dbeafe' },
  { label: '浅青', value: '#cffafe' },
  { label: '浅绿', value: '#dcfce7' },
  { label: '浅灰', value: '#f3f4f6' },
  { label: '亮黄', value: '#fde047' },
  { label: '亮绿', value: '#86efac' },
  { label: '亮蓝', value: '#93c5fd' }
] as const

const canUndo = computed(() => !readonly.value && (props.editor?.can().chain().focus().undo().run() ?? false))
const canRedo = computed(() => !readonly.value && (props.editor?.can().chain().focus().redo().run() ?? false))
const showSaveGroup = computed(() => hasAnyTools(['save', 'import-markdown']))
const showHistoryGroup = computed(() => hasAnyTools(['undo', 'redo']))
const showInlineGroup = computed(() => hasAnyTools(['bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript', 'clear-formatting', 'format-painter']))
const showFontGroup = computed(() => hasAnyTools(['font-family', 'font-size', 'text-color', 'highlight']))
const showBlockGroup = computed(() => hasAnyTools(['heading', 'bullet-list', 'ordered-list', 'task-list', 'blockquote', 'code-block']))
const showOutlineGroup = computed(() => props.showOutline && hasTool('outline'))
const showAlignGroup = computed(() => hasTool('align'))
const showInsertGroup = computed(() => hasAnyTools(['horizontal-rule', 'link', 'image', 'attachment', 'table']))
const currentFontFamily = computed(() => String(props.editor?.getAttributes('textStyle').fontFamily || ''))
const currentFontSize = computed(() => String(props.editor?.getAttributes('textStyle').fontSize || ''))
const currentTextColor = computed(() => normalizeColor(String(props.editor?.getAttributes('textStyle').color || '')))
const currentHighlightColor = computed(() => normalizeColor(String(props.editor?.getAttributes('highlight').color || '')))
const currentHeading = computed(() => {
  if (!props.editor?.isActive('heading')) {
    return 'paragraph'
  }

  return String(props.editor.getAttributes('heading').level || 'paragraph')
})

function hasTool(name: string) {
  return toolbarButtonSet.value.has(name)
}

function hasAnyTools(names: string[]) {
  return names.some((name) => hasTool(name))
}

function run(command: () => void) {
  if (readonly.value) {
    return
  }
  command()
}

function isActive(name: string, attrs?: Record<string, unknown>) {
  return props.editor?.isActive(name, attrs) ?? false
}

function isTextAlign(align: 'left' | 'center' | 'right' | 'justify') {
  if (!props.editor) {
    return false
  }

  const paragraphAlign = props.editor.isActive('paragraph') && props.editor.getAttributes('paragraph').textAlign === align
  const headingAlign = props.editor.isActive('heading') && props.editor.getAttributes('heading').textAlign === align
  return paragraphAlign || headingAlign
}

function handleSaveClick() {
  emit('save-doc')
}

function handleImportMarkdownClick() {
  emit('import-markdown')
}

function toggleBold() {
  run(() => props.editor?.chain().focus().toggleBold().run())
}

function toggleItalic() {
  run(() => props.editor?.chain().focus().toggleItalic().run())
}

function toggleUnderline() {
  run(() => props.editor?.chain().focus().toggleUnderline().run())
}

function toggleStrike() {
  run(() => props.editor?.chain().focus().toggleStrike().run())
}

function toggleCode() {
  run(() => props.editor?.chain().focus().toggleCode().run())
}

function toggleSubscript() {
  run(() => props.editor?.chain().focus().toggleSubscript().run())
}

function toggleSuperscript() {
  run(() => props.editor?.chain().focus().toggleSuperscript().run())
}

function clearFormatting() {
  run(() => props.editor?.chain().focus().unsetAllMarks().clearNodes().run())
}

function setFontFamily(font: string) {
  run(() => {
    if (!font) {
      props.editor?.chain().focus().unsetFontFamily().run()
      return
    }
    props.editor?.chain().focus().setFontFamily(font).run()
  })
}

function setFontSize(size: string) {
  run(() => {
    if (!size) {
      props.editor?.chain().focus().unsetFontSize().run()
      return
    }
    props.editor?.chain().focus().setFontSize(size).run()
  })
}

function toggleMenu(name: ToolbarMenu) {
  if (readonly.value) {
    return
  }
  openMenu.value = openMenu.value === name ? null : name
}

function handleDocumentPointerDown(event: PointerEvent) {
  if (!openMenu.value) {
    return
  }

  const target = event.target
  if (target instanceof Node && toolbarRef.value?.contains(target)) {
    return
  }

  openMenu.value = null
}

watch(openMenu, (value) => {
  if (typeof document === 'undefined') {
    return
  }

  if (value) {
    document.addEventListener('pointerdown', handleDocumentPointerDown)
    return
  }

  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})

watch(readonly, (value) => {
  if (value) {
    setFormatSnapshot(null)
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('pointerdown', handleDocumentPointerDown)
  }

  cancelApplyFormatFrame()
  setFormatPainterCursor(false)
})

watch(
  () => props.editor,
  (editor, _previousEditor, onCleanup) => {
    if (!editor) {
      return
    }

    const editorDom = editor.view.dom
    const scheduleApply = () => scheduleFormatPainterApply(editor)

    editorDom.addEventListener('mouseup', scheduleApply)
    editorDom.addEventListener('keyup', scheduleApply)
    setFormatPainterCursor(formatSnapshot.value !== null)
    onCleanup(() => {
      editorDom.removeEventListener('mouseup', scheduleApply)
      editorDom.removeEventListener('keyup', scheduleApply)
      editorDom.classList.remove(formatPainterCursorClass)
      cancelApplyFormatFrame()
    })
  },
  { immediate: true }
)

function setFormatPainterCursor(active: boolean) {
  props.editor?.view.dom.classList.toggle(formatPainterCursorClass, active)

  if (typeof document !== 'undefined') {
    document.body.classList.toggle(formatPainterCursorClass, active)
  }
}

function setFormatSnapshot(snapshot: FormatSnapshot | null) {
  formatSnapshot.value = snapshot
  setFormatPainterCursor(snapshot !== null)
}

function cancelApplyFormatFrame() {
  if (!applyFormatFrame || typeof cancelAnimationFrame === 'undefined') {
    applyFormatFrame = 0
    return
  }

  cancelAnimationFrame(applyFormatFrame)
  applyFormatFrame = 0
}

function scheduleFormatPainterApply(editor: Editor) {
  if (!formatSnapshot.value || readonly.value || typeof requestAnimationFrame === 'undefined') {
    applyFormatPainterOnSelection(editor)
    return
  }

  cancelApplyFormatFrame()
  applyFormatFrame = requestAnimationFrame(() => {
    applyFormatFrame = 0
    applyFormatPainterOnSelection(editor)
  })
}

function selectFontFamily(font: string) {
  setFontFamily(font)
  openMenu.value = null
}

function selectFontSize(size: string) {
  setFontSize(size)
  openMenu.value = null
}

function selectHeading(value: 'paragraph' | '1' | '2' | '3') {
  if (value === 'paragraph') {
    setParagraph()
  } else if (value === '1' || value === '2' || value === '3') {
    setHeading(Number(value) as 1 | 2 | 3)
  }
  openMenu.value = null
}

function closeOpenMenu() {
  openMenu.value = null
}

function setTextColor(event: Event) {
  const target = event.target as HTMLInputElement
  selectTextColor(target.value)
}

function setHighlight(event: Event) {
  const target = event.target as HTMLInputElement
  selectHighlightColor(target.value)
}

function normalizeColor(color: string) {
  return color.trim().toLowerCase()
}

function selectTextColor(color: string) {
  closeOpenMenu()
  run(() => {
    if (!color) {
      props.editor?.chain().focus().unsetColor().run()
      return
    }

    props.editor?.chain().focus().setColor(color).run()
  })
}

function selectHighlightColor(color: string) {
  closeOpenMenu()
  run(() => {
    if (!color) {
      props.editor?.chain().focus().unsetHighlight().run()
      return
    }

    props.editor?.chain().focus().setHighlight({ color }).run()
  })
}

function captureFormatSnapshot(): FormatSnapshot | null {
  const editor = props.editor
  if (!editor) {
    return null
  }

  const selection = editor.state.selection
  const textStyle = editor.getAttributes('textStyle')
  const highlight = editor.getAttributes('highlight')
  const paragraphAlign = editor.isActive('paragraph') ? String(editor.getAttributes('paragraph').textAlign || '') : ''
  const headingAlign = editor.isActive('heading') ? String(editor.getAttributes('heading').textAlign || '') : ''
  const headingLevel = editor.isActive('heading') ? String(editor.getAttributes('heading').level || '') : ''
  const list = getActiveList(editor)

  return {
    bold: editor.isActive('bold'),
    italic: editor.isActive('italic'),
    underline: editor.isActive('underline'),
    strike: editor.isActive('strike'),
    code: editor.isActive('code'),
    subscript: editor.isActive('subscript'),
    superscript: editor.isActive('superscript'),
    fontFamily: String(textStyle.fontFamily || ''),
    fontSize: String(textStyle.fontSize || ''),
    textColor: String(textStyle.color || ''),
    highlightColor: String(highlight.color || ''),
    heading: headingLevel === '1' || headingLevel === '2' || headingLevel === '3' ? headingLevel : '',
    textAlign: isKnownTextAlign(headingAlign) ? headingAlign : isKnownTextAlign(paragraphAlign) ? paragraphAlign : '',
    list,
    blockquote: editor.isActive('blockquote'),
    sourceFrom: selection.from,
    sourceTo: selection.to
  }
}

function getActiveList(editor: Editor): FormatSnapshot['list'] {
  if (editor.isActive('orderedList')) {
    return 'ordered'
  }
  if (editor.isActive('bulletList')) {
    return 'bullet'
  }
  if (editor.isActive('taskList')) {
    return 'task'
  }

  return ''
}

function isKnownTextAlign(value: string): value is FormatSnapshot['textAlign'] {
  return value === '' || value === 'left' || value === 'center' || value === 'right' || value === 'justify'
}

function toggleFormatPainter() {
  if (readonly.value) {
    return
  }

  if (formatSnapshot.value) {
    setFormatSnapshot(null)
    return
  }

  setFormatSnapshot(captureFormatSnapshot())
  openMenu.value = null
}

function applyFormatPainterOnSelection(editor: Editor) {
  const snapshot = formatSnapshot.value
  const selection = editor.state.selection

  if (!snapshot || isApplyingFormat.value || selection.empty) {
    return
  }

  if (selection.from === snapshot.sourceFrom && selection.to === snapshot.sourceTo) {
    return
  }

  try {
    isApplyingFormat.value = true
    applyFormatSnapshot(editor, snapshot)
    setFormatSnapshot(null)
  } finally {
    isApplyingFormat.value = false
  }
}

function applyFormatSnapshot(editor: Editor, snapshot: FormatSnapshot) {
  const targetList = getActiveList(editor)
  let blockChain = editor.chain().focus()

  if (snapshot.list && targetList !== snapshot.list) {
    blockChain = blockChain.setParagraph()

    if (snapshot.list === 'ordered') {
      blockChain = blockChain.toggleOrderedList()
    } else if (snapshot.list === 'bullet') {
      blockChain = blockChain.toggleBulletList()
    } else if (snapshot.list === 'task') {
      blockChain = blockChain.toggleTaskList()
    }
  } else if (!targetList) {
    if (snapshot.heading) {
      blockChain = blockChain.setNode('heading', { level: Number(snapshot.heading) as 1 | 2 | 3 })
    } else {
      blockChain = blockChain.setParagraph()
    }
  }

  if (snapshot.blockquote && !editor.isActive('blockquote')) {
    blockChain = blockChain.toggleBlockquote()
  }
  if (snapshot.textAlign) {
    blockChain = blockChain.setTextAlign(snapshot.textAlign)
  }

  blockChain.run()

  let inlineChain = editor.chain().focus().unsetAllMarks()

  if (snapshot.bold) {
    inlineChain = inlineChain.toggleBold()
  }
  if (snapshot.italic) {
    inlineChain = inlineChain.toggleItalic()
  }
  if (snapshot.underline) {
    inlineChain = inlineChain.toggleUnderline()
  }
  if (snapshot.strike) {
    inlineChain = inlineChain.toggleStrike()
  }
  if (snapshot.code) {
    inlineChain = inlineChain.toggleCode()
  }
  if (snapshot.subscript) {
    inlineChain = inlineChain.toggleSubscript()
  }
  if (snapshot.superscript) {
    inlineChain = inlineChain.toggleSuperscript()
  }
  if (snapshot.fontFamily) {
    inlineChain = inlineChain.setFontFamily(snapshot.fontFamily)
  }
  if (snapshot.fontSize) {
    inlineChain = inlineChain.setFontSize(snapshot.fontSize)
  }
  if (snapshot.textColor) {
    inlineChain = inlineChain.setColor(snapshot.textColor)
  }
  if (snapshot.highlightColor) {
    inlineChain = inlineChain.setHighlight({ color: snapshot.highlightColor })
  }

  inlineChain.run()
}

function setHeading(level: 1 | 2 | 3) {
  run(() => props.editor?.chain().focus().toggleHeading({ level }).run())
}

function setParagraph() {
  run(() => props.editor?.chain().focus().setParagraph().run())
}

function toggleBulletList() {
  run(() => props.editor?.chain().focus().toggleBulletList().run())
}

function toggleOrderedList() {
  run(() => props.editor?.chain().focus().toggleOrderedList().run())
}

function toggleTaskList() {
  run(() => props.editor?.chain().focus().toggleTaskList().run())
}

function toggleBlockquote() {
  run(() => props.editor?.chain().focus().toggleBlockquote().run())
}

function setTextAlign(align: 'left' | 'center' | 'right' | 'justify') {
  run(() => props.editor?.chain().focus().setTextAlign(align).run())
}

function undo() {
  run(() => props.editor?.chain().focus().undo().run())
}

function redo() {
  run(() => props.editor?.chain().focus().redo().run())
}

function insertHorizontalRule() {
  run(() => props.editor?.chain().focus().setHorizontalRule().run())
}

function toggleCodeBlock() {
  run(() => props.editor?.chain().focus().toggleCodeBlock().run())
}

function setLink() {
  if (readonly.value) {
    return
  }

  const previous = props.editor?.getAttributes('link').href ?? ''
  const href = window.prompt('请输入链接地址', previous)
  if (href === null) {
    return
  }

  if (href === '') {
    props.editor?.chain().focus().unsetLink().run()
    return
  }

  props.editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
}

function selectTableCommand(command: string) {
  handleTableCommand(command)
  openMenu.value = null
}

function handleTableCommand(command: string) {
  if (readonly.value) {
    return
  }

  const chain = props.editor?.chain().focus()
  if (!chain) {
    return
  }

  switch (command) {
    case 'insert-table':
      chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      break
    case 'add-row-before':
      chain.addRowBefore().run()
      break
    case 'add-row-after':
      chain.addRowAfter().run()
      break
    case 'delete-row':
      chain.deleteRow().run()
      break
    case 'add-column-before':
      chain.addColumnBefore().run()
      break
    case 'add-column-after':
      chain.addColumnAfter().run()
      break
    case 'delete-column':
      chain.deleteColumn().run()
      break
    case 'merge-cells':
      chain.mergeCells().run()
      break
    case 'split-cell':
      chain.splitCell().run()
      break
    case 'toggle-header-row':
      chain.toggleHeaderRow().run()
      break
    case 'toggle-header-column':
      chain.toggleHeaderColumn().run()
      break
    case 'delete-table':
      chain.deleteTable().run()
      break
  }
}
</script>
