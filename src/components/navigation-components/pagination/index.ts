import type { App } from 'vue'
import Pagination from './src/Pagination.vue'

export const XPagination = Pagination

export type { PaginationProps } from './src/types'

XPagination.install = (app: App) => {
  app.component(XPagination.name!, XPagination)
}

export default XPagination
