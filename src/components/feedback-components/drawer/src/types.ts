import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { OverlayProps } from '../../../_utils/overlay'
import type { XSize } from '../../../_utils/size'

export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt'

export interface DrawerProps extends ElementStyleProps, OverlayProps {
  modelValue?: boolean
  title?: string
  direction?: DrawerDirection
  size?: XSize
  panelSize?: number | string
  withHeader?: boolean
  showClose?: boolean
  closeOnMaskClick?: boolean
  destroyOnClose?: boolean
  maskColor?: string
  titleColor?: string
  headerBackgroundColor?: string
  bodyBackgroundColor?: string
  footerBackgroundColor?: string
  headerBorderColor?: string
  footerBorderColor?: string
  closeIconColor?: string
  closeIconHoverColor?: string
  closeIconHoverBackgroundColor?: string
  shadow?: string
}
