import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import FileDisk from './src/FileDisk.vue'

export const XFileDisk = FileDisk as ComponentWithInstall<typeof FileDisk>

export type {
  FileDiskAdapter,
  FileDiskClipboardAction,
  FileDiskClipboardPayload,
  FileDiskColors,
  FileDiskCreateFolderPayload,
  FileDiskDownloadOptions,
  FileDiskDownloadPayload,
  FileDiskItem,
  FileDiskItemType,
  FileDiskPermission,
  FileDiskProps,
  FileDiskRenamePayload,
  FileDiskTransferPayload,
  FileDiskUploadPayload,
  FileDiskViewMode
} from './src/types'

XFileDisk.install = (app: App) => {
  app.component(XFileDisk.name!, XFileDisk)
}

export default XFileDisk
