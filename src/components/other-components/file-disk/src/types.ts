export type FileDiskItemType = 'file' | 'folder'
export type FileDiskViewMode = 'list' | 'grid'
export type FileDiskGridIconSize = 'small' | 'large'
export type FileDiskToolbarAction = 'refresh' | 'createFolder' | 'upload' | 'download' | 'copy' | 'cut' | 'paste' | 'delete' | 'list' | 'grid'
export type FileDiskPermission = 'read' | 'write' | 'delete' | 'view'
export type FileDiskClipboardAction = 'copy' | 'cut'
export type FileDiskUploadStatus = 'uploading' | 'success' | 'error'
export type FileDiskFileUrlUsage = 'thumbnail' | 'preview' | 'download'

export interface FileDiskColors {
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
  headerBackgroundColor?: string
  toolbarBackgroundColor?: string
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  iconColor?: string
  activeIconColor?: string
  emptyBackgroundColor?: string
  dragOverBackgroundColor?: string
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
  fontSize?: number
  modelValue?: string
  entries?: FileDiskItem[]
  adapter?: FileDiskAdapter
  permissions?: Partial<Record<FileDiskPermission, boolean>>
  viewMode?: FileDiskViewMode
  /** 网格图标尺寸，可通过右键菜单切换。 */
  gridIconSize?: FileDiskGridIconSize
  /** 网格文件名最大显示行数。 */
  gridFileNameLines?: number
  /** 网格是否显示文件大小，不影响列表视图。 */
  showGridFileSize?: boolean
  /** 网格是否显示文件类型，不影响列表视图。 */
  showGridFileType?: boolean
  title?: string
  loading?: boolean
  colors?: FileDiskColors
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
  headerBackgroundColor?: string
  toolbarBackgroundColor?: string
  itemBackgroundColor?: string
  itemHoverBackgroundColor?: string
  itemActiveBackgroundColor?: string
  itemActiveTextColor?: string
  iconColor?: string
  activeIconColor?: string
  emptyBackgroundColor?: string
  dragOverBackgroundColor?: string
  emptyText?: string
  multiple?: boolean
  accept?: string
  disabled?: boolean
  showHeader?: boolean
  showTitle?: boolean
  showToolbar?: boolean
  /** 隐藏指定顶部工具栏操作，不影响右键菜单和操作权限。 */
  hiddenToolbarActions?: FileDiskToolbarAction[]
  showPath?: boolean
  /** 最小化显示：仅展示文件内容区，隐藏标题、工具栏和路径栏。 */
  enableMinimize?: boolean
  promptFolderName?: (path: string) => string | null | Promise<string | null>
}
