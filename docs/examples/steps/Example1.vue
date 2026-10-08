<script setup lang="ts">
const steps = [
  { title: '提交', description: '提交申请' },
  { title: '审核', description: '等待审核' },
  { title: '完成', description: '流程完成' }
]
import { XBrick, XSteps } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSteps :items="steps" :model-value="1" />
  </XBrick>
</template>
