<script setup lang="ts">
import { ref } from 'vue'
import { XSplitter, XSplitPane } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
const verticalSizes = ref([100, 180, 140])
</script>

<template>
  <XSplitter v-model="verticalSizes" height="260px">
    <XSplitPane :min-size="120" padding="12px">左侧</XSplitPane>
    <XSplitPane :min-size="180">中间内容</XSplitPane>
    <XSplitPane :min-size="120">右侧</XSplitPane>
  </XSplitter>
</template>
