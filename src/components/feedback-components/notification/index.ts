import type { App } from 'vue'
import NotificationComponent from './src/Notification.vue'
import { XNotification as NotificationService } from './src/method'

export const XNotificationComponent = NotificationComponent
export const XNotification = NotificationService

export * from './src/types'
export { NotificationService }

export default {
  install(app: App) {
    app.component(NotificationComponent.name!, NotificationComponent)
    app.config.globalProperties.$notification = NotificationService
  }
}
