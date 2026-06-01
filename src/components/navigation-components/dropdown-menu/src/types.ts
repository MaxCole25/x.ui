import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface DropdownMenuProps extends ElementStyleProps {
  size?: XSize
  width?: number | string
  maxHeight?: number | string
  minWidth?: number | string
  padding?: number | string
  radius?: number | string
  shadow?: string
}
