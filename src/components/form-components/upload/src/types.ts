import type { XSize } from '../../../_utils/size'

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
export type UploadListType = 'text' | 'card'

export interface UploadFile {
  uid: string
  name: string
  size: number
  status: UploadStatus
  percentage: number
  raw?: File
  response?: unknown
  error?: unknown
}

export interface UploadProgressHandler {
  (percentage: number): void
}

export interface UploadProps {
  modelValue?: UploadFile[]
  accept?: string
  multiple?: boolean
  disabled?: boolean
  drag?: boolean
  autoUpload?: boolean
  limit?: number
  maxSize?: number
  buttonText?: string
  tip?: string
  listType?: UploadListType
  size?: XSize
  requestMethod?: (file: File, onProgress: UploadProgressHandler) => Promise<unknown>
}
