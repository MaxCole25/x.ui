import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { XSize } from '../../../_utils/size'
import type { DropdownPlacement } from '../../dropdown/src/types'

export type ToolsItemKey = string | number
export type ToolsItemType = 'button' | 'dropdown' | 'split-dropdown' | 'separator'

export interface ToolsMenuItem {
  key?: ToolsItemKey
  name: string
  command?: unknown
  icon?: string
  disabled?: boolean
  divided?: boolean
  active?: boolean
  onClick?: (menuItem: ToolsMenuItem, item: ToolsActionItem) => void
}

export interface ToolsActionItem {
  type?: Exclude<ToolsItemType, 'separator'>
  key: ToolsItemKey
  name?: string
  icon?: string
  disabled?: boolean
  children?: ToolsMenuItem[]
  onClick?: (item: ToolsActionItem, event: MouseEvent) => void
  onCommand?: (command: unknown, item: ToolsActionItem, menuItem: ToolsMenuItem) => void
}

export interface ToolsSeparatorItem {
  type: 'separator'
  key?: ToolsItemKey
}

export type ToolsItem = ToolsActionItem | ToolsSeparatorItem

export interface ToolsProps extends ElementStyleProps {
  items?: ToolsItem[]
  size?: XSize
  disabled?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number | string
  placement?: DropdownPlacement
  popperWidth?: number | string
}
