import { createApp, h } from 'vue'
import MessageBox from './MessageBox.vue'
import type { MessageBoxAction, MessageBoxOptions } from './types'

function open(options: string | MessageBoxOptions): Promise<MessageBoxAction> {
  const normalized = typeof options === 'string' ? { message: options } : options
  const container = document.createElement('div')
  document.body.appendChild(container)

  return new Promise((resolve, reject) => {
    function close(action: MessageBoxAction) {
      normalized.callback?.(action)
      app.unmount()
      container.remove()
      if (action === 'confirm') resolve(action)
      else reject(action)
    }

    const app = createApp({
      render() {
        return h(MessageBox, {
          ...normalized,
          modelValue: true,
          onAction: close
        })
      }
    })

    app.mount(container)
  })
}

export const XMessageBox = Object.assign(open, {
  alert(message: string, title = '提示', options: MessageBoxOptions = {}) {
    return open({ ...options, message, title, showCancelButton: false })
  },
  confirm(message: string, title = '提示', options: MessageBoxOptions = {}) {
    return open({ ...options, message, title, showCancelButton: true })
  }
})
