<script setup lang="ts">
const chartOption = {
  tooltip: {},
  xAxis: { type: 'category', data: ['一月', '二月', '三月'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [18, 32, 26] }]
}
import { XChart } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { registerXChartAnalyticsModules } from '@x-soft88/x-ui'
registerXChartAnalyticsModules()
</script>

<template>
  <XChart :option="chartOption" height="220px" />
</template>
