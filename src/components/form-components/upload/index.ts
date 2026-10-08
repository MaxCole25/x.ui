import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Upload from './src/Upload.vue'

export const XUpload = Upload as ComponentWithInstall<typeof Upload>

export type { UploadProps } from './src/types'

XUpload.install = (app: App) => {
  app.component(XUpload.name!, XUpload)
}

export default XUpload
