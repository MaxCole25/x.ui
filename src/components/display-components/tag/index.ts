import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Tag from './src/Tag.vue'

export const XTag = Tag as ComponentWithInstall<typeof Tag>

export type { TagEffect, TagProps, TagFontSize, TagType } from './src/types'

XTag.install = (app: App) => {
  app.component(XTag.name!, XTag)
}

export default XTag
