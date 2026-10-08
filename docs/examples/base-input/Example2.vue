<script setup lang="ts">
import { ref } from 'vue'
const inputClearable = ref('可清空内容')
import { XBrick, XGrid, XBaseInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XBaseInput v-model="inputClearable" placeholder="请输入内容" clearable />
    </XGrid>
  </XBrick>
</template>
