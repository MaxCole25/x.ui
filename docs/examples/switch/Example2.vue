<script setup lang="ts">
import { ref } from 'vue'
const notice = ref(false)
import { XBrick, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSwitch v-model="notice" active-text="开启通知" inactive-text="关闭通知" />
  </XBrick>
</template>
