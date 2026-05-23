import type { App } from 'vue'
import Brick from './src/Brick.vue'
import BrickItem from './src/BrickItem.vue'

export const XBrick = Brick
export const XBrickItem = BrickItem

export type { BrickDirection, BrickItemOverflow, BrickItemProps, BrickProps, BrickSize } from './src/types'

XBrick.install = (app: App) => {
  app.component(XBrick.name!, XBrick)
  app.component(XBrickItem.name!, XBrickItem)
}

XBrickItem.install = (app: App) => {
  app.component(XBrickItem.name!, XBrickItem)
}

export default XBrick
