import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Progress from './src/Progress.vue'

export const XProgress = Progress as ComponentWithInstall<typeof Progress>

export type { ProgressProps } from './src/types'

XProgress.install = (app: App) => {
  app.component(XProgress.name!, XProgress)
}

export default XProgress
