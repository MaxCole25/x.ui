import { XMessageBox, type MessageBoxOptions } from 'x.ui'
import { getBaseXCurrentSize } from './baseXConfig'

function withBaseXMessageBoxSize(options: MessageBoxOptions = {}): MessageBoxOptions {
  return {
    ...options,
    size: options.size ?? getBaseXCurrentSize(),
  }
}

export const BaseXMessageBox = Object.assign(
  (options: string | MessageBoxOptions) => {
    if (typeof options === 'string') {
      return XMessageBox({
        message: options,
        size: getBaseXCurrentSize(),
      })
    }

    return XMessageBox(withBaseXMessageBoxSize(options))
  },
  {
    alert: (message: string, title = '提示', options: MessageBoxOptions = {}) =>
      XMessageBox.alert(message, title, withBaseXMessageBoxSize(options)),
    confirm: (message: string, title = '提示', options: MessageBoxOptions = {}) =>
      XMessageBox.confirm(message, title, withBaseXMessageBoxSize(options)),
  },
)
