<template>
  <div class="xl-toolbar">
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
      <span v-if="hasAnyTools(['code', 'subscript', 'superscript', 'clear-formatting'])" class="xl-toolbar__divider xl-toolbar__divider--inline" aria-hidden="true"></span>
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
    </div>

    <span v-if="showInlineGroup && showFontGroup" class="xl-toolbar__divider"></span>

    <div v-if="showFontGroup" class="xl-toolbar__group">
      <div v-if="hasTool('font-family')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger" title="字体" :disabled="readonly" @click="toggleMenu('fontFamily')">
          <i class="ri-font-family"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'fontFamily'" class="xl-toolbar__menu-dropdown">
          <button type="button" @click="selectFontFamily('')">默认字体</button>
          <button type="button" @click="selectFontFamily('Inter')">Inter</button>
          <button type="button" @click="selectFontFamily('Arial')">Arial</button>
          <button type="button" @click="selectFontFamily('Georgia')">Georgia</button>
          <button type="button" @click="selectFontFamily('Times New Roman')">Times New Roman</button>
          <button type="button" @click="selectFontFamily('Microsoft YaHei')">Microsoft YaHei</button>
          <button type="button" @click="selectFontFamily('PingFang SC')">PingFang SC</button>
        </div>
      </div>

      <div v-if="hasTool('font-size')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger" title="字号" :disabled="readonly" @click="toggleMenu('fontSize')">
          <i class="ri-font-size"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'fontSize'" class="xl-toolbar__menu-dropdown">
          <button type="button" @click="selectFontSize('')">默认字号</button>
          <button type="button" @click="selectFontSize('12px')">12</button>
          <button type="button" @click="selectFontSize('14px')">14</button>
          <button type="button" @click="selectFontSize('16px')">16</button>
          <button type="button" @click="selectFontSize('18px')">18</button>
          <button type="button" @click="selectFontSize('24px')">24</button>
          <button type="button" @click="selectFontSize('32px')">32</button>
        </div>
      </div>

      <button v-if="hasTool('text-color')" type="button" title="文字颜色" :disabled="readonly" @click="openTextColorPicker">
        <i class="ri-palette-line"></i>
      </button>

      <button v-if="hasTool('highlight')" type="button" title="高亮颜色" :disabled="readonly" @click="openHighlightColorPicker">
        <i class="ri-mark-pen-line"></i>
      </button>

      <input ref="textColorInput" type="color" class="xl-toolbar__color-input" @input="setTextColor" />
      <input ref="highlightColorInput" type="color" class="xl-toolbar__color-input" @input="setHighlight" />
    </div>

    <span v-if="showFontGroup && showBlockGroup" class="xl-toolbar__divider"></span>

    <div v-if="showBlockGroup" class="xl-toolbar__group">
      <div v-if="hasTool('heading')" class="xl-toolbar__menu">
        <button type="button" class="xl-toolbar__menu-trigger" title="标题" :disabled="readonly" @click="toggleMenu('heading')">
          <i class="ri-heading"></i>
          <i class="xl-toolbar__menu-caret ri-arrow-down-s-line"></i>
        </button>
        <div v-if="openMenu === 'heading'" class="xl-toolbar__menu-dropdown">
          <button type="button" @click="selectHeading('paragraph')">正文</button>
          <button type="button" @click="selectHeading('1')">一级标题</button>
          <button type="button" @click="selectHeading('2')">二级标题</button>
          <button type="button" @click="selectHeading('3')">三级标题</button>
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
        <div v-if="openMenu === 'table'" class="xl-toolbar__menu-dropdown">
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
import { computed, ref } from 'vue'
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
const openMenu = ref<null | 'fontFamily' | 'fontSize' | 'heading' | 'table'>(null)
const readonly = computed(() => props.readonly)

const canUndo = computed(() => !readonly.value && (props.editor?.can().chain().focus().undo().run() ?? false))
const canRedo = computed(() => !readonly.value && (props.editor?.can().chain().focus().redo().run() ?? false))
const showSaveGroup = computed(() => hasAnyTools(['save', 'import-markdown']))
const showHistoryGroup = computed(() => hasAnyTools(['undo', 'redo']))
const showInlineGroup = computed(() => hasAnyTools(['bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript', 'clear-formatting']))
const showFontGroup = computed(() => hasAnyTools(['font-family', 'font-size', 'text-color', 'highlight']))
const showBlockGroup = computed(() => hasAnyTools(['heading', 'bullet-list', 'ordered-list', 'task-list', 'blockquote', 'code-block']))
const showOutlineGroup = computed(() => props.showOutline && hasTool('outline'))
const showAlignGroup = computed(() => hasTool('align'))
const showInsertGroup = computed(() => hasAnyTools(['horizontal-rule', 'link', 'image', 'attachment', 'table']))

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

function toggleMenu(name: 'fontFamily' | 'fontSize' | 'heading' | 'table') {
  if (readonly.value) {
    return
  }
  openMenu.value = openMenu.value === name ? null : name
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

function openTextColorPicker() {
  if (!readonly.value) {
    textColorInput.value?.click()
  }
}

function openHighlightColorPicker() {
  if (!readonly.value) {
    highlightColorInput.value?.click()
  }
}

function setTextColor(event: Event) {
  const target = event.target as HTMLInputElement
  run(() => props.editor?.chain().focus().setColor(target.value).run())
}

function setHighlight(event: Event) {
  const target = event.target as HTMLInputElement
  run(() => props.editor?.chain().focus().setHighlight({ color: target.value }).run())
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
