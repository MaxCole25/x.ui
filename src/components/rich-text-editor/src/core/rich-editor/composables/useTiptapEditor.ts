import { useEditor, type EditorOptions } from '@tiptap/vue-3'
import { createRichEditorExtensions } from '../extensions/starter'
import type { JSONContent } from '@tiptap/core'

export interface UseRichEditorOptions {
  content?: JSONContent | string | null
  readonly?: boolean
  onUpdate?: EditorOptions['onUpdate']
  onSelectionUpdate?: EditorOptions['onSelectionUpdate']
  onPasteImages?: (files: File[]) => void
}

export function useTiptapEditor(options: UseRichEditorOptions) {
  return useEditor({
    content: options.content ?? {
      type: 'doc',
      content: [
        {
          type: 'paragraph'
        }
      ]
    },
    editable: !options.readonly,
    editorProps: {
      handlePaste(_view, event) {
        if (options.readonly) {
          return false
        }

        const files = Array.from(event.clipboardData?.files ?? [])
        const imageFiles = files.filter((file) => file.type.startsWith('image/'))
        if (!imageFiles.length) {
          return false
        }

        options.onPasteImages?.(imageFiles)
        return true
      }
    },
    extensions: createRichEditorExtensions(),
    onUpdate: options.onUpdate,
    onSelectionUpdate: options.onSelectionUpdate
  })
}
