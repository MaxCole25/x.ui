import type {
  ECharts,
  EChartsCoreOption,
  EChartsInitOpts,
  Payload,
  ResizeOpts,
  SetOptionOpts
} from 'echarts/core'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type ChartTheme = string | object
export type ChartAutoresize = boolean | { throttle?: number }
export type ChartEventHandler = (...args: unknown[]) => void

export interface ChartEventBinding {
  query?: string | object
  handler: ChartEventHandler
}

export type ChartEvents = Record<string, ChartEventHandler | ChartEventBinding>
export type ChartLoadingOptions = Record<string, unknown>

export interface ChartProps extends ElementStyleProps {
  option?: EChartsCoreOption
  theme?: ChartTheme
  initOptions?: EChartsInitOpts
  setOptionOptions?: SetOptionOpts
  autoresize?: ChartAutoresize
  loading?: boolean
  loadingOptions?: ChartLoadingOptions
  events?: ChartEvents
  width?: number | string
  height?: number | string
  minHeight?: number | string
}

export interface ChartExpose {
  getInstance: () => ECharts | undefined
  setOption: (option: EChartsCoreOption, options?: SetOptionOpts) => void
  resize: (options?: ResizeOpts) => void
  dispatchAction: (payload: Payload) => void
  clear: () => void
  showLoading: (type?: string, options?: ChartLoadingOptions) => void
  hideLoading: () => void
  dispose: () => void
}
