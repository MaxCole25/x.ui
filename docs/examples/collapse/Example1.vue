<script setup lang="ts">
import { ref } from 'vue'
const activeNames = ref(['basic'])
const collapseItems = [
  { name: 'basic', title: '基础信息', content: '这里展示基础信息。' },
  { name: 'advanced', title: '高级设置', content: '这里展示高级设置。' }
]
import { XBrick, XCollapse } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XCollapse v-model="activeNames" :items="collapseItems" />
  </XBrick>
</template>
