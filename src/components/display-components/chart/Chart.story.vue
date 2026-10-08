<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive, ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { XChart } from './index'
import type { ChartExpose } from './src/types'
import type { EChartsCoreOption } from 'echarts/core'
import '../../../styles/index.css'
use([LineChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])
const chartRef = ref<ChartExpose>()
const appearance = reactive({
  width: '100%',
  height: 260,
  minHeight: 220,
  loading: false,
  autoresize: true,
  throttle: 80,
  smooth: true,
  area: true,
  title: '组件使用趋势',
  readyCount: 0,
  renderedCount: 0,
  finishedCount: 0,
  clickCount: 0,
  actionCount: 0
})
const option = computed<EChartsCoreOption>(() => ({
  color: ['#1264f4'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    bottom: 0,
    textStyle: {
      color: '#64748b'
    }
  },
  grid: {
    left: 32,
    right: 24,
    top: 28,
    bottom: 44,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['一月', '二月', '三月', '四月', '五月', '六月'],
    axisLine: {
      lineStyle: {
        color: '#cbd5e1'
      }
    },
    axisLabel: {
      color: '#64748b'
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      color: '#64748b'
    }
  },
  series: [
    {
      name: appearance.title,
      type: 'line',
      smooth: appearance.smooth,
      areaStyle: appearance.area ? { opacity: 0.18 } : undefined,
      data: [18, 32, 41, 54, 72, 86]
    }
  ]
}))
const events = computed(() => ({
  click: () => {
    appearance.clickCount += 1
  }
}))
import { registerXChartAnalyticsModules } from './index'
registerXChartAnalyticsModules()
</script>

<template>
  <Story title="展示组件/Chart 图表" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XChart">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XChart
            ref="chartRef"
            :option="option"
            :events="events"

            @ready="appearance.readyCount += 1"
            @rendered="appearance.renderedCount += 1"
            @finished="appearance.finishedCount += 1"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.chart-story__column {
  align-content: start;
  color: #334155;
  display: grid;
  font-size: 13px;
  gap: 8px;
  width: 180px;
}

.chart-story__column button {
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #334155;
  cursor: pointer;
  min-height: 30px;
  padding: 0 8px;
}

.chart-story__check {
  justify-content: flex-start;
}
</style>
