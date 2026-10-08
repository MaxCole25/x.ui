<script setup lang="ts">
import { ref } from 'vue'
function handleClick() {
  clickCount.value += 1
}
const clickCount = ref(0)
import { XBrick, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButton @click="handleClick">保存</XButton>
    <span>点击次数：{{ clickCount }}</span>
  </XBrick>
</template>
