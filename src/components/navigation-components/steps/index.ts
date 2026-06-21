import type { App } from 'vue'
import Steps from './src/Steps.vue'

export const XSteps = Steps

export type { StepsProps } from './src/types'

XSteps.install = (app: App) => {
  app.component(XSteps.name!, XSteps)
}

export default XSteps
