<script setup lang="ts">
import { ref } from 'vue'
const selectStatus = ref('todo')
import { XBrick, XSelect, XOption } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="260px">
    <XSelect v-model="selectStatus">
      <XOption label="待处理" value="todo" />
      <XOption label="处理中" value="doing" />
      <XOption label="已完成" value="done" />
      <XOption label="已归档" value="archived" disabled />
    </XSelect>
  </XBrick>
</template>
