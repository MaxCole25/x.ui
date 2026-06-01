import { createApp, h } from 'vue'
import Message from './Message.vue'
import type { MessageHandler, MessageOptions, MessageProps, MessageType } from './types'

const instances: MessageHandler[] = []

function normalizeOptions(options: string | MessageOptions): MessageOptions {
  return typeof options === 'string' ? { message: options } : options
}

function createMessage(options: string | MessageOptions): MessageHandler {
  const normalized = normalizeOptions(options)
  const container = document.createElement('div')
  document.body.appendChild(container)

  const handler: MessageHandler = {
    close: () => {
      app.unmount()
      container.remove()
      normalized.onClose?.()
      const index = instances.indexOf(handler)
      if (index > -1) instances.splice(index, 1)
    }
  }

  const app = createApp({
    render() {
      return h(Message, {
        ...normalized,
        offset: normalized.offset ?? 20 + instances.indexOf(handler) * 56,
        onClose: handler.close
      })
    }
  })

  instances.push(handler)
  app.mount(container)
  return handler
}

export type XMessageFn = {
  (options: string | MessageOptions): MessageHandler
} & Record<MessageType, (options: string | MessageOptions) => MessageHandler>

export const XMessage = createMessage as XMessageFn

;(['success', 'warning', 'info', 'error'] as MessageType[]).forEach((status) => {
  XMessage[status] = (options: string | MessageOptions) => createMessage({ ...normalizeOptions(options), status })
})

export { Message }
export type { MessageHandler, MessageOptions, MessageProps }
