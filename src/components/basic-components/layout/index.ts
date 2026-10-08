import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Layout from './src/Layout.vue'

export const XLayout = Layout as ComponentWithInstall<typeof Layout>

export type { LayoutMode, LayoutProps } from './src/types'

XLayout.install = (app: App) => {
  app.component(XLayout.name!, XLayout)
}

export default XLayout
