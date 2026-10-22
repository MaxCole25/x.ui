<script setup lang="ts">
import { ref } from 'vue'
import { XBrick, XFlow, XInput, XButton, XText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const keyword = ref('')
const result = ref('请输入关键词后查询')
function search() {
  result.value = keyword.value.trim() ? `查询关键词：${keyword.value.trim()}` : '请输入关键词'
}
</script>

<template>
  <XBrick direction="vertical" :gap="16" :padding="16" width="100%">
    <XText tag="h2" variant="title">业务查询</XText>
    <XFlow width="100%" :item-width="200" :gap="12" justify-items="stretch">
      <XInput v-model="keyword" width="100%" placeholder="输入关键词" clearable />
      <XButton @click="search">查询</XButton>
    </XFlow>
    <XText tag="p" variant="muted">{{ result }}</XText>
  </XBrick>
</template>
