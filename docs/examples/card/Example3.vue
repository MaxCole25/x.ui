<script setup lang="ts">
import { ref } from 'vue'
import { XButton, XCard, XGrid } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const enabled = ref(true)
</script>

<template>
  <XGrid :columns="3" :gap="24" padding="24px">
    <XCard header="普通卡片" shadow="never" border-color="#3978f6">默认不启用泛光。</XCard>
    <XCard header="跟随边框色" shadow="never" border-color="#3978f6" :enable-glow="enabled">泛光默认跟随蓝色边框。</XCard>
    <XCard header="指定泛光色" shadow="never" border-color="#12b6a4" :enable-glow="enabled" glow-color="#8b5cf6">绿色边框与独立的紫色泛光。</XCard>
  </XGrid>
  <XButton @click="enabled = !enabled">{{ enabled ? '关闭泛光' : '开启泛光' }}</XButton>
</template>
