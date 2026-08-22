import type { App } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import Chart from './src/Chart.vue'

export const XChart = Chart

/**
 * Registers the chart types used by common analytics dashboards.
 *
 * XChart creates its instances from x.ui's ECharts runtime, so registrations
 * must use this same runtime rather than a consuming application's copy.
 */
export function registerXChartAnalyticsModules() {
  use([
    BarChart,
    LineChart,
    PieChart,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    CanvasRenderer,
  ])
}

export type { EChartsCoreOption as XChartOption } from 'echarts/core'

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
