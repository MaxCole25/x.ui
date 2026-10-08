<script setup lang="ts">
import { ref } from 'vue'
const chartOption = {
  tooltip: {},
  xAxis: { type: 'category', data: ['一月', '二月', '三月'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [18, 32, 26] }]
}
const chartReadyText = ref('等待图表初始化')
import { XBrick, XText, XChart } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { registerXChartAnalyticsModules } from '@x-soft88/x-ui'
registerXChartAnalyticsModules()
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XChart
      :option="chartOption"
      height="240px"
      :events="{ click: () => { chartReadyText = '已接收到 click 事件' } }"
      @ready="chartReadyText = '图表已初始化'"
    />
    <XText tag="p" variant="muted">{{ chartReadyText }}</XText>
  </XBrick>
</template>
