import type { App } from 'vue'
import Statistic from './src/Statistic.vue'

export const XStatistic = Statistic

export type { StatisticProps } from './src/types'

XStatistic.install = (app: App) => {
  app.component(XStatistic.name!, XStatistic)
}

export default XStatistic
