import { XMessage, type MessageOptions } from 'x.ui'
import { getBaseXCurrentSize } from './baseXConfig'

function withBaseXMessageSize(options: string | MessageOptions): string | MessageOptions {
  if (typeof options === 'string') {
    return {
      message: options,
      size: getBaseXCurrentSize(),
    }
  }

  return {
    ...options,
    size: options.size ?? getBaseXCurrentSize(),
  }
}

export const BaseXMessage = Object.assign(
  (options: string | MessageOptions) => XMessage(withBaseXMessageSize(options)),
  {
    success: (options: string | MessageOptions) => XMessage.success(withBaseXMessageSize(options)),
    warning: (options: string | MessageOptions) => XMessage.warning(withBaseXMessageSize(options)),
    info: (options: string | MessageOptions) => XMessage.info(withBaseXMessageSize(options)),
    error: (options: string | MessageOptions) => XMessage.error(withBaseXMessageSize(options)),
  },
)
