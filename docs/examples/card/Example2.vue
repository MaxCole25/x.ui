<script setup lang="ts">
import { XText, XGrid, XCard, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XCard width="320px" shadow="hover">
    <template #header>
      <XGrid columns="minmax(0, 1fr) auto" align-items="center">
        <span>项目概览</span>
        <XButton width="72px" height="28px">查看</XButton>
      </XGrid>
    </template>
    <XText :line-height="1.8">今日新增 12 条任务，3 条需要优先处理。</XText>
    <template #footer>更新时间：09:30</template>
  </XCard>
</template>
