<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init } from 'echarts/core'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import type {
  ChartEventBinding,
  ChartEventHandler,
  ChartEvents,
  ChartExpose,
  ChartLoadingOptions,
  ChartProps
} from './types'
import type { ECharts, EChartsCoreOption, Payload, ResizeOpts, SetOptionOpts } from 'echarts/core'

defineOptions({
  name: 'XChart'
})

const props = withDefaults(defineProps<ChartProps>(), {
  autoresize: true,
  loading: false,
  width: '100%',
  height: 320,
  minHeight: 240
})

const emit = defineEmits<{
  ready: [instance: ECharts]
  rendered: [params: unknown]
  finished: [params: unknown]
}>()

const rootRef = ref<HTMLElement>()
const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | undefined
let resizeObserver: ResizeObserver | undefined
let resizeTimer: ReturnType<typeof setTimeout> | undefined
let boundEventEntries: Array<{ name: string; handler: ChartEventHandler }> = []

const chartStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-chart-width': toCssSize(props.width),
  '--x-chart-height': toCssSize(props.height),
  '--x-chart-min-height': toCssSize(props.minHeight)
}))

const renderedHandler = (params: unknown) => emit('rendered', params)
const finishedHandler = (params: unknown) => emit('finished', params)

function getInstance() {
  return chartInstance
}

function getResizeThrottle() {
  if (typeof props.autoresize === 'object') {
    return Math.max(0, props.autoresize.throttle ?? 0)
  }

  return 0
}

function scheduleResize(options?: ResizeOpts) {
  if (!chartInstance) return

  const throttle = getResizeThrottle()
  if (resizeTimer !== undefined) {
    clearTimeout(resizeTimer)
    resizeTimer = undefined
  }

  if (throttle > 0) {
    resizeTimer = setTimeout(() => {
      chartInstance?.resize(options)
      resizeTimer = undefined
    }, throttle)
    return
  }

  chartInstance.resize(options)
}

function normalizeEventBinding(name: string, binding: ChartEvents[string]) {
  if (typeof binding === 'function') {
    return { name, handler: binding }
  }

  if (binding && typeof binding.handler === 'function') {
    return { name, query: binding.query, handler: binding.handler }
  }

  return undefined
}

function bindCoreEvents() {
  const instance = chartInstance as any
  instance?.on('rendered', renderedHandler)
  instance?.on('finished', finishedHandler)
}

function unbindCoreEvents() {
  const instance = chartInstance as any
  instance?.off('rendered', renderedHandler)
  instance?.off('finished', finishedHandler)
}

function bindEvents() {
  if (!chartInstance || !props.events) return

  Object.entries(props.events).forEach(([name, binding]) => {
    const normalized = normalizeEventBinding(name, binding)
    if (!normalized) return

    if ('query' in normalized && normalized.query !== undefined) {
      ;(chartInstance as any)?.on(normalized.name, normalized.query, normalized.handler)
    } else {
      ;(chartInstance as any)?.on(normalized.name, normalized.handler)
    }
    boundEventEntries.push({ name: normalized.name, handler: normalized.handler })
  })
}

function unbindEvents() {
  if (!chartInstance) {
    boundEventEntries = []
    return
  }

  boundEventEntries.forEach(({ name, handler }) => {
    ;(chartInstance as any)?.off(name, handler)
  })
  boundEventEntries = []
}

function syncLoading() {
  if (!chartInstance) return

  if (props.loading) {
    chartInstance.showLoading('default', props.loadingOptions)
    return
  }

  chartInstance.hideLoading()
}

function applyOption(option = props.option, options = props.setOptionOptions) {
  if (!chartInstance || !option) return

  chartInstance.setOption(option, options)
}

function setupAutoresize() {
  cleanupAutoresize()
  if (!props.autoresize || !rootRef.value) return

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => scheduleResize())
    resizeObserver.observe(rootRef.value)
  } else if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleWindowResize)
  }
}

function cleanupAutoresize() {
  resizeObserver?.disconnect()
  resizeObserver = undefined
  window.removeEventListener('resize', handleWindowResize)
  if (resizeTimer !== undefined) {
    clearTimeout(resizeTimer)
    resizeTimer = undefined
  }
}

function handleWindowResize() {
  scheduleResize()
}

async function createChart() {
  await nextTick()
  if (!chartRef.value) return

  chartInstance = init(chartRef.value, props.theme ?? null, props.initOptions)
  bindCoreEvents()
  bindEvents()
  applyOption()
  syncLoading()
  setupAutoresize()
  scheduleResize()
  emit('ready', chartInstance)
}

function disposeChart() {
  cleanupAutoresize()
  unbindEvents()
  unbindCoreEvents()
  chartInstance?.dispose()
  chartInstance = undefined
}

function recreateChart() {
  disposeChart()
  void createChart()
}

function setOption(option: EChartsCoreOption, options?: SetOptionOpts) {
  chartInstance?.setOption(option, options ?? props.setOptionOptions)
}

function resize(options?: ResizeOpts) {
  scheduleResize(options)
}

function dispatchAction(payload: Payload) {
  chartInstance?.dispatchAction(payload)
}

function clear() {
  chartInstance?.clear()
}

function showLoading(type = 'default', options?: ChartLoadingOptions) {
  chartInstance?.showLoading(type, options ?? props.loadingOptions)
}

function hideLoading() {
  chartInstance?.hideLoading()
}

function dispose() {
  disposeChart()
}

watch(
  () => props.option,
  (option) => {
    applyOption(option)
  }
)

watch(
  () => [props.theme, props.initOptions] as const,
  () => {
    recreateChart()
  }
)

watch(
  () => props.events,
  () => {
    unbindEvents()
    bindEvents()
  }
)

watch(
  () => props.autoresize,
  () => {
    setupAutoresize()
  }
)

watch(
  () => [props.loading, props.loadingOptions] as const,
  () => {
    syncLoading()
  }
)

onMounted(() => {
  void createChart()
})

onBeforeUnmount(() => {
  disposeChart()
})

defineExpose<ChartExpose>({
  getInstance,
  setOption,
  resize,
  dispatchAction,
  clear,
  showLoading,
  hideLoading,
  dispose
})
</script>

<template>
  <div ref="rootRef" class="x-chart" :style="chartStyle">
    <div ref="chartRef" class="x-chart__canvas"></div>
  </div>
</template>
