import type { XSize } from '../../../_utils/size'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface EmptyProps extends ElementStyleProps {
  size?: XSize
  image?: string
  imageSize?: number | string
  description?: string
  actionText?: string
}
