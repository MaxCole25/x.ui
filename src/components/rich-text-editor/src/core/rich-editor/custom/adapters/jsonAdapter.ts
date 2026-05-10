import type { Editor } from '@tiptap/vue-3'
import type { JSONContent } from '@tiptap/core'

export function toJson(editor: Editor | undefined): JSONContent | null {
  return editor?.getJSON() ?? null
}
