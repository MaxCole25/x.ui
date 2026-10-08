import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Brick from './src/Brick.vue'
import BrickItem from './src/BrickItem.vue'

export const XBrick = Brick as ComponentWithInstall<typeof Brick>
export const XBrickItem = BrickItem as ComponentWithInstall<typeof BrickItem>

export type { BrickDirection, BrickItemOverflow, BrickItemProps, BrickProps, BrickSize } from './src/types'

XBrick.install = (app: App) => {
  app.component(XBrick.name!, XBrick)
  app.component(XBrickItem.name!, XBrickItem)
}

XBrickItem.install = (app: App) => {
  app.component(XBrickItem.name!, XBrickItem)
}

export default XBrick
