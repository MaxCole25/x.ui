import type { App } from 'vue'
import Chart from './src/Chart.vue'

export const XChart = Chart

export type {
  ChartAutoresize,
  ChartEventBinding,
  ChartEventHandler,
  ChartEvents,
  ChartExpose,
  ChartLoadingOptions,
  ChartProps,
  ChartTheme
} from './src/types'

XChart.install = (app: App) => {
  app.component(XChart.name!, XChart)
}

export default XChart
