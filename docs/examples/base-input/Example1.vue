<script setup lang="ts">
import { ref } from 'vue'
const inputBasic = ref('@x-soft88/x-ui')
import { XBrick, XGrid, XText, XBaseInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XBaseInput v-model="inputBasic" placeholder="请输入名称" />
    </XGrid>
    <XText tag="p" variant="muted">当前输入：{{ inputBasic || '暂无' }}</XText>
  </XBrick>
</template>
