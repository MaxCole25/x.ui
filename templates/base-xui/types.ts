import type { Ref } from 'vue'

export type BaseXSizeName = 'sm' | 'md' | 'lg'
export type BaseXSize = BaseXSizeName | 'small' | 'default' | 'large'
export type BaseXMaybeSource<T> = T | Ref<T> | (() => T)

export interface BaseXFormControlTheme {
  backgroundColor: string
  textColor: string
  borderColor: string
  activeBorderColor: string
  disabledBackgroundColor: string
  disabledTextColor: string
  clearIconColor: string
}

export interface BaseXSwitchTheme {
  color: string
  inactiveColor: string
  thumbColor: string
  borderColor: string
  borderWidth: string
  backgroundColor: string
  textColor: string
}

export interface BaseXTextTheme {
  backgroundColor: string
  textColor: string
  borderColor: string
}

export interface BaseXTabsTheme {
  activeTabBgColor: string
  activeTabTextColor: string
  tabBgColor: string
  tabTextColor: string
  tabBorder: string
  contentBackgroundColor: string
  contentBorder: string
}

export interface BaseXFileDiskTheme {
  backgroundColor: string
  textColor: string
  mutedTextColor: string
  borderColor: string
  headerBackgroundColor: string
  toolbarBackgroundColor: string
  itemBackgroundColor: string
  itemHoverBackgroundColor: string
  itemActiveBackgroundColor: string
  itemActiveTextColor: string
  iconColor: string
  activeIconColor: string
  emptyBackgroundColor: string
  dragOverBackgroundColor: string
  colors: Record<string, string>
}

export interface BaseXThemeTokens {
  formControl: BaseXFormControlTheme
  switchControl: BaseXSwitchTheme
  textControl: BaseXTextTheme
  tabs: BaseXTabsTheme
  fileDisk: BaseXFileDiskTheme
}

export type BaseXTableThemeProps = Record<string, unknown>
export type BaseXCrudAction = 'add' | 'edit' | 'delete'
export type BaseXPermissionValue = boolean | string | undefined
export type BaseXCrudActionPermissions = Partial<Record<BaseXCrudAction, BaseXPermissionValue>>
export type BaseXCrudActionDisabled = Partial<Record<BaseXCrudAction, boolean>>

export interface BaseXPermissionContext {
  action: BaseXCrudAction
  permission: BaseXPermissionValue
  resource: string
  permissionAction: 'create' | 'update' | 'delete'
}

export interface BaseXPrinterInfo {
  name: string
  isDefault?: boolean
}

export interface BaseXPrintSettings {
  printerName: string | null
  copies: number
  duplex: boolean
  color: boolean
}

export interface BaseXPrintDiagnostic {
  severity: 'Error' | 'Warning' | 'Info' | string
  message: string
}

export interface BaseXPrintDocumentJob {
  jobId: string
  sourceFileName: string
  diagnostics: BaseXPrintDiagnostic[]
}

export interface BaseXPrintRenderRequest {
  templatePath: string | null
  templateBase64: string | null
  templateFileName: string | null
  fileName: string
  data: unknown
  strictMode: boolean
  imagePdf: boolean
  printSettings: BaseXPrintSettings
}

export interface BaseXPrintResult {
  jobId: string
  status: string
  message: string
}

export interface BaseXPrintSource {
  blob: Blob
  fileName: string
}

export interface BaseXPrintAdapter {
  getPrinters: () => Promise<BaseXPrinterInfo[]>
  getPrintSettings: () => Promise<BaseXPrintSettings>
  savePrintSettings: (settings: BaseXPrintSettings) => Promise<BaseXPrintSettings>
  renderPrintDocument: (request: BaseXPrintRenderRequest) => Promise<BaseXPrintDocumentJob>
  submitPrintJob: (jobId: string, settings: BaseXPrintSettings) => Promise<BaseXPrintResult>
  fetchPrintPreview: (jobId: string) => Promise<Blob>
  fetchPrintSource: (jobId: string) => Promise<BaseXPrintSource>
}

export interface BaseXConfig {
  currentSize: BaseXMaybeSource<BaseXSizeName>
  theme: BaseXMaybeSource<BaseXThemeTokens>
  tableTheme: BaseXMaybeSource<BaseXTableThemeProps>
  canUseAction: (context: BaseXPermissionContext) => boolean
  getPermissionResource?: () => string
  printAdapter?: BaseXPrintAdapter
  openPreview: (blob: Blob) => void
  downloadBlob: (blob: Blob, fileName: string) => void
}

export type BaseXConfigOptions = Partial<BaseXConfig>
