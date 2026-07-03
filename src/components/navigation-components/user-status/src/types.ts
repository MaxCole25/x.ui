import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'
import type { DropdownPlacement, DropdownTrigger } from '../../dropdown/src/types'

export interface UserStatusMenuItem {
  text: string
  command?: unknown
  icon?: string
  disabled?: boolean
  divided?: boolean
  active?: boolean
}

export interface UserStatusProps extends ElementStyleProps {
  loggedIn?: boolean
  name?: string
  description?: string
  avatarSrc?: string
  avatarAlt?: string
  avatarIcon?: string
  avatarIconColor?: string
  avatarBackgroundColor?: string
  avatarIconFull?: boolean
  hoverBackgroundColor?: string
  openBackgroundColor?: string
  items?: UserStatusMenuItem[]
  size?: XSize
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  disabled?: boolean
  hideOnClick?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
}
