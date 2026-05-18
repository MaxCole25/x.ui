<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
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

const autoresizeValue = computed(() => (appearance.autoresize ? { throttle: appearance.throttle } : false))

function resizeChart() {
  chartRef.value?.resize()
  appearance.actionCount += 1
}

function clearChart() {
  chartRef.value?.clear()
  appearance.actionCount += 1
}

function restoreChart() {
  chartRef.value?.setOption(option.value, { notMerge: true })
  appearance.actionCount += 1
}
</script>

<template>
  <Story title="展示组件/Chart 图表" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XChart
            ref="chartRef"
            v-bind="styleProps"
            :option="option"
            :events="events"
            :loading="appearance.loading"
            :autoresize="autoresizeValue"
            :width="appearance.width"
            :height="appearance.height"
            :min-height="appearance.minHeight"
            @ready="appearance.readyCount += 1"
            @rendered="appearance.renderedCount += 1"
            @finished="appearance.finishedCount += 1"
          />
        </template>

        <template #column-1>
          <label><span>标题</span><input v-model="appearance.title" /></label>
          <label><span>宽度</span><input v-model="appearance.width" /></label>
          <label><span>高度</span><input v-model.number="appearance.height" type="number" min="120" /></label>
        </template>

        <template #column-2>
          <label><span>最小高度</span><input v-model.number="appearance.minHeight" type="number" min="80" /></label>
          <label class="chart-story__check"><input v-model="appearance.loading" type="checkbox" /><span>加载中</span></label>
          <label class="chart-story__check"><input v-model="appearance.autoresize" type="checkbox" /><span>自动缩放</span></label>
        </template>

        <template #column-3>
          <label><span>缩放节流</span><input v-model.number="appearance.throttle" type="number" min="0" step="10" /></label>
          <label class="chart-story__check"><input v-model="appearance.smooth" type="checkbox" /><span>平滑曲线</span></label>
          <label class="chart-story__check"><input v-model="appearance.area" type="checkbox" /><span>面积填充</span></label>
        </template>

        <template #interfaces>
          <section class="chart-story__column">
            <button type="button" @click="resizeChart">resize</button>
            <button type="button" @click="clearChart">clear</button>
            <button type="button" @click="restoreChart">setOption</button>
          </section>
          <section class="chart-story__column">
            <span>接口调用 {{ appearance.actionCount }} 次</span>
          </section>
        </template>

        <template #types>
          <section class="chart-story__column">
            <span>option: EChartsCoreOption</span>
            <span>theme: string | object</span>
            <span>autoresize: boolean | object</span>
          </section>
          <section class="chart-story__column">
            <span>events: ChartEvents</span>
            <span>expose: ChartExpose</span>
          </section>
        </template>

        <template #events>
          <section class="chart-story__column">
            <span>ready {{ appearance.readyCount }} 次</span>
            <span>rendered {{ appearance.renderedCount }} 次</span>
            <span>finished {{ appearance.finishedCount }} 次</span>
            <span>click {{ appearance.clickCount }} 次</span>
          </section>
        </template>
      </ElementStylePlayground>
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
