import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import GroupContainer from './src/GroupContainer.vue'

export const XGroupContainer = GroupContainer as ComponentWithInstall<typeof GroupContainer>

export type {
  GroupContainerBorderStyle,
  GroupContainerProps,
  GroupContainerTitlePosition
} from './src/types'

XGroupContainer.install = (app: App) => {
  app.component(XGroupContainer.name!, XGroupContainer)
}

export default XGroupContainer
