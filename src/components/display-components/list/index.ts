import type { App } from 'vue'
import List from './src/List.vue'

export const XList = List

export type {
  ListItem,
  ListItemClickPayload,
  ListItemReorderPayload,
  ListItemSlotProps,
  ListItemValue,
  ListProps,
  ListReorderPosition,
  ListSize
} from './src/types'

XList.install = (app: App) => {
  app.component(XList.name!, XList)
}

export default XList
