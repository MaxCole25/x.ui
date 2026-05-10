import type { JSONContent } from '@tiptap/core'

export interface UploadResult {
  fileKey: string
  fileName: string
  size: number
  mimeType: string
}

export interface RichEditorExpose {
  getJson: () => JSONContent | null
  getHtml: () => string
  setContent: (content: JSONContent | string | null | undefined) => void
  insertImage: (fileKey: string) => void
  insertAttachment: (file: UploadResult) => void
  locateKeyword: (keyword: string) => boolean
}

export interface RichEditorProps {
  modelValue?: JSONContent | string | null
  readonly?: boolean
  minHeight?: number | string
  canSave?: boolean
  toolbarButtons?: string[]
  contentBackground?: string
  uploadImage?: (file: File) => Promise<UploadResult>
  uploadFile?: (file: File) => Promise<UploadResult>
}
