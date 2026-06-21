import type { App } from 'vue'
import Descriptions from './src/Descriptions.vue'

export const XDescriptions = Descriptions

export type { DescriptionsProps } from './src/types'

XDescriptions.install = (app: App) => {
  app.component(XDescriptions.name!, XDescriptions)
}

export default XDescriptions
