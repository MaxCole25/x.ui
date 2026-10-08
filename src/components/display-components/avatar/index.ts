import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Avatar from './src/Avatar.vue'

export const XAvatar = Avatar as ComponentWithInstall<typeof Avatar>

export type { AvatarProps, AvatarShape, AvatarFontSize } from './src/types'

XAvatar.install = (app: App) => {
  app.component(XAvatar.name!, XAvatar)
}

export default XAvatar
