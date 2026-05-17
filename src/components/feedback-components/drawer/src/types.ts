import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'

export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt'

export interface DrawerProps extends ElementStyleProps {
  modelValue?: boolean
  title?: string
  direction?: DrawerDirection
  size?: XSize
  panelSize?: number | string
  withHeader?: boolean
  showClose?: boolean
  closeOnMaskClick?: boolean
  destroyOnClose?: boolean
}
