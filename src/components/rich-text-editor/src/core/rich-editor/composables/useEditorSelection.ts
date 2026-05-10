import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { Editor } from '@tiptap/vue-3'

export function useEditorSelection(editor: ComputedRef<Editor | undefined>) {
  const isEditable = computed(() => editor.value?.isEditable ?? false)
  const isBold = computed(() => editor.value?.isActive('bold') ?? false)
  const isItalic = computed(() => editor.value?.isActive('italic') ?? false)
  const isUnderline = computed(() => editor.value?.isActive('underline') ?? false)
  const isStrike = computed(() => editor.value?.isActive('strike') ?? false)
  const isBulletList = computed(() => editor.value?.isActive('bulletList') ?? false)
  const isOrderedList = computed(() => editor.value?.isActive('orderedList') ?? false)
  const isTaskList = computed(() => editor.value?.isActive('taskList') ?? false)
  const isBlockquote = computed(() => editor.value?.isActive('blockquote') ?? false)
  const isCode = computed(() => editor.value?.isActive('code') ?? false)
  const isCodeBlock = computed(() => editor.value?.isActive('codeBlock') ?? false)
  const isSubscript = computed(() => editor.value?.isActive('subscript') ?? false)
  const isSuperscript = computed(() => editor.value?.isActive('superscript') ?? false)
  const codeBlockLanguage = computed(() => editor.value?.getAttributes('codeBlock').language ?? '')
  const isCodeBlockCollapsed = computed(() => editor.value?.getAttributes('codeBlock').collapsed === true)
  const isHeading1 = computed(() => editor.value?.isActive('heading', { level: 1 }) ?? false)
  const isHeading2 = computed(() => editor.value?.isActive('heading', { level: 2 }) ?? false)
  const isHeading3 = computed(() => editor.value?.isActive('heading', { level: 3 }) ?? false)

  return {
    isEditable,
    isBold,
    isItalic,
    isUnderline,
    isStrike,
    isBulletList,
    isOrderedList,
    isTaskList,
    isBlockquote,
    isCode,
    isCodeBlock,
    isSubscript,
    isSuperscript,
    codeBlockLanguage,
    isCodeBlockCollapsed,
    isHeading1,
    isHeading2,
    isHeading3
  }
}
