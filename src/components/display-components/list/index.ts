import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import List from './src/List.vue'

export const XList = List as ComponentWithInstall<typeof List>

export type {
  ListItem,
  ListItemClickPayload,
  ListItemReorderPayload,
  ListItemSlotProps,
  ListItemValue,
  ListProps,
  ListReorderPosition,
  ListFontSize
} from './src/types'

XList.install = (app: App) => {
  app.component(XList.name!, XList)
}

export default XList
