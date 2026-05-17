import type { App } from 'vue'
import Tag from './src/Tag.vue'

export const XTag = Tag

export type { TagEffect, TagProps, TagSize, TagType } from './src/types'

XTag.install = (app: App) => {
  app.component(XTag.name!, XTag)
}

export default XTag
