import type { ComputedRef } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import type { UploadResult } from '../custom/types'
import { useEditorCommands } from './useEditorCommands'

export interface UploadHandlers {
  uploadImage: (file: File) => Promise<UploadResult>
  uploadFile: (file: File) => Promise<UploadResult>
}

export function useEditorUpload(editor: ComputedRef<Editor | undefined>, handlers: UploadHandlers) {
  const commands = useEditorCommands(editor)

  async function uploadImageFile(file: File) {
    const result = await handlers.uploadImage(file)
    commands.insertImage(result.fileKey)
    return result
  }

  async function uploadAttachmentFile(file: File) {
    const result = await handlers.uploadFile(file)
    commands.insertAttachment(result)
    return result
  }

  return {
    uploadImageFile,
    uploadAttachmentFile
  }
}
