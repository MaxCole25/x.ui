import type { Editor } from '@tiptap/vue-3'

export function toHtml(editor: Editor | undefined): string {
  return editor?.getHTML() ?? ''
}
