<script setup lang="ts">
import { XBrick, XStatistic } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XStatistic title="转化率" :model-value="18.236" :precision="2" suffix="%" />
  </XBrick>
</template>
