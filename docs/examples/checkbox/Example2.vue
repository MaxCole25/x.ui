<script setup lang="ts">
import { ref } from 'vue'
const permissions = ref(['read'])
import { XBrick, XText, XCheckbox } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XCheckbox v-model="permissions" value="read">读取</XCheckbox>
    <XCheckbox v-model="permissions" value="write">写入</XCheckbox>
    <XCheckbox v-model="permissions" value="admin">管理</XCheckbox>
  </XBrick>
  <XText tag="p" variant="muted">当前值：{{ permissions.join('、') || '暂无' }}</XText>
</template>
