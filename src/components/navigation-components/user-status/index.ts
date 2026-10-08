import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import UserStatus from './src/UserStatus.vue'

export const XUserStatus = UserStatus as ComponentWithInstall<typeof UserStatus>

export type { UserStatusMenuItem, UserStatusProps } from './src/types'

XUserStatus.install = (app: App) => {
  app.component(XUserStatus.name!, XUserStatus)
}

export default XUserStatus
