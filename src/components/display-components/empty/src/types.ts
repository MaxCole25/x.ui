import type { ElementStyleProps } from '../../../_utils/elementStyle'

export interface EmptyProps extends ElementStyleProps {
  fontSize?: number
  image?: string
  imageSize?: number | string
  description?: string
  actionText?: string
}
