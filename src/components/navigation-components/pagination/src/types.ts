import type { XSize } from '../../../_utils/size'

export interface PaginationProps {
  modelValue?: number
  total?: number
  pageSize?: number
  pagerCount?: number
  disabled?: boolean
  showTotal?: boolean
  showPageSize?: boolean
  pageSizes?: number[]
  size?: XSize
}
