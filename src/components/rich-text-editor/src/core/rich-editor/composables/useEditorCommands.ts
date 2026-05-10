import type { ComputedRef } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { resolveFileUrl } from '../custom/utils/fileResolver'
import type { UploadResult } from '../custom/types'

export function useEditorCommands(editor: ComputedRef<Editor | undefined>) {
  function insertImage(fileKey: string) {
    editor.value?.chain().focus().insertContent({
      type: 'image',
      attrs: {
        src: resolveFileUrl(fileKey),
        fileKey,
        alt: ''
      }
    }).run()
  }

  function insertAttachment(file: UploadResult) {
    editor.value?.chain().focus().insertContent({
      type: 'attachment',
      attrs: {
        fileKey: file.fileKey,
        fileName: file.fileName,
        size: file.size,
        mimeType: file.mimeType
      }
    }).run()
  }

  return {
    insertImage,
    insertAttachment
  }
}

