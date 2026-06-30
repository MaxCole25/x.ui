import type { App } from 'vue'
import Grid from './src/Grid.vue'
import GridItem from './src/GridItem.vue'

export const XGrid = Grid
export const XGridItem = GridItem

export type { GridAlign, GridItemOverflow, GridItemProps, GridProps, GridResponsiveColumns, GridSize } from './src/types'

XGrid.install = (app: App) => {
  app.component(XGrid.name!, XGrid)
  app.component(XGridItem.name!, XGridItem)
}

XGridItem.install = (app: App) => {
  app.component(XGridItem.name!, XGridItem)
}

export default XGrid
