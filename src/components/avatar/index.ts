import type { App } from 'vue'
import Avatar from './src/Avatar.vue'

export const XAvatar = Avatar

export type { AvatarProps, AvatarShape, AvatarSize } from './src/types'

XAvatar.install = (app: App) => {
  app.component(XAvatar.name!, XAvatar)
}

export default XAvatar
