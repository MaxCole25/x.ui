import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { OverlayProps } from '../../../_utils/overlay'

export type DrawerDirection = 'rtl' | 'ltr' | 'ttb' | 'btt'

export interface DrawerProps extends ElementStyleProps, OverlayProps {
  modelValue?: boolean
  title?: string
  direction?: DrawerDirection
  fontSize?: number
  panelSize?: number | string
  withHeader?: boolean
  showClose?: boolean
  closeOnMaskClick?: boolean
  closeOnEsc?: boolean
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
