import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Pagination from './src/Pagination.vue'

export const XPagination = Pagination as ComponentWithInstall<typeof Pagination>

export type { PaginationProps } from './src/types'

XPagination.install = (app: App) => {
  app.component(XPagination.name!, XPagination)
}

export default XPagination
