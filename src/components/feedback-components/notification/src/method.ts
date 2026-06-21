import { createVNode, render } from 'vue'
import Notification from './Notification.vue'
import type { NotificationHandler, NotificationOptions } from './types'

export function XNotification(options: NotificationOptions | string): NotificationHandler {
  const normalized = typeof options === 'string' ? { message: options } : options
  const container = document.createElement('div')
  container.className = 'x-notification-service'
  container.style.position = 'fixed'
  container.style.zIndex = String(normalized.zIndex ?? 2200)
  container.style.right = normalized.placement?.includes('left') ? 'auto' : '16px'
  container.style.left = normalized.placement?.includes('left') ? '16px' : 'auto'
  container.style.top = normalized.placement?.includes('bottom') ? 'auto' : '16px'
  container.style.bottom = normalized.placement?.includes('bottom') ? '16px' : 'auto'
  document.body.appendChild(container)
  const close = () => {
    render(null, container)
    container.remove()
    normalized.onClose?.()
  }
  const vnode = createVNode(Notification, { ...normalized, onClose: close })
  render(vnode, container)
  return { close }
}
