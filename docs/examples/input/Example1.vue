<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('示例文本')
import { XBrick, XGrid, XText, XInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XInput v-model="inputValue" placeholder="请输入内容" clearable />
    </XGrid>
    <XText tag="p" variant="muted">当前输入：{{ inputValue || '暂无' }}</XText>
  </XBrick>
</template>
