<script setup lang="ts">
import { XSplitter, XSplitPane } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const verticalSizes = ref([100, 180, 140])
</script>

<template>
  <XSplitter v-model="verticalSizes" direction="vertical" height="420px">
    <XSplitPane size="100px" locked>顶部固定</XSplitPane>
    <XSplitPane :min-size="120">中间内容</XSplitPane>
    <XSplitPane :min-size="80">底部</XSplitPane>
  </XSplitter>
</template>
