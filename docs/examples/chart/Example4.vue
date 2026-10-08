<script setup lang="ts">
const chartDarkOption = {
  textStyle: { color: '#e5e7eb' },
  xAxis: { type: 'category', data: ['一月', '二月', '三月'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [12, 28, 22] }]
}
import { XChart } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { registerXChartAnalyticsModules } from '@x-soft88/x-ui'
registerXChartAnalyticsModules()
</script>

<template>
  <XChart :option="chartDarkOption" theme="x-doc-chart-dark" background-color="#0b1726" height="220px" />
</template>
