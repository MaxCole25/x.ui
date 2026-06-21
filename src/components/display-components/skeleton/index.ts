import type { App } from 'vue'
import Skeleton from './src/Skeleton.vue'

export const XSkeleton = Skeleton

export type { SkeletonProps } from './src/types'

XSkeleton.install = (app: App) => {
  app.component(XSkeleton.name!, XSkeleton)
}

export default XSkeleton
