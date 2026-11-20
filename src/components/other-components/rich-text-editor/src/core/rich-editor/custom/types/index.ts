import type { JSONContent } from '@tiptap/core'

export interface UploadResult {
  fileKey: string
  fileName: string
  size: number
  mimeType: string
}

export interface RichEditorExpose {
  /** 获取当前 Tiptap 实例，以便集成选区与事务命令。 */
  getEditor: () => import('@tiptap/core').Editor | null
  replaceRanges: (changes: { from: number; to: number; blocks: JSONContent[] }[]) => { from: number; to: number }[] | null
  replaceRange: (from: number, to: number, blocks: JSONContent[]) => { from: number; to: number } | null
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
  contentBackgroundColor?: string
  uploadImage?: (file: File) => Promise<UploadResult>
  uploadFile?: (file: File) => Promise<UploadResult>
}
