export type FileDiskItemType = 'file' | 'folder'
export type FileDiskViewMode = 'list' | 'grid'
export type FileDiskPermission = 'read' | 'write' | 'delete' | 'view'
export type FileDiskClipboardAction = 'copy' | 'cut'
export type FileDiskUploadStatus = 'uploading' | 'success' | 'error'
export type FileDiskFileUrlUsage = 'thumbnail' | 'preview' | 'download'

export interface FileDiskColors {
  primary?: string
  primarySoft?: string
  primaryWeak?: string
  background?: string
  toolbarBackground?: string
  pathBackground?: string
  panelBackground?: string
  text?: string
  mutedText?: string
  subtleText?: string
  border?: string
  softBorder?: string
  hoverBackground?: string
  selectedBackground?: string
  selectedBorder?: string
  disabledText?: string
  thumbBackground?: string
  selectionBackground?: string
  selectionBorder?: string
  dropBackground?: string
  success?: string
  danger?: string
  previewBackground?: string
  previewText?: string
  previewControlBackground?: string
  previewControlBorder?: string
  previewControlHoverBackground?: string
  shadow?: string
}

export interface FileDiskItem {
  id: string | number
  name: string
  type: FileDiskItemType
  size?: number
  extension?: string
  mimeType?: string
  url?: string
  thumbnailUrl?: string
  previewUrl?: string
  updatedAt?: string
  createdAt?: string
  path?: string
  readonly?: boolean
  disabled?: boolean
  meta?: Record<string, unknown>
}

export interface FileDiskDownloadOptions {
  archive: boolean
  filename?: string
}

export interface FileDiskUploadProgress {
  file: File
  percent: number
}

export interface FileDiskUploadContext {
  onProgress: (progress: FileDiskUploadProgress) => void
}

export interface FileDiskTransferPayload {
  sourcePath: string
  targetPath: string
  items: FileDiskItem[]
}

export interface FileDiskAdapter {
  list?: (path: string) => FileDiskItem[] | Promise<FileDiskItem[]>
  getFileUrl?: (path: string, item: FileDiskItem, usage: FileDiskFileUrlUsage) => string | Promise<string>
  createFolder?: (path: string, name: string) => FileDiskItem | void | Promise<FileDiskItem | void>
  upload?: (path: string, files: File[], context: FileDiskUploadContext) => FileDiskItem[] | void | Promise<FileDiskItem[] | void>
  download?: (path: string, items: FileDiskItem[], options: FileDiskDownloadOptions) => void | Promise<void>
  remove?: (path: string, items: FileDiskItem[]) => void | Promise<void>
  rename?: (path: string, item: FileDiskItem, name: string) => FileDiskItem | void | Promise<FileDiskItem | void>
  copy?: (payload: FileDiskTransferPayload) => FileDiskItem[] | void | Promise<FileDiskItem[] | void>
  move?: (payload: FileDiskTransferPayload) => FileDiskItem[] | void | Promise<FileDiskItem[] | void>
}

export interface FileDiskCreateFolderPayload {
  path: string
  name: string
}

export interface FileDiskUploadPayload {
  path: string
  files: File[]
}

export interface FileDiskDownloadPayload {
  path: string
  items: FileDiskItem[]
  archive: boolean
}

export interface FileDiskRenamePayload {
  path: string
  item: FileDiskItem
  name: string
}

export interface FileDiskClipboardPayload {
  action: FileDiskClipboardAction
  sourcePath: string
  targetPath?: string
  items: FileDiskItem[]
}

export interface FileDiskProps {
  modelValue?: string
  entries?: FileDiskItem[]
  adapter?: FileDiskAdapter
  permissions?: Partial<Record<FileDiskPermission, boolean>>
  viewMode?: FileDiskViewMode
  title?: string
  loading?: boolean
  colors?: FileDiskColors
  emptyText?: string
  multiple?: boolean
  accept?: string
  disabled?: boolean
  showHeader?: boolean
  showTitle?: boolean
  showToolbar?: boolean
  showPath?: boolean
  promptFolderName?: (path: string) => string | null | Promise<string | null>
}
